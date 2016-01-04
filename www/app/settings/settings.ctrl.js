(function () {
    'use strict';
    angular.module('app')
        .controller('SettingsCtrl', SettingsCtrl);

    function SettingsCtrl($scope, Storage, UiUtils, resolvedSettings) {
        var data = {};
        $scope.fn = {};
        $scope.data = data;

        data.settings = resolvedSettings;

        $scope.$watch(
            'data.settings', function (settings, oldSettings) {
                if (settings && oldSettings && !angular.equals(settings, oldSettings)) {
                    Storage.setUserSettings(settings).then(
                        function () {
                            UiUtils.showToast('Parameters Saved');
                        }
                    );
                }
            }, true
        );
    }
})();
