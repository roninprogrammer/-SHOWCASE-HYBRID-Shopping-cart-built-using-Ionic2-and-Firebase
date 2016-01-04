(function () {
    'use strict';
    angular.module('app', ['ionic'])
        .config(configBlock)
        .run(runBlock);

    function configBlock($stateProvider, $urlRouterProvider, $provide, $httpProvider) {
        $stateProvider
            .state(
                'loading', {
                    url: '/loading',
                    template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
                    controller: 'LoadingCtrl'
                }
            )
            .state(
                'login', {
                    url: '/login',
                    templateUrl: 'app/authentication/login.html',
                    controller: 'LoginCtrl'
                }
            )
            .state(
                'app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'app/layout/layout.html',
                    controller: 'LayoutCtrl'
                }
            )
            .state(
                'app.settings', {
                    url: '/settings',
                    views: {
                        'menuContent': {
                            templateUrl: 'app/settings/settings.html',
                            controller: 'SettingsCtrl',
                            resolve: {
                                resolvedSettings: function (Storage) {
                                    return Storage.getUserSettings();
                                }
                            }
                        }
                    }
                }
            );

        $urlRouterProvider.otherwise('/loading');

        // catch Angular errors
        $provide.decorator(
            '$exceptionHandler', ['$delegate', function ($delegate) {
                return function (exception, cause) {
                    $delegate(exception, cause);
                    var data = {};
                    if (cause) {
                        data.cause = cause;
                    }
                    if (exception) {
                        if (exception.message) {
                            data.message = exception.message;
                        }
                        if (exception.name) {
                            data.name = exception.name;
                        }
                        if (exception.stack) {
                            data.stack = exception.stack;
                        }
                    }
                    Logger.error(
                        'Angular error: ' + data.message,
                        {cause: data.cause, stack: data.stack}
                    );
                };
            }]
        );

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    }

    // catch JavaScript errors
    window.onerror = function (message, url, line, col, error) {
        var stopPropagation = false;
        var data = {};
        if (message) {
            data.message = message;
        }
        if (url) {
            data.fileName = url;
        }
        if (line) {
            data.lineNumber = line;
        }
        if (col) {
            data.columnNumber = col;
        }
        if (error) {
            if (error.name) {
                data.name = error.name;
            }
            if (error.stack) {
                data.stack = error.stack;
            }
        }
        if (navigator) {
            if (navigator.userAgent) {
                data['navigator.userAgent'] = navigator.userAgent;
            }
            if (navigator.platform) {
                data['navigator.platform'] = navigator.platform;
            }
            if (navigator.vendor) {
                data['navigator.vendor'] = navigator.vendor;
            }
            if (navigator.appCodeName) {
                data['navigator.appCodeName'] = navigator.appCodeName;
            }
            if (navigator.appName) {
                data['navigator.appName'] = navigator.appName;
            }
            if (navigator.appVersion) {
                data['navigator.appVersion'] = navigator.appVersion;
            }
            if (navigator.product) {
                data['navigator.product'] = navigator.product;
            }
        }
        Logger.error(
            'JavaScript error: ' + data.message,
            {cause: data.cause, stack: data.stack}
        );
        return stopPropagation;
    };

    function runBlock($rootScope, Storage, $http, $state) {
        Storage.getToken().then(function(token) {
            console.log(token);
            if(token) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
            }
        });

        $rootScope.safeApply = function (fn) {
            var phase = this.$root ? this.$root.$$phase : this.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        var bypass = false;
        $rootScope.$on('$stateChangeStart', function(evt) {
            if (bypass) {
                bypass = false;
                return;
            }
            console.log('Checking user...');
            if (!Storage) {
                console.log('No Storage detected');
                return;
            }
            Storage.getUser().then(
                function (user) {
                    var isUserValid = user && user.id !== undefined;
                    var isLogin = $state.current.name == 'login';
                    // Valid user trying to access Login

                    if(!isUserValid) {
                        console.log('Invalid User');
                        if(!isLogin) {
                            bypass = true;
                            $state.go('login');
                        }
                    } else if (isLogin) {
                        console.log('Valid user: ' + user.id);
                        bypass = true;
                        $state.go('app.settings');
                    }
                }
            );
        });
    }
})();
