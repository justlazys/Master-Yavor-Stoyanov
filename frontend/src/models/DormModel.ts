export class DormModel {
    constructor(
        public id?: number,
        public date?: Date,
        public value?: number,
        public building?: string,
        public room?: string,
        public isDorm?: string,
        public userId?:number,
        public userEmail?:string
    ){
    }
}