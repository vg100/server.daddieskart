const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  rating: {type: Number},
  rated:{type: Number},
  logo:{type:String},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Store', storeSchema);