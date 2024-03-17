export class SportModel {
    constructor(
        public id?: number,
        public teacherName?: string,
        public typeSport?: string,
        public hoursSport?: number,
        public date?: Date,
        public userId?:number,
        public userEmail?:string
    ){

    }
}