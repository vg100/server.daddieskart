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
const review_1 = require("../Models/review");
class reviewController {
    static createReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = new review_1.default(req.body);
                const newReview = yield review.save();
                res.status(201).json(newReview);
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
                const reviews = yield review_1.default.find({ target: req.params.targetId });
                res.json(reviews);
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
