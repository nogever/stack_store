'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *product* state.
    $stateProvider
    .state('administrator.newProduct', {
        url: '/newproduct',
        controller: 'ProductController',
        templateUrl: 'js/admin/products/product.html'
    })
    .
    state('administrator.productSubmit', {
        url: '/newproduct/submit',
        controller: 'ProductController'
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
            var productId = $stateParams.id;
            return $http.get('/api/products/' + productId)
                     .then(function(response) {
                        console.log(response.data);
                return response.data;
            });
        }
    };
});

app.controller('ProductController', function ($scope, ProductFactory) {

    ProductFactory.getProduct().then(function(data) {
        $scope.product = data;
    });
    
    // $scope.newProduct = {};

    // $scope.newProduct.submitTheForm = function(item, event) {
    //     var dataObject = {
    //         name : $scope.myForm.name,
    //         car  : $scope.myForm.car
    //     };

    //     $http.post("/products", dataObject)
    //         .then (function(response) {
    //             console.log('hi');
    //     });
    // }

});











