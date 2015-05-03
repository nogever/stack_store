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

app.factory('OptionsDropdowns', function ($http) {

  return {
    getOptions: function () {
      return $http.get('/api/cart/options')
        .then(function(response) {
          // console.log("dropdown data", response.data);
          return response.data;
        });
    }
  }

});

app.controller('ProductsCtrl', function ($scope, $http) {
  // var teaCategories = ['tea', 'decaf', 'ice', 'green tea', 'black tea'];
  // var coffeeCategories = ['coffee', 'decaf', 'ice', 'americano', 'espresso', 'freshly brewed coffee'];

  // $scope.teaCategories = teaCategories;
  // $scope.coffeeCategories = coffeeCategories;

  var teaQueryParams = {
    category: null,
    typeName: 'tea'
  }

  $http.get('/api/products', {
          params: teaQueryParams
        }).then(function(response) {
          $scope.teas = response.data;
        });
        
  var coffeeQueryParams = {
    category: null,
    typeName: 'coffee'
  }

  $http.get('/api/products', {
          params: coffeeQueryParams
        }).then(function(response) {
          $scope.coffees = response.data;
        });

  var queryParams = {
    category: null,
    typeName: null
  }

  $http.get('/api/products', {
          params: queryParams
        }).then(function(response) {
          $scope.products = response.data;
        });
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

app.controller('ProductCtrl', function ($scope, AuthService, DrinkProductFactory, ProductReviewsFactory, OptionsDropdowns, $stateParams, $http, $state) {

  $scope.reviews = {};

  OptionsDropdowns.getOptions()
    .then(function(options) {
      $scope.dropdowns = options;
  });

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
        $scope.newProduct.productId = data._id;
        $scope.newProduct.price = data.price;
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

  $scope.newProduct = {
    options: $scope.newOptions,
    quantity: 1
  }

  $scope.addToCart = function() {

      $http.put("api/cart", $scope.newProduct)
      .then(function(response) {
          // display the current cart in popup window
          console.log("new product response", response);
          $state.go('^');
      }).catch(function(err) {
          console.log('add to cart returned err', err);
          $state.go('^');
      });

  }

});
