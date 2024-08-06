angular.module('sound-design', [])
    .controller('SoundDesignCtrl', ['$scope', '$location', 'http', '$sce', '$timeout',
        function ($scope, $location, http, $sce, $timeout) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.music = [
                'https://player.vimeo.com/video/748474780?h=033ab32047',
                'https://player.vimeo.com/video/748474358?h=9fac750f85',
                'https://player.vimeo.com/video/748474632?h=75ef6bf3e2',
                'https://player.vimeo.com/video/750755246?h=4b97183b37',
                'https://player.vimeo.com/video/748474794?h=4cd90f5f65',
                'https://player.vimeo.com/video/748474461?h=90a98255df',
                'https://player.vimeo.com/video/748531205?h=f699c1aa67',
                'https://player.vimeo.com/video/748519424?h=fc6d3fed49',
                'https://player.vimeo.com/video/761775255?h=177f61bb5f'
            ];

            $scope.music_links = [];

            angular.forEach($scope.music, function (va, ke) {
                $scope.music_links.push($sce.trustAsResourceUrl(va));
            });

            http.post({
                m: 'sounds',
                w: 'get',
                p: {}
            }).then(function (data) {

                angular.forEach(data.data.result, function (va, ke) {
                    angular.forEach(va.sounds, function (va2, ke2) {
                        va2.file = $sce.trustAsResourceUrl(va2.file);
                    });
                });
                $scope.sounds = data.data.result;

                $timeout(function () {

                    GreenAudioPlayer.init({
                        selector: '.player', // inits Green Audio Player on each audio container that has class "player"
                        stopOthersOnPlay: true
                    });

                }, 100);

            });


        }])
;
