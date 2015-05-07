var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	whiteList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	blackList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	discount: Number,
	expires: Date,
	revenueGenerated: Number, 
	code: String
});


mongoose.model('Promo', schema);
