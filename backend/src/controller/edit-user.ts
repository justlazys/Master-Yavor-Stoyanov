import { User } from './../entities/User';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../../index';
import { DataSource, UpdateResult } from 'typeorm';
import nodemailer from "nodemailer";
import { HealthCare } from '../entities/HealthCare';
import { Sport } from '../entities/Sport';
import { Scholarship } from '../entities/Scholarship';
import { Dorm } from '../entities/Dorm';
import { Grade } from '../entities/Grade';
import { Logs } from '../entities/Logs';
import { Semesters } from '../entities/Semesters';
// import { validationResult } from 'express-validator';
class EditUserController {
    public async retrieveProfile(req: Request,
        res: Response,): Promise<Response> {
        let account: User[] | null;
        let filter = new User();
        if (req.body.fakNumber != null) {
            filter.fakNumber = req.body.fakNumber
        }
        try {
            account = await AppDataSource.getRepository(
                User,
            ).createQueryBuilder("user").where("user.type='student'")
                .andWhere(":fakNumber is null OR user.fakNumber=:fakNumber",
                    { fakNumber: filter.fakNumber })
                .getMany();
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Търсене на студент" }).execute();
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
        if (account.length > 0) {

            return res.json(account).status(200);
        } else {

            return res.json(0).status(200);
        }
    }

    public async updateProfile(req: Request,
        res: Response,): Promise<Response> {
        let task: User | null;

        try {
            task = await AppDataSource.getRepository(
                User,
            ).createQueryBuilder("user")
                .where("user.id=:id", { id: req.body.id }).getOne();
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }

        // Return 400 if task is null
        if (!task) {
            return res.status(404).json({
                error: 'The task with given ID does not exist',
            });
        }

        let updatedTask: UpdateResult;

        try {

            task = instanceToPlain(
                task,
            ) as User;
            if (task.isSuccess == null) {
                if (req.body.isSuccess != undefined) {
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
                        from: "Register Form <yavorstoyanov98@abv.bg>",
                        to: `${task.email}`,
                        subject: "Account has been activated",
                        text: `Акаунта Ви е активиран`
                    })
                }
            }
            let edit = new User();

            if (req.body.isSuccess != undefined) {
                edit.isSuccess = req.body.isSuccess
            }
            if (req.body.group != undefined) {
                edit.group = req.body.group
            }
            if (req.body.stream != undefined) {
                edit.stream = req.body.stream
            }
            if (req.body.from != undefined) {
                edit.from = req.body.from
            }
            if (req.body.to != undefined) {
                edit.to = req.body.to
            }

            updatedTask = await AppDataSource.getRepository(User
            ).createQueryBuilder().update(User).set({ isSuccess: edit.isSuccess, group: edit.group, stream: edit.stream, from: edit.from, to: edit.to, healthcare: edit.healthcare }).where("id=:id", { id: req.body.id }).execute();
            
            console.log('req.body.semesters.course',req.body.semesters.course)
            if (req.body.semesters.course != null || req.body.semesters.semester!=null) {
                let find:Semesters|null;
                find =await AppDataSource.getRepository(Semesters
                    ).createQueryBuilder('semester').where('semester.userId=:id',{id:req.body.id}).getOne();
                    if(find!=null){
                        updatedTask = await AppDataSource.getRepository(Semesters
                            ).createQueryBuilder().update(Semesters).set({ course: req.body.semesters.course, semester: req.body.semesters.semester, userId: req.body.id }).where("userId=:id", { id: req.body.id }).execute();
                    }else{
                        let semester=new Semesters();
                        semester.course= req.body.semesters.course;
                        semester.semester= req.body.semesters.semester;
                        semester.userId=req.body.id;
                        let updateTask:Semesters;
                        updateTask=await AppDataSource.getRepository(Semesters).save(semester);
                    }
            }
            updatedTask = instanceToPlain(
                updatedTask,
            ) as UpdateResult;
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Коригиране  на информация студент" }).execute();
            return res.json(updatedTask).status(200);
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }

    public async updateHealthCare(req: Request,
        res: Response,): Promise<Response> {
        let task = new HealthCare();
        task.amount = req.body.amount;
        task.type = req.body.type;
        task.dateDeclaration = req.body.dateDeclaration;
        task.dateOrigin = req.body.dateOrigin
        task.userId = req.body.userId
        let createdTask: HealthCare;
        console.log("task", task)
        try {
            createdTask = await AppDataSource.getRepository(
                HealthCare,
            ).save(task);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на здравни осигуровки  на  студент" }).execute();
            // Convert the task instance to an object
            createdTask = instanceToPlain(createdTask) as HealthCare;

            return res.json(createdTask).status(201);
        } catch (errors) {
            return res
                .json({ error: errors })
                .status(500);
        }
    }

    public async removeHealthCare(req: Request,
        res: Response,): Promise<Response> {
        try {
            console.log('id', req.body.userId);
            console.log('ids', req.body.id);
            const update = await AppDataSource.getRepository(HealthCare).createQueryBuilder('health').delete().from(HealthCare).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute()
            console.log('here', update);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на здравни осигуровки  на  студент" }).execute();
            return res.json("Deleted").status(200)
        } catch (error) {
            return res.json(error).status(400);
        }

    }
    public async updateSport(req: Request,
        res: Response,): Promise<Response> {
        let task = new Sport();
        task.teacherName = req.body.teacherName;
        task.typeSport = req.body.typeSport;
        task.hoursSport = req.body.hoursSport;
        task.date = req.body.date
        task.userId = req.body.userId
        let createdTask: Sport;
        console.log("task", task)
        try {
            createdTask = await AppDataSource.getRepository(
                Sport,
            ).save(task);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на спорт на студент" }).execute();
            // Convert the task instance to an object
            createdTask = instanceToPlain(createdTask) as Sport;

            return res.json(createdTask).status(201);
        } catch (errors) {
            return res
                .json({ error: errors })
                .status(500);
        }
    }

    public async removeSport(req: Request,
        res: Response,): Promise<Response> {
        try {
            console.log('id', req.body.userId);
            console.log('ids', req.body.id);
            const update = await AppDataSource.getRepository(Sport).createQueryBuilder('sport').delete().from(Sport).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute()
            console.log('here', update);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на спорт на студент" }).execute();
            return res.json("Deleted").status(200)
        } catch (error) {
            return res.json(error).status(400);
        }

    }


    public async updateScholarship(req: Request,
        res: Response,): Promise<Response> {
        let task = new Scholarship();
        task.date = req.body.date;
        task.amount = req.body.amount;
        task.typeScholarship = req.body.typeScholarship;
        task.userId = req.body.userId
        let createdTask: Scholarship;
        console.log("task", task)
        try {
            createdTask = await AppDataSource.getRepository(
                Scholarship,
            ).save(task);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на стипендия на студент" }).execute();
            // Convert the task instance to an object
            createdTask = instanceToPlain(createdTask) as Scholarship;

            return res.json(createdTask).status(201);
        } catch (errors) {
            return res
                .json({ error: errors })
                .status(500);
        }
    }

    public async removeScholarship(req: Request,
        res: Response,): Promise<Response> {
        try {
            console.log('id', req.body.userId);
            console.log('ids', req.body.id);
            const update = await AppDataSource.getRepository(Scholarship).createQueryBuilder('sport').delete().from(Scholarship).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute()
            console.log('here', update);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на стипендия на студент" }).execute();
            return res.json("Deleted").status(200)
        } catch (error) {
            return res.json(error).status(400);
        }

    }

    public async updateDorm(req: Request,
        res: Response,): Promise<Response> {
        let task = new Dorm();
        task.date = req.body.date;
        task.building = req.body.building;
        task.room = req.body.room;
        task.value = req.body.value;
        task.isDorm = req.body.isDorm;
        task.room = req.body.room;
        task.userId = req.body.userId
        let createdTask: Dorm;
        console.log("task", task)
        try {
            createdTask = await AppDataSource.getRepository(
                Dorm,
            ).save(task);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на общежития на студент" }).execute();
            // Convert the task instance to an object
            createdTask = instanceToPlain(createdTask) as Dorm;

            return res.json(createdTask).status(201);
        } catch (errors) {
            return res
                .json({ error: errors })
                .status(500);
        }
    }

    public async removeDorm(req: Request,
        res: Response,): Promise<Response> {
        try {
            console.log('id', req.body.userId);
            console.log('ids', req.body.id);
            const update = await AppDataSource.getRepository(Dorm).createQueryBuilder('sport').delete().from(Dorm).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute()
            console.log('here', update);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на общежития на студент" }).execute();
            return res.json("Deleted").status(200)
        } catch (error) {
            return res.json(error).status(400);
        }

    }
    public async updateGrade(req: Request,
        res: Response,): Promise<Response> {
        let task = new Grade();
        task.date = req.body.date;
        task.disc = req.body.disc;
        task.dateUser = req.body.dateUser;
        task.note = req.body.note;
        task.type = req.body.type;
        task.fromUser = req.body.fromUser;
        task.lecUser = req.body.lecUser;
        task.labUser = req.body.labUser;
        task.semUser = req.body.semUser;
        task.semester = req.body.semester;
        task.userId = req.body.userId;
        if (req.body.id != null) {
            task.id = req.body.id;
        }
        let createdTask: Grade;
        console.log("task", task)
        try {
            createdTask = await AppDataSource.getRepository(
                Grade,
            ).save(task);
            // Convert the task instance to an object
            createdTask = instanceToPlain(createdTask) as Grade;
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на оценка на студент" }).execute();
            return res.json(createdTask).status(201);
        } catch (errors) {
            return res
                .json({ error: errors })
                .status(500);
        }
    }
    public async removeGrade(req: Request,
        res: Response,): Promise<Response> {
        try {
            console.log('id', req.body.userId);
            console.log('ids', req.body.id);
            const update = await AppDataSource.getRepository(Grade).createQueryBuilder('grade').delete().from(Grade).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute()
            console.log('here', update);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на оценка на студент" }).execute();
            return res.json("Deleted").status(200)
        } catch (error) {
            return res.json(error).status(400);
        }

    }

    public async editUser(req: Request,
        res: Response,): Promise<Response> {
        try {
            console.log('id', req.body.userId);
            console.log('ids', req.body.id);
            let editDisc: Grade | null;
            editDisc = await AppDataSource.getRepository(Grade).createQueryBuilder('grade').where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).getOne()
            console.log('here', editDisc);
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Коригиране на оценка на студент" }).execute();
            editDisc = instanceToPlain(editDisc) as Grade;
            return res.json(editDisc).status(200);
        } catch (error) {
            return res.json(error).status(400);
        }

    }

    public async retrieveTeacher(req: Request,
        res: Response,): Promise<Response> {
        let account: User[] | null;
        let filter = new User();
        if (req.body.firstName != null) {
            filter.firstName = req.body.firstName
        }
        if (req.body.secondName != null) {
            filter.secondName = req.body.secondName
        }
        if (req.body.thirdName != null) {
            filter.thirdName = req.body.thirdName
        }
        if (req.body.degree != null) {
            filter.degree = req.body.degree
        }
        try {
            account = await AppDataSource.getRepository(
                User,
            ).createQueryBuilder("user").where("user.type='teacher'")
                .andWhere(":firstName is null OR user.firstName=:firstName",
                    { firstName: filter.firstName })
                .andWhere(":secondName is null OR user.secondName=:secondName",
                    { secondName: filter.secondName })
                .andWhere(":thirdName is null OR user.thirdName=:thirdName",
                    { thirdName: filter.thirdName })
                .andWhere(":degree is null OR user.degree=:degree",
                    { degree: filter.degree })
                .getMany();

        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
        if (account.length > 0) {
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Търсене на преподавател" }).execute();
            return res.json(account).status(200);
        } else {

            return res.json(0).status(200);
        }
    }

    public async getTeacher(req: Request, res: Response): Promise<Response> {
        let account: User | null;
        let filter = new User();
        if (req.body.id != null) {
            filter.id = req.body.id
        }
        try {
            account = await AppDataSource.getRepository(
                User).createQueryBuilder("user")
                .where("user.id=:id", { id: filter.id }).getOne();
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error', errors })
                .status(500);
        }

        if (account) {
            account = instanceToPlain(account) as User;

            return res.json(account).status(201);
        } else {
            return res.json(0).status(201);
        }
    }
    public async updateTeacher(req: Request,
        res: Response,): Promise<Response> {
        let task: User | null;

        try {
            task = await AppDataSource.getRepository(
                User,
            ).createQueryBuilder("user")
                .where("user.id=:id", { id: req.body.id }).getOne();
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }

        // Return 400 if task is null
        if (!task) {
            return res.status(404).json({
                error: 'The task with given ID does not exist',
            });
        }

        let updatedTask: UpdateResult;

        try {

            task = instanceToPlain(
                task,
            ) as User;
            if (task.isSuccess == null) {
                if (req.body.isSuccess != undefined) {
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
                        from: "Register Form <yavorstoyanov98@abv.bg>",
                        to: `${task.email}`,
                        subject: "Account has been activated",
                        text: `Акаунта Ви е активиран`
                    })
                }
            }
            let edit = new User();

            if (req.body.isSuccess != undefined) {
                edit.isSuccess = req.body.isSuccess
            }
            if (req.body.room != null) {
                edit.room = req.body.room
            }
            if (req.body.email != null) {
                edit.email = req.body.email
            }
            console.log('room', req.body.room)
            updatedTask = await AppDataSource.getRepository(User
            ).createQueryBuilder().update(User).set({ isSuccess: edit.isSuccess, room: edit.room, email: edit.email }).where("id=:id", { id: req.body.id }).execute();
            console.log('updatedTask', updatedTask)
            let log: any;
            log = await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Коригиране  на информация преподател" }).execute();
            updatedTask = instanceToPlain(
                updatedTask,
            ) as UpdateResult;

            return res.json(updatedTask).status(200);
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }

    public async listTeacher(req: Request,
        res: Response,): Promise<Response> {
        let account: User[] | null;
        let filter = new User();
        if (req.body.firstName != null) {
            filter.firstName = req.body.firstName
        }
        if (req.body.secondName != null) {
            filter.secondName = req.body.secondName
        }
        if (req.body.thirdName != null) {
            filter.thirdName = req.body.thirdName
        }
        if (req.body.degree != null) {
            filter.degree = req.body.degree
        }
        try {
            account = await AppDataSource.getRepository(
                User,
            ).createQueryBuilder("user").where("user.type='teacher' and user.isSuccess='Y'")
                .andWhere(":firstName is null OR user.firstName=:firstName",
                    { firstName: filter.firstName })
                .andWhere(":secondName is null OR user.secondName=:secondName",
                    { secondName: filter.secondName })
                .andWhere(":thirdName is null OR user.thirdName=:thirdName",
                    { thirdName: filter.thirdName })
                .andWhere(":degree is null OR user.degree=:degree",
                    { degree: filter.degree })
                .getMany();

        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
        if (account.length > 0) {

            return res.json(account).status(200);
        } else {

            return res.json(0).status(200);
        }
    }
}




export const editUserController = new EditUserController();