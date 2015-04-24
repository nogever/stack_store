app.config(function($stateProvider) {

	$stateProvider
		.state('cart', {
			url:'/cart',
			templateUrl: 'js/cart/cart.html',
			controller: 'CartCtrl'
		});

});

// app.factory('CartFactory', function ($http) {
// 	return {
// 		getCartInfo: function () {

// 		}
// 	}
// }

app.controller('CartCtrl', function ($scope) {
	$scope.myCart = {
		cartName: 'my cart!',
		cartQty: 10
	};
});