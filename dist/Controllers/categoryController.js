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
exports.categoryController = void 0;
const category_1 = require("../Models/category");
class categoryController {
    static createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = new category_1.default(req.body);
                const newCategory = yield category.save();
                res.status(201).json(newCategory);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_1.default.find();
                res.json(categories);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getCategoryById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_1.default.findById(req.params.id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                res.json(category);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static upadteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_1.default.findById(req.params.id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                Object.assign(category, req.body);
                const updatedCategory = yield category.save();
                res.json(updatedCategory);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_1.default.findById(req.params.id);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                yield category.remove();
                res.json({ message: 'Category deleted' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.categoryController = categoryController;
