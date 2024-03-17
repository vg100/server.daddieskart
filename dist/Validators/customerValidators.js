"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerValidators = void 0;
const express_validator_1 = require("express-validator");
const user_1 = require("../Models/user");
class customerValidators {
    static register() {
        return [express_validator_1.body('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return user_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('password', 'Password is Required').isAlphanumeric()
        ];
    }
    static login() {
        return [express_validator_1.query('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                return user_1.default.findOne({ email: email }).then(customer => {
                    if (customer) {
                        req.customer = customer;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), express_validator_1.query('password', 'Password is Required').isAlphanumeric()];
    }
}
exports.customerValidators = customerValidators;
