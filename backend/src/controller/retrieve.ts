import { User } from './../entities/User';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../../index';
import { Logs } from '../entities/Logs';


// import { validationResult } from 'express-validator';
class RetrieveController {

    public async retrieveStudent(req: Request,
        res: Response,): Promise<Response> {
        let account: User[] | null;
        let filter = new User();
        if (req.body.fakNumber != null) {
            filter.fakNumber = req.body.fakNumber
        }
        try {
            account = await AppDataSource.getRepository(
                User,
            ).createQueryBuilder("user").where("user.type='student' AND  user.isSuccess='Y'")
                .andWhere(":fakNumber is null OR user.fakNumber=:fakNumber",
                    { fakNumber: filter.fakNumber })
                .getMany();

        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
        if (account.length > 0) {
            let log:any;
            log=await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({date:new Date(),user:req.body.userEmail,ip:req.ip,step:"Търсене на студент"}).execute();
            return res.json(account).status(200);
        } else {
            
            return res.json(0).status(200);
        }
    }
    public async getTeacher(req:Request,res:Response) :Promise<Response>{
        let account: User | null;
        let filter = new User();
        if (req.body.id != null) {
            filter.id = req.body.id
        }
        try {
            account = await AppDataSource.getRepository(
                User).createQueryBuilder("user")
                .where("user.id=:id",{id:filter.id}).getOne();
                
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' ,errors})
                .status(500);
        }
        
        if (account) {
            account = instanceToPlain(account) as User;

            return res.json(account).status(201);
        } else {
            return res.json(0).status(201);
        }
    }
    public async getStudent(req: Request, res: Response): Promise<Response> {
        let account: User | null;
        let filter = new User();
        if (req.body.id != null) {
            filter.id = req.body.id
        }
        
        try {
            account = await AppDataSource.getRepository(
                User).createQueryBuilder("user").leftJoinAndSelect("user.semesters","semester")
                .leftJoinAndSelect("user.dorm","dorm")
                .leftJoinAndSelect("user.healthcare","healthcare")
                .leftJoinAndSelect("user.sport","sport")
                .leftJoinAndSelect("user.scholarship","scholarship")
                .leftJoinAndSelect("user.grade","grade")
                .where("user.id=:id",{id:filter.id}).getOne();
                
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' ,errors})
                .status(500);
        }
        
        if (account) {
            account = instanceToPlain(account) as User;

            return res.json(account).status(201);
        } else {
            return res.json(0).status(201);
        }
    }
}
export const retrieveController = new RetrieveController();