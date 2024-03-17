import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn } from 'typeorm'
import {User} from './User'
@Entity()
export class Sport {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 120,
        default:null
    })
    public teacherName: string;

    @Column({
        type: "varchar",
        length: 120,
        default:null
    })
    public typeSport: string;

    @Column({
        type: "int",
        default:null
       
    })
    public hoursSport: number;

    @Column({
        type: "datetime",
        default:null
    })
    public date: Date;

    @Column({
        type:'int',
        default:null,
        
    })
    userId: number;
    
    @ManyToOne(() => User, (user) => user.sport)
    @JoinColumn({ name: "userId" })
    public user: User;
}