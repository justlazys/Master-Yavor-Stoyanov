"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserController = void 0;
const User_1 = require("./../entities/User");
const class_transformer_1 = require("class-transformer");
const index_1 = require("../../index");
const nodemailer_1 = __importDefault(require("nodemailer"));
const HealthCare_1 = require("../entities/HealthCare");
const Sport_1 = require("../entities/Sport");
const Scholarship_1 = require("../entities/Scholarship");
const Dorm_1 = require("../entities/Dorm");
const Grade_1 = require("../entities/Grade");
const Logs_1 = require("../entities/Logs");
const Semesters_1 = require("../entities/Semesters");
// import { validationResult } from 'express-validator';
class EditUserController {
    retrieveProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.fakNumber != null) {
                filter.fakNumber = req.body.fakNumber;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("user").where("user.type='student'")
                    .andWhere(":fakNumber is null OR user.fakNumber=:fakNumber", { fakNumber: filter.fakNumber })
                    .getMany();
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Търсене на студент" }).execute();
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
            if (account.length > 0) {
                return res.json(account).status(200);
            }
            else {
                return res.json(0).status(200);
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task;
            try {
                task = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("user")
                    .where("user.id=:id", { id: req.body.id }).getOne();
            }
            catch (errors) {
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
            let updatedTask;
            try {
                task = (0, class_transformer_1.instanceToPlain)(task);
                if (task.isSuccess == null) {
                    if (req.body.isSuccess != undefined) {
                        const transporter = nodemailer_1.default.createTransport({
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
                        });
                    }
                }
                let edit = new User_1.User();
                if (req.body.isSuccess != undefined) {
                    edit.isSuccess = req.body.isSuccess;
                }
                if (req.body.group != undefined) {
                    edit.group = req.body.group;
                }
                if (req.body.stream != undefined) {
                    edit.stream = req.body.stream;
                }
                if (req.body.from != undefined) {
                    edit.from = req.body.from;
                }
                if (req.body.to != undefined) {
                    edit.to = req.body.to;
                }
                updatedTask = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder().update(User_1.User).set({ isSuccess: edit.isSuccess, group: edit.group, stream: edit.stream, from: edit.from, to: edit.to, healthcare: edit.healthcare }).where("id=:id", { id: req.body.id }).execute();
                console.log('req.body.semesters.course', req.body.semesters.course);
                if (req.body.semesters.course != null || req.body.semesters.semester != null) {
                    let find;
                    find = yield index_1.AppDataSource.getRepository(Semesters_1.Semesters).createQueryBuilder('semester').where('semester.userId=:id', { id: req.body.id }).getOne();
                    if (find != null) {
                        updatedTask = yield index_1.AppDataSource.getRepository(Semesters_1.Semesters).createQueryBuilder().update(Semesters_1.Semesters).set({ course: req.body.semesters.course, semester: req.body.semesters.semester, userId: req.body.id }).where("userId=:id", { id: req.body.id }).execute();
                    }
                    else {
                        let semester = new Semesters_1.Semesters();
                        semester.course = req.body.semesters.course;
                        semester.semester = req.body.semesters.semester;
                        semester.userId = req.body.id;
                        let updateTask;
                        updateTask = yield index_1.AppDataSource.getRepository(Semesters_1.Semesters).save(semester);
                    }
                }
                updatedTask = (0, class_transformer_1.instanceToPlain)(updatedTask);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Коригиране  на информация студент" }).execute();
                return res.json(updatedTask).status(200);
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
        });
    }
    updateHealthCare(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = new HealthCare_1.HealthCare();
            task.amount = req.body.amount;
            task.type = req.body.type;
            task.dateDeclaration = req.body.dateDeclaration;
            task.dateOrigin = req.body.dateOrigin;
            task.userId = req.body.userId;
            let createdTask;
            console.log("task", task);
            try {
                createdTask = yield index_1.AppDataSource.getRepository(HealthCare_1.HealthCare).save(task);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на здравни осигуровки  на  студент" }).execute();
                // Convert the task instance to an object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.json(createdTask).status(201);
            }
            catch (errors) {
                return res
                    .json({ error: errors })
                    .status(500);
            }
        });
    }
    removeHealthCare(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('id', req.body.userId);
                console.log('ids', req.body.id);
                const update = yield index_1.AppDataSource.getRepository(HealthCare_1.HealthCare).createQueryBuilder('health').delete().from(HealthCare_1.HealthCare).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute();
                console.log('here', update);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на здравни осигуровки  на  студент" }).execute();
                return res.json("Deleted").status(200);
            }
            catch (error) {
                return res.json(error).status(400);
            }
        });
    }
    updateSport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = new Sport_1.Sport();
            task.teacherName = req.body.teacherName;
            task.typeSport = req.body.typeSport;
            task.hoursSport = req.body.hoursSport;
            task.date = req.body.date;
            task.userId = req.body.userId;
            let createdTask;
            console.log("task", task);
            try {
                createdTask = yield index_1.AppDataSource.getRepository(Sport_1.Sport).save(task);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на спорт на студент" }).execute();
                // Convert the task instance to an object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.json(createdTask).status(201);
            }
            catch (errors) {
                return res
                    .json({ error: errors })
                    .status(500);
            }
        });
    }
    removeSport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('id', req.body.userId);
                console.log('ids', req.body.id);
                const update = yield index_1.AppDataSource.getRepository(Sport_1.Sport).createQueryBuilder('sport').delete().from(Sport_1.Sport).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute();
                console.log('here', update);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на спорт на студент" }).execute();
                return res.json("Deleted").status(200);
            }
            catch (error) {
                return res.json(error).status(400);
            }
        });
    }
    updateScholarship(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = new Scholarship_1.Scholarship();
            task.date = req.body.date;
            task.amount = req.body.amount;
            task.typeScholarship = req.body.typeScholarship;
            task.userId = req.body.userId;
            let createdTask;
            console.log("task", task);
            try {
                createdTask = yield index_1.AppDataSource.getRepository(Scholarship_1.Scholarship).save(task);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на стипендия на студент" }).execute();
                // Convert the task instance to an object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.json(createdTask).status(201);
            }
            catch (errors) {
                return res
                    .json({ error: errors })
                    .status(500);
            }
        });
    }
    removeScholarship(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('id', req.body.userId);
                console.log('ids', req.body.id);
                const update = yield index_1.AppDataSource.getRepository(Scholarship_1.Scholarship).createQueryBuilder('sport').delete().from(Scholarship_1.Scholarship).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute();
                console.log('here', update);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на стипендия на студент" }).execute();
                return res.json("Deleted").status(200);
            }
            catch (error) {
                return res.json(error).status(400);
            }
        });
    }
    updateDorm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = new Dorm_1.Dorm();
            task.date = req.body.date;
            task.building = req.body.building;
            task.room = req.body.room;
            task.value = req.body.value;
            task.isDorm = req.body.isDorm;
            task.room = req.body.room;
            task.userId = req.body.userId;
            let createdTask;
            console.log("task", task);
            try {
                createdTask = yield index_1.AppDataSource.getRepository(Dorm_1.Dorm).save(task);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на общежития на студент" }).execute();
                // Convert the task instance to an object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.json(createdTask).status(201);
            }
            catch (errors) {
                return res
                    .json({ error: errors })
                    .status(500);
            }
        });
    }
    removeDorm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('id', req.body.userId);
                console.log('ids', req.body.id);
                const update = yield index_1.AppDataSource.getRepository(Dorm_1.Dorm).createQueryBuilder('sport').delete().from(Dorm_1.Dorm).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute();
                console.log('here', update);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на общежития на студент" }).execute();
                return res.json("Deleted").status(200);
            }
            catch (error) {
                return res.json(error).status(400);
            }
        });
    }
    updateGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = new Grade_1.Grade();
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
            let createdTask;
            console.log("task", task);
            try {
                createdTask = yield index_1.AppDataSource.getRepository(Grade_1.Grade).save(task);
                // Convert the task instance to an object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на оценка на студент" }).execute();
                return res.json(createdTask).status(201);
            }
            catch (errors) {
                return res
                    .json({ error: errors })
                    .status(500);
            }
        });
    }
    removeGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('id', req.body.userId);
                console.log('ids', req.body.id);
                const update = yield index_1.AppDataSource.getRepository(Grade_1.Grade).createQueryBuilder('grade').delete().from(Grade_1.Grade).where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).execute();
                console.log('here', update);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Изтриване на оценка на студент" }).execute();
                return res.json("Deleted").status(200);
            }
            catch (error) {
                return res.json(error).status(400);
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('id', req.body.userId);
                console.log('ids', req.body.id);
                let editDisc;
                editDisc = yield index_1.AppDataSource.getRepository(Grade_1.Grade).createQueryBuilder('grade').where("userId=:id", { id: req.body.userId }).andWhere("id=:ids", { ids: req.body.id }).getOne();
                console.log('here', editDisc);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Коригиране на оценка на студент" }).execute();
                editDisc = (0, class_transformer_1.instanceToPlain)(editDisc);
                return res.json(editDisc).status(200);
            }
            catch (error) {
                return res.json(error).status(400);
            }
        });
    }
    retrieveTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.firstName != null) {
                filter.firstName = req.body.firstName;
            }
            if (req.body.secondName != null) {
                filter.secondName = req.body.secondName;
            }
            if (req.body.thirdName != null) {
                filter.thirdName = req.body.thirdName;
            }
            if (req.body.degree != null) {
                filter.degree = req.body.degree;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("user").where("user.type='teacher'")
                    .andWhere(":firstName is null OR user.firstName=:firstName", { firstName: filter.firstName })
                    .andWhere(":secondName is null OR user.secondName=:secondName", { secondName: filter.secondName })
                    .andWhere(":thirdName is null OR user.thirdName=:thirdName", { thirdName: filter.thirdName })
                    .andWhere(":degree is null OR user.degree=:degree", { degree: filter.degree })
                    .getMany();
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
            if (account.length > 0) {
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Търсене на преподавател" }).execute();
                return res.json(account).status(200);
            }
            else {
                return res.json(0).status(200);
            }
        });
    }
    getTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.id != null) {
                filter.id = req.body.id;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("user")
                    .where("user.id=:id", { id: filter.id }).getOne();
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error', errors })
                    .status(500);
            }
            if (account) {
                account = (0, class_transformer_1.instanceToPlain)(account);
                return res.json(account).status(201);
            }
            else {
                return res.json(0).status(201);
            }
        });
    }
    updateTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let task;
            try {
                task = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("user")
                    .where("user.id=:id", { id: req.body.id }).getOne();
            }
            catch (errors) {
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
            let updatedTask;
            try {
                task = (0, class_transformer_1.instanceToPlain)(task);
                if (task.isSuccess == null) {
                    if (req.body.isSuccess != undefined) {
                        const transporter = nodemailer_1.default.createTransport({
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
                        });
                    }
                }
                let edit = new User_1.User();
                if (req.body.isSuccess != undefined) {
                    edit.isSuccess = req.body.isSuccess;
                }
                if (req.body.room != null) {
                    edit.room = req.body.room;
                }
                if (req.body.email != null) {
                    edit.email = req.body.email;
                }
                console.log('room', req.body.room);
                updatedTask = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder().update(User_1.User).set({ isSuccess: edit.isSuccess, room: edit.room, email: edit.email }).where("id=:id", { id: req.body.id }).execute();
                console.log('updatedTask', updatedTask);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Коригиране  на информация преподател" }).execute();
                updatedTask = (0, class_transformer_1.instanceToPlain)(updatedTask);
                return res.json(updatedTask).status(200);
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
        });
    }
    listTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.firstName != null) {
                filter.firstName = req.body.firstName;
            }
            if (req.body.secondName != null) {
                filter.secondName = req.body.secondName;
            }
            if (req.body.thirdName != null) {
                filter.thirdName = req.body.thirdName;
            }
            if (req.body.degree != null) {
                filter.degree = req.body.degree;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("user").where("user.type='teacher' and user.isSuccess='Y'")
                    .andWhere(":firstName is null OR user.firstName=:firstName", { firstName: filter.firstName })
                    .andWhere(":secondName is null OR user.secondName=:secondName", { secondName: filter.secondName })
                    .andWhere(":thirdName is null OR user.thirdName=:thirdName", { thirdName: filter.thirdName })
                    .andWhere(":degree is null OR user.degree=:degree", { degree: filter.degree })
                    .getMany();
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
            if (account.length > 0) {
                return res.json(account).status(200);
            }
            else {
                return res.json(0).status(200);
            }
        });
    }
}
exports.editUserController = new EditUserController();
