"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    label: {
        type: String,
    },
    icon: { type: String },
    bgClass: { type: String },
    className: { type: String },
    description: String,
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Category', categorySchema);
