'use strict';

app.config(function ($stateProvider) {

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
                return response.data;
            });
        }
    };
});

app.controller('CategoriesController', function ($scope, $http, allCategories, CategoriesFactory) {

    $scope.categories = allCategories;
    $scope.newCategory = {};

    $scope.addCategory = function() {
        $http.post('api/categories', $scope.newCategory)
        .then(function(response) {
            $scope.categories.push(response.data);
            angular.element('#adminCategoryName').val('');
        }).catch(function(err) {
            console.log('addCategory returned err');
        });
    };

    $scope.editCategory = function() {
        angular.element('#category-' + this.category.name).attr('disabled', false);
        angular.element('.edit-' + this.category.name).attr('disabled', true);
        angular.element('.update-' + this.category.name).attr('disabled', false);
    };

    $scope.updateCategory = function() {

        var updatedCategoryName = angular.element('#category-' + this.category.name).val();

        $scope.updatedCategory = {
            name: updatedCategoryName
        };

        $http.put('api/categories/' + this.category._id, $scope.updatedCategory)
            .then(function(response) {
            }).catch(function(err) {
                console.log('updateCategory returned err');
            });

        angular.element('#category-' + this.category.name).attr('disabled', true);
        angular.element('.update-' + this.category.name).attr('disabled', true);
        angular.element('.edit-' + this.category.name).attr('disabled', false);

    };

    $scope.deleteCategory = function() {

        $http.delete('api/categories/' + this.category._id)
            .then(function(response) {
                CategoriesFactory.getCategories().then(function(categories) {
                    $scope.categories = categories;
                });
            }).catch(function(err) {
                console.log('deleteCategory returned err');
            });

    };

});












