export class AddDisciplines {
    constructor(
        public id?: string,
        public title?: string,
        public withs?: string,
        public topic?: string,
        public color?: string,
        public start?: string,
        public end?: string,
        public description?: string,
        public location?: string,
        public semester?:string,
        public isImportant?:boolean,
        public stream?:string,
        public userEmail?:string,
    ){
        
    }
}