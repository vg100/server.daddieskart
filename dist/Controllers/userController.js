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
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
class userController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_1.default.findOne({ email: req.body.email });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email already registered' });
                }
                // Hash the password
                const hashedPassword = yield bcrypt.hash(req.body.password, 10);
                // Create a new user
                const newUser = new user_1.default({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    role: req.body.role || 'buyer',
                    profileImage: req.body.profileImage,
                    contactInfo: req.body.contactInfo
                });
                // Save the user to the database
                yield newUser.save();
                res.status(201).json({ message: 'User registered successfully' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(400).json({ message: 'Invalid email or password' });
                }
                const passwordMatch = yield bcrypt.compare(req.body.password, user.password);
                if (!passwordMatch) {
                    return res.status(400).json({ message: 'Invalid email or password' });
                }
                const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
                res.json({ token });
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
                const user = yield user_1.default.findById(req.user._id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                Object.assign(user, req.body);
                const updatedUser = yield user.save();
                res.json(updatedUser);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.userController = userController;
