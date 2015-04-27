'use strict';
var Session = {};

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
        // resolve: {
        //     singleUser: function (UserFactory) {
        //         return UserFactory.getUser();
        //     }
        // }
    });

});

app.controller('AddUserController', function($scope, $http) {

    $scope.newUser = {
        name: null,
        email: null,
        username: null,
        role: null,
        password: null,
        twitter: null,
        facebook: null,
        google: null
    };

    $scope.submit = function() {
        console.log('new user: ', $scope.newUser);

        $http.post("api/users", $scope.newUser)
        .then(function(response) {
            console.log('hi');
        }).catch(function(err) {
            console.log('err');
        });

    }

});

app.factory('UserFactory', function ($http, $stateParams) {
    return {
        getUser: function() {
            // var userId = Session.user; // get logged-in user's id
            return $http.get('/api/users/' + $stateParams.id)
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('UserController', function ($scope, UserFactory) {

    UserFactory.getUser().then(function(data) {

        $scope.user = data;

        $scope.newUser = {
            name: data.name,
            email: data.email,
            username: data.username,
            role: data.roles,
            password: data.password,
            twitter: data.twitter,
            facebook: data.facebook,
            google: data.google
        };

        $scope.submit = function() {

            $http.put("api/users/" + data.id, $scope.newUser)
            .then (function(response) {
                console.log('hi');
            }).catch(function(err) {
                console.log('err');
            });

        }

    });

});














