var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {type: String, required: true},
	price: {type: Number, required: true},
	description: {type: String, required: true},
	category: [String],
	photo: [String],
	stock: {type: Number, required: true},
	cost: {type: Number, required: true},
});


schema.methods.getReviews = function() {
    return mongoose.model('Review').find({ product: this._id }).exec();
};

mongoose.model('Product', schema);
