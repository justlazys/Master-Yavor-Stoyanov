import { Request,Response } from "express";
import { AppDataSource } from "../..";
import { Logs } from "../entities/Logs";
import { instanceToPlain } from "class-transformer";

class LogsController{

    public async retrieveLogs(req:Request,res:Response) : Promise<Response>{
        let logs:Logs[];
        try{
            logs=await AppDataSource.getRepository(Logs).createQueryBuilder('log').getMany();
            if(logs.length>=1){
                logs=instanceToPlain(logs) as Logs[]
                return res.json(logs).status(200)
            }else{
                return res.json("Logs are empty").status(200)
            }
        }catch(e){
            return res.json(e).status(550);
        }
    }
}
export const retrieveLogs=new LogsController();