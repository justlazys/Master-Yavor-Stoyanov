export class ScholarshipModel {
    constructor(
        public id?: number,
        public date?: Date,
        public amount?: number,
        public typeScholarship?: string,
        public userId?:number,
        public userEmail?:string
    ){

    }
}