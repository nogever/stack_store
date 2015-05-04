var mongoose = require('mongoose');
var optionsSchema = require('./options');
// var _ = require('underscore');

var ProductModel = mongoose.model('Product');

var schema = new mongoose.Schema({
	orderNumber: {type: Number, unique: true, index: true},
	products: [{
		productId: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Product'
		}, 
		options: [optionsSchema],
		quantity: Number,
		price: Number
	}],
	date: Date,
	orderStatus: { type: String, enum: [
		'ordered', 
		'paid', 
		'shipped', 
		'rejected', 
		'canceled', 
		'delivered', 
		'picked-up'
		]
	},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}
 //, { autoIndex: false } recommended to be added in production by the Mongoose document
 );

schema.methods.getPrice = function() {
	if (this.products.length) {
		this.products.forEach(function(product) {
			ProductModel.findById(product.productId, function(err, p) {
				product.price = p.price;
			});
		});
	}
};

schema.methods.populateOrders = function() {
	//return mongoose.model('Products').find(...).exec()   ????
};

schema.methods.populateProducts = function(order) {
	var thisOrder = this;

	var ids = _.pluck(this.products, 'productId');
	// ['sadfsdfsdfsdf', 'asdfsdfsdfsdfsd', 'sdfsdfsdfsdfsdf']

	return mongoose.model('Product').find({ _id: { $in: ids }}).exec().then(function(products) {
		products.forEach(function(p, index){
			thisOrder.products[index].title = p.title;
			thisOrder.products[index].description = p.description;
			thisOrder.products[index].photo = p.photo;
		});
	});

};

function sequenceGenerator(name){
  var SequenceSchema, Sequence;

  SequenceSchema = new mongoose.Schema({
    nextSeqNumber: { type: Number, default: 1 }
  });

  Sequence = mongoose.model(name + 'Seq', SequenceSchema);

  return {
    next: function(callback){
      Sequence.find(function(err, data){
        if(err) throw(err);
        if(data.length < 1){
          Sequence.create({}, function(err, seq){
            if(err) throw(err);
            callback(seq.nextSeqNumber);
          });
        } else {
          Sequence.findByIdAndUpdate(data[0]._id, { $inc: { nextSeqNumber: 1 } }, function(err, seq){
            if(err) { throw(err); }
            callback(seq.nextSeqNumber);
          });
        }
      });
    }
  };
}

var sequence = sequenceGenerator('order');


schema.pre('save', function(next) {
	var currentDate = new Date();
	this.date = currentDate;
	next();
});

schema.pre('save', function(next){
  var doc = this;
  sequence.next(function(nextSeq){
    doc.orderNumber = nextSeq;
    next();
  });
});

mongoose.model('Order', schema);







