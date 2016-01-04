(function () {
    'use strict';
    angular.module('app')
        .factory('Requester', Requester);

    function Requester($http, C, Storage) {
        return {
            login: login
        };

        function login(username, password) {
            var token = btoa(username + ':' + password);
            Storage.setToken(token);
            $http.defaults.headers.common.Authorization
                = 'Basic ' + token;
            return $http.get(
                C.backendUrl + C.loginUrl
            );
        }
    }
}());
