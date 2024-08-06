angular.module('rules', [])
    .controller('RulesCtrl', ['$scope', '$location', 'http', '$sce', '$stateParams', '$timeout', '$anchorScroll',
        function ($scope, $location, http, $sce, $stateParams, $timeout, $anchorScroll) {


            $scope.checkTabFromUrl = function() {
                var hash = $location.hash();
                if (hash.includes("tab-1")) {
                    $('#rules-tab-1').tab('show');
                } else if (hash.includes("tab-2")) {
                    $('#rules-tab-2').tab('show');
                }
            };

            $scope.checkTabFromUrl();

            if ($location.hash() !== '') {
                $timeout(function () {

                    $anchorScroll.yOffset = 150;

                    $anchorScroll();

                }, 100);

            } else {

                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');

            }

            $scope.tab1 = [];
            $scope.tab2 = [];

            http.post({
                m: 'rules',
                w: 'get',
                p: {
                    view: $scope.view
                }
            }).then(function (data) {
                angular.forEach(data.data.result.tab1, function(va, ke) {
                    data.data.result.tab1[ke].description = $sce.trustAsHtml(va.description);
                    $scope.tab1.push(va);
                });
                angular.forEach(data.data.result.tab2, function(va, ke) {
                    data.data.result.tab2[ke].description = $sce.trustAsHtml(va.description);
                    $scope.tab2.push(va);
                });
            });


        }])
;
