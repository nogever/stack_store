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
				.populate('pastOrders wishlist reviews')
				.exec(function(err, users) {
					// if an error happened, pass the error to 'next'
					if (err) return next(err);
					res.json(users);
				});
});

// get one user
// uri: api/users/user/id
router.get('/user/:id', function (req, res, next) {
	UserModel.findById(req.params.id, function(err, user) {
		if (err) return next(err);
		res.json(user);
	})
});

// update one user
// uri: api/users/user/id
router.post('/user/:id', function (req, res, next) {
	UserModel.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, function(err, user) {
		if (err) return next(err);
		//res.redirect();
	});
});

// update multiple users

// create one user
// uri: api/users/submit
router.post('/submit', function (req, res, next) {
	UserModel.create(req.body, function(err, user) {
		if (err) return next(err);
		console.log('saved user to db', user);
		res.json(user);
	});
});

// edit an exsiting user
// uri: api/users/user/id/edit
router.get('/user/:id/edit', function (req, res, next) {
	UserModel.findById(req.params.id, function(err, user) {
		if (err) return next(err);
		res.json(user);
	});
});


// delete one user
// uri: api/users/user/id/delete
router.post('/user/:id/delete', function (req, res, next) {
	OrderModel.findOneAndRemove({_id: req.params.id});
	res.redirect('/');
});

// delete multiple users

// get all reviews for one user
router.get('/:userId/reviews', function (req, res, next) {
	UserModel.find({_id: req.params.userId})
				.populate('reviews')
				.exec(function(err, user) {
					// if an error happened, pass the error to 'next'
					if (err) return next(err);
					res.json(user.reviews);
				});
});

// get all past orders for one user
router.get('/:userId/orders', function (req, res, next) {
	UserModel.find({_id: req.params.userId})
				.populate('pastOrders')
				.exec(function(err, user) {
					// if an error happened, pass the error to 'next'
					if (err) return next(err);
					res.json(user.pastOrders);
				});
});

// get wishlist for one user
router.get('/:userId/orders', function (req, res, next) {
	UserModel.find({_id: req.params.userId})
				.populate('wishlist')
				.exec(function(err, user) {
					// if an error happened, pass the error to 'next'
					if (err) return next(err);
					res.json(user.wishlist);
				});
});