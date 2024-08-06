angular.module('new-locations-and-maps', [])
    .controller('NewLocationsAndMapsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.gallery = [
                'turtlewow_arathi_highlands.png',
                'turtlewow_azshara.png',
                'turtlewow_deadwind_pass.png',
                'turtlewow_durotar.png',
                'turtlewow_eastern_plaguelands.png',
                'turtlewow_gilijim.png',
                'turtlewow_hinterlands.png',
                'turtlewow_lapidis.png',
                'turtlewow_sunnyglade.png',
                'turtlewow_swamps_of_sorrow.png',
                'turtlewow_tirisfal_uplands.png',
                'turtlewow_wetlands.png',
            ];


            $scope.LBimage = '';
            $scope.openLB = function(g)
            {
                var images = []
                angular.forEach($scope.gallery, function(va, ke){
                    images.push({
                        image : 'images/maps/' + va,
                        active : va == g
                    })
                });

                $scope.add_lightbox_images(images);

                $('#lightbox').modal('show');
            }


        }])
;
