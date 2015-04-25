'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *users* state.
    $stateProvider.state('admin.users', {
        url: '/admin/users',
        controller: 'UsersController',
        templateUrl: 'js/admin/users/users.html',
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
            return $http.get('/api/users')
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('UsersController', function ($scope, userAccount) {

    $scope.userAccount = userAccount;

});