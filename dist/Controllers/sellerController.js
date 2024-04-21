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
class sellerController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new seller_1.default(Object.assign({}, req.body));
                const seller = yield newUser.save();
                yield twilioServices_1.default.sendSMS({
                    to: req.body.mobile,
                    body: "Welcome to daddiesKart ◡̈ "
                });
                res.status(201).json({ status: true, seller });
                // const verificationToken = Utils.generateVerificationToken();
                // if (existingUser) {
                //     await twilioServices.sendSMS({
                //         to: existingUser.mobile,
                //         body: verificationToken
                //     })
                //     res.status(201).json({ status: true });
                //     return
                // }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = req.seller;
            try {
                const token = jwt.sign({ _id: seller._id, role: seller.role }, "secret", { expiresIn: '7d' });
                res.json({ token, seller });
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
    static upadteSellerProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield seller_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteSeller(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = req.seller;
            try {
                yield seller_1.default.findByIdAndDelete(seller === null || seller === void 0 ? void 0 : seller._id);
                res.json({
                    msg: "deleted sucessfully"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.sellerController = sellerController;
