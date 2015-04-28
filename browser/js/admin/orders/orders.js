'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('administrator.orders', {
        url: '/orders',
        controller: 'OrdersController',
        templateUrl: 'js/admin/orders/orders.html',
        resolve: {
            allOrders: function (OrdersFactory) {
                return OrdersFactory.getOrders();
            }
        }
    });

});

app.factory('OrdersFactory', function ($http) {
    return {
        getOrders: function() {
            return $http.get('/api/orders')
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('OrdersController', function ($scope, allOrders) {

    $scope.orders = allOrders;

});












