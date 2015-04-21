'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var UserModel = mongoose.model('User');
var ProductModel = mongoose.model('Product');
var ReviewModel = mongoose.model('Review');

module.exports = router;

// get one review
// uri: api/review/id
router.get('/review/:id', function (req, res, next) {
	ReviewModel.findById(req.params.id, function(err, review) {
		if (err) return next(err);
		res.json(review);
	});
});

// post a new review
// uri: api/reviews
router.post('/', function (req, res, next) {
	ReviewModel.create(req.body, function(err, review) {
		if (err) return next(err);
		console.log('saved review to db', review);
		res.json(review);
	});
});

// delete a review
// uri: api/reviews/review/id/delete
router.post('/review/:id/delete', function (req, res, next) {
	ReviewModel.findOneAndRemove({_id: req.params.id});
	res.redirect('/');
});


// // get all reviews for one product - defined in product model already??
// router.get('/:productId/reviews', function (req, res, next) {
// 	ReviewtModel.find({_id: req.params.productId})
// 				.populate('user product')
// 				.exec(function(err, reviews) {
// 					// if an error happened, pass the error to 'next'
// 					if (err) return next(err);
// 					res.json(reviews);
// 				});
// 	// alternative?
// 	// ProductModel.find({product_id: req.params.productId})
// 	// 			.populate('reviews')
// 	// 			.exec(function(err, product) {
// 	// 				// if an error happened, pass the error to 'next'
// 	// 				if (err) return next(err);
// 	// 				res.json(product.reviews);
// 	// 			});
// });

// // get all reviews for one user - defined in product model already??
// router.get('/:userId/reviews', function (req, res, next) {
// 	UserModel.find({_id: req.params.userId})
// 				.populate('reviews')
// 				.exec(function(err, user) {
// 					// if an error happened, pass the error to 'next'
// 					if (err) return next(err);
// 					res.json(user.reviews);
// 				});
// });
