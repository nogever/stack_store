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
  })
  .state('products.category', {
    url:'/category/:name',
    templateUrl: 'js/products/products-list.html',
    controller: 'ProductsCtrl'
  })
  .state('products.coffee', {
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
      },
      allOptions: function(OptionsDropdowns) {
        return OptionsDropdowns.getOptions();
      }
    }
  })
  .state('products.tea', {
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
      },
      allOptions: function(OptionsDropdowns) {
        return OptionsDropdowns.getOptions();
      }
    }
  })
  .state('products.home', {
    url: '/home',
    templateUrl: 'js/products/home.html',
    controller: 'ProductsHomeCtrl'
  })
  .state('products.product', {
    url: '/product/:id',
    templateUrl: 'js/products/product.html',
    controller: 'ProductCtrl',
    resolve: {
      allOptions: function(OptionsDropdowns) {
        return OptionsDropdowns.getOptions();
      }
    }
  });
});

app.factory('DrinkProducts', function ($http, $stateParams) {

  return {
    getAll: function() {
      return $http.get('/api/products').then(function(response) {
          return response.data;
        });
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

app.controller('ProductsCtrl', function ($scope, $http, allDrinks, allCategories, allTypes, $stateParams, $modal) {

  $scope.products = allDrinks;
  $scope.categories = allCategories;
  $scope.types = allTypes;
  $scope.cat = $stateParams.name;

  $scope.quickView = function() {
    $http.post('api/reviews', $scope.newReview)
      .then (function(response) {
          $scope.reviews.push(response.data);
      }).catch(function(err) {
          console.log('err');
    });
  };

  $scope.animationsEnabled = true;

  $scope.open = function (size, productId) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'js/products/product-modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        allOptions: function(OptionsDropdowns) {
          return OptionsDropdowns.getOptions();
        },
        viewProduct: function() {
          return $http.get('/api/products/' + productId)
                 .then(function(response) {
            return response.data;
          });
        }
      }
    });

  };

});

app.controller('ProductsCoffeeCtrl', function ($scope, $http, allDrinks, allCategories, allTypes, $modal, allOptions) {

  $scope.products = allDrinks;
  $scope.categories = allCategories;
  $scope.types = allTypes;
  $scope.typeName = 'coffee';

  $scope.quickView = function() {
    $http.post('api/reviews', $scope.newReview)
      .then (function(response) {
          $scope.reviews.push(response.data);
      }).catch(function(err) {
          console.log('err');
    });
  };

  $scope.animationsEnabled = true;

  $scope.open = function (size, productId) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'js/products/product-modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        allOptions: function(OptionsDropdowns) {
          return OptionsDropdowns.getOptions();
        },
        viewProduct: function() {
          return $http.get('/api/products/' + productId)
                 .then(function(response) {
            return response.data;
          });
        }
      }
    });

  };

});

app.controller('ProductsTeaCtrl', function ($scope, $http, allDrinks, allCategories, allTypes, $modal, allOptions) {
  
  $scope.products = allDrinks;
  $scope.categories = allCategories;
  $scope.types = allTypes;
  $scope.typeName = 'tea';

  $scope.quickView = function() {
    $http.post('api/reviews', $scope.newReview)
      .then (function(response) {
          $scope.reviews.push(response.data);
      }).catch(function(err) {
          console.log('err');
    });
  };

  $scope.animationsEnabled = true;

  $scope.open = function (size, productId) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'js/products/product-modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        allOptions: function(OptionsDropdowns) {
          return OptionsDropdowns.getOptions();
        },
        viewProduct: function() {
          return $http.get('/api/products/' + productId)
                 .then(function(response) {
            return response.data;
          });
        }
      }
    });

  };

});

app.controller('ProductsHomeCtrl', function ($scope) {

});

app.controller('ProductCtrl', function ($scope, AuthService, ProductReviews, DrinkProducts, allOptions, $http, $state) {

  $scope.reviews = {};
  $scope.dropdowns = allOptions;

  if (AuthService.isAuthenticated()) {

    AuthService.getLoggedInUser()
      .then(function(user) {

        $scope.user = user;
        
        $scope.newReview = {
          user: user._id, 
          rating: null,
          text: null,
          title: null
        };

      })
      .then(DrinkProducts.getOne)
      .then(function(product) {
        $scope.newReview.product = product._id;
      }
    );
    
  }
  
  ProductReviews.getReviews().then(function(data) {
    $scope.reviews = data;
  });

  $scope.addReview = function() {
    $http.post('api/reviews', $scope.newReview)
      .then (function(response) {
          $scope.reviews.push(response.data);
      }).catch(function(err) {
          console.log('err');
    });
  };

  DrinkProducts.getOne()
    .then(function(data) {
        $scope.product = data;
        $scope.newProduct.productId = data._id;
        $scope.newProduct.price = data.price;
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

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, viewProduct, allOptions, $http) {

  $scope.product = viewProduct;
  $scope.dropdowns = allOptions;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.newOptions = {
    sweets: null,
    milk: null,
    flavors: null, 
    size: null,
    toppings: null,
  };

  $scope.newProduct = {
    productId: viewProduct._id,
    price: viewProduct.price,
    options: $scope.newOptions,
    quantity: 1
  };

  $scope.addToCart = function() {

    $http.put("api/cart", $scope.newProduct)
    .then(function(response) {
        $modalInstance.close($scope.product);
    }).catch(function(err) {
        console.log(err);
    });

  };
});
