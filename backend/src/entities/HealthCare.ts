import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class HealthCare  {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        type:'datetime',
        default:null
    })
    public dateDeclaration:Date;

    @Column({
        type:'datetime',
        default:null
    })
    public dateOrigin:Date;

    @Column({
        type:"int",
        default:null
    })
    public amount:number;

    @Column({
        type:"varchar",
        length:80,
        default:null
    })
    public type:string;

    @Column({
        type:'int',
        default:null,
        
    })
    userId: number;

    @ManyToOne(() => User, (user) => user.healthcare)
    @JoinColumn({ name: "userId" })
    public user: User;
}