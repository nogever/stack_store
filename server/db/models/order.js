var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	id: {type: Number, unique: true},
	product: [{
		productId: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Product'
		}, 
		options:{
			sweets: String,
			milk: String,
			flavors: String, 
			size: String,
			toppings: String,
			price: Number
		}
	}],
	date: Date,
	orderStatus: String,
	delivery: Boolean
});

mongoose.model('Order', schema);