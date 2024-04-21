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
exports.userController = void 0;
const user_1 = require("../Models/user");
const Jwt = require("jsonwebtoken");
const twilioServices_1 = require("../Utils/twilioServices");
const utils_1 = require("../Utils/utils");
class userController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new user_1.default({
                    mobile: req.body.mobile,
                    role: 'buyer',
                });
                yield newUser.save();
                yield twilioServices_1.default.sendSMS({
                    to: req.body.mobile,
                    body: "Welcome to daddiesKart ◡̈ "
                });
                res.status(201).json({ status: true, newUser });
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
                const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
                res.json({ token, user });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(req.user._id);
                res.json(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static upadteUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.default.findByIdAndDelete(req.params.id);
                res.json({
                    msg: "deleted sucessfully"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationToken = req.body.verification_token;
            const mobile = req.body.mobile;
            try {
                const user = yield user_1.default.findOneAndUpdate({
                    mobile: mobile,
                    verification_token: verificationToken
                }, { verified: true, updated_at: new Date() }, { new: true });
                if (user) {
                    const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
                    res.json({ token });
                }
                else {
                    throw new Error('Verification Token Is Expired.Please Request For a new One');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resendVerificationOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const mobile = req.user.mobile;
            const verificationToken = utils_1.Utils.generateVerificationToken();
            try {
                const user = yield user_1.default.findOneAndUpdate({ mobile: mobile }, {
                    verification_token: verificationToken,
                });
                if (user) {
                    yield twilioServices_1.default.sendSMS({
                        to: "+919555504027",
                        body: verificationToken
                    });
                    res.json({ success: true });
                }
                else {
                    throw new Error('User Does Not Exist');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.userController = userController;
