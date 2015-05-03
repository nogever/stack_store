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

    };

});

app.factory('UserFactory', function ($http, $stateParams) {
    return {
        getUser: function() {
            return $http.get('/api/users/' + $stateParams.id)
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('UserController', function ($scope, $http, UserFactory) {

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
            console.log(data);

            $http.put("api/users/" + data._id, $scope.newUser)
            .then (function(response) {
                console.log('hi');
            }).catch(function(err) {
                console.log('err');
            });

        };

    });

});














