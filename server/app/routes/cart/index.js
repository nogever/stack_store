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

	var currentUserId = req.user;
	console.log('START of Cart GET', Date.now());
	CartModel.findOne({$or: [{userId: currentUserId}, {session: req.sessionID}]})
		.populate('products.productId')
		.exec(function(err, cart) {
			console.log('getting to the cart when user logs in');
			if (err) return next(err);
			console.log('END of Cart GET', Date.now());
			if (cart)
				cart.calculateCartAmounts();
			// cart.save();
			res.json(cart);
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
	}

	res.json(dropdowns);

});

router.put('/', function(req, res, next) {

	var productDetails = req.body;
	var currentUserId = req.user;

	console.log("PUT: Product Details: ", productDetails);
	console.log("PUT: User Details: ", currentUserId);

	// if user loggin in
	if (currentUserId) {

		CartModel.findOneAndUpdate(
			{userId: currentUserId}, 
			{$push: { products: productDetails }},
			{upsert: true})
		.exec(function(cart) {
			// if(err) return next(err)
			// if you do not explicitly run res.json or res.send, this will hang for long periods of time.
			if (cart)
				cart.calculateCartAmounts();
			// cart.save();
			res.json(cart);
			console.log('Logged in: PUT Request - User Cart ', cart);
		}, function(err) {
			console.log("Logged in user error PUT", err);
		});

	} else { // if user is not loggin

		console.log(req.sessionID);	
		// find cart for session ID
		CartModel.findOneAndUpdate(
			{session: req.sessionID}, 
			{$push: { products: productDetails }},
			{upsert: true})
		.exec(function(err, cart) {
			if(err) return next(err)
			if (cart)
				cart.calculateCartAmounts();
			// cart.save();
			res.json(cart);

			console.log(err);
			console.log('anon existing cart ', cart);
		});

	}

});

// delete a product from cart
// uri: api/cart/product/:id
// /api/cart/product/55413b258a4f2fc079844d1b 
router.delete('/product/:id', function (req, res, next) {
	var currentUserId = req.user;
	console.log('deleting a product from server route');
	CartModel.findOne(
		{$or: [{userId: currentUserId}, {session: req.sessionID}]})
		.exec(function(err, cart) {
			if (err) res.status(500).send(err);
			cart.products.pull({_id: req.params.id});
			console.log('find cart to delete product', cart.products);
			if (cart)
				cart.calculateCartAmounts();
			cart.save();
			res.json(cart);
		});

});








