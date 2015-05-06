'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var ProductModel = mongoose.model('Product');
var PromoModel = mongoose.model('Promo');

module.exports = router;

// get all promo
// uri: api/promos
router.get('/', function (req, res, next) {
	PromoModel.find()
		.populate( 'whiteList' )
		.populate( 'blackList' )
		.exec(function(err, promos) {
			if (err) return next(err);
			res.json(promos);
		});
});

// get one promo
// uri: api/promos/id
router.get('/:id', function (req, res, next) {
	PromoModel.findById(req.params.id)
		.populate( 'whiteList' )
		.populate( 'blackList' )
		.exec(function(err, promo) {
			if (err) return next(err);
			res.json(promo);
	});
});

// post a new promo
// uri: api/promos
router.post('/', function (req, res, next) {
	PromoModel.create(req.body, function(err, promo) {
			if (err) return next(err);
			res.json(promo);
	});
});
// // get all reviews for one product - defined in product model already??
// // uri: api/promo/id/reviews
// router.get('/:id/reviews', function (req, res, next) {

// 	ReviewModel.find({product: req.params.id})
// 		.exec(function(err, reviews) {
// 			if (err) return next(err);
// 			// reviews.getReviews().then(function() {
// 				// console.log("made it into review method");
// 				// console.log(reviews);
// 				res.json(reviews);
// 			// });
// 		});
// });



// // update an existing order
// // uri: api/promo/id
// router.put('/:id', function (req, res, next) {
// 	PromoModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, product) {
// 			if (err) return next(err);
// 			res.json(product);
// 		});
// });

// // delete a product
// // uri: api/promo/id
// router.delete('/:id', function (req, res, next) {
// 	PromoModel.findByIdAndRemove(req.params.id, function(err, doc) {
// 		if (err) res.status(500).send(err);
// 		res.status(200).end();
// 	});
// });












