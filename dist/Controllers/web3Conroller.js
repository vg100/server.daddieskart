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
exports.usersController = exports.workersController = void 0;
const BaseModel_1 = require("../Models/BaseModel");
class WorkerController {
    constructor() {
        this.balance = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const userId = req.userId;
                // @ts-ignore
                const worker = yield this.worker.getModel().findFirst(Number(userId));
                res.json({
                    pendingAmount: worker === null || worker === void 0 ? void 0 : worker.pending_amount,
                    lockedAmount: worker === null || worker === void 0 ? void 0 : worker.pending_amount,
                });
            }
            catch (e) {
                next(e);
            }
        });
        this.nextTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const userId = req.userId;
                const task = yield this.worker.getModel().findFirst({
                    where: {
                        done: false,
                        submissions: {
                            none: {
                                worker_id: Number(userId)
                            }
                        }
                    },
                    select: {
                        id: true,
                        amount: true,
                        title: true,
                        options: true
                    }
                });
                if (!task) {
                    res.status(411).json({
                        message: "No more tasks left for you to review"
                    });
                }
                else {
                    res.json({
                        task
                    });
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.payout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const worker = yield this.worker.getModel().findFirst({
                    where: { id: Number(userId) }
                });
                if (!worker) {
                    return res.status(403).json({
                        message: "User not found"
                    });
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            try {
                const deletedUser = yield this.worker.delete(Number(id)); // Fixed to use delete method
                res.status(200).json(deletedUser); // Changed status code to 200
            }
            catch (e) {
                next(e);
            }
        });
        this.dynamicHandler = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { functionname } = req.params;
            const method = this[functionname];
            if (typeof method !== 'function') {
                return res.status(404).json({ error: `Function ${functionname} not found on WorkerController` });
            }
            try {
                yield method(req, res, next);
            }
            catch (error) {
                next(error);
            }
        });
        this.worker = new BaseModel_1.default("worker"); // Fixed typo
    }
}
class UserController {
    constructor() {
        this.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.user.find({}); // Changed to use user model
                res.status(200).json(users); // Changed status code to 200
            }
            catch (e) {
                next(e);
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.user.save(req.body); // Changed to use user model
                res.status(201).json(newUser);
            }
            catch (e) {
                next(e);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            try {
                const updatedUser = yield this.user.findByIdAndUpdate(Number(id), req.body); // Changed to use user model
                res.status(200).json(updatedUser); // Changed status code to 200
            }
            catch (e) {
                next(e);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            try {
                const deletedUser = yield this.user.delete(Number(id)); // Changed to use user model and delete method
                res.status(200).json(deletedUser); // Changed status code to 200
            }
            catch (e) {
                next(e);
            }
        });
        this.dynamicHandler = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { functionname } = req.params;
            const method = this[functionname];
            if (typeof method !== 'function') {
                return res.status(404).json({ error: `Function ${functionname} not found on UserController` });
            }
            try {
                yield method(req, res, next);
            }
            catch (error) {
                next(error);
            }
        });
        this.task = new BaseModel_1.default("task");
        this.user = new BaseModel_1.default("user");
    }
}
exports.workersController = new WorkerController();
exports.usersController = new UserController();
