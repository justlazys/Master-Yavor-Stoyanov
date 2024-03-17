"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const User_1 = require("./src/entities/User");
const routes_1 = require("./src/router/routes");
const Scholarship_1 = require("./src/entities/Scholarship");
const HealthCare_1 = require("./src/entities/HealthCare");
const Grade_1 = require("./src/entities/Grade");
const Dorm_1 = require("./src/entities/Dorm");
const Disciplines_1 = require("./src/entities/Disciplines");
const Sport_1 = require("./src/entities/Sport");
const Semesters_1 = require("./src/entities/Semesters");
const ListDisciplines_1 = require("./src/entities/ListDisciplines");
const Logs_1 = require("./src/entities/Logs");
const Massages_1 = require("./src/entities/Massages");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((err, req, res, next) => {
    if (err instanceof Error && err.message === 'Converting circular structure to JSON') {
        // Handle circular reference error here
        res.status(500).json({ error: 'Circular reference error occurred' });
    }
    else {
        next(err);
    }
});
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [User_1.User, Sport_1.Sport, Semesters_1.Semesters, Scholarship_1.Scholarship, HealthCare_1.HealthCare, Grade_1.Grade, Dorm_1.Dorm, Disciplines_1.Disciplines, ListDisciplines_1.NomDisciplines, Logs_1.Logs, Massages_1.Massages],
    synchronize: true,
});
const port = process.env.PORT;
exports.AppDataSource.initialize().then(() => {
    app.listen(port),
        console.log("Is it in");
}).catch((err) => (console.log(err)));
app.use('/', routes_1.router);
