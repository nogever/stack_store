'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var ProductModel = mongoose.model('Product');
var CartModel = mongoose.model('Cart');

module.exports = router;

//get cart 
//uri: api/cart
router.get('/', function (req, res, next) {

	var cartId = req.query.cart ? { cart: req.query.cart } : {};
	
	CartModel.find(cartId)
		.exec(function(err, carts) {
			// if an error happened, pass the error to 'next'
			if (err) return next(err);
			res.json(carts);
		});

});