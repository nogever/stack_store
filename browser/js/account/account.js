'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *account* state.
    $stateProvider.state('account', {
        url: '/account',
        controller: 'AccountController',
        templateUrl: 'js/account/account.html',
        resolve: {
            userAccount: function (UserFactory) {
                return UserFactory.getUser();
            }
        }
    });

});

app.factory('UserFactory', function ($http) {
    return {
        getUser: function() {
            var userId = Session.user; // get logged-in user's id
            return $http.get('/api/users/:id', {
                        params: userId })
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('AccountController', function ($scope, userAccount) {

    $scope.userAccount = userAccount;

});