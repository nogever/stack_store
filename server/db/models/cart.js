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

schema.methods.calculateCartAmounts = function() {
    var subTotal = 0;
    var nyTax = 0.0875;

    if (this.products.length) {

        this.products.forEach(function(product) {
            subTotal += ( product.price * product.quantity );
        });

        this.subTotal = subTotal;
  
    } else {
    	this.subTotal = 0;
    }
    
    this.tax = subTotal*nyTax;
    this.total = subTotal*(nyTax + 1);
    this.save();
    // this.save(function(err){
    // 	if (err) throw err;
    // });
    
    // return;
};

schema.methods.merge = function( anonCart ) {
	// console.log('before merge products anonCart', anonCart.products);
	console.log('MERGE this: ', this);
	// console.log('anonCart: ', anonCart);

	if (anonCart !== null) {
		this.products = this.products.concat( anonCart.products );
		this.save();
		console.log('after merge products', this.products);
		anonCart.remove();
	}
	// return; 
};

// module.exports = schema;

mongoose.model('Cart', schema);












