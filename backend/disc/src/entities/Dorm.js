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
exports.Dorm = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Dorm = class Dorm {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Dorm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], Dorm.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null
    }),
    __metadata("design:type", Number)
], Dorm.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: null
    }),
    __metadata("design:type", String)
], Dorm.prototype, "building", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: null
    }),
    __metadata("design:type", String)
], Dorm.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: null
    }),
    __metadata("design:type", String)
], Dorm.prototype, "isDorm", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null,
    }),
    __metadata("design:type", Number)
], Dorm.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.dorm),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Dorm.prototype, "user", void 0);
Dorm = __decorate([
    (0, typeorm_1.Entity)()
], Dorm);
exports.Dorm = Dorm;
