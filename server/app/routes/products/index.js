'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var UserModel = mongoose.model('User');
var OrderModel = mongoose.model('Order');
var ProductModel = mongoose.model('Product');
var ReviewModel = mongoose.model('Review');
var StoreModel = mongoose.model('Store');

module.exports = router;

// get all products
// uri: api/products
router.get('/', function (req, res, next) {
	console.log('session: ', req.session.id);
	var modelParams = req.query.category ? { category: req.query.category } : {};
	
	ProductModel.find(modelParams)
		.exec(function(err, products) {
			// if an error happened, pass the error to 'next'
			if (err) return next(err);
			res.json(products);
		});
});

// get one product
// uri: api/products/id
router.get('/:id', function (req, res, next) {
	ProductModel.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		res.json(product);
	});
});

// get all reviews for one product - defined in product model already??
// uri: api/products/id/reviews
router.get('/:id/reviews', function (req, res, next) {

	ProductModel.findById(req.params.id)
		.exec(function(err, product) {
			// if an error happened, pass the error to 'next'
			if (err) return next(err);
			ProductModel.getReviews().then(function() {
				console.log("made it into review method");
				res.json(product.reviews);
			});
		});
});

// post a new product
// uri: api/products
router.post('/', function (req, res, next) {
	ProductModel.create(req.body, function(err, product) {
		if (err) return next(err);
		console.log('saved product to db', product);
		res.json(product);
	});
});


// update an existing order
// uri: api/products/id
router.put('/:id', function (req, res, next) {
	ProductModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, product) {
		if (err) return next(err);
		res.json(product);
	});
});

// delete a product
// uri: api/products/id
router.delete('/:id', function (req, res, next) {
	ProductModel.findByIdAndRemove(req.params.id);
	res.status(200).end();
});