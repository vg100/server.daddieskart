"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = void 0;
const express_validator_1 = require("express-validator");
const product_1 = require("../Models/product");
class productValidator {
    static search() {
        return [
            express_validator_1.query('search', 'Required').isEmail().custom((search, { req }) => {
                return product_1.default.find({ product_name: search }).then(product => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('product Does Not Exist');
                    }
                });
            })
        ];
    }
    static addtocart() {
        return [
            express_validator_1.body().custom(({ req }) => {
                return product_1.default.find({ _id: req.params.productID }).then(product => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('product Does Not Exist');
                    }
                });
            })
        ];
    }
}
exports.productValidator = productValidator;
