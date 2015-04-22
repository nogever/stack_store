var mongoose = require('mongoose');
var optionsSchema = require('./options');

var schema = new mongoose.Schema({
	id: {type: Number, unique: true},
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
	orderStatus: { type: String, enum: ['ordered', 'paid', 'shipped', 'rejected', 'canceled', 'delivered', 'picked-up'] }
});

schema.methods.getPrice = function() {
	if (this.products.length) {
		this.products.forEach(function(product) {
			ProductModel.findById(product.productId, function(err, p) {
				product.price = p.price;
			})
		})
	}
}

schema.methods.populateOrders = function() {
	//return mongoose.model('Products').find(...).exec()
}

schema.pre('save', function(next) {
	var currentDate = new Date();
	this.date = currentDate;
	next();
})

mongoose.model('Order', schema);