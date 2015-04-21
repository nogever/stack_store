var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	whiteList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	blacklist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	discountAmount: Number,
	expires: Date,
	revenueGenerated: Number
});


mongoose.model('Discount', schema);
