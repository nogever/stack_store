var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	sweets: String,
	milk: String,
	flavors: String, 
	size: String,
	toppings: String,
	price: Number
});

module.exports = schema;