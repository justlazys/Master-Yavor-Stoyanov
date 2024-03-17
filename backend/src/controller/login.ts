import { User } from './../entities/User';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../../index';
import { Logs } from '../entities/Logs';
class LoginController {
    public async loginUser(req: Request,
        res: Response,): Promise<Response> {
        let account: User | null;
        let filter = new User();
        if (req.body.egn != null) {
            filter.egn = req.body.egn
        }
        if (req.body.fakNumber != null) {
            filter.fakNumber = req.body.fakNumber
        }
        try {
            account = await AppDataSource.getRepository(
                User,
            ).createQueryBuilder("account")
                .where("account.egn=:egn", { egn: req.body.egn }).
                andWhere('account.isSuccess="Y"')
                .andWhere('account.fakNumber=:fakNumber', { fakNumber: req.body.fakNumber }).getOne()

        } catch (errors) {
            return res
                .json({ error: res })
                .status(500);
        }
        if (account) {
            let log:any;
            log=await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({date:new Date(),user:account.email,ip:req.ip,step:"Влизане в акаунт (Студент)"}).execute();
            console.log("IP : ", req.ip);
            return res.json(account).status(201);
        } else {
            return res.json("Empty").status(301);
        }

    }
    public async loginWithEmail(req: Request,
        res: Response,): Promise<Response> {
        let account: User | null;
        let filter = new User();
        if (req.body.email != null) {
            filter.email = req.body.email
        }
        try {
            account = await AppDataSource.getRepository(
                User,
            ).createQueryBuilder("account")
                .where("account.email=:email", { email: req.body.email }).
                andWhere('account.isSuccess="Y"')
                .andWhere('account.type="student"').getOne()

        } catch (errors) {
            return res
                .json({ error: res })
                .status(500);
        }
        if (account) {
            let log:any;
            log=await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({date:new Date(),user:account.email,ip:req.ip,step:"Влизане в акаунт чрез емайл (Студент)"}).execute();
            return res.json(account).status(201);
        } else {
            return res.json("Empty").status(301);
        }
    }
public async loginTeacher(req: Request,
    res: Response,): Promise < Response > {
        let account: User | null;
        let filter = new User();
        if(req.body.email != null) {
    filter.email = req.body.email
}
try {
    account = await AppDataSource.getRepository(
        User,
    ).createQueryBuilder("account")
        .where("account.email=:email", { email: req.body.email }).
        andWhere('account.isSuccess="Y"')
        .andWhere('(account.type="teacher") OR (account.type="Admin")').getOne()

} catch (errors) {
    return res
        .json({ error: res })
        .status(500);
}
if (account) {
    let log:any;
    log=await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({date:new Date(),user:account.email,ip:req.ip,step:"Влизане в акаунт (Преподавател)"}).execute();
    return res.json(account).status(201);
} else {
   
    return res.json("Empty").status(301);
}
}
}
export const loginController = new LoginController();