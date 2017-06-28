const mongoose = require('mongoose');

const ReviewModel = require('./review-model.js');

const Schema = mongoose.Schema;


const myProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your product name'],
      // minlength & maxlength are for Strings only
    minlength: [3, 'Name must be 3 characters or longer'],
    maxlength: [255, 'Name cannot be longer than 255 characters']
  },
  price: {
    type: Number,
    default: 1,
    required: [true, 'Please provide a price'],
      // min & max are for Numbers ONLY
    min: [0, 'Price cannot be less than $0'],
    max: [1000, 'Price cannot be over $1000']
  },
  imageUrl: { type: String, default: '/images/product.gif' },
  description: { type: String },

  // category: {
  //   type: String,
  //     // Can only be exactly one of these options
  //   enum: [ 'Tech', 'Food', 'Apparel', 'Home', 'Footwear' ]
  // },

  // Add a field inside of product documents called "reviews",
  // an array of ReviewModel objects with "content", "stars" and "author" fields.
  reviews: [ ReviewModel.schema ]
                      //    |
                      // schema of the ReviewModel (different from the Schema var)
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
