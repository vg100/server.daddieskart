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
exports.reviewController = void 0;
const product_1 = require("../Models/product");
const review_1 = require("../Models/review");
const awsServices_1 = require("../Utils/awsServices");
class reviewController {
    static createReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                awsServices_1.default.uploadFile(req.file.path, req.file.filename, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (err) {
                        console.log(err);
                        return;
                    }
                    const review = new review_1.default(Object.assign(Object.assign({}, req.body), { user: req.buyer._id, images: [data] }));
                    const updatedProduct = yield product_1.default.findByIdAndUpdate((_a = req.body) === null || _a === void 0 ? void 0 : _a.product, { $push: { productReviews: review._id } }, { new: true });
                    yield Promise.all([review.save(), updatedProduct.save()]);
                    res.status(201).json(review);
                }));
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllReviewByProductId(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const perPage = 4;
                const currentPage = req.params.page || 1;
                const totalReviews = yield review_1.default.countDocuments({ product: (_a = req.params) === null || _a === void 0 ? void 0 : _a.pid });
                const response = {
                    reviews: [],
                    totalRating: 0,
                    totalTextReviews: 0,
                    rating: 0,
                    images: []
                };
                response.reviews = yield review_1.default.find({ product: (_b = req.params) === null || _b === void 0 ? void 0 : _b.pid }).populate({ path: 'user', select: 'name' });
                response.reviews.forEach(review => {
                    response.totalRating += review.rating;
                    if (review.reviewText) {
                        response.totalTextReviews++;
                    }
                    if (review.images && review.images.length > 0) {
                        response.images.push(...review.images);
                    }
                });
                if (response.totalTextReviews !== 0) {
                    const averageRating = response.totalRating / response.totalTextReviews;
                    response.rating = ((averageRating / 5) * 5).toFixed(1);
                }
                response.reviews = response.reviews.slice((parseInt(currentPage) - 1) * perPage, parseInt(currentPage) * perPage);
                response.totalPages = Math.ceil(totalReviews / perPage);
                response.hasNextPage = parseInt(currentPage) < response.totalPages;
                res.json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield review_1.default.find();
                res.json(reviews);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getReviewByTarget(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = {};
                response.reviews = yield review_1.default.find({ target: req.params.targetId });
                res.json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield review_1.default.findById(req.params.id);
                if (!review) {
                    return res.status(404).json({ message: 'Review not found' });
                }
                Object.assign(review, req.body);
                const updatedReview = yield review.save();
                res.json(updatedReview);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield review_1.default.findById(req.params.id);
                if (!review) {
                    return res.status(404).json({ message: 'Review not found' });
                }
                yield review.remove();
                res.json({ message: 'Review deleted' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.reviewController = reviewController;
