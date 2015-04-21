var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: String, //required
	price: {type: Number, get: getPrice, set: setPrice}, //required
	description: String, //requred
	category: [String],
	photo: [String],
	reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review'}], // take out, replace with method
	stock: Number, //requied
	cost: Number, //required
	sale: Boolean, //probably take out and replace with discount system
	discount: {type: Number, get: getDiscount, set: setDiscount} //probably take out
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
