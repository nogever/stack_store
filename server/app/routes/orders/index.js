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
				// .populate('products') //won't work because its not just an array of refs, there's more there
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
router.get('/:id/edit', function (req, res, next) {
	OrderModel.findById(req.params.id, function(err, order) {
		if (err) return next(err);
		res.json(order);
	});
});

// update an existing order
// uri: api/orders/order/id
router.put('/:id', function (req, res, next) {
	OrderModel.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, function(err, order) {
		if (err) return next(err);
		//res.redirect();
		res.json(order)
	});
});


// delete a order
// uri: api/orders/order/id/delete
router.delete('/:id', function (req, res, next) {
	OrderModel.findOneByIdAndRemove(req.params.id);
	// res.redirect('/');
	res.status(200).end()
});