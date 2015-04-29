var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	sweets: { 
		type: String,
		default: 'none',
		enum: [
			'none',
			'sugar', 
			'splenda', 
			'raw sugar', 
			'honey'
		]
	},
	milk: { 
		type: String, 
		default: 'none',
		enum: [
			'none',
			'whole milk', 
			'half and half', 
			'reduced fat', 
			'skim', 
			'soy'
		]
	},
	flavors: { 
		type: String, 
		default: 'none',
		enum: [
			'none',
			'hazelnut', 
			'vanilla', 
			'chocolate'
		]
	}, 
	size: { 
		type: String, 
		default: 'none',
		enum: [
			'none',
			'fullstack', 
			'mediumstack', 
			'smallstack'
		]
	},
	toppings: { 
		type: String, 
		default: 'none',
		enum: [
			'none',
			'cinnamon', 
			'JAVAscript', 
			'cocoa powder', 
			'whip cream'
		]
	}
});

// schema.pre('save', function(next) {


// 	// var currentDate = new Date();
// 	// this.date = currentDate;
// 	// next();
// });

module.exports = schema;















