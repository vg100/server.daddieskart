"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    images: [{
            type: String,
            required: true
        }],
    tags: [{
            type: String,
            trim: true
        }],
    variations: [{
            name: {
                type: String,
                required: true
            },
            options: [{
                    type: String,
                    required: true
                }]
        }],
    shipping: {
        dimensions: {
            type: {
                length: { type: Number },
                width: { type: Number },
                height: { type: Number }
            },
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Product', productSchema);
