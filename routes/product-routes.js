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


router.get('/products/details', (req, res, next) => {
//    /products/details?myId=595174b1e7890a86da4f5f0b
//                       |
//            req.query.myId

    ProductModel.findById(
      req.query.myId,            // 1st argument -> the id to find in the DB
      (err, productFromDb) => {  // 2nd argument -> callback
          if (err) {
            // use next() to skip to the ERROR PAGE
            next(err);
            return;
          }

          res.locals.productDetails = productFromDb;

          res.render('product-views/product-details-view.ejs');

          // Other way of transfering variables to the view:
          //
          // res.render('product-views/product-details-view.ejs', {
          //   productDetails: productFromDb
          // });
      }
    );
});


// STEP #1 of form submission for UPDATING a product
//  (SAME AS DETAILS PAGE BUT DIFFERENT VIEW FILE)
router.get('/products/edit', (req, res, next) => {
//    /products/edit?myId=595174b1e7890a86da4f5f0b
//                       |
//            req.query.myId

    ProductModel.findById(
      req.query.myId,            // 1st argument -> the id to find in the DB
      (err, productFromDb) => {  // 2nd argument -> callback
          if (err) {
            // use next() to skip to the ERROR PAGE
            next(err);
            return;
          }

          res.locals.productDetails = productFromDb;

          res.render('product-views/edit-product-view.ejs');

          // Other way of transfering variables to the view:
          //
          // res.render('product-views/edit-product-view.ejs', {
          //   productDetails: productFromDb
          // });
      }
    );
});

// STEP #2 of form submission for UPDATING a product
// <form method="post" action="/products/update?myId=283u8eu239eu23e">
//                |                        |
//      -----------      -------------------
//      |                |
router.post('/products/update', (req, res, next) => {
//    /products/update?myId=283u8eu239eu23e
//                       |
//           req.query.myId

    ProductModel.findByIdAndUpdate(
      req.query.myId,            // 1st argument -> id of document to update

      {                          // 2nd argument -> object of fields to update
        name: req.body.productName,
        price: req.body.productPrice,
        imageUrl: req.body.productImageUrl,
        description: req.body.productDescription
      },

      (err, productFromDb) => {  // 3rd argument -> callback!
        if (err) {
          // use next() to skip to the ERROR PAGE
          next(err);
          return;
        }

        // If saved successfully, redirect to a URL.
        // (redirect is STEP #3 of form submission for a new product)
        res.redirect('/products/details?myId=' + productFromDb._id);
          // you can ONLY redirect to a URL 🌏

          // 🚨🚨🚨
          // If you don't redirect, you can refresh and duplicate your data!
          // 🚨🚨🚨
      }
    );
});


module.exports = router;
