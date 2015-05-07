'use strict';

app.config(function ($stateProvider) {

	$stateProvider.state('cart.checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
		controller: 'CheckoutController'
	});

});

app.controller('CheckoutController', function ($scope, CartFactory) {

	$scope.month = 12;
	$scope.day = 31;
	$scope.year = 10;

	var today = new Date();
	$scope.thisYear = today.getFullYear();
	console.log("This Year is: ", $scope.thisYear);

	// Nested Controller has an inherited scope from the CartController.
	// cartInfo is available here!

	$scope.getNumber = function(num) {
	    return new Array(num);   
	};

	var publishedKey = 'pk_test_HBre0jms0WDRFGRuDzUzwVyE';

	Stripe.setPublishableKey(publishedKey);
	// $scope.setKey = function(publishedKey)  {
		
		
	// 	$scope.submitForToken();
	// }

	$scope.submitForToken = function () {

		Stripe.card.createToken({
			num: $scope.card.ccNum,
			exp_month: $scope.card.ccExpMonth,
			exp_year: $scope.card.ccExpYear
		}, function(status, response) {
			var token = response.id;
			console.log("Stripe.js Error: ", status);
			console.log("Stripe.js Token: ", token);
		});
	};




	// $scope.charge = function () {
	// 	stripe.charges.create({
	// 	  amount: $scope.cartInfo.total,
	// 	  currency: "usd",
	// 	  source: "tok_15zEPPL5vWGrXymrbUhkH4bL", // obtained with Stripe.js
	// 	  description: "Charge for test@example.com"
	// 	}).then(function(charge){
	// 	  	console.log("Stripe Successful: ", charge);
	// 	}, function(err) {
	// 		console.log("Stripe Error: ", err);
	// 	});
	// };

});