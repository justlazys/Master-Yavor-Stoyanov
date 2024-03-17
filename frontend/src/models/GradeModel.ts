export class GradeModel {
    constructor(
        public id?: number,
        public disc?: string,
        public note?: number,
        public type?: string,
        public date?: Date,
        public dateUser?: Date,
        public fromUser?: string,
        public lecUser?: string,
        public labUser?: string,
        public semUser?: string,
        public semester?: string,
        public userId?:number,
        public userEmail?:string
    ){
    }
}