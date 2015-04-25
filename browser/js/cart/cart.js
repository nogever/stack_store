app.config(function($stateProvider) {

	$stateProvider
		.state('cart', {
			url:'/cart',
			templateUrl: 'js/cart/cart.html',
			controller: 'CartCtrl',
			resolve: {
				return CartFactory.getCartInfo();
			}
		});

});

app.factory('CartFactory', function ($http) {
	return {
		getCartInfo: function () {
			return $http.get('/api/carts', {

			}).then(function(response) {
				return response.data;
			})
		}
	}
}

app.controller('CartCtrl', function ($scope) {
	$scope.myTestCart = {
		cartName: 'my cart!',
		cartQty: 10
	};

	$scope.cartInfo = getCartInfo;
});