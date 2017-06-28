const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  content: { type: String, default: 'Amazing. 5/5. Would buy again.' },
  stars: {
    type: Number,
    default: 5,
    min: [1, 'Star rating cannot be less than 1'],
    max: [5, 'Star rating cannot be above 5']
  },
  author: { type: String },

  // email: {
  //   type: String,
  //     // for more complicated validations use "match" with a Regular Expression
  //     // More info about Regular Expressions -> http://regexr.com/
  //
  //     // This regular expression makes sure that you have an @ sign
  //   match: /.+@.+/
  // }
});

const ReviewModel = mongoose.model('Review', reviewSchema);


module.exports = ReviewModel;
