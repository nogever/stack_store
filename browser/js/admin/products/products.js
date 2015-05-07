'use strict';

app.config(function ($stateProvider) {

    // Register our *products* state.
    $stateProvider.state('administrator.products', {
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'js/admin/products/products.html',
        resolve: {
            allProducts: function (DrinkProducts) {
                return DrinkProducts.getAll();
            }
        }
    });

});

// app.factory('ProductsFactory', function ($http) {
//     return {

//         getProducts: function() {
//             return $http.get('/api/products')
//                     .then(function(response) {
//                 return response.data;
//             });
//         }
//     };
// });

app.controller('ProductsController', function ($scope, $http,  allProducts, DrinkProducts) {

    $scope.products = allProducts;

    $scope.delete = function(id) {
        $http.delete('api/products/' + id)
        .then(DrinkProducts.getAll)
        .then(function(products) {
            $scope.products = products;    
        }).catch(function(err) {
            console.log('delete product returned err');
        });
    };

});








