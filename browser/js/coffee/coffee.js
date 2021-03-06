'use strict';
app.config(function ($stateProvider) {
  $stateProvider.state('coffee', {
    url:'/coffee',
    templateUrl: 'js/coffee/coffees.html',
    controller: 'CoffeeCtrl',
  });
  $stateProvider.state('coffee.home', {
    url:'/home',
    templateUrl: 'js/coffee/home.html',
    controller: 'CoffeeHomeCtrl'
  });
  $stateProvider.state('coffee.products', {
    url:'/products/:categoryName',
    templateUrl: 'js/products/products-list.html',
    controller: 'CoffeeListCtrl'
  });
  $stateProvider.state('coffee.product', {
    url: '/product/:id',
    templateUrl: 'js/products/product.html',
    controller: 'ProductCtrl' // ProductCtrl?
  });

});

app.controller('CoffeeCtrl', function ($scope, $http) {
  var queryParams = {
    category: null,
    typeName: 'coffee'
  };
  $http.get('/api/products', {
          params: queryParams
        }).then(function(response) {
          $scope.coffees = response.data;
        });
});

app.controller('CoffeeHomeCtrl', function ($scope) {

});

app.controller('CoffeeListCtrl', function ($scope, DrinkProductsFactory, $stateParams) {
    
  var categoryName = $stateParams.categoryName;

  var typeName = 'coffee';

  if (categoryName === 'coffee'){
    categoryName = null;
  }

  DrinkProductsFactory.getProducts(categoryName, typeName).then(function (products) {
    $scope.products = products;
  }).catch(function(err) {
    $scope.error = err;
  });

});

app.controller('CoffeeProductCtrl', function ($scope, $http, DrinkProductFactory, ProductReviewsFactory, $stateParams) {
  DrinkProductFactory.getProduct().then(function(data) {
        $scope.product = data;
    });

    ProductReviewsFactory.getReviews().then(function(data) {
      $scope.reviews = data;
    });


    $scope.newOptions = {
        sweets: null,
        milk: null,
        flavors: null, 
        size: null,
        toppings: null,
    };

    $scope.submit = function() {

        $http.put("api/products/" + $scope.product._id, $scope.newOption)
        .then (function(response) {
            console.log('hi');
        }).catch(function(err) {
            console.log('err');
        });
    };
});