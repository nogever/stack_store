'use strict';

app.config(function ($stateProvider) {

    // Register our *users* state.
    $stateProvider.state('administrator.users', {
        url: '/users',
        controller: 'UsersController',
        templateUrl: 'js/admin/users/users.html',
        resolve: {
            allUsers: function(UsersFactory) {
                return UsersFactory.getUser();
            }
        }
    });

});

app.factory('UsersFactory', function ($http) {
    return {
        getUser: function() {
            return $http.get('/api/users').then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('UsersController', function ($scope, $http, allUsers, UsersFactory) {

    $scope.users = allUsers;

    $scope.delete = function(id) {

        $http.delete('api/users/' + id)
        .then(UsersFactory.getUser)
        .then(function(users) {
            $scope.users = users;
        }).catch(function(err) {
            console.log('delete user returned err');
        });
    };

});










