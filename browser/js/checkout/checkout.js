'use strict';

app.config(function ($stateProvider) {

	$stateProvider.state('cart.checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
		controller: 'CheckoutController'
	});

});

app.factory('StripeFactory', function($http) {
	return {
		postCharge: function(chargeParams) {
			return $http.post('/api/checkout', {
				params: chargeParams
			}).then(function(response) {
				console.log("Stripe Processed: ", response.data);
				return response.data;
			}).catch(function(err) {
				console.log("Stripe Post Failed: ", err);
			})
		}
	}
});

app.controller('CheckoutController', function ($scope, CartFactory, StripeFactory) {

	$scope.month = 12;
	$scope.day = 31;
	$scope.year = 10;

	var today = new Date();
	$scope.thisYear = today.getFullYear();
	// console.log("This Year is: ", $scope.thisYear);

	// Nested Controller has an inherited scope from the CartController.
	// cartInfo is available here!

	$scope.getNumber = function(num) {
	    return new Array(num);   
	};

	var publishedKey = 'pk_test_HBre0jms0WDRFGRuDzUzwVyE';

	Stripe.setPublishableKey(publishedKey);

	$scope.submitForToken = function () {

		Stripe.card.createToken({
			number: $scope.card.ccNum,
			exp_month: $scope.card.ccExpMonth,
			exp_year: $scope.card.ccExpYear
		}, function(status, response) {
			var token = response.id;

			console.log("Stripe.js Error: ", status);
			console.log("Stripe.js Token: ", token);
			console.log("Stripe.js Response: ", response);

			if(response) {
				StripeFactory.postCharge({
					amount: 400
				}).then(function(charge) {
					console.log("Stripe Processed on FrontEnd: ", charge);
				}).then(null, function(err) {
					console.log("Stripe Failed on FrontEnd: ", err.error.code);
				});
			};

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