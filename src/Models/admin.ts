
const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model('Admin', adminSchema);


