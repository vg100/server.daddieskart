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
exports.userValidators = void 0;
const express_validator_1 = require("express-validator");
const user_1 = require("../Models/user");
class userValidators {
    static register() {
        return [express_validator_1.body('mobile', 'Mobile Number is Required').isNumeric()
                .custom((mobile, { req }) => {
                return user_1.default.findOne({ mobile: mobile }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
        ];
    }
    static login() {
        return [express_validator_1.body('mobile', 'Mobile Number is Required').isNumeric()
                .custom((mobile, { req }) => {
                return user_1.default.findOne({ mobile: mobile }).then(customer => {
                    if (customer) {
                        req.user = customer;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            })];
    }
    static checkId() {
        return [express_validator_1.param('id').custom((id, { req }) => __awaiter(this, void 0, void 0, function* () {
                const user = yield user_1.default.findOne({ _id: id });
                if (!user) {
                    throw new Error('User does not exist');
                }
                req.user = user;
                return true;
            }))];
    }
}
exports.userValidators = userValidators;
