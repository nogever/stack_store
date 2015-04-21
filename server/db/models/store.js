var mongoose = require('mongoose');
var addressSchema = require('./address');

var schema = new mongoose.Schema({
	storeName: {type: String, required: true},
	storeLocation: [addressSchema],
	storeHours: {
		monday: { type: String, default: "6am - 10pm"},
		tuesday: { type: String, default: "7am - 10pm"},
		wednesday: { type: String, default: "7am - 10pm"},
		thursday: { type: String, default: "7am - 10pm"},
		friday: { type: String, default: "7am - 10pm"},
		saturday: { type: String, default: "7am - 12am"},
		sunday: { type: String, default: "7am - 12am"}
	}
});

mongoose.model('Store', schema);