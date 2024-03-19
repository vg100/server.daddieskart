"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'buyer'],
        default: 'buyer'
    },
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
exports.default = mongoose.model('User', userSchema);
