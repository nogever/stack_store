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
            // var userId = Session.user; // get logged-in user's id
            return $http.get('/api/users').then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('UsersController', function ($scope, $http, allUsers, UsersFactory, $stateParams) {

    $scope.users = allUsers;
    var userId = $stateParams.id;

    $scope.delete = function(userId) {

        $http.delete('api/users/' + userId)
            .then(function(response) {
                UsersFactory.getUser().then(function(users) {
                    $scope.users = users;
                })
            }).catch(function(err) {
                console.log('delete user returned err');
            });

    };

});










