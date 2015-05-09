'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Coffee', state: 'products.coffee', type: 'coffee' },
                { label: 'Tea', state: 'products.tea', type: 'tea' },
                { label: 'About Us', state: 'about' },
                { label: 'My Cart', state: 'cart'},
                { label: 'My Account', state: 'account', auth: true },
                { label: 'Administrator', state: 'administrator', auth: true, admin: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            scope.isAdmin = function() {
                return AuthService.getLoggedInUser().then(function (user) {
                    return scope.user.role === 'admin';
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});