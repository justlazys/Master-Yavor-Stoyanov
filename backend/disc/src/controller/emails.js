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
exports.emailController = void 0;
const __1 = require("../..");
const Disciplines_1 = require("../entities/Disciplines");
const User_1 = require("../entities/User");
const class_transformer_1 = require("class-transformer");
class EmailsController {
    retrieveEmails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            console.log('req', req.body.id);
            try {
                user = yield __1.AppDataSource.getRepository(User_1.User).createQueryBuilder('user').where('user.id=:id', { id: req.body.id }).getOne();
                console.log('user', user);
                user = (0, class_transformer_1.instanceToPlain)(user);
                let emails;
                emails = yield __1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder('desc').where('desc.stream=:stream', { stream: user.stream.toString() }).getMany();
                emails = (0, class_transformer_1.instanceToPlain)(emails);
                if (emails.length >= 1) {
                    return res.json(emails).status(200);
                }
                else {
                    return res.json('No emails').status(200);
                }
            }
            catch (e) {
                return res.json({ error: `Error ${e}` }).status(200);
            }
        });
    }
}
exports.emailController = new EmailsController();
