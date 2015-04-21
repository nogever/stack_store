var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	whiteList: [{ type: objectid, ref: 'Product'}],
	blacklist: [{ type: objectid, ref: 'Product'}],
	discountAmount: Number,
	expires: Date,
	revenueGenerated: Number
});


mongoose.model('Discount', schema);
