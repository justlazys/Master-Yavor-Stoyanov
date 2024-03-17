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
exports.massageController = void 0;
const __1 = require("../..");
const Disciplines_1 = require("../entities/Disciplines");
const User_1 = require("../entities/User");
const class_transformer_1 = require("class-transformer");
const nodemailer_1 = __importDefault(require("nodemailer"));
class MassagesController {
    retrieveMassages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            console.log('req', req.body.id);
            try {
                user = yield __1.AppDataSource.getRepository(User_1.User).createQueryBuilder('user').where('user.id=:id', { id: req.body.id }).getOne();
                console.log('user', user);
                user = (0, class_transformer_1.instanceToPlain)(user);
                let massages;
                massages = yield __1.AppDataSource.getRepository(Disciplines_1.Disciplines).createQueryBuilder('desc').where('desc.stream=:stream', { stream: user.stream.toString() }).getMany();
                massages = (0, class_transformer_1.instanceToPlain)(massages);
                if (massages.length >= 1) {
                    return res.json(massages).status(200);
                }
                else {
                    return res.json('No massages').status(200);
                }
            }
            catch (e) {
                return res.json({ error: `Error ${e}` }).status(200);
            }
        });
    }
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('test', req.body.files);
            try {
                const transporter = nodemailer_1.default.createTransport({
                    host: "smtp.abv.bg",
                    port: 465,
                    secure: true,
                    requireTLS: true,
                    auth: {
                        user: `${req.body.email}`,
                        pass: `${req.body.password}`,
                    },
                    logger: true
                });
                transporter.sendMail({
                    from: `${req.body.from}`,
                    to: `${req.body.to}`,
                    subject: `${req.body.subject}`,
                    text: `${req.body.text}`,
                    attachments: [
                        {
                            filename: `${req.body.filesName}`,
                            path: `${req.body.files}` // stream this file
                        },
                    ]
                });
                return res.json('Send Item').status(200);
            }
            catch (error) {
                return res.json({ errors: `Error ist + ${error}` }).status(500);
            }
        });
    }
}
exports.massageController = new MassagesController();
