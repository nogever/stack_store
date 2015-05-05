'use strict';

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

	$scope.purchase = function () {

		// console.log("Purchase function executed");
		
		var handler = StripeCheckout.configure({
		    key: 'pk_test_HBre0jms0WDRFGRuDzUzwVyE',
		    image: '/img/documentation/checkout/marketplace.png',
		    token: function(token) {
		      // Use the token to create the charge with a server-side script.
		      // You can access the token ID with `token.id`
				 // This is the callback 
		    }
		  });

		handler.open({
	    	name: 'Demo Site',
	    	description: '2 widgets',
	    	amount: 2000
		});
	};

});