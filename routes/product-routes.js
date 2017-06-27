const express = require('express');

const ProductModel = require('../models/product-model.js');

const router = express.Router();


router.get('/products', (req, res, next) => {
  ProductModel.find((err, productResults) => {
    if (err) {
      // use next() to skip to the ERROR PAGE
      next(err);
      return;
    }

    res.locals.productsAndStuff = productResults;

    // display "products-list-view.ejs"
    res.render('product-views/products-list-view.ejs');
  });
});


// STEP #1 of form submission for a new product
router.get('/products/new', (req, res, next) => {
  // display "new-product-view.ejs"
  res.render('product-views/new-product-view.ejs');
});

// STEP #2 of form submission for a new product
// <form method="post" action="/products">
//                |                |
//      -----------                |
//      |        -------------------
//      |        |
router.post('/products', (req, res, next) => {
    const theProduct = new ProductModel({
        name: req.body.productName,
        price: req.body.productPrice,
        imageUrl: req.body.productImageUrl,
        description: req.body.productDescription
    });

    theProduct.save((err) => {
        if (err) {
          // If there was an error, use next() to skip to the ERROR PAGE.
          next(err);
          return;
        }

        // If saved successfully, redirect to a URL.
        // (redirect is STEP #3 of form submission for a new product)
        res.redirect('/products');
          // you can ONLY redirect to a URL 🌏

          // 🚨🚨🚨
          // If you don't redirect, you can refresh and duplicate your data!
          // 🚨🚨🚨
    });
});


module.exports = router;
