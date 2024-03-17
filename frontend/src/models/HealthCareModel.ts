export class HealthCareModel {
    constructor(
        public id?: number,
        public dateDeclaration?: Date,
        public dateOrigin?:Date,
        public amount?: number,
        public type?: string,
        public userId?:number,
        public userEmail?:string
    ){

    }
}