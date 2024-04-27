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
const seller_1 = require("../Models/seller");
const searchFeatures_1 = require("../Utils/searchFeatures");
const utils_1 = require("../Utils/utils");
class productController {
    static getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const perPage = 12;
                const currentPage = parseInt(req.query.page) || 1;
                const searchFeatures = new searchFeatures_1.default(product_1.default.find(), req.query);
                searchFeatures
                    .search()
                    .filter()
                    .pagination(perPage);
                const results = yield searchFeatures.query.exec();
                const populateOptions = [
                    { path: 'category', select: 'name description _id' },
                    { path: 'seller', select: 'store' },
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
                }).populate({
                    path: 'productReviews',
                    populate: {
                        path: 'user',
                    }
                }).
                    populate({
                    path: 'relatedProducts',
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
            const seller = req.seller;
            try {
                const nProduct = Object.assign(Object.assign({}, req.body), { seller: seller === null || seller === void 0 ? void 0 : seller._id, specialOfferEndTime: utils_1.Utils.calculateEndTime(req.body.specialOfferEndTime) });
                const product = new product_1.default(nProduct);
                const updatedSeller = yield seller_1.default.findByIdAndUpdate(seller === null || seller === void 0 ? void 0 : seller._id, { $push: { products: product._id } }, { new: true });
                yield Promise.all([product.save(), updatedSeller.save()]);
                res.status(201).json(product);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = Object.assign(Object.assign({}, req.body), { specialOfferEndTime: utils_1.Utils.calculateEndTime(req.body.specialOfferEndTime) });
                const product = yield product_1.default.findByIdAndUpdate(req.params.id, update, { new: true });
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
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_1.default.findById(req.params.id);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                // await product.remove();
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
                const product = yield product_1.default.find({ category: req.params.categoryId }).select('pincodes');
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
    static check_pincode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pid, pincode } = req.params;
            try {
                const product = yield product_1.default.findById(pid);
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }
                const isValid = product.pincodes.some(pc => pc === parseInt(pincode));
                if (!isValid) {
                    return res.json({ isValid, message: 'Invalid pin code' });
                }
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + 7);
                res.json({ isValid, message: utils_1.Utils.formatDate(deliveryDate) });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.productController = productController;
