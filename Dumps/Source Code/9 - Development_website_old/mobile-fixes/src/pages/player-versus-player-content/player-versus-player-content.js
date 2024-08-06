angular.module('player-versus-player-content', [])
    .controller('PlayerVersusPlayerContentCtrl', ['$scope', '$location', '$anchorScroll', '$timeout',
        function ($scope, $location, $anchorScroll, $timeout) {


            if ($location.hash() === 'war-mode') {
                $timeout(function () {
                    $anchorScroll();
                }, 100);

            } else {

                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');

            }


        }])
;
