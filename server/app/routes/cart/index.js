'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');

var ProductModel = mongoose.model('Product');
var CartModel = mongoose.model('Cart');
var OptionsModel = mongoose.model('Options');

module.exports = router;

//get cart 
//uri: api/cart
router.get('/', function (req, res, next) {

	CartModel.findOne({userId: req.session.passport.user}).populate('products.productId').exec(function(err, cart) {

		if (err) return next(err);
		res.send(cart);

	});

});

//get options
//uri: api/cart/options
router.get('/options', function (req, res, next) {

	var dropdowns = {
		sweets: OptionsModel.schema.path('sweets').enumValues,
		milk: OptionsModel.schema.path('milk').enumValues,
		flavors: OptionsModel.schema.path('flavors').enumValues,
		size: OptionsModel.schema.path('size').enumValues,
		toppings: OptionsModel.schema.path('toppings').enumValues
	};

	res.json(dropdowns);

});

router.put('/', function(req, res, next) {

	var productDetails = req.body;
	// console.log('product detail', req.body);
	var currentUser = req.session.passport.user;

	CartModel.findOne({userId: currentUser}, function(err, cart) {
		if (err) return next(err);
		cart.products.push(productDetails);
		cart.save();
	}).exec(function(err, cart){

		res.send(cart);
	});

});









