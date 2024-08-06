angular.module('turtle-video', [])
    .directive('turtleVideo', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                video: '='
            },
            templateUrl: "src/_directives/turtle-video.html",
            controller: ['$scope', '$sce', function ($scope, $sce) {
                $scope.urlSCE = $sce.trustAsResourceUrl($scope.video.url);
                $scope.id = 'turtle-video-' + $scope.video.id;
                $scope.thumb = $scope.video.url.replace('webm', 'jpg');
            }]
        }
    }])

    .directive('turtleVideoThumb', ['$location', function ($location) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                v: '=',
                vertical: '='
            },
            templateUrl: "src/_directives/turtle-video-thumb.html",
            controller: ['$scope', function ($scope) {
                $scope.goToPage = function (page) {
                    $location.url(page);
                }
            }]
        }
    }])

    .directive('turtleVideoEmbed', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                id: '=',
                height: '=?'
            },
            templateUrl: "src/_directives/turtle-video-embed.html",
            controller: ['$scope', '$sce', 'http', function ($scope, $sce, http) {
                $scope.height = angular.isDefined($scope.height) ? $scope.height : '100%';
                $scope.aloaded = false;
                $scope.currentVideo = {
                    url: ''
                };
                http.post({
                    m: 'video',
                    w: 'getVideo',
                    p: {
                        id: $scope.id
                    }
                }).then(function (data) {
                    $scope.currentVideo = data.data.result;
                    $scope.aloaded = true;
                });

            }]
        }
    }])
;
