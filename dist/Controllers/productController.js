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
exports.productController = void 0;
const product_1 = require("../Models/product");
class productController {
    static getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.default.find();
                res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getProductsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.json(product);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nProduct = Object.assign(Object.assign({}, req.body), { seller: req.user.userId });
                const product = new product_1.default(nProduct);
                const newProduct = yield product.save();
                res.status(201).json(newProduct);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                Object.assign(product, req.body);
                const updatedProduct = yield product.save();
                res.json(updatedProduct);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                yield product.remove();
                res.json({ message: 'Product deleted' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.productController = productController;
