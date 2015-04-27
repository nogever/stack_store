'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *users* state.
    $stateProvider.state('administrator.users', {
        url: '/users',
        controller: 'UsersController',
        templateUrl: 'js/admin/users/users.html',
        resolve: {
            allUsers: function (UsersFactory) {
                return UsersFactory.getUser();
            }
        }
    });

});

app.factory('UsersFactory', function ($http) {
    return {
        getUser: function() {
            // var userId = Session.user; // get logged-in user's id
            return $http.get('/api/users')
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('UsersController', function ($scope, allUsers) {

    $scope.users = allUsers;

});