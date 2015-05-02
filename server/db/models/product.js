var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {type: String, required: true},
	price: {type: Number, required: true},
	description: {type: String, required: true},
	type: {type: mongoose.Schema.Types.ObjectId, ref: 'Type'},
	categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categories'}],
	photo: String,
	stock: {type: Number, required: true},
	cost: {type: Number, required: true},
});


schema.methods.getReviews = function() {
    return mongoose.model('Review').find({ product: this._id }).exec();
};

mongoose.model('Product', schema);
