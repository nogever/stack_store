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

// get all products
// uri: api/products
router.get('/', function (req, res, next) {
	ProductModel.find()
				// .populate('reviews')
				.exec(function(err, products) {
					// if an error happened, pass the error to 'next'
					if (err) return next(err);
					res.json(products);
				});
});

// get one product
// uri: api/product/id
router.get('/:id', function (req, res, next) {
	ProductModel.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		res.json(product);
	});
});

// get all reviews for one product - defined in product model already??
// uri: api/product/id/reviews
router.get('/:id/reviews', function (req, res, next) {

	ProductModel.find({_id: req.params.id})
				// .populate('reviews') //needs to call method instead
				.exec(function(err, product) {
					// if an error happened, pass the error to 'next'
					if (err) return next(err);
					console.log(product.reviews);
					res.json(product.reviews);
				});
});

// post a new product
// uri: api/products/submit
router.post('/', function (req, res, next) {
	ProductModel.create(req.body, function(err, product) {
		if (err) return next(err);
		console.log('saved product to db', product);
		res.json(product);
	});
});



// update an existing order
// uri: api/product/id
router.put('/:id', function (req, res, next) {
	ProductModel.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, function(err, order) {
		if (err) return next(err);
		//res.redirect();
	});
});

// delete a product
// uri: api/product/id/delete
router.delete('/:id', function (req, res, next) {
	ProductModel.findOneAndRemove({_id: req.params.id});
	//send 200
});