import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { Gender } from '../enums/Gender'
import { Type } from '../enums/Type'
import { Degree } from '../enums/Degree'
import { StudentType } from '../enums/StudentType'
import { FacultyType } from '../enums/FacultyType'
import { MajorType } from '../enums/MajorType'
import { TypeAdmission } from '../enums/TypeAdmission'
import { FormStudy } from '../enums/FormStudy'
import { Semesters } from './Semesters'
import { Dorm } from './Dorm'
import { HealthCare } from './HealthCare'
import { Scholarship } from './Scholarship'
import { Sport } from './Sport'
import { Grade } from "./Grade";
@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({
        type: 'datetime',
        default: null
    })
    public born: Date;

    @Column({
        type: 'varchar',
        length: 100,
        default: null

    })
    public firstName: string;

    @Column({
        type: 'varchar',
        length: 100,
        default: null
    })
    public secondName: string;

    @Column({
        type: 'varchar',
        length: 100,
        default: null
    })
    public thirdName: string;

    @Column({
        type: 'int',
        default: null

    })
    public egn: number;

    @Column({
        type: 'enum',
        enum: Gender,
        default: null
    })
    public gender: Gender;

    @Column({
        type: 'enum',
        enum: Type,
        default: null
    })
    public type: Type;

    @Column({
        type: 'enum',
        enum: Degree,
        default: null
    })
    public degree: Degree;

    @Column({
        type: 'varchar',
        length: 120,
        default: null
    })
    public email: string;

    @Column({
        type: 'int',
        default: null

    })
    public fakNumber: number;

    @Column({
        type: 'varchar',
        length: 10,
        default: null
    })
    public isSuccess: String;

    @Column({
        type: 'datetime',
        default: null
    })
    public from: Date;

    @Column({
        type: 'datetime',
        default: null
    })
    public to: Date;

    @Column({
        type: 'enum',
        enum: StudentType,
        default: null
    })
    public statusType: StudentType;

    @Column({
        type: 'enum',
        enum: FacultyType,
        default: null
    })
    public faculty: FacultyType;

    @Column({
        type: 'enum',
        enum: MajorType,
        default: null
    })
    public major: MajorType;

    @Column({
        type: 'enum',
        enum: TypeAdmission,
        default: null
    })
    public typeAdmission: TypeAdmission;

    @Column({
        type: 'enum',
        enum: FormStudy,
        default: null
    })
    public formStudy: FormStudy;

    @Column({
        type: 'int',
        default: null

    })
    public group: number;

    @Column({
        type: 'int',
        default: null

    })
    public stream: number;

    @Column({
        type: 'varchar',
        length: 40,
        default: null
    })
    public room: String;

    @OneToOne(() => Semesters, (semesters) => semesters.user)
    public semesters: Semesters;

    @OneToMany(() => Dorm, (dorm) => dorm.user)
    public dorm: Dorm[];

    @OneToMany(() => HealthCare, (healthcare) => healthcare.user)
    public healthcare: HealthCare[];

    @OneToMany(() => Scholarship, (scholarship) => scholarship.user)
    public scholarship: Scholarship[];

    @OneToMany(() => Sport, (sport) => sport.user)
    public sport: Sport[];

    @OneToMany(() => Grade, (grade) => grade.user)
    public grade: Grade[];

}