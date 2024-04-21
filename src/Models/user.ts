
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:{
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
  verified: {type: Boolean, default: false},
  verification_token: {type: Number,},
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

export default mongoose.model('User', userSchema);


