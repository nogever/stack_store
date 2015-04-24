var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	parentCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	name: String
});

module.exports = schema;