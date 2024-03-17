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
exports.Sport = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Sport = class Sport {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Sport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 120,
        default: null
    }),
    __metadata("design:type", String)
], Sport.prototype, "teacherName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 120,
        default: null
    }),
    __metadata("design:type", String)
], Sport.prototype, "typeSport", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: null
    }),
    __metadata("design:type", Number)
], Sport.prototype, "hoursSport", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        default: null
    }),
    __metadata("design:type", Date)
], Sport.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null,
    }),
    __metadata("design:type", Number)
], Sport.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.sport),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Sport.prototype, "user", void 0);
Sport = __decorate([
    (0, typeorm_1.Entity)()
], Sport);
exports.Sport = Sport;
