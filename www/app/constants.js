(function () {
    'use strict';
    angular.module('app')
        .constant(
            'C', {
                backendUrl: 'http://127.0.0.1/api/v1',
                loginUrl : '/App/user'
            }
        );
})();
