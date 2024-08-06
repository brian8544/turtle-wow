angular.module('sound-design', [])
    .controller('SoundDesignCtrl', ['$scope', '$location', 'http', '$sce', '$timeout',
        function ($scope, $location, http, $sce, $timeout) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.music = [
                'https://www.youtube.com/embed/BlVqCT5sXaU',
                'https://www.youtube.com/embed/7zh2-YCRwLM',
                'https://www.youtube.com/embed/8xzz7x4BNAo',
                'https://www.youtube.com/embed/Ddj_acAkHpg',
                'https://www.youtube.com/embed/mPRVPEYK1UI',
                'https://www.youtube.com/embed/wvyvKVAuc9o',
                'https://www.youtube.com/embed/i2w9yOWqP0U',
                'https://www.youtube.com/embed/lttvbKN4EOw',
                'https://www.youtube.com/embed/CiUpR6MVrZU',
                'https://www.youtube.com/embed/uNi-c3Xbahc'
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
