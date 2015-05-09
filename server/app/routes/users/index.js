'use strict';
var auth = require('../auth');
var router = require('express').Router();
var mongoose = require('mongoose');

var UserModel = mongoose.model('User');
var ProductModel = mongoose.model('Product');
var ReviewModel = mongoose.model('Review');
var OrderModel = mongoose.model('Order');

module.exports = router;



// auth.isAdmin,
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
		user.getOrders().then(function(orders) {
			// var userObj = user.toObject();  conver Mongoose obj to vanilla obj
			var data = {};
			data.orders = orders;
			data.user = user;
		res.json(data);
		}).then(null, function(err) {
			res.status(500).end();
		});
		
	});
});

// update one user
// uri: api/users/id
router.put('/:id', function (req, res, next) {
	UserModel.findById(req.body._id, function(err, user) {
		if (err) return next(err);
		user.name = req.body.name;
		user.password = req.body.password;
		user.email = req.body.email;
		user.role = req.body.role;
		user.google = req.body.google;
		user.facebook = req.body.facebook;
		user.twitter = req.body.twitter;
		
		user.save(function(err, user) {
			if (err) return next(err);
			res.json(user);
		})
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
	UserModel.findByIdAndRemove(req.params.id, function(err, doc) {
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











