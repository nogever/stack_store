'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('products', {
    url:'/products',
    templateUrl: 'js/products/products.html',
    controller: 'ProductsCtrl',
    resolve: {
      allDrinks: function(DrinkProducts) {
        return DrinkProducts.getAll();
      },
      allCategories: function(CategoriesFactory) {
        return CategoriesFactory.getCategories();
      },
      allTypes: function(TypesFactory) {
        return TypesFactory.getTypes();
      }
    }
  }).state('products.category', {
      url:'/category/:name',
      templateUrl: 'js/products/products-list.html',
      controller: 'ProductsCtrl'
    }).state('products.coffee', {
      url:'/type/coffee',
      templateUrl: 'js/products/products-list-type.html',
      controller: 'ProductsCoffeeCtrl',
      resolve: {
        allDrinks: function(DrinkProducts) {
          return DrinkProducts.getAll();
        },
        allCategories: function(CategoriesFactory) {
          return CategoriesFactory.getCategories();
        },
        allTypes: function(TypesFactory) {
          return TypesFactory.getTypes();
        }
      }
    }).state('products.tea', {
      url:'/type/tea',
      templateUrl: 'js/products/products-list-type.html',
      controller: 'ProductsTeaCtrl',
      resolve: {
        allDrinks: function(DrinkProducts) {
          return DrinkProducts.getAll();
        },
        allCategories: function(CategoriesFactory) {
          return CategoriesFactory.getCategories();
        },
        allTypes: function(TypesFactory) {
          return TypesFactory.getTypes();
        }
      }
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

app.factory('DrinkProducts', function ($http, $stateParams) {

  return {
    getAll: function() {
      return $http.get('/api/products').then(function(response) {
          return response.data;
        })
    },
    getOne: function() {
        return $http.get('/api/products/' + $stateParams.id)
                 .then(function(response) {
            return response.data;
        });
    }
  };
});

app.factory('ProductReviews', function ($http, $stateParams) {

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
  };

});

app.controller('ProductsCtrl', function ($scope, $http, allDrinks, allCategories, allTypes, $stateParams) {
  
  $scope.products = allDrinks;
  $scope.categories = allCategories;
  $scope.types = allTypes;
  $scope.typeName = $stateParams.name;
  $scope.cat = $stateParams.name;

});

app.controller('ProductsCoffeeCtrl', function ($scope, $http, allDrinks, allCategories, allTypes) {
  
  $scope.products = allDrinks;
  $scope.categories = allCategories;
  $scope.types = allTypes;
  $scope.typeName = 'coffee';

});

app.controller('ProductsTeaCtrl', function ($scope, $http, allDrinks, allCategories, allTypes) {
  
  $scope.products = allDrinks;
  $scope.categories = allCategories;
  $scope.types = allTypes;
  $scope.typeName = 'tea';

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
  };

  $scope.addToCart = function() {

      console.log("Starting API/CART PUT request", Date.now());
      $http.put("api/cart", $scope.newProduct)
      .then(function(response) {
          // display the current cart in popup window
          console.log("new product response", response);
          console.log("received API/CART PUT request", Date.now());
          $state.go('home');
      }).catch(function(err) {
          console.log("ERROR from API/CART PUT request", Date.now());
          console.log('add to cart returned err', err);
          $state.go('home');
      });

  };

});
