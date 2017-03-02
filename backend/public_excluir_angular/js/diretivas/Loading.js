'use strict';
angular.module('Invest')
    .directive('loading', [ '$http', '$window', '$rootScope', function ($http, $window, $rootScope) {
        return {
            restrict : 'A',
            link: function (scope, elm) {
                $rootScope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch($rootScope.isLoading, function (v) {
                    if (v) {
                        elm.css('display', '');
                    } else {
                        elm.css('display', 'none');
                    }
                });
            }
        };
    }]);