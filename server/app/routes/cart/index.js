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

	if (req.session.passport.user){
		CartModel.findOne({userId: req.session.passport.user})
		.populate('products.productId')
		.exec(function(err, cart) {
			if (err) return next(err);
			res.json(cart);
		});	

	} else { // if user doesn't log in
		
		CartModel.findOne({session: req.sessionID})
		.populate('products.productId')
		.exec(function(err, cart) {
			if (err) return next(err);
			res.json(cart);
		});	
	}

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
	// console.log('product detail', req.body);
	var currentUser = req.session.passport.user;

	// if user loggin in
	if (currentUser) {

		CartModel.findOneAndUpdate(
			{userId: currentUser}, 
			{$push: { products: productDetails }},
			{upsert: true})
		.exec(function(err, cart) {
			if(err) return next(err)
			console.log(err);
			console.log('user existing cart ', cart);
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
			console.log(err);
			console.log('anon existing cart ', cart);
		});

	}

});

// delete a product from cart
// uri: api/cart/product/:id
router.delete('product/:id', function (req, res, next) {
	if (req.session.passport.user){
		CartModel.findOne({userId: req.session.passport.user})
		.exec(function(err, cart) {

			if (err) return next(err);

			// remove the product from cart.products
			// return the new cart.products
			// update the cart database
			// send the cart with updated products

			res.send(cart);

		});	
	} else {
		// remove a product from session.cart.products array
		// return the updated seesion.cart.products array
	}
	res.status(200).end();
});

// This will eventually be removed, but is used now for building test data for the cart
// This should only be executed once.

// var buildTestCart = (function() {
// 	var executed = false;

// 	return function () {
// 		if(!executed) {
// 			executed = true;

// 			//code to be run once (on server reset);
// 			var cartData = {
// 				    products: [
// 				        {  
// 				            productId: "01234567",  
// 				            options: [{ sweets: "honey", milk: "fat free", size: "fullstack"}], 
// 				            quantity: 1,
// 				            price: 500
// 				        },
// 				        {  
// 				            productId: "98765432",  
// 				            options: [{ sweets: "raw sugar", milk: "soy", size: "smallstack"}], 
// 				            quantity: 1,
// 				            price: 250
// 				        },
// 				        {  
// 				            productId: "99992221",  
// 				            options: [{ sweets: "sweet & low", size: "mediumstack", toppings: "cocoa powder"}], 
// 				            quantity: 1,
// 				            price: 325
// 				        },
// 				        {  
// 				            productId: "99253221",  
// 				            options: [{ sweets: "splenda", size: "fullstack", toppings: "cocoa powder"}], 
// 				            quantity: 1,
// 				            price: 325
// 				        },
// 				        {  
// 				            productId: "97732221",  
// 				            options: [{ sweets: "raw sugar", size: "fullstack", toppings: "cinnamon"}], 
// 				            quantity: 1,
// 				            price: 250
// 				        },
// 				        {  
// 				            productId: "00123221",  
// 				            options: [{ sweets: "none", size: "mediumstack", toppings: "none"}], 
// 				            quantity: 1,
// 				            price: 550
// 				        }
// 				    ],
// 				    subTotal:1000,
// 				    tax:825, 
// 				    total:1083
// 			};

// 			return cartData;
// 		}
// 	};
// })();








