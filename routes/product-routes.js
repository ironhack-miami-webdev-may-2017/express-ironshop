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


module.exports = router;
