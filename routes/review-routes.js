const express = require('express');

const ProductModel = require('../models/product-model.js');
const ReviewModel = require('../models/review-model.js');

const router = express.Router();


// ROUTE #1 -> display the form to create a new review

router.get('/products/:productId/reviews/new', (req, res, next) => {
    ProductModel.findById(
      req.params.productId,       // 1st argument -> product ID
      (err, productFromDb) => {   // 2nd argument -> callback
          if (err) {
            // use next() to skip to the ERROR PAGE
            next(err);
            return;
          }

          res.locals.productDetails = productFromDb;

          res.render('review-views/new-review-form.ejs');

          // res.render('review-views/new-review-form.ejs', {
          //   productDetails: productFromDb
          // });
      }
    );
});


// ROUTE #2 -> receive that form submission and do database stuff
  // POST to /products/9999999999/reviews
router.post('/products/:productId/reviews', (req, res, next) => {

    ProductModel.findById(
      req.params.productId,      // 1st argument -> id of the product

      (err, productFromDb) => {  // 2nd argument -> callback
          if (err) {
            // use next() to skip to the ERROR PAGE
            next(err);
            return;
          }

          const theReview = new ReviewModel({
            author: req.body.reviewAuthor,
            stars: req.body.reviewStars,
            content: req.body.reviewContent
          });

          // Add the review to the product's "reviews" array
          productFromDb.reviews.push(theReview);

          // Save the product with the new review
          productFromDb.save((err) => {
              if (err) {
                // use next() to skip to the ERROR PAGE
                next(err);
                return;
              }

              res.redirect('/products/' + productFromDb._id);
          });
      }
    ); // end findById

});  // end POST route


module.exports = router;
