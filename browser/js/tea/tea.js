'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('tea', {
		url:'/tea',
		templateUrl: 'js/tea/tea.html',
		controller: 'TeaCtrl',
		resolve: {
			teaProductsInfo: function (DrinkFactory) {
				return DrinkFactory.getTeaProducts('tea');
			}
		}
	});
});

app.factory('DrinkFactory', function ($http) {
	return {
		getTeaProducts: function(category) {

			var queryParams = {};

			if (category) {
				queryParams.category = category;
			}

			return $http.get('/api/products', {
				params: queryParams
			}).then(function(response) {
				console.log('tea', response.data);
				return response.data
			});
		}
	};
});

app.controller('TeaCtrl', function ($scope, teaProductsInfo) {
	$scope.teas = teaProductsInfo;
	console.log('TeaCtrl', $scope.teas);
	console.log('teaProductsInfo', teaProductsInfo);
});