var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, 
	rating: {type: Number, min: 1, max: 5},
	text: String,
	date: Date,
	title: String
});

mongoose.model('Review', schema);