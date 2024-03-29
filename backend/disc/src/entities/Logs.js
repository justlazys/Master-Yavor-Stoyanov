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
exports.Logs = void 0;
const typeorm_1 = require("typeorm");
let Logs = class Logs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Logs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: null
    }),
    __metadata("design:type", Date)
], Logs.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 140,
        default: null
    }),
    __metadata("design:type", String)
], Logs.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 80,
        default: null
    }),
    __metadata("design:type", String)
], Logs.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 120,
        default: null
    }),
    __metadata("design:type", String)
], Logs.prototype, "step", void 0);
Logs = __decorate([
    (0, typeorm_1.Entity)()
], Logs);
exports.Logs = Logs;
