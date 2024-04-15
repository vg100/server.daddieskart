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
const searchFeatures_1 = require("../Utils/searchFeatures");
// import { topDealsProducts } from "../e-commerce/products";
class productController {
    static getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const perPage = 9;
                const currentPage = parseInt(req.query.page) || 1;
                const searchFeatures = new searchFeatures_1.default(product_1.default.find(), req.query);
                searchFeatures
                    .search()
                    .filter()
                    .pagination(perPage);
                const results = yield searchFeatures.query.exec();
                const populateOptions = [
                    { path: 'category', select: 'name description _id' },
                    { path: 'seller', select: 'store' }
                ];
                yield product_1.default.populate(results, populateOptions);
                const totalProducts = yield product_1.default.countDocuments(searchFeatures.query.getQuery());
                const totalPages = Math.ceil(totalProducts / perPage);
                const hasNextPage = currentPage < totalPages;
                res.json({
                    product: results,
                    totalPages,
                    currentPage,
                    hasNextPage
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getProductsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.findById(req.params.id)
                    .populate({
                    path: 'seller',
                    select: 'store _id'
                });
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
                const nProduct = Object.assign(Object.assign({}, req.body), { seller: "65f6ff277a771d4cca1c8acd" });
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
    static topProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.find({ category: req.params.categoryId });
                res.json({ topDealsProducts: [] });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getProductsByCategoryId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.find({ category: req.params.categoryId });
                res.json({
                    product
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static searchProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query: searchTerm } = req.query;
                if (!searchTerm) {
                    return res.status(400).json({ message: 'Search term is required' });
                }
                const products = yield product_1.default.find({
                    $or: [
                        { name: { $regex: searchTerm, $options: 'i' } },
                    ]
                });
                res.json(products);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.productController = productController;
