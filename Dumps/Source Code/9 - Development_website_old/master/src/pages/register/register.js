angular.module('register', [])
    .controller('RegisterCtrl', ['$scope', '$http', 'http', '$location', '$state', '$sce', '$rootScope',
        function ($scope, $http, http, $location, $state, $sce, $rootScope) {

            $scope.modal = 'register';

            window.onload = function () {
                http.post({
                    m: 'matomo',
                    w: 'getGeoLocation',
                }).then(function (data) {
                    data = data.data.result;
                    var userCountry = data.response;

                    if (userCountry === 'CN' || userCountry === 'IN' || userCountry === 'SG' || userCountry === 'TW' || userCountry === 'HK') {
                        window.location.href = 'https://cn.turtle-wow.org'
                    }
                });
                window.onloadTurnstileCallback();
            }

            $scope.changeModal = function (mo) {
                $scope.modal = mo;
                $scope.response = '';
                $scope.register_data = {
                    account_name: '',
                    email_address: '',
                    user_password: '',
                    user_password2: '',
                    forum_name: '',
                    captchaInput: ''
                }
            }

            $scope.openLoginModal = function (redirect) {
                window.location.href = "login.php?redirect=" + redirect;
            }

            $scope.openRegisterModal = function () {
                http.post({
                    m: 'matomo',
                    w: 'getGeoLocation',
                }).then(function (data) {
                    data = data.data.result;
                    var userCountry = data.response;

                    if (userCountry === 'CN') {
                        window.location.href = 'https://cn.turtle-wow.org'
                    } else {
                        $scope.changeModal('register');
                        $('#register').modal('show');
                    }

                });
            }

            $scope.validEmail = function (email) {
                return email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            }

            $scope.register_data = {
                account_name: '',
                email_address: '',
                user_password: '',
                user_password2: '',
                forum_name: '',
                captchaInput: ''
            }

            $scope.register_err = false;
            $scope.response = '';

            $scope.user = {
                'user_id': localStorage.getItem('user_id'),
                'username': localStorage.getItem('username'),
                'email': localStorage.getItem('email'),
                'tokens': localStorage.getItem('tokens'),
                'rank': localStorage.getItem('rank'),
            };

            $scope.registering = false;

            $scope.forgot = function () {
                if ($scope.registering)
                    return false;
                if (!$scope.validEmail($scope.register_data.email_address)) {
                    $scope.register_err = true;
                    return;
                }

                $scope.registering = true;

                http.post({
                    m: 'register',
                    w: 'reset',
                    p: {
                        email: $scope.register_data.email_address
                    }
                }).then(function (data) {

                    $scope.registering = false;

                    $scope.response = data.data.result.response;

                    if ($scope.response.indexOf('This email doe') !== -1) {
                        $scope.modal = 'forgot';
                        return;
                    }

                    $scope.modal = 'resetok';

                    $scope.register_data = {
                        account_name: '',
                        email_address: '',
                        user_password: '',
                        user_password2: '',
                        forum_name: '',
                        captchaInput: ''
                    }
                });

            }

            $scope.cap_input = '';
            $scope.register = function () {

                if ($scope.registering)
                    return false;

                if ($scope.register_data.account_name <= 2 ||
                    !$scope.validEmail($scope.register_data.email_address) ||
                    $scope.register_data.forum_name <= 2 ||
                    $scope.register_data.user_password <= 2 ||
                    $scope.register_data.user_password2 <= 2 ||
                    $scope.register_data.user_password != $scope.register_data.user_password2) {
                    $scope.register_err = true;
                    turnstile.reset('#turnstile_reg');
                    return;
                }


                $scope.registering = true;

                http.post({
                    m: 'register',
                    w: 'register',
                    p: {
                        data: $scope.register_data
                    }
                }).then(function (data) {

                    $scope.registering = false;
                    $scope.response = data.data.result.response;

                    if ($scope.response.indexOf('Captcha verification failed') !== -1 ||
                        $scope.response.indexOf('already in use') !== -1 ||
                        $scope.response.indexOf('You must') !== -1 ||
                        $scope.response.indexOf('There was a problem creating your account, please') !== -1 ||
                        $scope.response.indexOf('There was a problem creating your account and you') !== -1
                    ) {
                        turnstile.reset('#turnstile_reg');
                        $scope.modal = 'register';
                        return;
                    }
                    $scope.modal = 'ok';

                    $scope.register_data = {
                        account_name: '',
                        email_address: '',
                        user_password: '',
                        user_password2: '',
                        forum_name: '',
                        captchaInput: ''
                    }
                });
            }
        }]);