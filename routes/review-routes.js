const express = require('express');

const ProductModel = require('../models/product-model.js');

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


module.exports = router;
