'use strict';
app.config(function ($stateProvider) {

    $stateProvider
    .state('administrator.meUser', {
        url: '/userme',
        controller: 'UserMeController',
        templateUrl: 'js/admin/users/user.html'
    });

});

app.controller('UserMeController', function ($scope, AuthService, $http) {

    $scope.user = {};

    AuthService.getLoggedInUser().then(function(user) {

        $scope.user = user;
    
        $scope.newUser = {
            name: $scope.user.name,
            email: $scope.user.email,
            username: $scope.user.username,
            role: $scope.user.roles,
            password: $scope.user.password,
            twitter: $scope.user.twitter,
            facebook: $scope.user.facebook,
            google: $scope.user.google
        };

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














