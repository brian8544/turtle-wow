angular.module('home', [])
    .controller('HomeCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            // $('html, body').animate({
            //     scrollTop: 0
            // }, 'slow');

            $scope.videos = [
                $sce.trustAsResourceUrl('https://player.vimeo.com/video/748353959?h=cd57f9c652')
            ];
            $scope.videosIndex = 0;


            $scope.ytVideo = function (dir) {
                if (dir == 'prev') {
                    if ($scope.videosIndex == 0)
                        return;
                    $scope.videosIndex--;
                }
                if (dir == 'next') {
                    if ($scope.videosIndex == ($scope.videos.length - 1))
                        return;
                    $scope.videosIndex++;
                }
            }

        }]);
