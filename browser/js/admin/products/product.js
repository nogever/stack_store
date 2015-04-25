'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *product* state.
    $stateProvider.state('admin.product', {
        url: '/admin/product',
        controller: 'ProductController',
        templateUrl: 'js/admin/product/product.html',
        resolve: {
            userAccount: function (UserFactory) {
                return UserFactory.getUser();
            }
        }
    });

});

app.factory('ProductFactory', function ($http) {
    return {
        getUser: function() {
            var userId = Session.user; // get logged-in user's id
            return $http.get('/api/product')
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('ProductController', function ($scope, userAccount) {

    $scope.userAccount = userAccount;

});