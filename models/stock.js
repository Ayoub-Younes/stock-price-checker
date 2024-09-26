const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
const Schema = mongoose.Schema;


const stockSchema = new Schema({
  stock: {
  type: String,
  required: true
},
  price: {
  type: Number,
  required: true,
},
  
  likes: {
  type: Number,
  default: 0
},
  ips: {
    type: Array,
    default: []
  }
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
