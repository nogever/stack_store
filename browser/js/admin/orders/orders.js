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

app.factory('Order', function ($http, $state) {
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
                product.productId = product.productId._id;
            });

            return $http.post('/api/orders', newOrder)
                    .then(function(response) {
                        console.log('response from save()', response);
                        // return response.data;
                        $state.go('administrator.orders');
                    });
        }
        // options: [
        //     {
        //         name: sweets,
        //         choices: [
        //             'none',
        //             'sugar', 
        //             'splenda', 
        //             'raw sugar', 
        //             'honey'
        //         ]
        //     }, {
        //         name: milk,
        //         choices: [
        //             'none',
        //             'whole milk', 
        //             'half and half', 
        //             'reduced fat', 
        //             'skim', 
        //             'soy'
        //         ]
        //     }, {
        //         name: flavors,
        //         choices: [
        //             'none',
        //             'hazelnut', 
        //             'vanilla', 
        //             'chocolate'
        //         ]
        //     }, {
        //         name: size,
        //         choices: [
        //             'fullstack', 
        //             'mediumstack', 
        //             'smallstack'
        //         ]
        //     }, {
        //         name: toppings,
        //         choices: [
        //             'none',
        //             'cinnamon', 
        //             'JAVAscript', 
        //             'cocoa powder', 
        //             'whip cream'
        //         ]
        //     }
        // ] // <-- folded: 'options' in json format
    };
});

app.controller('OrdersController', function ($scope, allOrders) {

    $scope.orders = allOrders;

});

app.controller('OrderController', function ($scope, $state, Order, AuthService, allDrinks) {

    $scope.status = Order.status();
    $scope.products = allDrinks;
    $scope.options = Order.options; 
    var today = new Date();    

    $scope.tempOptions = {sweets:'none',flavors:'none',milk:'none',size:'fullstack',toppings:'none'};
    $scope.tempProduct = {productId: null, options: $scope.newOptions, quantity: null};

    $scope.newOrder = {
        orderNumber: null,
        products: [],
        date: today,
        orderStatus: 'paid',
        _user: null
    };

    AuthService.getLoggedInUser().then(function(user) {
        $scope.newOrder._user = user._id;
    });


    $scope.addProductToOrder = function() {
        $scope.newOptions = $scope.tempOptions;
        $scope.newProduct = $scope.tempProduct;
        $scope.newProduct.price = $scope.tempProduct.productId.price;

        $scope.newOrder.products.push($scope.newProduct);

        $scope.tempOptions = {sweets:'none',flavors:'none',milk:'none',size:'fullstack',toppings:'none'};
        $scope.tempProduct = {productId: null, options: $scope.newOptions, quantity: null};
    };

    $scope.submit = function() {
        Order.save($scope.newOrder);
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
    };
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
    };
});













