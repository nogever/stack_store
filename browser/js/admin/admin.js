'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *admin* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'js/admin/admin.html'
        // ,
        // resolve: {
        //     userAccount: function (UserFactory) {
        //         return UserFactory.getUser();
        //     }
        // }
    });

});

// app.factory('UserFactory', function ($http) {
//     return {
//         getUser: function() {
//             var userId = Session.user; // get logged-in user's id
//             return $http.get('/api/users/:id', {
//                         params: userId })
//                      .then(function(response) {
//                 return response.data;
//             });
//         }
//     };
// });

app.controller('AdminController', function ($scope) {

    // $scope.userAccount = userAccount;

});