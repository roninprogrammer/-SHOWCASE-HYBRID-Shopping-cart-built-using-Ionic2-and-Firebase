(function () {
    'use strict';
    angular.module('app')
        .factory('Storage', Storage)
        .factory('_LocalStorageUtils', _LocalStorageUtils);

    function Storage($q, _LocalStorageUtils) {
        var keys = {
            user: 'user',
            userSettings: 'user-settings',
            token: 'token'
        };
        return {
            // user
            getUser: getUser,
            setUser: setUser,
            getUserSettings: getUserSettings,
            setUserSettings: setUserSettings,
            getToken: getToken,
            setToken: setToken,

            // global
            clear: clear
        };

        function get(key) {
            return $q(
                function(resolve) {
                    resolve(_LocalStorageUtils.get(key))
                }
            )
        }

        function set(key, value) {
            return $q(
                function(resolve) {
                    resolve(_LocalStorageUtils.set(key, value));
                }
            )
        }

        function clear() {
            return $q(
                function (resolve) {
                    resolve(_LocalStorageUtils.clear(keys.user));
                }
            );
        }

        function getUser() {
            return get(keys.user);
        }

        function setUser(user) {
            return set(keys.user, user);
        }

        function getUserSettings() {
            return get(keys.userSettings);
        }

        function setUserSettings(settings) {
            return set(keys.userSettings, settings);
        }

        function getToken() {
            return get(keys.token);
        }

        function setToken(token) {
            return set(keys.token, token);
        }
    }

    function _LocalStorageUtils() {
        return {
            get: get,
            set: set,
            removeItem: removeItem,
            keys: keys,
            clear: clear
        };

        function get(key) {
            try {
                return JSON.parse(window.localStorage[key] || {});
            } catch (ex) {
                console.warn('Failed to get key: ' + key);
                return {};
            }
        }

        function set(key, value) {
            try {
                return window.localStorage[key] = JSON.stringify(value);
            } catch (ex) {
                console.warn('Failed to set key/value: ' + key + '/' + value);
            }
        }

        function removeItem(key) {
            return clear(key);
        }

        function keys() {
            window.localStorage.keys();
        }

        function clear(key) {
            window.localStorage[key] = '{}';
        }
    }
})();
