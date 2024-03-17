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
exports.loginController = void 0;
const User_1 = require("./../entities/User");
const index_1 = require("../../index");
const Logs_1 = require("../entities/Logs");
class LoginController {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.egn != null) {
                filter.egn = req.body.egn;
            }
            if (req.body.fakNumber != null) {
                filter.fakNumber = req.body.fakNumber;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("account")
                    .where("account.egn=:egn", { egn: req.body.egn }).
                    andWhere('account.isSuccess="Y"')
                    .andWhere('account.fakNumber=:fakNumber', { fakNumber: req.body.fakNumber }).getOne();
            }
            catch (errors) {
                return res
                    .json({ error: res })
                    .status(500);
            }
            if (account) {
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: account.email, ip: req.ip, step: "Влизане в акаунт (Студент)" }).execute();
                console.log("IP : ", req.ip);
                return res.json(account).status(201);
            }
            else {
                return res.json("Empty").status(301);
            }
        });
    }
    loginWithEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.email != null) {
                filter.email = req.body.email;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("account")
                    .where("account.email=:email", { email: req.body.email }).
                    andWhere('account.isSuccess="Y"')
                    .andWhere('account.type="student"').getOne();
            }
            catch (errors) {
                return res
                    .json({ error: res })
                    .status(500);
            }
            if (account) {
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: account.email, ip: req.ip, step: "Влизане в акаунт чрез емайл (Студент)" }).execute();
                return res.json(account).status(201);
            }
            else {
                return res.json("Empty").status(301);
            }
        });
    }
    loginTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let account;
            let filter = new User_1.User();
            if (req.body.email != null) {
                filter.email = req.body.email;
            }
            try {
                account = yield index_1.AppDataSource.getRepository(User_1.User).createQueryBuilder("account")
                    .where("account.email=:email", { email: req.body.email }).
                    andWhere('account.isSuccess="Y"')
                    .andWhere('(account.type="teacher") OR (account.type="Admin")').getOne();
            }
            catch (errors) {
                return res
                    .json({ error: res })
                    .status(500);
            }
            if (account) {
                let log;
                log = yield index_1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').insert().into(Logs_1.Logs).values({ date: new Date(), user: account.email, ip: req.ip, step: "Влизане в акаунт (Преподавател)" }).execute();
                return res.json(account).status(201);
            }
            else {
                return res.json("Empty").status(301);
            }
        });
    }
}
exports.loginController = new LoginController();
