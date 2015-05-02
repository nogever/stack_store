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
        getProducts: function(category, typeName) {
            var queryParams = {};
            if (category) {
              queryParams.category = category;
            }

            if (typeName) {
              queryParams.typeName = typeName;
            }
            return $http.get('/api/products', {params: queryParams})
                    .then(function(response) {
                        // console.log(response);
                return response.data;
            });
        }
    };
});

app.controller('ProductsController', function ($scope, allProducts) {

    $scope.products = allProducts;

});












