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

schema.methods.merge = function( anonCart ) {
	if (anonCart !== null) {
		this.products = this.products.concat( anonCart.products );
		this.save();
		console.log('after merge products', this.products);
		anonCart.remove();
	}
};

schema.methods.calculateCartAmounts = function() {
	var subTotal = 0;
	var nyTax = 0.0875;

	if (this.products.length) {

		this.products.forEach(function(product) {
			subTotal += ( product.price * product.quantity );
		});

		this.subTotal = subTotal;
	} 
	
	this.tax = this.subTotal*nyTax;
	this.total = this.subTotal*(nyTax + 1);

	return;
};

// schema.methods.calculateTax = function() {
// // calculate tax based on tax table
// };

// schema.methods.calculateTotal = function() {
// };

// module.exports = schema;

mongoose.model('Cart', schema);












