"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const sanitize_html_1 = require("sanitize-html");
const { Schema } = mongoose;
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        set: (value) => sanitize_html_1.default(value),
    },
    verified: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    salePrice: {
        type: Number,
        min: 0,
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
    },
    offer: String,
    isOffer: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    pincodes: [{ type: Number, default: [] }],
    specialOfferEndTime: { type: String, default: "" },
    productVariants: [{
            color: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                min: 0,
            },
            salePrice: {
                type: Number,
                min: 0,
            },
            size: [{ type: String, required: true, }],
            images: [{ type: String, required: true, }],
            quantity: {
                type: Number,
                default: 0,
                min: 0,
            }
        }],
    productReviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }],
    relatedProducts: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
    inStock: {
        type: Boolean,
        default: true,
    },
    availability: {
        type: String,
        enum: ['in_stock', 'Out of stock', 'Pre-order'],
        default: 'in_stock',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    tags: {
        type: String,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
    },
    specifications: [{
            name: {
                type: String,
            },
            details: [{
                    title: {
                        type: String,
                    },
                    value: {
                        type: String,
                    },
                }],
        }],
    inBox: [{
            type: String,
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
productSchema.index({ category: 1, price: -1 });
productSchema.index({ 'productVariants.price': 1 });
productSchema.index({ quantity: 1 }, { partialFilterExpression: { quantity: { $gt: 0 } } });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
exports.default = mongoose.model('Product', productSchema);
