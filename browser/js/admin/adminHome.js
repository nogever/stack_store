'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *admin* state.
    $stateProvider.state('admin.home', {
        url: '/admin/home',
        controller: 'AdminController',
        templateUrl: 'js/admin/adminHome.html',
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

app.controller('AdminHomeController', function ($scope, userAccount) {

    $scope.userAccount = userAccount;

});