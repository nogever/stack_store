'use strict';

app.config(function ($stateProvider) {

    // Register our *products* state.
    $stateProvider.state('administrator.categories', {
        url: '/categories',
        controller: 'CategoriesController',
        templateUrl: 'js/admin/products/categories.html',
        resolve: {
            allCategories: function(CategoriesFactory) {
                return CategoriesFactory.getCategories();
            }
        }
    });

});

app.factory('CategoriesFactory', function ($http) {
    return {
        getCategories: function() {
            return $http.get('/api/categories')
                     .then(function(response) {
                        // console.log('res from getCategories: ', response.data);
                return response.data;
            });
        }
    };
});

app.controller('CategoriesController', function ($scope, $http, allCategories, $stateParams) {

    $scope.categories = allCategories;
        // console.log('scope.categories: ', $scope.categories);
    $scope.newCategory = {};

    $scope.addCategory = function() {
        $http.post('api/categories', $scope.newCategory)
        .then(function(response) {
            // console.log("addCategory response: ", response);
            $scope.categories.push(response.data);
        }).catch(function(err) {
            console.log('addCategory returned err');
        });
    };

    $scope.updateCategory = function() {

        $scope.newCategory._id = $stateParams._id;

        $http.put('api/categories/:id', $scope.newCategory)
            .then(function(response) {
                // console.log("updateCategory response: ", response);
            }).catch(function(err) {
                console.log('updateCategory returned err');
            });
    };

});












