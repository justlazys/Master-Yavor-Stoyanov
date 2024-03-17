
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
@Entity()
export class Scholarship {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "datetime",
        default: null
    })
    public date: Date;

    @Column({
        type: "int",
        default: null

    })
    public amount: number;

    @Column({
        type: "varchar",
        length: 140,
        default: null
    })
    public typeScholarship: string;

    @Column({
        type: 'int',
        default: null,

    })
    userId: number;

    @ManyToOne(() => User, (user) => user.scholarship)
    @JoinColumn({ name: "userId" })
    public user: User;

}