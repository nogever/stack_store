var mongoose = require('mongoose');
var ProductModel = mongoose.model('Product');
var optionsSchema = require('./options');

var schema = new mongoose.Schema({
	session: String,
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	products: [{
		productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
		options: optionsSchema,
		quantity: Number,
		price: Number
	}],
	subTotal: Number,
	tax: Number,
	total: Number
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

schema.statics.merge = function( anonCart ) {
	console.log('before merge products anonCart', anonCart.products);
	// this.products = this.products.concat( anonCart.products );
	console.log('after merge products', this.products);
	// anonCart.remove();
	return; 
}

schema.methods.getSubTotal = function() {
	var productsTotal = 0;
	if (this.products.length) {
		this.products.forEach(function(product) {
			ProductModel.findById(product.productId, function(err, p) {
				productsTotal += p.price;
			});
		});
	}
	this.subTotal = productsTotal;
};

schema.methods.calculateTax = function() {
// calculate tax based on tax table
};

schema.methods.calculateTotal = function() {
	var cartTotal = this.subTotal + this.tax;
	this.total = cartTotal;
};

// module.exports = schema;

mongoose.model('Cart', schema);




