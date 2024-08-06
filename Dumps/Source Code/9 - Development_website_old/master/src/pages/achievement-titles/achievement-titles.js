angular.module('achievement-titles', [])
    .controller('AchievementTitlesCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;
