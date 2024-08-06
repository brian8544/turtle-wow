angular.module('changelog', [])
    .controller('ChangelogCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.logIndex = 0;

            http.post({
                m: 'changelog',
                w: 'get',
                p: {}
            }).then(function (data) {
                $scope.changelog = data.data.result;
                console.log($scope.changelog);
            });


            $scope.log = function (d) {
                if ((d == -1 && $scope.logIndex == 0) || (d == 1 && $scope.logIndex == $scope.changelog.length - 1))
                    return;
                $scope.logIndex = $scope.logIndex + d;
            }

        }])
;
