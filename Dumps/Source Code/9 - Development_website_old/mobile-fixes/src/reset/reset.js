angular.module('reset', [])
    .controller('ResetCtrl', ['$scope', '$location', 'http', '$stateParams',
        function ($scope, $location, http, $stateParams) {

            $('html, body').animate({
              scrollTop: 0
            }, 'slow');

            $scope.result = '';

            if ($stateParams.token_key != '' && $stateParams.pass != '') {

                http.post({
                    m: 'register',
                    w: 'token_key',
                    p: {
                        token_key: $stateParams.token_key,
                        pass: $stateParams.pass
                    }
                }).then(function (data) {

                    if (data.data.result.response == 'ok')
                        $scope.result = 'Your password has been successfully changed.';
                    else
                        $scope.result = 'This link has expired.';
                });
            } else {

                $scope.result = '404';

            }
        }


    ]);
