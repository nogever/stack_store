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
    });

});

app.factory('Promos', function ($http) {
    return {
        getAll: function() {
            return $http.get('/api/promos')
                     .then(function(response) {
                return response.data;
            }).catch(function(err) {
                console.log('res from getTypes: ', err);
            });
        }
    };
});

app.controller('PromosController', function ($scope, $http, allPromos, Promos) {

    $scope.promos = allPromos;
    $scope.newPromo = {};

    $scope.addPromo = function() {
        console.log('hi');
        $http.post('api/promos/', $scope.newPromo)
        .then(function(response) {
            $scope.promos.push(response.data);
            angular.element('#adminPromoName').val('');
            angular.element('#adminPromoCode').val('');
        }).catch(function(err) {
            console.log('addPromo returned err');
        });
    };

    $scope.editPromo = function() {
        angular.element('#promo-name-' + this.promo.name).attr('disabled', false);
        angular.element('#promo-code-' + this.promo.code).attr('disabled', false);
        angular.element('.edit-' + this.promo.name).attr('disabled', true);
        angular.element('.update-' + this.promo.name).attr('disabled', false);
    };

    $scope.updatePromo = function() {

        var updatedPromoName = angular.element('#promo-name-' + this.promo.name).val();
        var updatedPromoCode = angular.element('#promo-code-' + this.promo.code).val();

        $scope.updatedPromo = {
            name: updatedPromoName,
            code: updatedPromoCode
        };

        $http.put('api/promos/' + this.promo._id, $scope.updatedPromo)
            .then(function(response) {
                console.log('updatedPromo returned successfully');
            }).catch(function(err) {
                console.log('updateType returned err');
            });

        angular.element('#promo-name-' + this.promo.name).attr('disabled', true);
        angular.element('#promo-code-' + this.promo.code).attr('disabled', true);
        angular.element('.update-' + this.promo.name).attr('disabled', true);
        angular.element('.edit-' + this.promo.name).attr('disabled', false);

    };

    $scope.deletePromo = function() {

        $http.delete('api/promos/' + this.promo._id)
            .then(function(response) {
                Promos.getAll().then(function(promos) {
                    $scope.promos = promos;
                });
            }).catch(function(err) {
                console.log('deletePromo returned err');
            });

    };

});


// app.factory('Promos', function ($http, $stateParams) {
//     var id = $stateParams.id;
//     var self = this;

//     return {
//         getAll: function() {
//             return $http.get('/api/promos').then(function(response) {
//                 return response.data;
//             }).catch(function() {
//                 console.log('could not get all promos');
//             });
//         },
//         getOne: function() {
//             return $http.get('/api/promo' + $stateParams.id).then(function(response) {
//                 return response.data;
//             }).catch(function() {
//                 console.log('could not get one promo');
//             })
//         },
//         addNew: function(newPromo) {
//             return $http.post('/api/promos', newPromo).then(function(response) {
//                 return response.data;
//             }).catch(function() {
//                 console.log('could not add new promo');
//             });
//         }
//     };
// });

// app.controller('NewPromoController', function($scope, Promos) {

//     $scope.newPromo = {
//         name: null,
//         code: null
//     };

//     $scope.submit = function() {
//         Promos.addNew($scope.newPromo);
//     };

//     // $scope.submit = function(newPromo) {
//     //         return $http.post('/api/promos', newPromo).then(function(response) {
//     //             return response.data;
//     //         }).catch(function() {
//     //             console.log('could not add new promo');
//     //         });

// });

// app.controller('PromosController', function ($scope, allPromos, Promos) {

//     // var id = $stateParams.id;

//     $scope.promos = allPromos;
//     // $scope.promo = onePromo;

//     // Promos.getOne(id).then()

//     // $scope.delete = function(id) {

//     //     $http.delete('api/users/' + id)
//     //     .then(UsersFactory.getUser)
//     //     .then(function(users) {
//     //         $scope.users = users;
//     //     }).catch(function(err) {
//     //         console.log('delete user returned err');
//     //     });
//     // };

// });










