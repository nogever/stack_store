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

app.controller('CategoriesController', function ($scope, $http, allCategories, CategoriesFactory) {

    $scope.categories = allCategories;
        // console.log('scope.categories: ', $scope.categories);
    $scope.newCategory = {};

    $scope.addCategory = function() {
        $http.post('api/categories', $scope.newCategory)
        .then(function(response) {
            // console.log("addCategory response: ", response);
            $scope.categories.push(response.data);
            angular.elem('#adminCategoryName').val('');
        }).catch(function(err) {
            console.log('addCategory returned err');
        });
    };

    $scope.editCategory = function() {
        angular.elem('#category-' + this.category.name).attr('disabled', false);
        angular.elem('.edit-' + this.category.name).attr('disabled', true);
        angular.elem('.update-' + this.category.name).attr('disabled', false);
    };

    $scope.updateCategory = function() {

        var updatedCategoryName = angular.elem('#category-' + this.category.name).val();

        $scope.newCategory = {
            name: updatedCategoryName
        };

        $http.put('api/categories/' + this.category._id, $scope.newCategory)
            .then(function(response) {
                // console.log("updateCategory response: ", response);
            }).catch(function(err) {
                console.log('updateCategory returned err');
            });

        angular.elem('#category-' + this.category.name).attr('disabled', true);
        angular.elem('.update-' + this.category.name).attr('disabled', true);
        angular.elem('.edit-' + this.category.name).attr('disabled', false);

    };

    $scope.deleteCategory = function() {

        $http.delete('api/categories/' + this.category._id)
            .then(function(response) {
                CategoriesFactory.getCategories().then(function(categories) {
                    $scope.categories = categories;
                })
                // console.log("type successfully deleted", response);
            }).catch(function(err) {
                console.log('deleteCategory returned err');
            });

    };

});












