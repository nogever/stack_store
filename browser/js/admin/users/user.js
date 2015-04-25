'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *user* state.
    $stateProvider.state('admin.user', {
        url: '/admin/users/user',
        controller: 'UserController',
        templateUrl: 'js/admin/users/user.html',
        resolve: {
            userAccount: function (UserFactory) {
                return UserFactory.getUser();
            }
        }
    });

});

app.factory('UserFactory', function ($http) {
    return {
        getUser: function() {
            var userId = Session.user; // get logged-in user's id
            return $http.get('/api/users/:id', {
                        params: userId })
                     .then(function(response) {
                return response.data;
            });
        }
    };
});

app.controller('UserController', function ($scope, userAccount) {

    $scope.userAccount = userAccount;

});