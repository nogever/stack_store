'use strict';

app.config(function ($stateProvider) {

    // Register our *users* state.
    $stateProvider.state('administrator.users', {
        url: '/users',
        controller: 'UsersController',
        templateUrl: 'js/admin/users/users.html',
        resolve: {
            allUsers: function(Users) {
                return Users.getAll().catch(function(err){
                    console.log('Err!', err);
                });
            }
        }
    });

});

app.factory('Users', function ($http) {
    return {
        getAll: function() {
            return $http.get('/api/users').then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('UsersController', function ($scope, $http, allUsers, Users) {

    $scope.users = allUsers;

    $scope.delete = function(id) {

        $http.delete('api/users/' + id)
        .then(UsersFactory.getAll)
        .then(function(users) {
            $scope.users = users;
        }).catch(function(err) {
            console.log('delete user returned err');
        });
    };

});










