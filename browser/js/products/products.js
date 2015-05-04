'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('products', {
    url:'/products',
    templateUrl: 'js/products/products.html',
    controller: 'ProductsCtrl',
    resolve: {
      allDrinks: function(DrinkProducts) {
        return DrinkProducts.getAll();
      }
    }
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

app.controller('ProductsCtrl', function ($scope, $http, allDrinks, CategoriesFactory, TypesFactory) {
  
  $scope.products = allDrinks;

  // CategoriesFactory.getCategories().then(function(data) {
  //   var categories = data;
  //   // console.log(categories, typeof categories);
  //   categories.forEach(function(category, index) {
  //     if (category.name === 'green') {
  //       queryParams.categoryName = categories[index]._id;
  //     }
  //   });
  // });

  // TypesFactory.getTypes().then(function(data) {
  //   var types = data;
  //   // console.log(types, typeof types);
  //   types.forEach(function(type, index) {
  //     console.log(type);
  //     if (type.name === 'Coffee') {
  //       queryParams.typeName = types[index]._id;
  //     } else if (type.name === 'Tea') {
  //       queryParams.typeName = types[index]._id;
  //     }
  //   });
  // });

  // $http.get('/api/products', {
  //         params: queryParams
  //       }).then(function(response) {
  //         $scope.products = response.data;
  //       });
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
