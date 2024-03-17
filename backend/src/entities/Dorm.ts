import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from './User'
@Entity()
export class Dorm {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        type: 'datetime',
        default:null
    })
    public date: Date;

    @Column({
        type: 'int',
        default:null
    })
    public value: number;

    @Column({
        type: 'varchar',
        length: 50,
        default:null
    })
    public building: string;

    @Column({
        type: 'varchar',
        length: 50,
        default:null
    })
    public room: string;

    @Column({
        type: 'varchar',
        length: 50,
        default:null
    })
    public isDorm: string;

    @Column({
        type: 'int',
        default: null,

    })
    userId: number;

    @ManyToOne(() => User, (user) => user.dorm)
    @JoinColumn({ name: "userId" })
    public user: User;
}