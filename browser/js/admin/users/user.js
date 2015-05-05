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

app.controller('AddUserController', function($scope, $state, $http, UserFactory) {

    $scope.roles = UserFactory.roles();

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

app.factory('UserFactory', function ($http, $stateParams) {
    return {
        getUser: function() {
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

app.controller('UserController', function ($scope, $http, UserFactory) {

    $scope.roles = UserFactory.roles();

    UserFactory.getUser().then(function(data) {

        $scope.user = data;

        $scope.newUser = {
            name: data.name,
            email: data.email,
            username: data.username,
            role: data.role,
            password: data.password,
            twitter: data.twitter,
            facebook: data.facebook,
            google: data.google
        };

        $scope.submit = function() {

            $http.put("api/users/" + data._id, $scope.newUser)
            .then (function(response) {
                console.log('hi');
            }).catch(function(err) {
                console.log('err');
            });

        };

    });

});












