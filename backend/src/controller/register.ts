import { User } from './../entities/User';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../../index';
import nodemailer from "nodemailer";
import { Logs } from './../entities/Logs';
// import { validationResult } from 'express-validator';
class RegisterController {

  public async checkLastNumber(req: Request,
    res: Response,): Promise<Response> {
    let account: User | null;
    let filter = new User();
    let number = null;
    if (req.body.faculty != null) {
      filter.faculty = req.body.faculty
    }
    if (req.body.major != null) {
      filter.major = req.body.major
    }
    try {
      account = await AppDataSource.getRepository(
        User,
      ).findOne({
        where: {
          faculty: filter.faculty,
          major: filter.major,
        },
        order: { id: 'DESC' },
      });

    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }

    if (account?.fakNumber != null) {

      number = account?.fakNumber
    } else {
      number = null
    }
    return res.json(number).status(201);
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {


    //Create a new instance of the Task
    const newAccount = new User();

    // Add the required properties to the Task object
    if (req.body.firstName != null) {
      newAccount.firstName = req.body.firstName;
    }

    if (req.body.secondName != null) {
      newAccount.secondName = req.body.secondName;
    }

    if (req.body.thirdName != null) {
      newAccount.thirdName = req.body.thirdName;
    }
    if (req.body.egn != null) {
      newAccount.egn = req.body.egn;
    }

    if (req.body.gender != null) {
      newAccount.gender = req.body.gender;
    }
    if (req.body.born != null) {
      newAccount.born = req.body.born;
    }

    if (req.body.type != null) {
      newAccount.type = req.body.type;
    }
    if (req.body.degree != null) {
      newAccount.degree = req.body.degree;
    }
    if (req.body.email != null) {
      newAccount.email = req.body.email;
    }
    if (req.body.fakNumber != null) {
      newAccount.fakNumber = req.body.fakNumber;
    }
    if (req.body.statusType != null) {
      newAccount.statusType = req.body.statusType;
    }
    if (req.body.faculty != null) {
      newAccount.faculty = req.body.faculty;
    }
    if (req.body.major != null) {
      newAccount.major = req.body.major;
    }
    if (req.body.typeAdmission != null) {
      newAccount.typeAdmission = req.body.typeAdmission;
    }
    if (req.body.formStudy != null) {
      newAccount.formStudy = req.body.formStudy;
    }
    if (req.body.group != null) {
      newAccount.group = req.body.group;
    }
    if (req.body.stream != null) {
      newAccount.stream = req.body.stream;
    }
    if (req.body.isSuccess != null) {
      newAccount.isSuccess = req.body.isSuccess;
    }
    if (req.body.from != null) {
      newAccount.from = req.body.from;
    }
    if (req.body.to != null) {
      newAccount.to = req.body.to;
    }
    if (req.body.room != null) {
      newAccount.room = req.body.room;
    }


    let account: User | null;
    let result = false;

    try {
      account = await AppDataSource.getRepository(
        User,
      ).findOne({
        where: { email: req.body.email },
      });

    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
    if (!account) {
      result = true
    } else {
      result = false
    }

    if (result) {
      // Add the new task to the database
      let createdAccount: User;

      try {
        createdAccount = await AppDataSource.getRepository(
          User,
        ).save(newAccount);

        // Convert the task instance to an object
        createdAccount = instanceToPlain(createdAccount) as User;



        const transporter = nodemailer.createTransport({
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
          
          from: "Register Form <yavorstoyanov98@abv.bg>",
          to: "masterdiploma98@outlook.com",
          subject: "Account has been created",
          text: `Име: ${createdAccount.firstName} , Презиме: ${createdAccount.secondName} , Фамилия: ${createdAccount.thirdName} , Факултетен номер: ${createdAccount.fakNumber} , Егн: ${createdAccount.egn} `


        })
        let log:any;
        log=await AppDataSource.getRepository(Logs).createQueryBuilder('log').insert().into(Logs).values({date:new Date(),user:createdAccount.email,ip:req.ip,step:"Създаване на акаунт"}).execute();
        return res.json(createdAccount).status(201);
      } catch (errors) {
        return res
          .json({ error: res })
          .status(500);
      }
    }
    return res
      .json(result)
      .status(500);
  }
}
export const registerController = new RegisterController();