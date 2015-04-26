'use strict';
app.config(function ($stateProvider) {

	$stateProvider.state('coffee', {
		url:'/coffee',
		templateUrl: 'js/coffee/coffee.html',
		controller: 'CoffeeCtrl',
		resolve: {
			coffeeProductsInfo: function (CoffeeFactory) {
				return CoffeeFactory.getCoffeeProducts('coffee');
			}
		}
	});
});

app.factory('CoffeeFactory', function ($http) {
	return {
		getCoffeeProducts: function(category) {

			var queryParams = {};

			if (category) {
				queryParams.category = category;
			}

			return $http.get('/api/products', {
				params: queryParams
			}).then(function(response) {
				return response.data;
			});
		}
	};
});

app.controller('CoffeeCtrl', function ($scope, coffeeProductsInfo) {
	$scope.coffees = coffeeProductsInfo;
});