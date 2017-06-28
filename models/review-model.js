const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  content: { type: String, default: 'Amazing. 5/5. Would buy again.' },
  stars: { type: Number, default: 5 },
  author: { type: String }
});

const ReviewModel = mongoose.model('Review', reviewSchema);


module.exports = ReviewModel;
