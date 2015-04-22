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
		.exec(function(err, orders) {
			// if an error happened, pass the error to 'next'
			if (err) return next(err);
			res.json(orders);
		});
});

// post a new order
// uri: api/orders
router.post('/', function (req, res, next) {
	OrderModel.create(req.body, function(err, order) {
		if (err) return next(err);
		console.log('saved order to db', order);
		res.json(order);
	});
});

// retrieve a single order
// uri: api/orders/id
router.get('/:id', function (req, res, next) {
	OrderModel.findById(req.params.id, function(err, order) {
		if (err) return next(err);
		res.json(order);
	});
});

// update an existing order
// uri: api/orders/id
router.put('/:id', function (req, res, next) {
	OrderModel.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, function(err, order) {
		if (err) return next(err);
		res.json(order)
	});
});


// delete a order
// uri: api/orders/id
router.delete('/:id', function (req, res, next) {
	OrderModel.findByIdAndRemove(req.params.id);
	res.status(200).end()
});