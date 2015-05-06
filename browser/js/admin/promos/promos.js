'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('administrator.promos', {
        url: '/promos',
        controller: 'PromosController',
        templateUrl: 'js/admin/promos/promos.html',
        resolve: {
            allPromos: function(Promos) {
                return Promos.getAll();
            }
        }
    })
    // .state('administrator.promo', {
    //     url: '/promo/:id',
    //     controller: 'PromosController',
    //     templateUrl: 'js/admin/promos/promo.html',
    //     resolve: {
    //         onePromo: function(Promos) {
    //             return Promos.getOne();
    //         }
    //     }
    // })
    .state('administrator.addpromo', {
        url: '/add-promo',
        controller: 'NewPromoController',
        templateUrl: 'js/admin/promos/promo.html'
    });

});

app.factory('Promos', function ($http, $stateParams) {
    var id = $stateParams.id;
    var self = this;

    return {
        getAll: function() {
            return $http.get('/api/promos').then(function(response) {
                return response.data;
            }).catch(function() {
                console.log('could not get all promos');
            });
        },
        getOne: function() {
            return $http.get('/api/promo' + $stateParams.id).then(function(response) {
                return response.data;
            }).catch(function() {
                console.log('could not get one promo');
            })
        },
        addNew: function(newPromo) {
            return $http.post('/api/promos', newPromo).then(function(response) {
                return response.data;
            }).catch(function() {
                console.log('could not add new promo');
            });
        }
    };
});

app.controller('NewPromoController', function($scope, Promos) {

    $scope.newPromo = {
        name: null,
        code: null
    };

    $scope.submit = function() {
        Promos.addNew($scope.newPromo);
    };

    // $scope.submit = function(newPromo) {
    //         return $http.post('/api/promos', newPromo).then(function(response) {
    //             return response.data;
    //         }).catch(function() {
    //             console.log('could not add new promo');
    //         });

});

app.controller('PromosController', function ($scope, allPromos, Promos) {

    // var id = $stateParams.id;

    $scope.promos = allPromos;
    // $scope.promo = onePromo;

    // Promos.getOne(id).then()

    // $scope.delete = function(id) {

    //     $http.delete('api/users/' + id)
    //     .then(UsersFactory.getUser)
    //     .then(function(users) {
    //         $scope.users = users;
    //     }).catch(function(err) {
    //         console.log('delete user returned err');
    //     });
    // };

});










