import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from "typeorm";


@Entity()
export class Disciplines {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        type: 'varchar',
        length: 144,
        default:null
    })
    public title: string;

    @Column({
        type: 'varchar',
        length: 144,
        default:null
    })
    public withs: string;

    @Column({
        type: 'varchar',
        length: 144,
        default:null
    })
    public topic: string;
    
    @Column({
        type: 'varchar',
        length: 50,
        default:null
    })
    public semester: string;

    @Column({
        type: 'varchar',
        length: 50,
        default:null
    })
    public stream: string;

    @Column({
        type: 'boolean',
        default:false
    })
    public isImportant: boolean;

    @Column({
        type: 'varchar',
        length: 144,
        default:null
    })
    public color: string;

    @Column({
        type: 'varchar',
        length: 225,
        default:null
    })
    public start: string;

    @Column({
        type: 'varchar',
        length: 225,
        default:null
    })
    public end: string;

    @Column({
        type: 'varchar',
        length: 255,
        default:null
    })
    public description: string;

    @Column({
        type: 'varchar',
        length: 50,
        default:null
    })
    public location: string;
}