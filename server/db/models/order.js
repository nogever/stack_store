var mongoose = require('mongoose');
var optionsSchema = require('./options');

var schema = new mongoose.Schema({
	id: {type: Number, unique: true},
	product: [{
		productId: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Product'
		}, 
		options: [optionsSchema]
	}],
	date: Date,
	orderStatus: { type: String, enum: ['ordered', 'paid', 'shipped', 'rejected', 'canceled', 'delivered', 'picked-up'] }
});

schema.methods.populateOrders = function() {
	//return mongoose.model('Products').find(...).exec()
}

schema.pre('save', function(next) {
	var currentDate = new Date();
	this.date = currentDate;
	next();
})

mongoose.model('Order', schema);