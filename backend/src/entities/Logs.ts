import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Logs {

    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column({
        type: 'datetime',
        default: null
    })
    public date: Date;

    @Column({
        type: "varchar",
        length: 140,
        default: null
    })
    public user: string;

    @Column({
        type: "varchar",
        length: 80,
        default: null
    })
    public ip: string;

    @Column({
        type: "varchar",
        length: 120,
        default: null
    })
    public step: string;
}