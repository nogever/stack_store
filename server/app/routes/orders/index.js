'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var UserModel = mongoose.model('User');
var OrderModel = mongoose.model('Order');
var ProductModel = mongoose.model('Product');
var ReviewModel = mongoose.model('Review');
var StoreModel = mongoose.model('Store');
var AddressModel = mongoose.model('Address');


module.exports = router;

// get all orders 
// uri: api/orders
router.get('/', function (req, res, next) {
	OrderModel.find()
				.populate('products')
				.exec(function(err, orders) {
					// if an error happened, pass the error to 'next'
					if (err) return next(err);
					res.json(products);
				});
});

// get one order by user??

// post a new order
// uri: api/orders/submit
router.post('/submit', function (req, res, next) {
	OrderModel.create(req.body, function(err, order) {
		if (err) return next(err);
		console.log('saved order to db', order);
		res.json(order);
	});
});

// edit an exsiting order
// uri: api/orders/order/id/edit
router.get('/order/:id/edit', function (req, res, next) {
	OrderModel.findById(req.params.id, function(err, order) {
		if (err) return next(err);
		res.json(order);
	});
});

// update an existing order
// uri: api/orders/order/id
router.post('/order/:id', function (req, res, next) {
	OrderModel.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, function(err, order) {
		if (err) return next(err);
		//res.redirect();
	});
});


// delete a order
// uri: api/orders/order/id/delete
router.post('/order/:id/delete', function (req, res, next) {
	OrderModel.findOneAndRemove({_id: req.params.id});
	res.redirect('/');
});