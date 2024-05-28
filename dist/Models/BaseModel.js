"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class BaseModel {
    constructor(modelName) {
        this.prisma = new client_1.PrismaClient();
        this.modelName = modelName;
    }
    getModel() {
        return this.prisma[this.modelName];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getModel().findUnique({
                where: { id },
            });
        });
    }
    find({ where, orderBy, skip, take, include }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getModel().findMany({ where, orderBy, skip, take, include });
        });
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getModel().create({ data });
        });
    }
    update(id, data, { include } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getModel().update({
                where: { id },
                data,
                include,
            });
        });
    }
    delete(id, { include } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getModel().delete({
                where: { id },
                include,
            });
        });
    }
    findByIdAndUpdate(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingItem = yield this.findById(id);
            if (existingItem) {
                return this.update(id, data);
            }
            return null;
        });
    }
    findOneAndUpdate(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingItem = yield this.findOne(filter);
            if (existingItem) {
                return this.update(existingItem.id, data);
            }
            return null;
        });
    }
    findOne({ where, include }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getModel().findUnique({ where, include });
        });
    }
    count({ where } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getModel().count({ where });
        });
    }
    aggregate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getModel().aggregate(options);
        });
    }
}
exports.default = BaseModel;
