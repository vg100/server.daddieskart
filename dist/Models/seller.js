"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
    },
    store: {
        name: { type: String },
        rating: { type: Number },
        rated: { type: Number },
        logo: { type: String },
    },
    role: {
        type: String,
        default: 'seller'
    },
    products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }],
    verified: { type: Boolean, default: false },
    verification_token: { type: Number },
    Permissions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Features',
        }],
    profileImage: String,
    contactInfo: {
        address: String,
        phone: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Seller', sellerSchema);
