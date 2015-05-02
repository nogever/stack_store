'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var TypeModel = mongoose.model('Types');

module.exports = router;

// get all types
// uri: api/types
router.get('/', function (req, res, next) {

	TypeModel.find()
		.exec(function(err, types) {
			if (err) return next(err);
			res.json(types);
		});
});

// get one category
// uri: api/types/id
router.get('/:id', function (req, res, next) {
	TypeModel.findById(req.params.id, function(err, type) {
		if (err) return next(err);
		res.json(type);
	});
});

// post a new category
// uri: api/types
router.post('/', function (req, res, next) {
	// console.log(req.body);
	TypeModel.create(req.body, function(err, type) {
		if (err) return next(err);
		console.log('saved category to db', type);
		res.json(type);
	});
});

// update an existing category
// uri: api/types/id
router.put('/:id', function (req, res, next) {
	TypeModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, type) {
		if (err) return next(err);
		res.json(type);
	});
});

// delete a product
// uri: api/types/id
router.delete('/:id', function (req, res, next) {
	TypeModel.findByIdAndRemove(req.params.id, function(err, doc) {
		if (err) res.status(500).send(err);
		res.status(200).end();
	});
});










