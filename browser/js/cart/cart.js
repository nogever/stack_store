app.config(function($stateProvider) {

	$stateProvider
		.state('cart', {
			url:'/cart',
			templateUrl: 'js/cart/cart.html',
			controller: 'CartCtrl',
			resolve: {
				cartInfo: function (CartFactory) {
					return CartFactory.getCartInfo();	
				}
			}
		});

});

app.factory('CartFactory', function ($http) {
	return {
		getCartInfo: function (cartId) {
			
			var queryParams = {};

			if (cartId) {
				queryParams.cartId = cartId;
			}

			return $http.get('/api/cart', {
				params: queryParams
			}).then(function(response) {
				return response.data;
			});
		}
	};
});

app.controller('CartCtrl', function ($scope, cartInfo) {
	$scope.myTestCart = {
		cartName: 'my cart!',
		cartQty: 10
	};

	$scope.cartInfo = cartInfo;
});