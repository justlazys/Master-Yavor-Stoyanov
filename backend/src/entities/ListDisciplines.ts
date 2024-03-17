import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NomDisciplines{

@PrimaryGeneratedColumn('increment')
id:number

@Column({
    type:'varchar',
    length:20,
    default:null
})
mainCode:string;

@Column({
    type:'varchar',
    length:20,
    default:null
})
code:string;

@Column({
    type:"varchar",
    length:255,
    default:null
})
name:string
}