(function () {
    'use strict';
    angular.module('app')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, $state, Storage, Requester) {

        var fn = {}, data = {};
        $scope.fn = fn;
        $scope.data = data;

        data.credentials = {
            login: '',
            password: ''
        };

        fn.login = function (credentials) {
            if (!credentials.login || !credentials.password) {
                return;
            }
            Requester.login(credentials.login, credentials.password)
                .then(
                    function (result) {
                        console.log("Received Login Success");
                        if (!result.data || !result.data.user) {
                            console.warn('Invalid User Info');
                            return;
                        }

                        Storage.setUser(result.data.user)
                            .then(
                                function () {
                                    $state.go('app.settings');
                                }
                            );
                    }
                );
        };
    }
})();
