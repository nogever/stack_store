'use strict';
app.config(function ($stateProvider) {

    $stateProvider
    .state('administrator.orders', {
        url: '/orders',
        controller: 'OrdersController',
        templateUrl: 'js/admin/orders/orders.html',
        resolve: {
            allOrders: function(Order) {
                return Order.getAll().catch(function(err) {console.log('err');});
            }
        }
    })
    .state('administrator.order', {
        url: '/order/:id',
        controller: 'OrderController',
        templateUrl: 'js/admin/orders/order.html',
        resolve: {
            allDrinks: function(DrinkProducts) {
                return DrinkProducts.getAll();
            },
            currentUser: ['AuthService', function(AuthService) {
                return AuthService.getLoggedInUser();
            }]
        }
    })
    .state('administrator.addOrder', {
        url: '/add-order',
        controller: 'OrderController',
        templateUrl: 'js/admin/orders/order.html',
        resolve: {
            allDrinks: function(DrinkProducts) {
                return DrinkProducts.getAll();
            },
            currentUser: ['AuthService', function(AuthService) {
                return AuthService.getLoggedInUser();
            }]
        }
    });

});

app.factory('Order', function ($http, $state) {

    return {
        getOne: function(id) {
            return $http.get('/api/orders/' + id)
                .then(function(response) {
                    console.log('getOne factory', response.data);
                    return response.data;
            });
        },
        getAll: function() {
            return $http.get('/api/orders')
                     .then(function(response) {
                return response.data;
            });
        },
        status: function() {
            return [
                'ordered', 
                'paid', 
                'shipped', 
                'rejected', 
                'canceled', 
                'delivered', 
                'picked-up'
            ];
        },
        options: {
            sweets: ['none', 'sugar', 'splenda', 'raw sugar', 'honey'],
            milk: ['none', 'whole milk', 'half and half', 'reduced fat', 'skim', 'soy'],
            flavors: ['none', 'hazelnut', 'vanilla', 'chocolate'],
            size: ['fullstack', 'mediumstack', 'smallstack'],
            toppings: ['none', 'cinnamon', 'JAVAscript', 'cocoa powder', 'whip cream']
        },
        save: function(newOrder) {
            newOrder.products.forEach(function(product, index) {
                newOrder.products[index].productId = product.productId._id;
            });
            newOrder._user = newOrder._user._id;
            console.log('saving', newOrder);
            return $http.post('/api/orders', newOrder)
                    .then(function(response) {
                        $state.go('administrator.orders');
                    }).catch(function(err) {
                        console.log('errrr');
                    });
        }
    };

});

app.controller('OrdersController', function ($scope, allOrders) {
    $scope.orders = allOrders;
});

app.controller('OrderController', function ($scope, $stateParams, $filter, Order, currentUser, allDrinks) {

    $scope.status = Order.status();
    $scope.products = allDrinks;
    $scope.options = Order.options;   

    if ($stateParams.id) {
        Order.getOne($stateParams.id).then(function(order) {
            $scope.order = order;
            var ngDate = new Date(order.date);
            $scope.newOrder = {
                orderNumber: order.orderNumber,
                products: order.products,
                date: ngDate,
                orderStatus: order.orderStatus,
                _user: order._user
            };
            console.log($scope.newOrder);
        });
    } else {
        $scope.newOrder = {
            orderNumber: null,
            products: [],
            date: new Date(),
            orderStatus: 'paid',
            _user: currentUser
        };
    }
    var tmpOptions = {sweets:'none',flavors:'none',milk:'none',size:'fullstack',toppings:'none'};
    var tmpProduct = {productId: null, options: $scope.newOptions, quantity: 1};
    $scope.tempOptions = tmpOptions;
    $scope.tempProduct = tmpProduct;

    $scope.addProductToOrder = function() {
        $scope.newOptions = $scope.tempOptions;
        $scope.newProduct = $scope.tempProduct;
        $scope.newProduct.options = $scope.newOptions;
        $scope.newProduct.price = $scope.tempProduct.productId.price;

        $scope.newOrder.products.push($scope.newProduct);

        $scope.tempOptions = tmpOptions;
        $scope.tempProduct = tmpProduct;
    };

    $scope.submit = function() {
        Order.save($scope.newOrder);
    };

});













