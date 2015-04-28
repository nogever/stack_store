'use strict';

app.config(function ($stateProvider) {

	$stateProvider.state('cart.checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
		controller: 'CheckoutController'
	});

});

app.controller('CheckoutController', function ($scope) {

	$scope.testObj = {
		name: "Peter",
		title: "Awesome person"
	};

});