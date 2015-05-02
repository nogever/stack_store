'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var UserModel = mongoose.model('User');
var ProductModel = mongoose.model('Product');
var ReviewModel = mongoose.model('Review');
var OrderModel = mongoose.model('Order');

module.exports = router;

// get all users
router.get('/', function (req, res, next) {
	UserModel.find()
		.exec(function(err, users) {
			// if an error happened, pass the error to 'next'
			if (err) return next(err);
			res.json(users);
		});
});

// get one user
// uri: api/users/id
router.get('/:id', function (req, res, next) {
	UserModel.findById(req.params.id, function(err, user) {
		if (err) return next(err);
		res.json(user);
	});
});

// update one user
// uri: api/users/id
router.put('/:id', function (req, res, next) {
	UserModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, user) {
		if (err) return next(err);
		//res.redirect();
		res.json(user);
	});
});

// update multiple users

// create one user
// uri: api/users
router.post('/', function (req, res, next) {
	UserModel.create(req.body, function(err, user) {
		if (err) return next(err);
		console.log('saved user to db', user);
		res.json(user);
	});
});

// delete one user
// uri: api/users/id
router.delete('/:id', function (req, res, next) {
	OrderModel.findByIdAndRemove(req.params.id, function(err, doc) {
		if (err) res.status(500).send(err);
		res.status(200).end();
	});
});

// get all reviews for one user
router.get('/:id/reviews', function (req, res, next) {
	UserModel.findById(req.params.id)
		.exec(function(err, user) {
			// if an error happened, pass the error to 'next'
			if (err) return next(err);
			user.getReviews().then(function(reviews) {
				res.json(reviews);
			});
		});
});

// get all past orders for one user
router.get('/:id/orders', function (req, res, next) {
	UserModel.findById(req.params.id)
		.exec(function(err, user) {
			// if an error happened, pass the error to 'next'
			if (err) return next(err);
			res.json(user.pastOrders);
		});
});

// get wishlist for one user
router.get('/:id/wishlists', function (req, res, next) {
	UserModel.findById(req.params.id)
		.exec(function(err, user) {
			// if an error happened, pass the error to 'next'
			if (err) return next(err);
			res.json(user.wishlist);
		});
});











