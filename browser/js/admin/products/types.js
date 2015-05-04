'use strict';

app.config(function ($stateProvider) {

    // Register our *products* state.
    $stateProvider.state('administrator.types', {
        url: '/types',
        controller: 'TypesController',
        templateUrl: 'js/admin/products/types.html',
        resolve: {
            allTypes: function(TypesFactory) {
                return TypesFactory.getTypes();
            }
        }
    });

});

app.factory('TypesFactory', function ($http) {
    return {
        getTypes: function() {
            return $http.get('/api/types')
                     .then(function(response) {
                        // console.log('res from getTypes: ', response.data);
                return response.data;
            });
        }
    };
});

app.controller('TypesController', function ($scope, $http, allTypes, TypesFactory) {

    $scope.types = allTypes;
    $scope.newType = {};

    $scope.addType = function() {
        $http.post('api/types', $scope.newType)
        .then(function(response) {
            $scope.types.push(response.data);
            angular.element('#adminTypeName').val('');
        }).catch(function(err) {
            console.log('addType returned err');
        });
    };

    $scope.editType = function() {
        angular.element('#type-' + this.type.name).attr('disabled', false);
        angular.element('.edit-' + this.type.name).attr('disabled', true);
        angular.element('.update-' + this.type.name).attr('disabled', false);
    };

    $scope.updateType = function() {

        var updatedTypeName = angular.element('#type-' + this.type.name).val();

        $scope.updatedType = {
            name: updatedTypeName
        };

        $http.put('api/types/' + this.type._id, $scope.updatedType)
            .then(function(response) {
            }).catch(function(err) {
                console.log('updateType returned err');
            });

        angular.element('#type-' + this.type.name).attr('disabled', true);
        angular.element('.update-' + this.type.name).attr('disabled', true);
        angular.element('.edit-' + this.type.name).attr('disabled', false);

    };

    $scope.deleteType = function() {

        $http.delete('api/types/' + this.type._id)
            .then(function(response) {
                TypesFactory.getTypes().then(function(types) {
                    $scope.types = types;
                });
            }).catch(function(err) {
                console.log('deleteType returned err');
            });

    };

});












