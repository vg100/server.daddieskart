"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mobile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'buyer'
    },
    otp: { type: String, },
    otpExpiration: Date,
    verified: { type: Boolean, default: false },
    profileImage: String,
    contactInfo: {
        address: String,
        phone: String
    },
    address: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('User', userSchema);
