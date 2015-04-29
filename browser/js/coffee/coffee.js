'use strict';
app.config(function ($stateProvider) {
  $stateProvider.state('coffee', {
    url:'/coffee',
    templateUrl: 'js/coffee/coffee.html',
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

app.controller('CoffeeCtrl', function ($scope) {
  var categories = ['coffee', 'decaf', 'ice', 'americano', 'espresso', 'freshly brewed coffee'];
  $scope.categories = categories;
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

app.controller('CoffeeProductCtrl', function ($scope, DrinkProductFactory, ProductReviewsFactory, $stateParams) {
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
        console.log('new options: ', $scope.newOptions);

        $http.put("api/products/" + data.id, $scope.newOption)
        .then (function(response) {
            console.log('hi');
        }).catch(function(err) {
            console.log('err');
        });
    }
});