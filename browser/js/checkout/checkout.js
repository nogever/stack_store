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
	}

});