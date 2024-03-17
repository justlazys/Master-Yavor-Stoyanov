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
exports.Files = void 0;
const typeorm_1 = require("typeorm");
const Disciplines_1 = require("./Disciplines");
let Files = class Files {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Files.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: null
    }),
    __metadata("design:type", String)
], Files.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: null
    }),
    __metadata("design:type", String)
], Files.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: null,
    }),
    __metadata("design:type", Number)
], Files.prototype, "discId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Disciplines_1.Disciplines, (disc) => disc.files),
    (0, typeorm_1.JoinColumn)({ name: "discId" }),
    __metadata("design:type", Disciplines_1.Disciplines)
], Files.prototype, "disc", void 0);
Files = __decorate([
    (0, typeorm_1.Entity)()
], Files);
exports.Files = Files;
