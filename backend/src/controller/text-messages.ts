import { Request, Response } from "express";
import { AppDataSource } from "../..";
import { Massages } from "../entities/Massages";
import { instanceToPlain } from "class-transformer";
import { User } from "../entities/User";
import nodemailer from "nodemailer";
class TextMassages {

    public async sendMassage(req: Request, res: Response): Promise<Response> {
        let sendMail = new Massages();
        sendMail.date = req.body.date;
        sendMail.text = req.body.text;
        sendMail.senderId = req.body.senderId;
        sendMail.retrieverId = req.body.retrieverId;
        let message: Massages;
        try {
            message = await AppDataSource.getRepository(Massages).save(sendMail);
            message = instanceToPlain(message) as Massages;
            let allMessages: Massages[] | null;
            let sender: User | null;
            let retreiver: User | null;
            sender = await AppDataSource.getRepository(User).createQueryBuilder('user').where('user.id=:id', { id: sendMail.senderId }).getOne();
            retreiver = await AppDataSource.getRepository(User).createQueryBuilder('user').where('user.id=:id', { id: sendMail.retrieverId }).getOne();
            sender = instanceToPlain(sender) as User;
            retreiver = instanceToPlain(retreiver) as User;
            const transporter = nodemailer.createTransport({
                host: "smtp.abv.bg",
                port: 465,
                secure: true,
                requireTLS: true,
               
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            transporter.sendMail({
                from: `${sender.email}`,
                to: `${retreiver.email}`,
                subject: "Съобщение",
                text: `${message.text}`
            })

            allMessages = await AppDataSource.getRepository(Massages).createQueryBuilder("msg")
                .where('(msg.senderId=:sender AND msg.retrieverId=:retriever) OR (msg.senderId=:retriever AND msg.retrieverId=:sender)', { sender: sendMail.senderId, retriever: sendMail.retrieverId }).getMany();
            if (allMessages.length >= 1) {
                allMessages = instanceToPlain(allMessages) as Massages[];
                return res.json(allMessages).status(200);
            } else {
                return res.json("Empty").status(500);
            }
        } catch (error) {
            return res.json({ errors: `Error is ${error}` }).status(500);
        }
    }
    public async retrieveAllMsg(req: Request, res: Response): Promise<Response> {
        let sendMail = new Massages();
        sendMail.senderId = req.body.senderId;
        sendMail.retrieverId = req.body.retrieverId;
        try {
            let allMessages: Massages[] | null;
            allMessages = await AppDataSource.getRepository(Massages).createQueryBuilder("msg")
                .where('(msg.senderId=:sender AND msg.retrieverId=:retriever) OR (msg.senderId=:retriever AND msg.retrieverId=:sender)', { sender: sendMail.senderId, retriever: sendMail.retrieverId }).getMany();
            if (allMessages.length >= 1) {
                allMessages = instanceToPlain(allMessages) as Massages[];
                return res.json(allMessages).status(200);
            } else {
                return res.json("Empty").status(500);
            }
        } catch (error) {
            return res.json({ errors: `Error is ${error}` }).status(500);
        }
    }

}
export const textMassages = new TextMassages();