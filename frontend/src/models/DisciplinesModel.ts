export class DisciplinesModel {
    constructor(
        public id?: number,
        public name?: string,
        public teacherName?: string,
        public date?: Date,
        public exam?: number,
        public type?: string,
        public materials?: string,
        public isMandatory?: string,
        public faculty?: string,
        public major?: string,
        public group?: string,
    ){
    }
}