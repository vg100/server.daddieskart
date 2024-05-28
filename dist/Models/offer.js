"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const offerSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    amount: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
exports.default = mongoose.model('Offer', offerSchema);
