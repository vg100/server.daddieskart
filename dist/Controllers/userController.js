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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_1 = require("../Models/user");
const Jwt = require("jsonwebtoken");
const twilioServices_1 = require("../Utils/twilioServices");
const utils_1 = require("../Utils/utils");
const address_1 = require("../Models/address");
class userController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_1.default.findOne({ mobile: req.body.mobile });
                if (existingUser) {
                    if (existingUser.verified) {
                        throw new Error("User is already registered and verified");
                    }
                    else {
                        const otp = utils_1.Utils.generateVerificationToken();
                        existingUser.otp = otp;
                        existingUser.otpExpiration = Date.now() + 600000;
                        yield existingUser.save();
                        yield twilioServices_1.default.sendSMS({ phone: req.body.mobile, otp });
                        return res.status(200).json({ status: true });
                    }
                }
                const otp = utils_1.Utils.generateVerificationToken();
                const newUser = new user_1.default({
                    mobile: req.body.mobile,
                    otp,
                    otpExpiration: Date.now() + 600000,
                    role: 'buyer',
                });
                yield newUser.save();
                yield twilioServices_1.default.sendSMS({
                    phone: req.body.mobile,
                    otp,
                });
                res.status(201).json({ status: true, });
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
    static sendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const mobile = req.body.mobile;
            try {
                const otp = utils_1.Utils.generateVerificationToken();
                const user = yield user_1.default.findOneAndUpdate({ mobile }, {
                    otp,
                    otpExpiration: Date.now() + 600000
                }, { upsert: true, new: true });
                yield twilioServices_1.default.sendSMS({
                    phone: mobile,
                    otp,
                });
                res.status(200).json({ success: true, message: 'OTP sent successfully' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = req.body.otp;
            const mobile = req.body.mobile;
            try {
                const user = yield user_1.default.findOne({ mobile, otp });
                if (!user || user.otpExpiration < Date.now()) {
                    throw new Error("Invalid OTP");
                }
                user.otp = undefined;
                user.otpExpiration = undefined;
                user.verified = true;
                yield user.save();
                const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
                res.json({ token, user });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static addAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addess = new address_1.default({ shippingInfo: req.body, user: req.buyer._id });
                const updatedUser = yield user_1.default.findByIdAndUpdate(req.buyer._id, { $push: { address: addess._id } }, { new: true });
                yield Promise.all([addess.save(), updatedUser.save()]);
                res.status(201).json({
                    message: "added sucessfully"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { _id } = _a, updateFields = __rest(_a, ["_id"]);
                const dd = yield address_1.default.findByIdAndUpdate(_id, { shippingInfo: updateFields }, { new: true, runValidators: true });
                res.status(201).json({
                    message: "updaded sucessfully"
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield address_1.default.find({ user: req.buyer._id });
                res.status(201).json(address);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.userController = userController;
