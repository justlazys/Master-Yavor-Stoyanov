import express,{Express} from 'express'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import cors from 'cors'
import bodyParser from 'body-parser'
import { User } from './src/entities/User'
import { router } from './src/router/routes'
import { Scholarship } from './src/entities/Scholarship'
import { HealthCare } from './src/entities/HealthCare'
import { Grade } from './src/entities/Grade'
import { Dorm } from './src/entities/Dorm'
import { Disciplines } from './src/entities/Disciplines'
import { Sport } from './src/entities/Sport'
import { Semesters } from './src/entities/Semesters'
import { NomDisciplines } from './src/entities/ListDisciplines'
import { Logs } from './src/entities/Logs'
import { Massages } from './src/entities/Massages'
const app:Express=express();
dotenv.config();

app.use(bodyParser.json())

app.use(cors());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof Error && err.message === 'Converting circular structure to JSON') {
        // Handle circular reference error here
        res.status(500).json({ error: 'Circular reference error occurred' });
    } else {
        next(err);
    }
});

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities:[User,Sport,Semesters,Scholarship,HealthCare,Grade,Dorm,Disciplines,NomDisciplines,Logs,Massages],
    synchronize: true,
  });
const port=process.env.PORT;

AppDataSource.initialize().then(()=>{
    app.listen(port),
    console.log("Is it in")
}
).catch((err)=>(
    console.log(err)
))
app.use('/',router);