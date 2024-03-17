"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Gender_1 = require("../enums/Gender");
const Type_1 = require("../enums/Type");
const Degree_1 = require("../enums/Degree");
const StudentType_1 = require("../enums/StudentType");
const FacultyType_1 = require("../enums/FacultyType");
const MajorType_1 = require("../enums/MajorType");
const TypeAdmission_1 = require("../enums/TypeAdmission");
const FormStudy_1 = require("../enums/FormStudy");
const Semesters_1 = require("./Semesters");
const Dorm_1 = require("./Dorm");
const HealthCare_1 = require("./HealthCare");
const Scholarship_1 = require("./Scholarship");
const Sport_1 = require("./Sport");
const Grade_1 = require("./Grade");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], User.prototype, "born", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "secondName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "thirdName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null
    }),
    __metadata("design:type", Number)
], User.prototype, "egn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Gender_1.Gender,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Type_1.Type,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Degree_1.Degree,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "degree", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 120,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null
    }),
    __metadata("design:type", Number)
], User.prototype, "fakNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "isSuccess", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], User.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], User.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StudentType_1.StudentType,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "statusType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: FacultyType_1.FacultyType,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "faculty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MajorType_1.MajorType,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "major", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TypeAdmission_1.TypeAdmission,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "typeAdmission", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: FormStudy_1.FormStudy,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "formStudy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null
    }),
    __metadata("design:type", Number)
], User.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null
    }),
    __metadata("design:type", Number)
], User.prototype, "stream", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 40,
        default: null
    }),
    __metadata("design:type", String)
], User.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Semesters_1.Semesters, (semesters) => semesters.user),
    __metadata("design:type", Semesters_1.Semesters)
], User.prototype, "semesters", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Dorm_1.Dorm, (dorm) => dorm.user),
    __metadata("design:type", Array)
], User.prototype, "dorm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HealthCare_1.HealthCare, (healthcare) => healthcare.user),
    __metadata("design:type", Array)
], User.prototype, "healthcare", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Scholarship_1.Scholarship, (scholarship) => scholarship.user),
    __metadata("design:type", Array)
], User.prototype, "scholarship", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sport_1.Sport, (sport) => sport.user),
    __metadata("design:type", Array)
], User.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Grade_1.Grade, (grade) => grade.user),
    __metadata("design:type", Array)
], User.prototype, "grade", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
