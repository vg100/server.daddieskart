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
exports.sellerController = void 0;
const jwt = require("jsonwebtoken");
const seller_1 = require("../Models/seller");
const twilioServices_1 = require("../Utils/twilioServices");
const utils_1 = require("../Utils/utils");
class sellerController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield seller_1.default.findOne({ mobile: req.body.mobile });
                const verificationToken = utils_1.Utils.generateVerificationToken();
                if (existingUser) {
                    yield twilioServices_1.default.sendSMS({
                        to: existingUser.mobile,
                        body: verificationToken
                    });
                    res.status(201).json({ status: true });
                    return;
                }
                const newUser = new seller_1.default(Object.assign(Object.assign({}, req.body), { verification_token: verificationToken }));
                yield newUser.save();
                res.status(201).json({ status: true });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                const token = jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
                res.json({ token });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllSellers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield seller_1.default.find();
                res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.sellerController = sellerController;
