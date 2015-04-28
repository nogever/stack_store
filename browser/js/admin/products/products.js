'use strict';

app.config(function ($stateProvider) {

    // Register our *products* state.
    $stateProvider.state('administrator.products', {
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'js/admin/products/products.html',
        resolve: {
            allProducts: function (ProductsFactory) {
                return ProductsFactory.getProducts();
            }
        }
    });

});

app.factory('ProductsFactory', function ($http) {
    return {
        getProducts: function() {
            return $http.get('/api/products')
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('ProductsController', function ($scope, allProducts) {

    $scope.products = allProducts;

});












