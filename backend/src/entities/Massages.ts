import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Massages {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type:"text"
    })
    text: String;

    @Column({
        type: 'datetime',
        default: null
    })
    public date: Date;    
    
    @Column({
        type: 'int',
        default: null

    })
    public senderId: number;

        
    @Column({
        type: 'int',
        default: null

    })
    public retrieverId: number;
}