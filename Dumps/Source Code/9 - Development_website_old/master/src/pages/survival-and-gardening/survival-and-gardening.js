angular.module('survival-and-gardening', [])
    .controller('SurvivalAndGardeningCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;
