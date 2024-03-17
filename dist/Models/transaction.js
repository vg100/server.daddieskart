"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['purchase', 'refund', 'cancellation'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    relatedOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    relatedProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    reason: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Transaction', transactionSchema);
