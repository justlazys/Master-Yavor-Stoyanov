import { NomDisciplines } from './../entities/ListDisciplines';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../../index';
class NomController {
    public async loadDisc(req: Request,
        res: Response,): Promise<Response> {
            let nom: NomDisciplines[] | null;
            try {
                nom = await AppDataSource.getRepository(
                    NomDisciplines,
                ).createQueryBuilder("nom").getMany()
                return res.json(nom).status(201);
            } catch (errors) {
                return res
                    .json({ error: res })
                    .status(500);
            }
        }
}
export const nomController = new NomController();