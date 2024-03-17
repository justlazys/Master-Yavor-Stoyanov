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
exports.HealthCare = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let HealthCare = class HealthCare {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], HealthCare.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], HealthCare.prototype, "dateDeclaration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], HealthCare.prototype, "dateOrigin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: null
    }),
    __metadata("design:type", Number)
], HealthCare.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 80,
        default: null
    }),
    __metadata("design:type", String)
], HealthCare.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null,
    }),
    __metadata("design:type", Number)
], HealthCare.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.healthcare),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_1.User)
], HealthCare.prototype, "user", void 0);
HealthCare = __decorate([
    (0, typeorm_1.Entity)()
], HealthCare);
exports.HealthCare = HealthCare;
