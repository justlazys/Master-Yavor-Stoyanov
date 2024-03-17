export class LogModel {
    constructor(
        public id?: number,
        public date?: Date,
        public user?:string,
        public ip?: string,
        public step?: string,
    ){

    }
}