angular.module('new-factions-and-quests', [])
    .controller('NewFactionsAndQuestsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;
