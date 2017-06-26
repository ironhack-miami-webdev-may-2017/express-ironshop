const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const myProductSchema = new Schema({
  name: { type: String },
  price: { type: Number, default: 1 },
  imageUrl: { type: String, default: '/images/product.gif' },
  description: { type: String }
});


// Model
//    constructor function that allows us to interact with a single collection

const Product = mongoose.model('Product', myProductSchema);

// Collection name is automatically determined by Mongoose
// -------------------------------------------------------
// Product  ->  products  ->  db.products.find()


// 💣 IF YOU FORGET THIS YOU WILL DIE 💣
module.exports = Product;
