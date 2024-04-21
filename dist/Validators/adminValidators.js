"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidators = void 0;
const express_validator_1 = require("express-validator");
const admin_1 = require("../Models/admin");
class adminValidators {
    static login() {
        return [express_validator_1.body('mobile', 'Mobile Number is Required').isNumeric()
                .custom((mobile, { req }) => {
                return admin_1.default.findOne({ mobile: mobile }).then(customer => {
                    if (customer) {
                        req.admin = customer;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            })];
    }
}
exports.adminValidators = adminValidators;
