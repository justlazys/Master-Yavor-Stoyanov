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
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveController = void 0;
const User_1 = require("./../entities/User");
const class_transformer_1 = require("class-transformer");
const index_1 = require("../../index");
const Logs_1 = require("../entities/Logs");
// import { validationResult } from 'express-validator';
class RetrieveController {
    retrieveStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.fakNumber != null) {
                filter.fakNumber = req.body.fakNumber;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("user").where("user.type='student' AND  user.isSuccess='Y'")
                    .andWhere(":fakNumber is null OR user.fakNumber=:fakNumber", { fakNumber: filter.fakNumber })
                    .getMany();
            }
            catch (errors) {
                return res
                    .json({ error: 'Internal Server Error' })
                    .status(500);
            }
            if (account.length > 0) {
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: req.body.userEmail, ip: req.ip, step: "Търсене на студент" }).execute();
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
    getStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.id != null) {
                filter.id = req.body.id;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("user").leftJoinAndSelect("user.semesters", "semester")
                    .leftJoinAndSelect("user.dorm", "dorm")
                    .leftJoinAndSelect("user.healthcare", "healthcare")
                    .leftJoinAndSelect("user.sport", "sport")
                    .leftJoinAndSelect("user.scholarship", "scholarship")
                    .leftJoinAndSelect("user.grade", "grade")
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
}
exports.retrieveController = new RetrieveController();
