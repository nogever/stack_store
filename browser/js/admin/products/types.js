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
    // console.log('scope.types: ', $scope.types);
    $scope.newType = {};

    $scope.addType = function() {
        $http.post('api/types', $scope.newType)
        .then(function(response) {
            // console.log("addType response: ", response);
            $scope.types.push(response.data);
            $('#adminTypeName').val('');
        }).catch(function(err) {
            console.log('addType returned err');
        });
    };

    $scope.editType = function() {
        $('#type-' + this.type.name).attr('disabled', false);
        $('.edit-' + this.type.name).attr('disabled', true);
        $('.update-' + this.type.name).attr('disabled', false);
    };

    $scope.updateType = function() {

        var updatedTypeName = $('#type-' + this.type.name).val();

        $scope.newType = {
            name: updatedTypeName
        };

        $http.put('api/types/' + this.type._id, $scope.newType)
            .then(function(response) {
                // console.log("updateType response: ", response);
            }).catch(function(err) {
                console.log('updateType returned err');
            });

        $('#type-' + this.type.name).attr('disabled', true);
        $('.update-' + this.type.name).attr('disabled', true);
        $('.edit-' + this.type.name).attr('disabled', false);

    };

    $scope.deleteType = function() {

        $http.delete('api/types/' + this.type._id)
            .then(function(response) {
                TypesFactory.getTypes().then(function(types) {
                    $scope.types = types;
                })
                // console.log("type successfully deleted", response);
            }).catch(function(err) {
                console.log('deleteType returned err');
            });

    };

});












