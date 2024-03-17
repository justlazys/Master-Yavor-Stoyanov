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
exports.Grade = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Grade = class Grade {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Grade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], Grade.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], Grade.prototype, "dateUser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: null
    }),
    __metadata("design:type", String)
], Grade.prototype, "disc", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null
    }),
    __metadata("design:type", Number)
], Grade.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: null
    }),
    __metadata("design:type", String)
], Grade.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 140,
        default: null
    }),
    __metadata("design:type", String)
], Grade.prototype, "fromUser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 140,
        default: null
    }),
    __metadata("design:type", String)
], Grade.prototype, "lecUser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 140,
        default: null
    }),
    __metadata("design:type", String)
], Grade.prototype, "labUser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 140,
        default: null
    }),
    __metadata("design:type", String)
], Grade.prototype, "semUser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: null
    }),
    __metadata("design:type", String)
], Grade.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null,
    }),
    __metadata("design:type", Number)
], Grade.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.grade),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Grade.prototype, "user", void 0);
Grade = __decorate([
    (0, typeorm_1.Entity)()
], Grade);
exports.Grade = Grade;
