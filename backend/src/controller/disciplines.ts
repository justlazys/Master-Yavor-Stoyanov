import { Request, Response } from 'express';
import { Disciplines } from '../entities/Disciplines';
import { AppDataSource } from '../../index';
import { instanceToPlain } from 'class-transformer';
import { User } from './../entities/User';
import nodemailer from "nodemailer";
import { UpdateResult } from 'typeorm';
import { Logs } from '../entities/Logs';

class EditDisciplinesController {
    public async create(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const newDisciplines = new Disciplines();

        if (req.body.title != null) {
            newDisciplines.title = req.body.title;
        }
        if (req.body.semester != null) {
            newDisciplines.semester = req.body.semester;
        }
        if (req.body.stream != null) {
            newDisciplines.stream = req.body.stream;
        }
        if (req.body.isImportant != null) {
            newDisciplines.isImportant = req.body.isImportant;
        }
        if (req.body.withs != null) {
            newDisciplines.withs = req.body.withs;
        }
        if (req.body.topic != null) {
            newDisciplines.topic = req.body.topic;
        }
        if (req.body.color != null) {
            newDisciplines.color = req.body.color;
        }
        if (req.body.start != null) {
            newDisciplines.start = req.body.start;
        }
        if (req.body.end != null) {
            newDisciplines.end = req.body.end;
        }
        if (req.body.description != null) {
            newDisciplines.description = req.body.description;
        }
        if (req.body.location != null) {
            newDisciplines.location = req.body.location;
        }
        try {
            let createdDisciplines: Disciplines;
            createdDisciplines = await AppDataSource.getRepository(
                Disciplines,
            ).save(newDisciplines);
           

            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на събитие" }).execute();
            if (newDisciplines.isImportant) {
                let users: User[] | null;

                users = await AppDataSource.getRepository(User,)
                    .createQueryBuilder("user").where("user.stream=:stream", { stream: newDisciplines.stream }).getMany();

                users = instanceToPlain(users) as User[];
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
                
                for (let i of users) {

                    transporter.sendMail({
                        from: "Register Form <yavorstoyanov98@abv.bg>",
                        to: `${i.email}`,
                        subject: `Мероприятие ${newDisciplines.title} на ${newDisciplines.start}`,
                        text: `${newDisciplines.description}`


                    })
                }
            }
            let display: Disciplines[] | null;
            try {
                display = await AppDataSource.getRepository(
                    Disciplines,
                ).createQueryBuilder("disc")
                    .getMany();

                if (display.length > 0) {

                    return res.json(display).status(200);
                } else {

                    return res.json(0).status(200);
                }

            } catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
        } catch (error) {
            return res.json({ errors: error }).status(500);
        }
    }
    public async retrieveAll(
        req: Request,
        res: Response,
    ): Promise<Response> {
        let display: Disciplines[] | null;
        try {
            display = await AppDataSource.getRepository(
                Disciplines,
            ).createQueryBuilder("disc")
                .getMany();

            if (display.length > 0) {

                return res.json(display).status(200);
            } else {

                return res.json(0).status(200);
            }

        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }

    public async retrieveById(
        req: Request,
        res: Response,
    ): Promise<Response> {
        let disc: Disciplines | null;
        try {
            disc = await AppDataSource.getRepository(
                Disciplines,
            ).createQueryBuilder("disc")
                .where("disc.id=:id", { id: req.body.id }).getOne();
            return res.json(disc).status(400);
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }
    public async updateDisciplines(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const newDisciplines = new Disciplines();

        if (req.body.title != null) {
            newDisciplines.title = req.body.title;
        }
        if (req.body.semester != null) {
            newDisciplines.semester = req.body.semester;
        }
        if (req.body.stream != null) {
            newDisciplines.stream = req.body.stream;
        }
        if (req.body.isImportant != null) {
            newDisciplines.isImportant = req.body.isImportant;
        }
        if (req.body.withs != null) {
            newDisciplines.withs = req.body.withs;
        }
        if (req.body.topic != null) {
            newDisciplines.topic = req.body.topic;
        }
        if (req.body.color != null) {
            newDisciplines.color = req.body.color;
        }
        if (req.body.start != null) {
            newDisciplines.start = req.body.start;
        }
        if (req.body.end != null) {
            newDisciplines.end = req.body.end;
        }
        if (req.body.description != null) {
            newDisciplines.description = req.body.description;
        }
        if (req.body.location != null) {
            newDisciplines.location = req.body.location;
        }
        try {
            let createdDisciplines: UpdateResult;
            createdDisciplines = await AppDataSource.getRepository(
                Disciplines,
            ).createQueryBuilder().update(Disciplines).set(
                {
                    title: newDisciplines.title,
                    semester: newDisciplines.semester,
                    stream: newDisciplines.stream,
                    isImportant: newDisciplines.isImportant,
                    withs: newDisciplines.withs,
                    topic: newDisciplines.topic,
                    color: newDisciplines.color,
                    start: newDisciplines.start,
                    end: newDisciplines.end,
                    description: newDisciplines.description,
                    location: newDisciplines.location
                }).where("id=:id", { id: req.body.id }).execute();
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Коригиране на събитие" }).execute();
            // return res.json("Added").status(200);
            let display: Disciplines[] | null;
            try {
                display = await AppDataSource.getRepository(
                    Disciplines,
                ).createQueryBuilder("disc")
                    .getMany();

                if (display.length > 0) {

                    return res.json(display).status(200);
                } else {

                    return res.json(0).status(200);
                }

            } catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
        } catch (error) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }
    public async deleteDisciplines(
        req: Request,
        res: Response,
    ): Promise<Response> {
        try {
            const update = await AppDataSource.getRepository(Disciplines).createQueryBuilder('disc').delete().from(Disciplines).where("id=:id", { id: req.body.id }).execute()
            console.log('here', update);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Триене на събитие" }).execute();
            let display: Disciplines[] | null;
            try {
                display = await AppDataSource.getRepository(
                    Disciplines,
                ).createQueryBuilder("disc")
                    .getMany();

                if (display.length > 0) {

                    return res.json(display).status(200);
                } else {

                    return res.json(0).status(200);
                }

            } catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
        } catch (error) {
            return res.json({ errors: error }).status(200)
        }
    }
    public async filterDisciplines(
        req: Request,
        res: Response,
    ): Promise<Response> {
        let filter = new Disciplines();
        if (req.body.title != null) {
            filter.title = req.body.title;
        }
        if (req.body.topic != null) {
            filter.topic = req.body.topic
        }
        if (req.body.color != null) {
            filter.color = req.body.color
        }
        if (req.body.semester != null) {
            filter.semester = req.body.semester
        }
        if (req.body.stream != null) {
            filter.stream = req.body.stream
        }
        try {
            let display: Disciplines[] | null;
            display = await AppDataSource.getRepository(Disciplines).createQueryBuilder('disc')
                .where('(:titles is null OR disc.title=:titles) and (:topics is null OR disc.topic=:topics) and (:colors is null OR  disc.color=:colors) and (:semesters is null OR disc.semester=:semesters) and (:streams is null OR disc.stream=:streams)',
                    { titles: filter.title, topics: filter.topic, colors: filter.color, semesters: filter.semester, streams: filter.stream }).getMany();
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Търсене на събитие" }).execute();
            if (display.length > 0) {
                console.log('if', display);
                return res.json(display).status(200);
            } else {

                return res.json(0).status(200);
            }
        } catch (error) {
            return res.json({ errors: error }).status(500);
        }
    }
}
export const editDisciplinesController = new EditDisciplinesController();