
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  targetType: {
    type: String,
    enum: ['seller', 'product'],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reply: {
    text: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  },
  images: {
    type: [String],
    default: []
  },
  reviewText: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Review', reviewSchema);
