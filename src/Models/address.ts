const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shippingInfo: {
        fullName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        addressType: {
            type: String,
            required: true
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Address', addressSchema);

