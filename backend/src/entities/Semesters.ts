import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
@Entity()
export class Semesters {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "varchar",
        length: 40,
        default: null
        

    })
    public semester: string;

    @Column({
        type: "varchar",
        length: 40,
        default: null

    })
    public course: string;

    @Column({
        type: 'int',
        default: null,

    })
    userId: number;

    @ManyToOne(() => User, (user) => user.semesters)
    @JoinColumn({ name: "userId" })
    public user: User;


}