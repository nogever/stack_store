'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('administrator.orders', {
        url: '/orders',
        controller: 'OrdersController',
        templateUrl: 'js/admin/orders/orders.html',
        resolve: {
            allOrders: function (Order) {
                return Order.getAll();
            }
        }
    }).state('administrator.addOrder', {
        url: '/add-order',
        controller: 'OrderController',
        templateUrl: 'js/admin/orders/order.html'
    });

});

app.factory('Order', function ($http) {
    return {
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
        }
    };
});

app.controller('OrdersController', function ($scope, allOrders) {

    $scope.orders = allOrders;

});

app.controller('OrderController', function ($scope, Order, ProductsFactory, DrinkProductsFactory) {

    $scope.status = Order.status();
    var today = new Date();
    
    ProductsFactory.getProducts().then(function(products) {
        $scope.products = products;
    });

    DrinkProductsFactory.getProducts('coffee').then(function(products) {
        $scope.coffees = products;
    }).catch(function(err) {
        console.log('err');
    });

    DrinkProductsFactory.getProducts('teas').then(function(products) {
        $scope.teas = products;
    }).catch(function(err) {
        console.log('err');
    });

    $scope.newOrder = {
        orderNumber: null,
        products: [{
            productId: null, 
            options: [
                null
            ],
            quantity: null,
            price: null
        }],
        date: today,
        orderStatus: 'paid',
        _user: 'anonymous'
    };

});












