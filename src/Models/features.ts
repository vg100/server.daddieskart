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

export default mongoose.model('Features', featureSchema);


