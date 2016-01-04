(function () {
    'use strict';
    angular.module('app')
        .controller('LayoutCtrl', LayoutCtrl);

    function LayoutCtrl($state, $scope, $ionicHistory, Storage) {
        var fn = {};
        $scope.fn = fn;

        fn.logout = function () {
            console.log('Logging out...');
            Storage.clear().then(
                function () {
                    console.log('Storage Cleared');
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                    $state.go('login');
                }
            );
        };
    }
})();
