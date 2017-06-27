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

const ProductModel = mongoose.model('Product', myProductSchema);
//                                      |
//     ----------------------------------
//     |
// 'Product'  ->  'products'  ->  db.products.find()
//
// Collection name is automatically determined by Mongoose


// 💣 IF YOU FORGET THIS YOU WILL DIE 💣
module.exports = ProductModel;
