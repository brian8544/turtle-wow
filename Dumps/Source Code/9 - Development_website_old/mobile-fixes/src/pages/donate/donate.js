angular.module('donate', [])
    .controller('DonateCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

          $('html, body').animate({
            scrollTop: 0
          }, 'slow');

            $scope.discounts = [
              [30, 10, 330],
              [40, 15, 460],
              [50, 20, 600],
              [60, 25, 750],
              [70, 30, 910],
              [80, 35, 1080],
              [100, 40, 1400],
              [110, 45, 1595],
              [120, 50, 1800],
              [130, 55, 2015],
              [140, 60, 2240],
              [150, 65, 2475],
              [160, 70, 2720],
              [170, 75, 2975],
              [180, 80, 3240],
              [190, 85, 3515],
              [200, 90, 3800],
              [210, 95, 4095],
              [220, 100, 4400],
              [300, 100, 6000],

            ];


        }]);
