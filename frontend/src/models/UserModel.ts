import { DormModel } from "./DormModel";
import { GradeModel } from "./GradeModel";
import { HealthCareModel } from "./HealthCareModel";
import { ScholarshipModel } from "./ScholarshipModel";
import { SemestersModel } from "./SemestersModel";
import { SportModel } from "./SportModel";

export class UserModel {
    constructor(
        public id?: number,
        public born: Date=new Date(),
        public firstName?: string,
        public secondName?: string,
        public thirdName?: string,
        public egn?:number,
        public gender?:string,
        public type?:string,
        public degree?:string,
        public email?:string,
        public fakNumber?:number,
        public isSuccess?:string,
        public from?:Date,
        public to?:Date,
        public statusType?:string,
        public faculty?:string,
        public major?:string,
        public typeAdmission?:string,
        public group?:number,
        public stream?:number,
        public formStudy?:string,
        public room?:string,
        public semesters?:SemestersModel,
        public dorm?:DormModel[],
        public healthcare?:HealthCareModel[],
        public scholarship?:ScholarshipModel[],
        public sport?:SportModel[],
        public grade?:GradeModel[],
        public userEmail?:string

    ) {
    }
}
