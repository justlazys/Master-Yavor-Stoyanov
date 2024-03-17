import { Request, Response } from "express";
import { AppDataSource } from "../..";
import { Disciplines } from "../entities/Disciplines";
import { User } from "../entities/User";
import { instanceToPlain } from "class-transformer";
import nodemailer from "nodemailer";
class MassagesController {

    public async retrieveMassages(req: Request, res: Response): Promise<Response> {
        let user: User | null;
        console.log('req',req.body.id);
        try {
            user = await AppDataSource.getRepository(User).createQueryBuilder('user').where('user.id=:id',{ id: req.body.id }).getOne();
            console.log('user',user);
            user = instanceToPlain(user) as User;
            let massages: Disciplines[] | null;
           
            massages = await AppDataSource.getRepository(Disciplines).createQueryBuilder('desc').where('desc.stream=:stream', { stream: user.stream.toString() }).getMany();
            massages = instanceToPlain(massages) as Disciplines[];
            if (massages.length >= 1) {
                return res.json(massages).status(200);
            } else {
                return res.json('No massages').status(200);
            }
        } catch (e) {
            return  res.json({error:`Error ${e}`}).status(200);
        }

    }
   
    public async sendEmail(req:Request,res:Response) :Promise<Response> {
        console.log('test',req.body.files)
        try{
            const transporter = nodemailer.createTransport({
                host: "smtp.abv.bg",
                port: 465,
                secure: true,
                requireTLS: true,
                auth: {
                  user: `${req.body.email}`,
                  pass: `${req.body.password}`,
                },
                logger: true
              });
             
              transporter.sendMail({
                
                from: `${req.body.from}`,
                to: `${req.body.to}`,
                subject: `${req.body.subject}`,
                text: `${req.body.text}`,
                attachments:[
                    {   // file on disk as an attachment
                        filename: `${req.body.filesName}` ,
                        path: `${req.body.files}` // stream this file
                    },
                ]
      
              })
              return res.json('Send Item').status(200);   
        }catch(error){
            return res.json({errors:`Error ist + ${error}`}).status(500);
        }
    }
}
export const massageController= new MassagesController();