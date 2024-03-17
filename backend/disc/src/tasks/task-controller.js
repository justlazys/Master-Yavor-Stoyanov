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
exports.TaskController = void 0;
const tasks_entity_1 = require("../new_task/tasks_entity");
const __1 = require("../..");
class TaskController {
    constructor(newRepo = __1.AppDataSource.getRepository(tasks_entity_1.newTask)) {
        this.newRepo = newRepo;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let allTask;
            try {
                allTask = yield this.newRepo.find({
                    order: {
                        date: 'ASC'
                    }
                });
                console.log("test", allTask);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.TaskController = TaskController;
