var mongoose = require('mongoose');
var optionsSchema = require('./options');
var ProductModel = mongoose.model('Product');

var schema = new mongoose.Schema({
	products: [{
		productId: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Product'
		}, 
		options: [optionsSchema],
		quantity: Number,
		price: Number
	}],
	date: Date,
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

schema.methods.getPrice = function() {
	if (this.products.length) {
		this.products.forEach(function(product) {
			ProductModel.findById(product.productId, function(err, p) {
				product.price = p.price;
			});
		});
	}
};

schema.pre('save', function(next) {
	var currentDate = new Date();
	this.date = currentDate;
	next();
});

mongoose.model('Wishlist', schema);
// module.exports = schema;