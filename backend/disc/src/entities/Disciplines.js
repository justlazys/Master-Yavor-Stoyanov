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
exports.Disciplines = void 0;
const typeorm_1 = require("typeorm");
let Disciplines = class Disciplines {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", String)
], Disciplines.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 144,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 144,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "withs", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 144,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "stream", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], Disciplines.prototype, "isImportant", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 144,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 225,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "start", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 225,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "end", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: null
    }),
    __metadata("design:type", String)
], Disciplines.prototype, "location", void 0);
Disciplines = __decorate([
    (0, typeorm_1.Entity)()
], Disciplines);
exports.Disciplines = Disciplines;
