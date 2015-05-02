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

app.controller('AddProductController', function($scope, $http, CategoriesFactory, TypesFactory) {

    CategoriesFactory
        .getCategories()
        .then(function(categories) {
            $scope.categories = categories;
            // console.log($scope.categories); 
        });

    TypesFactory
        .getTypes()
        .then(function(types) {
            $scope.types = types;
            // console.log($scope.types);
        });

    $scope.newProduct = {
        title: null,
        price: 0,
        description: null,
        type: 'select one',
        category: ['select one'],
        photo: 'http://upload.wikimedia.org/wikipedia/commons/c/cb/Tea_leaves_steeping_in_a_zhong_%C4%8Daj_05.jpg',
        stock: 0,
        cost: 0
    };

    $scope.submit = function() {
        console.log('new product: ', $scope.newProduct);

        $http.post("api/products", $scope.newProduct)
        .then(function(response) {
            console.log('hi');
        }).catch(function(err) {
            console.log('err');
        });

    }

});

app.controller('ProductController', function ($scope, $http, ProductFactory, CategoriesFactory, TypesFactory) {

    CategoriesFactory
        .getCategories()
        .then(function(categories) {
            $scope.categories = categories; 
        });

    TypesFactory
        .getTypes()
        .then(function(types) {
            $scope.types = types;
            // console.log($scope.types);
        });

    ProductFactory.getProduct().then(function(data) {

        $scope.product = data;

        $scope.newProduct = {
            title: data.title,
            price: data.price,
            description: data.description,
            type: data.type,
            category: [data.category],
            photo: data.photo,
            stock: data.stock,
            cost: data.cost,
        };

        $scope.submit = function() {
            console.log('new product: ', $scope.newProduct);

            $http.put("api/products/" + data.id, $scope.newProduct)
            .then (function(response) {
                console.log('hi');
            }).catch(function(err) {
                console.log('err');
            });

        }

    });
    
});











