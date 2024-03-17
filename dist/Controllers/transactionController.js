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
exports.transactionController = void 0;
const transaction_1 = require("../Models/transaction");
class transactionController {
    static createTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = new transaction_1.default(req.body);
                const newTransaction = yield transaction.save();
                res.status(201).json(newTransaction);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transaction_1.default.find();
                res.json(transactions);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getTransactionByType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionType = req.params.type;
            try {
                const transactions = yield transaction_1.default.find({ type: transactionType });
                res.json(transactions);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.transactionController = transactionController;
