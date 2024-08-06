angular.module('vagrants-endeavor', [])
    .controller('VagrantsEndeavorCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;
