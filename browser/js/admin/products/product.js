'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *product* state.
    $stateProvider
    .state('administrator.newProduct', {
        url: '/product',
        controller: 'AddProductController',
        templateUrl: 'js/admin/products/product.html'
    })
    .state('administrator.product', {
        url: '/product/:id',
        controller: 'ProductController',
        templateUrl: 'js/admin/products/product.html'
    });
});

app.factory('ProductFactory', function ($http, $stateParams) {

    return {
        getProduct: function() {
            return $http.get('/api/products/' + $stateParams.id)
                     .then(function(response) {
                return response.data;
            });
        }
    };

});

app.controller('AddProductController', function($scope, $http) {

    $scope.newProduct = {
        title: null,
        price: 0,
        description: null,
        category: [null],
        photo: null,
        stock: 0,
        cost: 0
    };

    $scope.submit = function() {
        console.log('new product: ', $scope.newProduct);

        $http.post("/products", $scope.newProduct)
        .then(function(response) {
            console.log('hi');
        }).catch(function(err) {
            console.log('err');
        });

    }

});

app.controller('ProductController', function ($scope, $http, ProductFactory) {

    ProductFactory.getProduct().then(function(data) {

        $scope.product = data;

        $scope.newProduct = {
            title: data.title,
            price: data.price,
            description: data.description,
            category: [data.category],
            photo: data.photo,
            stock: data.stock,
            cost: data.cost,
        };

        $scope.submit = function() {
            console.log('new product: ', $scope.newProduct);

            $http.put("/products/" + data.id, $scope.newProduct)
            .then (function(response) {
                console.log('hi');
            }).catch(function(err) {
                console.log('err');
            });

        }

    });
    
});











