var mongoose = require('mongoose');
var optionsSchema = require('./options');

var schema = new mongoose.Schema({
	product: [{
		productId: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Product'
		}, 
		options: optionsSchema,
		quantity: Number
	}],
	date: Date
});

schema.pre('save', function(next) {
	var currentDate = new Date();
	this.date = currentDate;
	next();
})

mongoose.model('Wishlist', schema);
// module.exports = schema;