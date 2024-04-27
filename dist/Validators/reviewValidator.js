"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidator = void 0;
const express_validator_1 = require("express-validator");
class reviewValidator {
    static addReview() {
        return [
            express_validator_1.body('rating').notEmpty().withMessage('Rating is required').isString().withMessage('Rating must be a string'),
            express_validator_1.body('reviewText').notEmpty().withMessage('Review text is required').isString().withMessage('Review text must be a string'),
        ];
    }
}
exports.reviewValidator = reviewValidator;
