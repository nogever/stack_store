var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	id: {type: Number, unique: true},
	product: [{ //might want to make this a schema
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
	date: Date, //presave hook to fill in
	orderStatus: String //take a look an enum { type: String, enum: ['ordered', 'paid', 'shipped'] }
});

schema.methods.populateOrders = function() {
	//return mongoose.model('Products').find(...).exec()
}

mongoose.model('Order', schema);