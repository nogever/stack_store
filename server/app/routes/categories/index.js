'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var ProductModel = mongoose.model('Product');
var CategoryModel = mongoose.model('Categories');

module.exports = router;

// get all categories
// uri: api/categories
router.get('/', function (req, res, next) {

	CategoryModel.findAll()
		.exec(function(err, categories) {
			if (err) return next(err);
			res.json(categories);
		});
});

// get one category
// uri: api/categories/id
router.get('/:id', function (req, res, next) {
	CategoryModel.findById(req.params.id, function(err, category) {
		if (err) return next(err);
		res.json(category);
	});
});

// post a new category
// uri: api/categories
router.post('/', function (req, res, next) {
	// console.log(req.body);
	CategoryModel.create(req.body, function(err, category) {
		if (err) return next(err);
		console.log('saved category to db', category);
		res.json(category);
	});
});

// update an existing category
// uri: api/categories/id
router.put('/:id', function (req, res, next) {
	CategoryModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, category) {
		if (err) return next(err);
		res.json(category);
	});
});

// delete a product
// uri: api/categories/id
router.delete('/:id', function (req, res, next) {
	CategoryModel.findByIdAndRemove(req.params.id);
	res.status(200).end();
});










