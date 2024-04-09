"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'buyer'],
        default: 'buyer'
    },
    verified: { type: Boolean, required: true, default: false },
    verification_token: { type: Number, required: true },
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
