export class TextMessagesModel {
    constructor(
        public id?: number,
        public text?: string,
        public date?: Date,
        public senderId?: number,
        public retrieverId?:number,
    ){

    }
}