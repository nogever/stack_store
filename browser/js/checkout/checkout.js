'use strict';
var stripe = require("stripe")(
  "sk_test_nHFUXc5ELdKZCqA6bU6qlAIr"
);

app.config(function ($stateProvider) {

	$stateProvider.state('cart.checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
		controller: 'CheckoutController'
	});

});

app.controller('CheckoutController', function ($scope) {

	$scope.month = 12;
	$scope.day = 31;

	$scope.getNumber = function(num) {
	    return new Array(num);   
	};

	$scope.charge = function () {
		stripe.charges.create({
		  amount: 400,
		  currency: "usd",
		  source: "tok_15zEPPL5vWGrXymrbUhkH4bL", // obtained with Stripe.js
		  description: "Charge for test@example.com"
		}).then(function(charge){
		  	console.log("Stripe Successful: ", charge);
		}, function(err) {
			console.log("Stripe Error: ", err);
		});
	};

});