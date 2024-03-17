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
exports.textMassages = void 0;
const __1 = require("../..");
const Massages_1 = require("../entities/Massages");
const class_transformer_1 = require("class-transformer");
const User_1 = require("../entities/User");
const nodemailer_1 = __importDefault(require("nodemailer"));
class TextMassages {
    sendMassage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sendMail = new Massages_1.Massages();
            sendMail.date = req.body.date;
            sendMail.text = req.body.text;
            sendMail.senderId = req.body.senderId;
            sendMail.retrieverId = req.body.retrieverId;
            let message;
            try {
                message = yield __1.AppDataSource.getRepository(Massages_1.Massages).save(sendMail);
                message = (0, class_transformer_1.instanceToPlain)(message);
                let allMessages;
                let sender;
                let retreiver;
                sender = yield __1.AppDataSource.getRepository(User_1.User).createQueryBuilder('user').where('user.id=:id', { id: sendMail.senderId }).getOne();
                retreiver = yield __1.AppDataSource.getRepository(User_1.User).createQueryBuilder('user').where('user.id=:id', { id: sendMail.retrieverId }).getOne();
                sender = (0, class_transformer_1.instanceToPlain)(sender);
                retreiver = (0, class_transformer_1.instanceToPlain)(retreiver);
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
                    from: `${sender.email}`,
                    to: `${retreiver.email}`,
                    subject: "Съобщение",
                    text: `${message.text}`
                });
                allMessages = yield __1.AppDataSource.getRepository(Massages_1.Massages).createQueryBuilder("msg")
                    .where('(msg.senderId=:sender AND msg.retrieverId=:retriever) OR (msg.senderId=:retriever AND msg.retrieverId=:sender)', { sender: sendMail.senderId, retriever: sendMail.retrieverId }).getMany();
                if (allMessages.length >= 1) {
                    allMessages = (0, class_transformer_1.instanceToPlain)(allMessages);
                    return res.json(allMessages).status(200);
                }
                else {
                    return res.json("Empty").status(500);
                }
            }
            catch (error) {
                return res.json({ errors: `Error is ${error}` }).status(500);
            }
        });
    }
    retrieveAllMsg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sendMail = new Massages_1.Massages();
            sendMail.senderId = req.body.senderId;
            sendMail.retrieverId = req.body.retrieverId;
            try {
                let allMessages;
                allMessages = yield __1.AppDataSource.getRepository(Massages_1.Massages).createQueryBuilder("msg")
                    .where('(msg.senderId=:sender AND msg.retrieverId=:retriever) OR (msg.senderId=:retriever AND msg.retrieverId=:sender)', { sender: sendMail.senderId, retriever: sendMail.retrieverId }).getMany();
                if (allMessages.length >= 1) {
                    allMessages = (0, class_transformer_1.instanceToPlain)(allMessages);
                    return res.json(allMessages).status(200);
                }
                else {
                    return res.json("Empty").status(500);
                }
            }
            catch (error) {
                return res.json({ errors: `Error is ${error}` }).status(500);
            }
        });
    }
}
exports.textMassages = new TextMassages();
