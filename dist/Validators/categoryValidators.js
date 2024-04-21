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
exports.categoryValidators = void 0;
const express_validator_1 = require("express-validator");
const category_1 = require("../Models/category");
class categoryValidators {
    static checkId() {
        return [express_validator_1.param('id').custom((id, { req }) => __awaiter(this, void 0, void 0, function* () {
                const category = yield category_1.default.findOne({ _id: id });
                if (!category) {
                    throw new Error('Category does not exist');
                }
                req.category = category;
                return true;
            }))];
    }
}
exports.categoryValidators = categoryValidators;
