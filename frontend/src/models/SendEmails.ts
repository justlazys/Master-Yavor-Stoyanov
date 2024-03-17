export class SendEmailModel {
    constructor(
        public from?: string,
        public to?: string,
        public subject?: string,
        public files?: any[],
        public filesName?: string[],
        public text?:'',
        public email?:'',
        public password?:''
    ){

    }
}