'use strict';
app.config(function ($stateProvider) {

    // Register our *user* state.
    $stateProvider
    .state('administrator.newUser', {
        url: '/user',
        controller: 'AddUserController',
        templateUrl: 'js/admin/users/user.html'
    }).state('administrator.user', {
        url: '/user/:id',
        controller: 'UserController',
        templateUrl: 'js/admin/users/user.html'
    });

});

app.controller('AddUserController', function($scope, $state, $http, User) {

    $scope.roles = User.roles();

    $scope.newUser = {
        name: null,
        email: null,
        username: null,
        role: null,
        twitter: null,
        facebook: null,
        google: null
    };

    $scope.submit = function() {

        $http.post("api/users", $scope.newUser)
        .then(function(response) {
            console.log('hi');
            $state.go('administrator.users');
        }).catch(function(err) {
            console.log('err');
        });

    };

});

app.factory('User', function ($http, $stateParams) {
    return {
        getOne: function() {
            return $http.get('/api/users/' + $stateParams.id)
                     .then(function(response) {
                return response.data;
            });
        },
        roles: function() {
            return ['admin', 'shop manager', 'subscriber'];
        }

    };
});

app.controller('UserController', function ($scope, $http, User) {

    $scope.roles = User.roles();
    $scope.newUser = {};

    User.getOne().then(function(data) {

        $scope.user = data.user;

        $scope.newUser = {
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            username: data.user.username,
            role: data.user.role,
            password: data.user.password,
            twitter: data.user.twitter,
            facebook: data.user.facebook,
            google: data.user.google
        };

        $scope.submit = function() {

            $http.put("api/users/" + data.user._id, $scope.newUser)
            .then (function(response) {
                console.log('hi');
            }).catch(function(err) {
                console.log('err');
            });

        };

    }).catch(function(err) {
        console.log('errrr', err);
    });

});












