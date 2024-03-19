"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const featureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Features', featureSchema);
