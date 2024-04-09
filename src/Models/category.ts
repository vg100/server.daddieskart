const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true
  },
  icon: {type: String},
  bgClass:{type: String},
  className:{type: String},
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

export default mongoose.model('Category', categorySchema);