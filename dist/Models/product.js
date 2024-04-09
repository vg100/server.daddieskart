"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    product: {
        type: String,
        trim: true
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    verified: { type: Boolean },
    price: {
        type: Number,
    },
    salePrice: {
        type: Number,
    },
    quantity: {
        type: Number,
        min: 0
    },
    rating: {
        type: Number,
    },
    productColorVariants: [{
            name: { type: String },
            thumb: { type: String },
            images: [{ type: String }],
        }],
    productReviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }],
    inStock: { type: Boolean },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags: [{
            type: String,
            trim: true
        }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Product', productSchema);
