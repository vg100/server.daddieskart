"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidators = void 0;
const express_validator_1 = require("express-validator");
const user_1 = require("../Models/user");
const product_1 = require("../Models/product");
class cartValidators {
    static addtocart() {
        return [express_validator_1.body('product_id', 'product is Required').custom((product_id, { req }) => {
                return user_1.default.findOne({ email: req.user.email }).then(customer => {
                    return product_1.default.findOne({ _id: product_id }).then(product_id => {
                        if (product_id) {
                            req.product_id = product_id;
                            req.customer = customer;
                            return true;
                        }
                        else {
                            throw new Error('product Does Not Exist');
                        }
                    });
                });
            })
        ];
    }
}
exports.cartValidators = cartValidators;
