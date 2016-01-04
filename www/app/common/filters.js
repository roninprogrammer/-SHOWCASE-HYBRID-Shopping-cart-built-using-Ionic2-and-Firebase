(function () {
    'use strict';

    angular.module('app')
        .filter(
            'avatar', function (C) {
                return function (userId, size) {
                    if(!size) {
                        size = 'small';
                    }
                    return C.backendUrl +
                        '/entryPoint/avatar?&size=' +
                        size +
                        '&id=' +
                        userId;
                }
            }
        )
        .filter(
            'image', function (C) {
                return function (imageId, size) {
                    if(!size) {
                        size = 'small';
                    }
                    return C.backendUrl +
                        '/entryPoint/image?&size=' +
                        size +
                        '&id=' +
                        imageId;
                }
            }
        );
})();
