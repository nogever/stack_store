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

// module.exports = schema;

mongoose.model('Options', schema);

// var options = new Options({name: "Sean Kim", username: 'srockk', email: 'nogever@ggmail.com', roles: ['admin'], password: 'password'});

// options.save(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('user: ' + user.username + " saved.");
//   }
// });










