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
    static checkId() {
        return [express_validator_1.param('id').custom((id, { req }) => __awaiter(this, void 0, void 0, function* () {
                const seller = yield product_1.default.findOne({ _id: id });
                if (!seller) {
                    throw new Error('Product does not exist');
                }
                req.seller = seller;
                return true;
            }))];
    }
}
exports.productValidator = productValidator;
