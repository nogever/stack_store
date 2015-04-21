var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, 
	rating: {type: Number, min: 1, max: 5},
	text: {type: String, required: true}
	date: Date,
	title: {type: String, required: true}
});

schema.pre('save', function(next) {
	var currentDate = new Date();
	this.date = currentDate;
	next();
})

mongoose.model('Review', schema);