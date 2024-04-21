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
exports.adminController = void 0;
const jwt = require("jsonwebtoken");
const admin_1 = require("../Models/admin");
class adminController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = req.admin;
            try {
                const token = jwt.sign({ _id: admin._id, role: admin.role }, "secret", { expiresIn: '7d' });
                res.json({ token, admin });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield admin_1.default.find();
                res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new admin_1.default({
                    mobile: req.body.mobile,
                    role: 'admin',
                });
                yield newUser.save();
                res.status(201).json({ status: true, newUser });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.adminController = adminController;
