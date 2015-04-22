'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var UserModel = mongoose.model('User');
var ProductModel = mongoose.model('Product');
var ReviewModel = mongoose.model('Review');

module.exports = router;

// get one review
// uri: api/reviews/id
router.get('/:id', function (req, res, next) {
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
		console.log('saved a review to db', review);
		res.json(review);
	});
});

// update review
// uri: api/reviews/id
router.put('/:id', function (req, res, next) {
	ReviewModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, review) {
		if (err) return next(err);
		console.log('updated review', review);
		res.json(review);
	});
});

// delete a review
// uri: api/reviews/id
router.delete('/:id', function (req, res, next) {
	ReviewModel.findByIdAndRemove(req.params.id);
	res.status(200).end();
});