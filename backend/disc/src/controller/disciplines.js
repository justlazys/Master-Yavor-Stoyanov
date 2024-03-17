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
exports.editDisciplinesController = void 0;
const Disciplines_1 = require("../entities/Disciplines");
const index_1 = require("../../index");
const class_transformer_1 = require("class-transformer");
const User_1 = require("./../entities/User");
const nodemailer_1 = __importDefault(require("nodemailer"));
const Logs_1 = require("../entities/Logs");
class EditDisciplinesController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDisciplines = new Disciplines_1.Disciplines();
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
                let createdDisciplines;
                createdDisciplines = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).save(newDisciplines);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Добавяне на събитие" }).execute();
                if (newDisciplines.isImportant) {
                    let users;
                    users = yield index_1.AppDataSource.getRepository(User_1.User)
                        .createQueryBuilder("user").where("user.stream=:stream", { stream: newDisciplines.stream }).getMany();
                    users = (0, class_transformer_1.instanceToPlain)(users);
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
                    for (let i of users) {
                        transporter.sendMail({
                            from: "Register Form <yavorstoyanov98@abv.bg>",
                            to: `${i.email}`,
                            subject: `Мероприятие ${newDisciplines.title} на ${newDisciplines.start}`,
                            text: `${newDisciplines.description}`
                        });
                    }
                }
                let display;
                try {
                    display = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder("disc")
                        .getMany();
                    if (display.length > 0) {
                        return res.json(display).status(200);
                    }
                    else {
                        return res.json(0).status(200);
                    }
                }
                catch (errors) {
                    return res
                        .json({ error: 'Internal Server Error' })
                        .status(500);
                }
            }
            catch (error) {
                return res.json({ errors: error }).status(500);
            }
        });
    }
    retrieveAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let display;
            try {
                display = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder("disc")
                    .getMany();
                if (display.length > 0) {
                    return res.json(display).status(200);
                }
                else {
                    return res.json(0).status(200);
                }
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
        });
    }
    retrieveById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let disc;
            try {
                disc = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder("disc")
                    .where("disc.id=:id", { id: req.body.id }).getOne();
                return res.json(disc).status(400);
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
        });
    }
    updateDisciplines(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDisciplines = new Disciplines_1.Disciplines();
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
                let createdDisciplines;
                createdDisciplines = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder().update(Disciplines_1.Disciplines).set({
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
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Коригиране на събитие" }).execute();
                // return res.json("Added").status(200);
                let display;
                try {
                    display = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder("disc")
                        .getMany();
                    if (display.length > 0) {
                        return res.json(display).status(200);
                    }
                    else {
                        return res.json(0).status(200);
                    }
                }
                catch (errors) {
                    return res
                        .json({ error: 'Internal Server Error' })
                        .status(500);
                }
            }
            catch (error) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
        });
    }
    deleteDisciplines(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder('disc').delete().from(Disciplines_1.Disciplines).where("id=:id", { id: req.body.id }).execute();
                console.log('here', update);
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Триене на събитие" }).execute();
                let display;
                try {
                    display = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder("disc")
                        .getMany();
                    if (display.length > 0) {
                        return res.json(display).status(200);
                    }
                    else {
                        return res.json(0).status(200);
                    }
                }
                catch (errors) {
                    return res
                        .json({ error: 'Internal Server Error' })
                        .status(500);
                }
            }
            catch (error) {
                return res.json({ errors: error }).status(200);
            }
        });
    }
    filterDisciplines(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = new Disciplines_1.Disciplines();
            if (req.body.title != null) {
                filter.title = req.body.title;
            }
            if (req.body.topic != null) {
                filter.topic = req.body.topic;
            }
            if (req.body.color != null) {
                filter.color = req.body.color;
            }
            if (req.body.semester != null) {
                filter.semester = req.body.semester;
            }
            if (req.body.stream != null) {
                filter.stream = req.body.stream;
            }
            try {
                let display;
                display = yield index_1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder('disc')
                    .where('(:titles is null OR disc.title=:titles) and (:topics is null OR disc.topic=:topics) and (:colors is null OR  disc.color=:colors) and (:semesters is null OR disc.semester=:semesters) and (:streams is null OR disc.stream=:streams)', { titles: filter.title, topics: filter.topic, colors: filter.color, semesters: filter.semester, streams: filter.stream }).getMany();
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Търсене на събитие" }).execute();
                if (display.length > 0) {
                    console.log('if', display);
                    return res.json(display).status(200);
                }
                else {
                    return res.json(0).status(200);
                }
            }
            catch (error) {
                return res.json({ errors: error }).status(500);
            }
        });
    }
}
exports.editDisciplinesController = new EditDisciplinesController();
