"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const task_controller_1 = require("./task-controller");
exports.router = (0, express_1.Router)();
exports.router.get('/send', (req, res) => {
    const taskcontroller = new task_controller_1.TaskController();
    taskcontroller.getAll();
    //res.send("Flick")
});
