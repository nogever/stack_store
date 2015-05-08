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
			});
		}
	};
});

app.factory('PostOrder', function($http) {
	return {
		createOrder: function (newOrder) {
			return $http.post('api/orders', newOrder).then(function(response) {
				console.log("Order Created: ", response.data);
				return response.data;
			});
		},

		destroyCart: function () {
			return $http.delete('api/cart/destroy').then(function(response) {
				console.log	("Cart was Destroyed: ", response.data);
				response.data;
			});
		}
	}
});

app.controller('CheckoutController', function ($scope, CartFactory, StripeFactory, PostOrder, $state) {

	$scope.ccProcessingError = false;

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

			// Stripe will throw an error if not given an integer amount to charge
			var numberToSubmit = Math.floor($scope.cartInfo.total * 100);

			if(response) {
				StripeFactory.postCharge({
					amount: numberToSubmit,
					token: token,
					description: $scope.cartInfo._id
				}).then(function(charge) {
					console.log("Stripe Processed on FrontEnd: ", charge);
					//consider a STATE Redirect here upon success.
					$scope.cartInfo.products.forEach(function(product, index) {
						$scope.cartInfo.products[index].productId = product.productId._id;
					});

					delete $scope.cartInfo['_id'];

					PostOrder.createOrder($scope.cartInfo)
						.then(function(order) {
							console.log("Order from backend: ", order);
							
							PostOrder.destroyCart()
								.then(function(cart) {
									console.log("Cart has been destroyed, control returned to Front End", cart);
									$state.go('products.coffee');
								}).catch(function(err) {
									console.log("Cart destroy failed, control returned to Front", err.stack);
								});

						}).catch(function(err) {
							console.log("Order from backend failed", err);
						});

				}).then(null, function(err) {
					console.log("Stripe POST Failed on FrontEnd: ", err.error.code);
					$scope.ccProcessingError = true;
				});
			}

		});

	};

});