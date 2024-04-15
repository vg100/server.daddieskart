"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerValidators = void 0;
const express_validator_1 = require("express-validator");
const seller_1 = require("../Models/seller");
class sellerValidators {
    static register() {
        return [express_validator_1.body('mobile', 'Mobile Number is Required').custom((mobile, { req }) => {
                return seller_1.default.findOne({ mobile: mobile }).then(user => {
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
        return [express_validator_1.body('mobile', 'Mobile Number is Required')
                .custom((mobile, { req }) => {
                console.log(mobile);
                return seller_1.default.findOne({ mobile: mobile }).then(customer => {
                    if (customer) {
                        req.seller = customer;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            })];
    }
}
exports.sellerValidators = sellerValidators;
