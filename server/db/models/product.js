var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	id: {type: Number, unique: true},
	title: String,
	price: {type: Number, get: getPrice, set: setPrice},
	description: String,
	category: [String],
	photo: String,
	reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
	stock: Number,
	cost: Number,
	sale: Boolean,
	discount: {type: Number, get: getDiscount, set: setDiscount}
});

function getPrice () {

}
function setPrice () {

}
function getDiscount () {

}
function setDiscount () {

}

mongoose.model('Product', schema);
