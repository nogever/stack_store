'use strict';
app.config(function ($stateProvider) {

    $stateProvider
    .state('administrator.meUser', {
        url: '/userme',
        controller: 'UserMeController',
        templateUrl: 'js/admin/users/user.html'
    });

});

app.controller('UserMeController', function ($scope, AuthService, $http, User) {

    $scope.user = {};
    $scope.roles = User.roles();
    $scope.newUser = {};

    AuthService.getLoggedInUser()
    .then(function(user) {
        return $scope.user = user;
    })
    .then(function(user) {
        return $http.get('/api/users/' + user._id)
    })
    .then(function(value) {
        $scope.newUser = {
            _id: value.data.user._id,
            name: value.data.user.name,
            email: value.data.user.email,
            username: value.data.user.username,
            role: value.data.user.role,
            password: value.data.user.password,
            twitter: value.data.user.twitter,
            facebook: value.data.user.facebook,
            google: value.data.user.google
        };
    })
    .catch(function(err) {
        console.log('errrrrrr', err);
    });

    $scope.submit = function() {

        $http.put("api/users/" + $scope.user.id, $scope.newUser)
        .then (function(response) {
            console.log('hi');

        }).catch(function(err) {
            console.log('err');
        });

    };

});














