'use strict';

app.config(function ($stateProvider) {

    // Register our *account* state.
    $stateProvider.state('account', {
        url: '/account',
        controller: 'AccountController',
        templateUrl: 'js/account/account.html'
    });

});

app.controller('AccountController', function ($scope, $http, AuthService) {

    $scope.userAccount = {};
    $scope.pastOrders = [];

    AuthService.getLoggedInUser().then(function(user) {
        $http.get('/api/users/' + user._id)
        .then(function(response) {
                        // console.log('data from front-end ', response.data);
            $scope.pastOrders = response.data.orders;
            $scope.userAccount = user;
                    });
            }).catch(function(err) {
                console.log('errrrrrr ', err);
            });

});



// app.factory('Account', function($http, AuthService) {
//     return {
//         getOrders: function() {
//             var userId;
//             AuthService.getLoggedInUser().then(function(user) {
//                 userId = user._id;
//             return $http.get('/api/users/' + userId)
//                     .then(function(response) {
//                         // console.log('data from front-end ', response.data);
//                         return response.data.orders;
//                     });
//             }).catch(function(err) {
//                 console.log('errrr');
//             });
//         }
//     };
// });






















