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
exports.sellerValidators = void 0;
const express_validator_1 = require("express-validator");
const seller_1 = require("../Models/seller");
class sellerValidators {
    static register() {
        return [
            express_validator_1.body('mobile', 'Mobile Number is Required').notEmpty().isNumeric(),
            express_validator_1.body('mobile').custom((mobile, { req }) => __awaiter(this, void 0, void 0, function* () {
                const seller = yield seller_1.default.findOne({ mobile: mobile });
                if (seller) {
                    throw new Error('Seller Already Exists');
                }
                return true;
            })),
            express_validator_1.body('email', 'Email is Required').notEmpty().isEmail(),
            express_validator_1.body('sellerType', 'sellerType is Required').notEmpty(),
            express_validator_1.body('GSTIN', 'GSTIN is Required').notEmpty(),
            express_validator_1.body('password')
                .notEmpty()
                .withMessage('Password is Required')
                .isLength({ min: 6, max: 6 })
                .withMessage('Password must be at least 6 characters'),
        ];
    }
    static login() {
        return [express_validator_1.body('mobile', 'Mobile Number is Required').notEmpty().isNumeric()
                .custom((mobile, { req }) => {
                console.log(mobile);
                return seller_1.default.findOne({ mobile: mobile }).then(customer => {
                    if (customer) {
                        req.seller = customer;
                        return true;
                    }
                    else {
                        throw new Error('Seller Does Not Exist');
                    }
                });
            }),
            express_validator_1.body('password')
                .notEmpty()
                .withMessage('Password is Required')
                .isLength({ min: 6, max: 8 })
                .withMessage('Password must be at least 6 characters'),
        ];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => __awaiter(this, void 0, void 0, function* () {
                const seller = yield seller_1.default.findOne({ _id: id });
                if (!seller) {
                    throw new Error('Seller does not exist');
                }
                req.seller = seller;
                return true;
            }))];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => __awaiter(this, void 0, void 0, function* () {
                const seller = yield seller_1.default.findOne({ _id: id });
                if (!seller) {
                    throw new Error('Seller does not exist');
                }
                req.seller = seller;
                return true;
            }))];
    }
}
exports.sellerValidators = sellerValidators;
