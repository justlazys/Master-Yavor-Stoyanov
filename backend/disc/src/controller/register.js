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
exports.registerController = void 0;
const User_1 = require("./../entities/User");
const class_transformer_1 = require("class-transformer");
const index_1 = require("../../index");
const nodemailer_1 = __importDefault(require("nodemailer"));
const Logs_1 = require("./../entities/Logs");
// import { validationResult } from 'express-validator';
class RegisterController {
    checkLastNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            let number = null;
            if (req.body.faculty != null) {
                filter.faculty = req.body.faculty;
            }
            if (req.body.major != null) {
                filter.major = req.body.major;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).findOne({
                    where: {
                        faculty: filter.faculty,
                        major: filter.major,
                    },
                    order: { id: 'DESC' },
                });
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
            if ((account === null || account === void 0 ? void 0 : account.fakNumber) != null) {
                number = account === null || account === void 0 ? void 0 : account.fakNumber;
            }
            else {
                number = null;
            }
            return res.json(number).status(201);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Create a new instance of the Task
            const newAccount = new User_1.User();
            // Add the required properties to the Task object
            if (req.body.firstName != null) {
                newAccount.firstName = req.body.firstName;
            }
            if (req.body.secondName != null) {
                newAccount.secondName = req.body.secondName;
            }
            if (req.body.thirdName != null) {
                newAccount.thirdName = req.body.thirdName;
            }
            if (req.body.egn != null) {
                newAccount.egn = req.body.egn;
            }
            if (req.body.gender != null) {
                newAccount.gender = req.body.gender;
            }
            if (req.body.born != null) {
                newAccount.born = req.body.born;
            }
            if (req.body.type != null) {
                newAccount.type = req.body.type;
            }
            if (req.body.degree != null) {
                newAccount.degree = req.body.degree;
            }
            if (req.body.email != null) {
                newAccount.email = req.body.email;
            }
            if (req.body.fakNumber != null) {
                newAccount.fakNumber = req.body.fakNumber;
            }
            if (req.body.statusType != null) {
                newAccount.statusType = req.body.statusType;
            }
            if (req.body.faculty != null) {
                newAccount.faculty = req.body.faculty;
            }
            if (req.body.major != null) {
                newAccount.major = req.body.major;
            }
            if (req.body.typeAdmission != null) {
                newAccount.typeAdmission = req.body.typeAdmission;
            }
            if (req.body.formStudy != null) {
                newAccount.formStudy = req.body.formStudy;
            }
            if (req.body.group != null) {
                newAccount.group = req.body.group;
            }
            if (req.body.stream != null) {
                newAccount.stream = req.body.stream;
            }
            if (req.body.isSuccess != null) {
                newAccount.isSuccess = req.body.isSuccess;
            }
            if (req.body.from != null) {
                newAccount.from = req.body.from;
            }
            if (req.body.to != null) {
                newAccount.to = req.body.to;
            }
            if (req.body.room != null) {
                newAccount.room = req.body.room;
            }
            let account;
            let result = false;
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).findOne({
                    where: { email: req.body.email },
                });
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
            if (!account) {
                result = true;
            }
            else {
                result = false;
            }
            if (result) {
                // Add the new task to the database
                let createdAccount;
                try {
                    createdAccount = yield index_1.AppDataSource.getRepository(User_1.User).save(newAccount);
                    // Convert the task instance to an object
                    createdAccount = (0, class_transformer_1.instanceToPlain)(createdAccount);
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
                        to: "masterdiploma98@outlook.com",
                        subject: "Account has been created",
                        text: `Име: ${createdAccount.firstName} , Презиме: ${createdAccount.secondName} , Фамилия: ${createdAccount.thirdName} , Факултетен номер: ${createdAccount.fakNumber} , Егн: ${createdAccount.egn} `
                    });
                    let log;
                    log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: createdAccount.email, ip: req.ip, step: "Създаване на акаунт" }).execute();
                    return res.json(createdAccount).status(201);
                }
                catch (errors) {
                    return res
                        .json({ error: res })
                        .status(500);
                }
            }
            return res
                .json(result)
                .status(500);
        });
    }
}
exports.registerController = new RegisterController();
