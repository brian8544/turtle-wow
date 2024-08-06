angular.module('everlook-broadcasting', [])
    .controller('EverlookBroadcastingCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

        }])
;
