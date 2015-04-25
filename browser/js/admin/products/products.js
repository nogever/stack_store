'use strict';
var Session = {};

app.config(function ($stateProvider) {

    // Register our *products* state.
    $stateProvider.state('admin.products', {
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'js/admin/products/products.html'
        // ,
        // resolve: {
        //     userAccount: function (UserFactory) {
        //         return UserFactory.getUser();
        //     }
        // }
    });

});

// app.factory('ProductsFactory', function ($http) {
//     return {
//         getUser: function() {
//             var userId = Session.user; // get logged-in user's id
//             return $http.get('/api/products')
//                      .then(function(response) {
//                 return response.data;
//             });
//         }
//     };
// });

app.controller('ProductsController', function ($scope) {

    // $scope.userAccount = userAccount;

});