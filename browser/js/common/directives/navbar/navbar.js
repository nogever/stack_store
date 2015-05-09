'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Coffee', state: 'products.coffee', type: 'coffee', all: true },
                { label: 'Tea', state: 'products.tea', type: 'tea', all: true },
                { label: 'About Us', state: 'about', all: true },
                { label: 'My Cart', state: 'cart', all: true },
                { label: 'My Account', state: 'account', auth: true, admin: false, all: true },
                { label: 'Administrator', state: 'administrator', auth: true, admin: true, all: true  }
            ];

            scope.user = null;

            scope.checkPriv = function(item) {

                return (item.admin && item.auth) || (item.auth && item.admin) || !item.auth;

                // var auth = AuthService.isAuthenticated();
                
                // var admin = item.role === 'admin' ? true : false;

                // var user = item.role === 'subscriber' ? true : false;

                // // if (!item.admin || !item.auth) {}

                // var isAdmin = item.all && (auth && user) && (auth && admin);
                // var isSubsc = item.all && (auth && admin) && (auth && user);

                // if (!(isAdmin || isSubsc)) {
                //     return
                // }

                // return 

            };

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