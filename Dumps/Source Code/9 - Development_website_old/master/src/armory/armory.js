angular.module('armory', [])
    .controller('ArmoryCtrl', ['$scope', '$location', 'http', '$sce', '$stateParams', '$timeout',
        function ($scope, $location, http, $sce, $stateParams, $timeout) {

            // $('html, body').animate({
            //     scrollTop: 0
            // }, 'slow');

            $scope.state = '';

            if ($stateParams.character)
                $scope.state = 'character';

            $scope.q = '';

            $scope.results = {};

            $scope.armorySearch = function (q) {

                if (!q)
                    return;
                if (q.length < 2)
                    return;

                http.post({
                    m: 'armory',
                    w: 'search',
                    p: {
                        q: q
                    }
                }).then(function (data) {

                    $scope.results = data.data.result;

                });

            }

            $scope.goToCharacter = function (c) {
                $location.url('armory/character/' + c);
            }

            $scope.c = {}

            $scope.getCharacter = function (c) {
                http.post({
                    m: 'armory',
                    w: 'character',
                    p: {
                        c: c
                    }
                }).then(function (data) {

                    $scope.c = data.data.result;

                });
            }


            if ($scope.state == 'character') {
                $scope.getCharacter($stateParams.character);
            }

            $scope.getItem = function (slot) {
                var rd = false;
                angular.forEach($scope.c.gear, function (va, ke) {

                    if (parseInt(va['slot']) === slot) {
                        rd = va;
                    }
                });

                return rd;
            };


        }])
;
