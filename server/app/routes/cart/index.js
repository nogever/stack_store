'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');

var ProductModel = mongoose.model('Product');
var CartModel = mongoose.model('Cart');

module.exports = router;

//get cart 
//uri: api/cart

router.get('/', function (req, res, next) {

	if (!req.session.cartContents) {
		req.session.cartContents = buildTestCart();
	};

	console.log('cart session: ', req.session.id);
	console.log('session: ', req.session);

	res.send(req.session.cartContents);

});

router.post('/', function(req, res, next) {

});


// This will eventually be removed, but is used now for building test data for the cart
// This should only be executed once.

var buildTestCart = (function() {
	var executed = false;

	return function () {
		if(!executed) {
			executed = true;

			//code to be run once (on server reset);
			var cartData = {
				    products: [
				        {  
				            productId: "01234567",  
				            options: [{ sweets: "honey", milk: "fat free", size: "fullstack"}], 
				            quantity: 1,
				            price: 500
				        },
				        {  
				            productId: "98765432",  
				            options: [{ sweets: "raw sugar", milk: "soy", size: "smallstack"}], 
				            quantity: 1,
				            price: 250
				        },
				        {  
				            productId: "99992221",  
				            options: [{ sweets: "sweet & low", size: "mediumstack", toppings: "cocoa powder"}], 
				            quantity: 1,
				            price: 325
				        },
				        {  
				            productId: "99253221",  
				            options: [{ sweets: "splenda", size: "fullstack", toppings: "cocoa powder"}], 
				            quantity: 1,
				            price: 325
				        },
				        {  
				            productId: "97732221",  
				            options: [{ sweets: "raw sugar", size: "fullstack", toppings: "cinnamon"}], 
				            quantity: 1,
				            price: 250
				        },
				        {  
				            productId: "00123221",  
				            options: [{ sweets: "none", size: "mediumstack", toppings: "none"}], 
				            quantity: 1,
				            price: 550
				        }
				    ],
				    subTotal:1000,
				    tax:825, 
				    total:1083
			};

			return cartData;
		}
	};
})();








