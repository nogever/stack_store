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

app.controller('TeaCtrl', function ($scope) {
  var categories = ['tea', 'decaf', 'hot', 'ice', 'green tea', 'black tea'];
  $scope.categories = categories;
});

app.controller('TeaHomeCtrl', function ($scope) {

});

app.controller('TeaListCtrl', function ($scope, DrinkProductsFactory, $stateParams) {
    console.log('hi');
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
  // DrinkProductFactory.getProduct().then(function(data) {

  //       $scope.product = data;

  //   });

  //   ProductReviewsFactory.getReviews().then(function(data) {
  //     $scope.reviews = data;
  //   });


  //   $scope.newOptions = {
  //       sweets: null,
  //       milk: null,
  //       flavors: null, 
  //       size: null,
  //       toppings: null,
  //   };

  //   $scope.submit = function() {
  //       console.log('new options: ', $scope.newOptions);

  //       $http.put("api/products/" + data.id, $scope.newOption)
  //       .then (function(response) {
  //           console.log('hi');
  //       }).catch(function(err) {
  //           console.log('err');
  //       });
  //   }


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

  $scope.coffeeOptions= {
    sweets: [
        'honey',
        'raw sugar',
        'splenda',
        'none'
    ],
    milk: [
        'soy',
        'fat free',
        'full milk',
        'none'
    ],
    flavors: [
        'A',
        'B',
        'C',
        'none'
    ],
    size: [
        'small',
        'medium',
        'large'
    ],
    toppings: [
        'D',
        'E',
        'F',
        'none'
    ]
  };

  $scope.milkOptions= {
    sweets: [
        'honey',
        'raw sugar',
        'splenda',
        'none'
    ],
    milk: [
        'soy',
        'fat free',
        'full milk',
        'none'
    ],
    flavors: [
        'A',
        'B',
        'C',
        'none'
    ],
    size: [
        'small',
        'medium',
        'large'
    ],
    toppings: [
        'D',
        'E',
        'F',
        'none'
    ]
  };

  $scope.newOptions = {
    sweets: null,
    milk: null,
    flavors: null, 
    size: null,
    toppings: null,
  };

  $scope.addToCart = function() {
      console.log('new options: ', $scope.newOptions);

      $http.put("api/products/" + data.id, $scope.newProduct)
      .then (function(response) {
          console.log('hi');
      }).catch(function(err) {
          console.log('err');
      });

  }


});