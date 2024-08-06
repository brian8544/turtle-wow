angular.module('donate', [])
    .controller('DonateCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.discounts = [
                [30, 7.5],
                [40, 10],
                [50, 12.5],
                [60, 15],
                [70, 17.5],
                [80, 20],
                [90, 22.5],
                [100, 25],
                [200, 40],
                [300, 40]
            ];

            $scope._round = function(f) {
                return Math.round(f)
            }

            $scope.now_time         = Math.floor(new Date().getTime() / 1000);
            $scope.enot_merchant_id = "49589";
            $scope.enot_sign        = "";
            $scope.enot_secret      = "3aFMHr8YzPiOR0EQzPSJF0apk4-cSnNL";
            $scope.enot_infos       = {enot_price: 1, enot_points: 10, enot_price_updated:0};
            $scope.pw_infos         = {sign: "", key: "712faa19d7e316afa26e27fcc4045219", widget: "p1_1", sign_version: "2", uid: $scope.user.user_id, email: $scope.user.email};
            $scope.pw_url           = '';
            $scope.gp_infos         = {code: '', msg: ''};
            $scope.donate_panel_visible = 0;
            $scope.donate_visible_enum = {
                NONE: 0x00,
                PW: 0x01,
                GP: 0x02,
                ENOT: 0x04,
                SBERBANK: 0x08,
                BOOSTY: 0x16,
                PAYPAL: 0x32,
            };

            $scope._now = function () {
                return Math.floor(new Date().getTime() / 1000);
            }

            $scope._enotSign = function () {
                $scope.now_time = $scope._now();
                return hex_md5($scope.enot_merchant_id + ':' +
                    $scope.enot_infos.enot_price_updated + ':' +
                    $scope.enot_secret + ':' +
                    $scope.now_time);
            }

            $scope._pwSign = function()
            {
                http.post({
                    m: 'pingback',
                    w: 'pwsign',
                    p: $scope.pw_infos
                }).then(function (data) {
                    data                 = data.data.result;
                    $scope.pw_infos.sign = data.signature;
                    $scope.pw_url        = $sce.trustAsResourceUrl("https://api.paymentwall.com/api/ps/?" + data.params);
                });

            }
            $scope._pwSign();

            $scope._ksort = function(w)
            {
                var sArr = [];
                var tArr = [];
                var n    = 0;

                for (i in w) {
                  tArr[n++] = i;
                }

                tArr = tArr.sort();
                n = tArr.length;

                for (var i=0; i<n; i++) {
                  sArr[tArr[i]] = w[tArr[i]];
                }

                return sArr;
            }

            $scope.pp_status = 0;

            http.post({
                m: 'register',
                w: 'd_status',
                p: {}
            }).then(function (data) {
                $scope.pp_status = parseInt(data.data.result);
            });

            $scope.donateIsVisible = function (state) {
                return $scope.donate_panel_visible == state;
            }
            $scope.donateSetVisible = function (state) {
                if (state == $scope.donate_visible_enum.PAYPAL && $scope.pp_status == 0)
                    return;
                $scope.donate_panel_visible = state;
            }

            $scope.enotUpdatePoints = function () {
                $scope.enot_infos.enot_price_updated = $scope.enot_infos.enot_price * 80;
                $scope.enot_sign = $scope._enotSign();

                if ($scope.enot_infos.enot_price < 30) {
                    $scope.enot_infos.enot_points = Math.ceil($scope.enot_infos.enot_price * 10);
                } else {
                    var bonus = $scope.enot_infos.enot_price * 10;

                    for (var i = 0; i < $scope.discounts.length - 1; i++) {
                        if (bonus >= $scope.discounts[i][0] * 10 && bonus < $scope.discounts[i + 1][0] * 10) {
                            $scope.enot_infos.enot_points = bonus + Math.ceil(bonus * $scope.discounts[i][1] / 100);
                            break;
                        }
                    }

                    if (bonus >= $scope.discounts[$scope.discounts.length - 1][0] * 10) {
                        $scope.enot_infos.enot_points = bonus + Math.ceil(bonus * $scope.discounts[$scope.discounts.length - 1][1] / 100);
                    }
                }
            }

            $scope.useGPCode = function () {
                http.post({
                    m: 'pingback',
                    w: 'gamepoints',
                    p: {
                        account: $scope.user.user_id,
                        code: $scope.gp_infos.code
                    }
                }).then(function (data) {
                    data = data.data.result;
                    if (data.result != 0) {
                        $scope.gp_infos.msg = data.error;
                    } else {
                        $scope.gp_infos.msg = '';
                        $scope.goToPage('success');
                    }
                });
            }

            $scope.isGPErrorVisible = function () {
                return $scope.gp_infos.msg.length > 0;
            }

            $scope.refreshPoints = function () {
                http.post({
                    m: 'register',
                    w: 'getPoints',
                    p: {
                        user_id: $scope.user.user_id
                    }
                }).then(function (data) {
                    data = data.data.result;
                    if (data.result != 0)
                        return;

                    $scope.user.tokens = data.tokens;
                    localStorage.setItem("tokens", data.tokens);
                });
            }

            if ($scope.user !== null)
                $scope.refreshPoints();
            $scope.enotUpdatePoints();
        }
    ]);
