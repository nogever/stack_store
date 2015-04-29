'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('products', {
    url:'/products',
    templateUrl: 'js/products/products.html',
    controller: 'ProductsCtrl'
  });
  $stateProvider.state('products.category', {
      url:'/category/:categoryName',
      templateUrl: 'js/products/products-list.html',
      controller: 'ProductByCategoryCtrl'
    });
  $stateProvider.state('products.home', {
    url: '/home',
    templateUrl: 'js/products/home.html',
    controller: 'ProductsHomeCtrl'
  });
    $stateProvider.state('products.product', {
      url: '/product/:id',
      templateUrl: 'js/products/product.html',
      controller: 'ProductCtrl'
    });
});

app.factory('DrinkProductsFactory', function ($http) {

  return {
    getProducts: function(category, typeName) {

      var queryParams = {};
      if (category) {
        queryParams.category = category;
      }

      if (typeName) {
        queryParams.typeName = typeName;
      }

      return $http.get('/api/products', {
          params: queryParams
        }).then(function(response) {
          return response.data;
        });
    }
  };
});

app.factory('DrinkProductFactory', function ($http, $stateParams) {

    return {
        getProduct: function() {
            return $http.get('/api/products/' + $stateParams.id)
                     .then(function(response) {
                return response.data;
            });
        }
    };

});

app.factory('ProductReviewsFactory', function ($http, $stateParams) {

    return {
        getReviews: function() {
            return $http.get('/api/products/' + $stateParams.id + '/reviews')
                     .then(function(response) {
                return response.data;
            });
        }
    };

});

app.controller('ProductsCtrl', function ($scope) {
    var categories = ['tea', 'coffee', 'decaf', 'hot', 'ice', 'green tea', 'black tea'];
    $scope.categories = categories;
});


app.controller('ProductByCategoryCtrl', function ($scope, DrinkProductsFactory, $stateParams) {

  var categoryName = $stateParams.categoryName;
  DrinkProductsFactory.getProducts(categoryName).then(function (products) {
    $scope.products = products;
  }).catch(function(err) {
    $scope.error = err;
  });

});

app.controller('ProductsHomeCtrl', function ($scope) {

});

app.controller('ProductCtrl', function ($scope, AuthService, DrinkProductFactory, ProductReviewsFactory, $stateParams, $http) {

  $scope.reviews = {};

  if (AuthService.isAuthenticated()) {

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
    
  }
                

  $scope.addReview = function() {
    // console.log('new review: ', $scope.newReview);
    $http.post('api/reviews', $scope.newReview)
      .then (function(response) {
          // console.log('reviews: ', response.data);
          $scope.reviews.push(response.data);
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
      // console.log('new options: ', $scope.newOptions);

      $http.put("api/products/" + data.id, $scope.newProduct)
      .then (function(response) {
          console.log('hi');
      }).catch(function(err) {
          console.log('err');
      });

  }

});

// app.controller('proByCategoryCtrl', function ($scope, teaProductsInfo) {
//   $scope.teas = teaProductsInfo;
// });