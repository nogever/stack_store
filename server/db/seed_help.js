var user

mongoose.model('User')
  .create({})
  .then(function(_user) {
  	user = _user
  	return mongoose.model('Product').create({})
  })
  .then(function(product) {
  	return mongoose.model('Review').create({
  		product: product._id,
  		user: user._id
  	})
  })