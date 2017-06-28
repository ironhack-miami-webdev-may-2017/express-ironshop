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
        // If there was an error that was NOT a validation error...
        if (err && theProduct.errors === undefined) {
          // Use next() to skip to the ERROR PAGE.
          next(err);
          return;
        }

        // If there was an error and THERE WERE validation errors
        if (err && theProduct.errors) {
          // Create view variables with the error messages
          res.locals.validationErrors = theProduct.errors;

          // And display the form again
          res.render('product-views/new-product-view.ejs');
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


router.get('/products/:myId', (req, res, next) => {
//    /products/595174b1e7890a86da4f5f0b
//                       |
//                 req.params.myId

    ProductModel.findById(
      req.params.myId,           // 1st argument -> the id to find in the DB
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
router.get('/products/:myId/edit', (req, res, next) => {
//    /products/595174b1e7890a86da4f5f0b/edit
//                       |
//                 req.params.myId

    ProductModel.findById(
      req.params.myId,           // 1st argument -> the id to find in the DB
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
// <form method="post" action="/products/283u8eu239eu23e/update">
//                |                             |
//      -----------      ------------------------
//      |                |
router.post('/products/:myId/update', (req, res, next) => {
//    /products/283u8eu239eu23e/update
//                     |
//              req.params.myId

    ProductModel.findByIdAndUpdate(
      req.params.myId,            // 1st argument -> id of document to update

      {                           // 2nd argument -> object of fields to update
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
        res.redirect('/products/' + productFromDb._id);
          // you can ONLY redirect to a URL 🌏

          // 🚨🚨🚨
          // If you don't redirect, you can refresh and duplicate your data!
          // 🚨🚨🚨
      }
    );
});



// Delete from a LINK (GET)
//   (same code as POST version)
router.get('/products/:myId/delete', (req, res, next) => {
  ProductModel.findByIdAndRemove(
    req.params.myId,           // 1st argument -> id of document to remove

    (err, productFromDb) => {  // 2nd argument -> callback
      if (err) {
        // use next() to skip to the ERROR PAGE
        next(err);
        return;
      }

      // If removed successfully, redirect to a URL.
      res.redirect('/products');
        // you can ONLY redirect to a URL 🌏
    }
  );
});

// Delete from a FORM BUTTON (POST)
//   (same code as GET version)
router.post('/products/:myId/delete', (req, res, next) => {
  ProductModel.findByIdAndRemove(
    req.params.myId,           // 1st argument -> id of document to remove

    (err, productFromDb) => {  // 2nd argument -> callback
      if (err) {
        // use next() to skip to the ERROR PAGE
        next(err);
        return;
      }

      // If removed successfully, redirect to a URL.
      res.redirect('/products');
        // you can ONLY redirect to a URL 🌏
    }
  );
});


module.exports = router;
