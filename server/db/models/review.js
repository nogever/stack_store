var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, 
	rating: {type: Number, min: 1, max: 5},
	text: String, //required
	date: Date, // shoudl be set in pre save hook
	title: String //required
});

mongoose.model('Review', schema);