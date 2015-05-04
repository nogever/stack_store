'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
// var _ = require('lodash');

var ProductModel = mongoose.model('Product');
var CartModel = mongoose.model('Cart');
var OptionsModel = mongoose.model('Options');

module.exports = router;

//get cart 
//uri: api/cart

router.get('/', function (req, res, next) {

	// // var currentUserId = req.user._id;
	// console.log(typeof req.user);
	// // console.log("req.user = ", currentUserId);
	// console.log(typeof req.sessionID);
	// console.log("req.SessionID = ", req.sessionID);
	// console.log('START of Cart GET', Date.now());

	CartModel.findOne({$or: [{userId: req.user._id}, {session: req.sessionID}]})
		.populate('products.productId')
		.exec()
		.then(function(cart) {
			if (err) return next(err);
			console.log('Cart GET Success Handler: ', cart);
			
			cart.calculateCartAmounts();
			res.status(201).json(cart);
		})
		.then(null, function(err) {
			console.log('Cart GET Error Handler: ', err);
			res.status(501).end();
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
	// console.log("PUT req.user: ", req.user);
	// console.log("PUT req._passport: ", req._passport);
	// console.log("PUT req.body: ", req.body);
	// var currentUserId = req.user._id;
	// console.log("PUT: Product Details: ", productDetails);

	// if user loggin in
	if (req.user) {

		console.log("ENTERED Logged In PUT Request");	
		
		CartModel.findOneAndUpdate(
			{userId: req.user._id}, 
			{$push: { products: productDetails }},
			{upsert: true})
		.exec()
		.then(function(cart) {
			if(err) return next(err);

			// if you do not explicitly run res.json or res.send, this will hang for long periods of time.
			cart.calculateCartAmounts();
			console.log('Logged in: PUT Request Success: User Cart ', cart);
			res.status(201).json(cart);
		})
		.then(null, function(err) {
			console.log('Cart PUT Error Handler (Logged In): ', err);
			res.status(501).end();
		});	

	} else { // if user is not loggin

		console.log("ENTERED Logged Out PUT Request");	
		// find cart for session ID
		CartModel.findOneAndUpdate(
			{session: req.sessionID}, 
			{$push: { products: productDetails }},
			{upsert: true})
		.exec()
		.then(function(err, cart) {
			if(err) return next(err);
			cart.calculateCartAmounts();
			console.log('Logged Out: PUT Request Success: Anon Cart ', cart);
			res.status(201).json(cart);
		})
		.then(null, function(err) {
			console.log('Cart PUT Error Handler (Logged Out): ', err);
			res.status(501).end();
		});

	}

});

// delete a product from cart
// uri: api/cart/product/:id
// /api/cart/product/55413b258a4f2fc079844d1b 
router.delete('/product/:id', function (req, res, next) {

	// var currentUserId = req.user;
	console.log('deleting a product from server route');
	CartModel.findOne(
		{$or: [{userId: req.user._id}, {session: req.sessionID}]})
		.exec(function(err, cart) {
			if (err) res.status(500).send(err);
			cart.products.pull({_id: req.params.id});
			console.log('find cart to delete product', cart.products);
			cart.calculateCartAmounts();
			cart.save();
			res.json(cart);
		});

});








