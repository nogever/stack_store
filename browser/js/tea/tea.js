'use strict';
app.config(function ($stateProvider) {
  $stateProvider.state('tea', {
    url:'/tea',
    templateUrl: 'js/tea/teas.html',
    controller: 'TeaCtrl',
  });
  $stateProvider.state('tea.home', {
    url:'/home',
    templateUrl: 'js/tea/home.html',
    controller: 'TeaHomeCtrl'
  });
  $stateProvider.state('tea.products', {
    url:'/products/:categoryName',
    templateUrl: 'js/products/products-list.html',
    controller: 'TeaListCtrl'
  });
  $stateProvider.state('tea.product', {
    url: '/product/:id',
    templateUrl: 'js/js/tea.html',
    controller: 'TeaProductCtrl' // ProductCtrl?
  });

});

app.controller('TeaCtrl', function ($scope, $http) {
  var queryParams = {
    category: null,
    typeName: 'tea'
  }
  $http.get('/api/products', {
          params: queryParams
        }).then(function(response) {
          $scope.teas = response.data;
        });

});

app.controller('TeaHomeCtrl', function ($scope) {

});

app.controller('TeaListCtrl', function ($scope, DrinkProductsFactory, $stateParams) {
  var categoryName = $stateParams.categoryName;

  var typeName = 'tea';

  if (categoryName === 'tea'){
    categoryName = null;
  }

  DrinkProductsFactory.getProducts(categoryName, typeName).then(function (products) {
    $scope.products = products;
  }).catch(function(err) {
    $scope.error = err;
  });

});

app.controller('TeaProductCtrl', function ($scope, DrinkProductFactory, ProductReviewsFactory, $stateParams) {

  AuthService.getLoggedInUser()
    .then(function(user) {

      $scope.user = user;
      
      // if (user._id) {

      $scope.newReview = {
        user: user._id, 
        rating: null,
        text: null,
        title: null
      };

      // }

    })
    .then(DrinkProductFactory.getProduct)
    .then(function(product) {
      $scope.newReview.product = product._id;
    }
  );

  $scope.addReview = function() {
    console.log('new review: ', $scope.newReview);
    $http.post('api/reviews', $scope.newReview)
      .then (function(response) {
          console.log('new review added');
      }).catch(function(err) {
          console.log('err');
    });
  };

  DrinkProductFactory.getProduct()
    .then(function(data) {
        $scope.product = data;
    });

  ProductReviewsFactory.getReviews().then(function(data) {
    $scope.reviews = data;
  });

});