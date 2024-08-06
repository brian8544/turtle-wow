angular.module('activate', [])
    .controller('ActivateCtrl', ['$scope', '$location', 'http', '$stateParams',
        function ($scope, $location, http, $stateParams) {

            $('html, body').animate({
              scrollTop: 0
            }, 'slow');

            $scope.result = '';

            if ($stateParams.email != '' && $stateParams.token != '') {

                http.post({
                    m: 'register',
                    w: 'activate',
                    p: {
                        email: $stateParams.email,
                        token: $stateParams.token
                    }
                }).then(function (data) {
                    $scope.result = data.data.result.response;
                });
            } else {

                $scope.result = '404';

            }
        }


    ]);
