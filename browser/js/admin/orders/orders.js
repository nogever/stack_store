'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('administrator.orders', {
        url: '/orders',
        controller: 'OrdersController',
        templateUrl: 'js/admin/orders/orders.html',
        resolve: {
            allOrders: function(Order) {
                return Order.getAll();
            }
        }
    }).state('administrator.addOrder', {
        url: '/add-order',
        controller: 'OrderController',
        templateUrl: 'js/admin/orders/order.html',
        resolve: {
            allDrinks: function(DrinkProducts) {
                return DrinkProducts.getAll();
            }
        }
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

app.controller('OrderController', function ($scope, Order, allDrinks) {

    $scope.status = Order.status();
    $scope.products = allDrinks;
    var today = new Date();
    
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

app.filter('Type', function() {
    return function(items, typeName) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.type.name === typeName) {
                filtered.push(item);
            }
        }
        return filtered;
    }
});

app.filter('Category', function() {
    return function(items, cat) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            for (var j = 0; j < item.categories.length; j++){
                if (item.categories[j].name === cat) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    }
});













