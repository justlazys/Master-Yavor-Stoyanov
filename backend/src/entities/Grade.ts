import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
@Entity()
export class Grade {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'datetime',
        default: null
    })
    public date: Date;

    @Column({
        type: 'datetime',
        default: null
    })
    public dateUser: Date;

    @Column({
        type: 'varchar',
        length: 255,
        default: null
    })
    public disc: string;

    @Column({
        type: 'int',
        default: null
    })
    public note: number;


    @Column({
        type: 'varchar',
        length: 255,
        default: null
    })
    public type: string;

    @Column({
        type: 'varchar',
        length: 140,
        default: null
    })
    public fromUser: string;

    @Column({
        type: 'varchar',
        length: 140,
        default: null
    })
    public lecUser: string;

    @Column({
        type: 'varchar',
        length: 140,
        default: null
    })
    public labUser: string;

    @Column({
        type: 'varchar',
        length: 140,
        default: null
    })
    public semUser: string;

    @Column({
        type: 'varchar',
        length: 50,
        default: null
    })
    public semester: string;

    @Column({
        type: 'int',
        default: null,

    })
    userId: number;

    @ManyToOne(() => User, (user) => user.grade)
    @JoinColumn({ name: "userId" })
    public user: User;
}