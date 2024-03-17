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
exports.retrieveLogs = void 0;
const __1 = require("../..");
const Logs_1 = require("../entities/Logs");
const class_transformer_1 = require("class-transformer");
class LogsController {
    retrieveLogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let logs;
            try {
                logs = yield __1.AppDataSource.getRepository(Logs_1.Logs).createQueryBuilder('log').getMany();
                if (logs.length >= 1) {
                    logs = (0, class_transformer_1.instanceToPlain)(logs);
                    return res.json(logs).status(200);
                }
                else {
                    return res.json("Logs are empty").status(200);
                }
            }
            catch (e) {
                return res.json(e).status(550);
            }
        });
    }
}
exports.retrieveLogs = new LogsController();
