angular.module('achievement-titles', [])
    .controller('AchievementTitlesCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('changelog', [])
    .controller('ChangelogCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.logIndex = 0;

            http.post({
                m: 'changelog',
                w: 'get',
                p: {}
            }).then(function (data) {
                $scope.changelog = data.data.result;
                console.log($scope.changelog);
            });


            $scope.log = function (d) {
                if ((d == -1 && $scope.logIndex == 0) || (d == 1 && $scope.logIndex == $scope.changelog.length - 1))
                    return;
                $scope.logIndex = $scope.logIndex + d;
            }

        }])
;

angular.module('additional-transport-routes', [])
    .controller('AdditionalTransportRoutesCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('beginners-guild', [])
    .controller('BeginnersGuildCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('chronoboon-displacer', [])
    .controller('ChronoboonDisplacerCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('character-customizations', [])
    .controller('CharacterCustomizationsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.customizations = [
                {title: 'a', subtitle: 'b', file: 'unknown (1).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (10).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (11).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (12).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (13).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (14).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (15).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (16).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (17).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (2).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (3).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (4).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (5).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (6).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (7).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (8).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (9).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown.png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown_1.png', description: 'Description is empty, to be added.'},
            ]

        }])
;

angular.module('class-race-combinations', [])
    .controller('ClassRaceCombinationsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

        }])
;

angular.module('client-interface-improvements', [])
    .controller('ClientInterfaceImprovementsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('community-artworks', [])
    .controller('CommunityArtworksCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.artworks = [
                {author: 'Artwork by Handi (Adelaidde)', file: '4.png'},
                {author: 'Gurubashi Camper, by Kato', file: '12.png'},
                {author: '"You called?", by Chiruk', file: '17.jpg'},
                {author: 'Crescent Grove, by Illdrawer', file: '8.jpg'},
                {author: 'Adventure begins, by Chevvah', file: '10.jpg'},
                {author: 'Storm over Redridge, by Pathos', file: '14.png'},
                {author: 'Artwork by Chevvah', file: '15.jpg'},
                {author: 'Artwork by Hone', file: '6.png'},
                {author: 'Sykira the Dark Ranger, by Deekin Bearcat', file: '18.jpg'},
                {author: 'Artwork by Afa', file: '1.png'},
                {author: 'Artwork by Blackscar', file: '9.jpg'},
                {author: 'Artwork by MIXEEB', file: '3.png'},
                {author: 'Artwork by Josephine Wagner', file: '30.png'},
                {author: 'Artwork by Josephine Wagner', file: '31.jpeg'},
                {author: 'A Skirmish at Dawn, by Valamar', file: '11.png'},
                {author: 'Mysterious Stranger by Dryst', file: '20.png'},
                {author: 'Honeclaw & Hatebeak, by Zin\'tulak', file: '21.png'},
                {author: 'Echo Ridge Mine, by by PureOfHearts', file: '33.jpg'},
                {author: 'The Wayward Apprentice, by by PureOfHearts', file: '34.jpg'},
                {author: 'A Priest and His Loa, by Leaf', file: '22.jpg'},
                {author: 'Princess Inxe, by Kaguranaomi', file: '13.png'},
                {author: 'Sand Troll, by Jambiya', file: '16.jpg'},
                {author: 'Struggles of Zebrian Farm, artwork by GGena', file: '26.png'},
                {author: 'Artwork by Iffeliphe', file: '5.png'},
                {author: 'Artwork by Breno', file: '7.png'},
                {author: 'The Thoughtless Companion, by LazyRat', file: '25.png'},
                {author: 'Turtle WoW Rulez, by Escalotes', file: '19.png'},
                {author: 'Artwork by Uwuowo', file: '2.png'},
                {author: 'Brief Respite, Artwork by Werdun', file: '35.png'},
            ]

        }])
;

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

angular.module('dynamic-mount-speed', [])
    .controller('DynamicMountSpeedCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('everlook-broadcasting', [])
    .controller('EverlookBroadcastingCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

        }])
;

angular.module('fail', [])
    .controller('FailCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce)
        {

        }
    ]);
angular.module('guild-banks', [])
    .controller('GuildBanksCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('hardcore-mode', [])
    .controller('HardcoreModeCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('items-and-recipes', [])
    .controller('ItemsAndRecipesCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('logos', [])
    .controller('LogosCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('new-challenges', [])
    .controller('NewChallengesCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('new-factions-and-quests', [])
    .controller('NewFactionsAndQuestsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

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
                'turtlewow_gilneas.png',
                'turtlewow_telabim.png',
                'turtlewow_winterveil.png',
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

angular.module('new-races', [])
    .controller('NewRacesCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

        }])
;

angular.module('pets-and-mounts', [])
    .controller('PetsAndMountsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('player-versus-player-content', [])
    .controller('PlayerVersusPlayerContentCtrl', ['$scope', '$location', '$anchorScroll', '$timeout',
        function ($scope, $location, $anchorScroll, $timeout) {


            if ($location.hash() === 'war-mode') {
                $timeout(function () {
                    $anchorScroll();
                }, 100);

            } else {

                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');

            }


        }])
;

angular.module('population-graph', [])
    .controller('PopulationGraphCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            function renderChart(key, data) {
                var labels = data.labels;
                var dataA = data.dataA;
                var dataH = data.dataH;
                var dataQ = data.dataQ;
                var dataT = data.dataT;
                var dataC = data.dataC;

                var dataSets = [
                    {
                        label: 'Alliance Players',
                        cubicInterpolationMode: 'monotone',
                        data : dataA,
                        borderColor: "#0c6cef",
                        pointBackgroundColor: "#0c6cef",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5
                    },
                    {
                        label: 'Horde Players',
                        cubicInterpolationMode: 'monotone',
                        data : dataH,
                        borderColor: "#e71b1b",
                        pointBackgroundColor: "#e71b1b",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5
                    },
                    {
                        label: 'Queued Players',
                        cubicInterpolationMode: 'monotone',
                        data : dataQ,
                        borderColor: "#FFFF00",
                        pointBackgroundColor: "#FFFF00",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5,
                        backgroundColor: 'rgba(94,91,85,0.13)',
                        fill: true,
                    },
                    {
                        label: 'Total Players',
                        cubicInterpolationMode: 'monotone',
                        data : dataT,
                        borderColor: "#8cbe4b",
                        pointBackgroundColor: "#8cbe4b",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5,
                        backgroundColor: 'rgba(94,91,85,0.13)',
                        fill: true,
                    }
                ];

                var ctx = document.getElementById('population-graph-' + key).getContext('2d');

                var newChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: dataSets
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                            mode: 'index',
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                }
                            },
                            y: {
                                beginAtZero: true,
                                grid : {
                                    color :'rgba(158,151,131,0.13)'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    boxWidth: 10,
                                    boxHeight: 10,
                                }
                            },
                            annotation: {
                                annotations: [
                                    {
                                        type: 'line',
                                        mode: 'horizontal',
                                        scaleID: 'y',
                                        value: 10000,
                                        borderColor: 'red',
                                        borderWidth: 1,
                                        borderDash: [5, 5],
                                        label: {
                                            content: 'Limit to 10000',
                                            enabled: true,
                                            position: 'right',
                                        }
                                    }
                                ]
                            }
                        }
                    }
                });

                return newChart;
            }

            function updateChart(key, data) {
                var chart = renderChart(key, data);
                return chart;
            }

            var charts = {};

            function initCharts() {
                http.post({
                    m: 'stats',
                    w: 'get_population_graph',
                    p: {}
                }).then(function (response) {
                    var data = response.data.result;
                    angular.forEach(data, function (value, key) {
                        charts[key] = renderChart(key, value);
                    });
                });
            }

            initCharts();

            $scope.refreshChart = function (tab) {
                if (charts[tab]) {
                    charts[tab].resize();
                }
            }

        }])
;
angular.module('raids-and-dungeons', [])
    .controller('RaidsAndDungeonsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

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
angular.module('roleplay', [])
    .controller('RoleplayCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('seasonal-events', [])
    .controller('SeasonalEventsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

        }])
;

angular.module('shellcoin', [])
    .controller('ShellcoinCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.data = [];
            $scope.data7d = [];
            $scope.amount = 0;

            http.post({
                m: 'shellcoin',
                w: 'get7d',
                p: {}
            }).then(function (data) {
                $scope.data7d = data.data.result;
                $scope.amount = $scope.data7d[$scope.data7d.length-1].count;

                var labels = [];
                var data7d = [];

                angular.forEach($scope.data7d, function(va, ke) {
                    labels.push(va['date_nice']);
                    data7d.push(va['price']);
                })

                var dataSets = [
                    {
                        label: 'Last week',
                        cubicInterpolationMode: 'monotone',
                        data : data7d,
                        borderColor: "#8dc63f",
                        pointBackgroundColor: "#8dc63f",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5
                    },
                ];

                new Chart(document.getElementById('shellcoin-graph7d').getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: dataSets
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                            mode: 'index',
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    callback: function(val, index) {
                                        return index % 2 === 0 ? this.getLabelForValue(val) : '';
                                    },
                                }
                            },
                            y: {
                                beginAtZero: false,
                                grid : {
                                    color :'rgba(158,151,131,0.13)'
                                },
                                ticks: {
                                    callback: function(val) {
                                        var g = Math.floor(val / 100 / 100);
                                        var s = Math.floor((val / 100) % 100);
                                        var c = Math.floor(val % 100);
                                        return g + 'g ' + s + 's ' + c + 'c'
                                    },
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    boxWidth: 10,
                                    boxHeight: 10,
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        var val = context.parsed.y;
                                        var g = Math.floor(val / 100 / 100);
                                        var s = Math.floor((val / 100) % 100);
                                        var c = Math.floor(val % 100);
                                        return g + 'g ' + s + 's ' + c + 'c'
                                    }
                                }
                            },
                        },
                    }

                });


            });

            http.post({
                m: 'shellcoin',
                w: 'get',
                p: {}
            }).then(function (data) {
                $scope.data = data.data.result;
                $scope.amount = $scope.data[$scope.data.length-1].count;

                var labels = [];
                var dataA = [];

                angular.forEach(data.data.result, function(va, ke) {
                    labels.push(va['date_nice']);
                    dataA.push(va['price']);
                })

                var dataSets = [
                    {
                        label: 'Total',
                        cubicInterpolationMode: 'monotone',
                        data : dataA,
                        borderColor: "#8dc63f",
                        pointBackgroundColor: "#8dc63f",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5
                    },
                ];

                new Chart(document.getElementById('shellcoin-graph').getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: dataSets
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                            mode: 'index',
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    callback: function(val, index) {
                                        return index % 2 === 0 ? this.getLabelForValue(val) : '';
                                    },
                                }
                            },
                            y: {
                                beginAtZero: false,
                                grid : {
                                    color :'rgba(158,151,131,0.13)'
                                },
                                ticks: {
                                    callback: function(val) {
                                        var g = Math.floor(val / 100 / 100);
                                        var s = Math.floor((val / 100) % 100);
                                        var c = Math.floor(val % 100);
                                        return g + 'g ' + s + 's ' + c + 'c'
                                    },
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    boxWidth: 10,
                                    boxHeight: 10,
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        var val = context.parsed.y;
                                        var g = Math.floor(val / 100 / 100);
                                        var s = Math.floor((val / 100) % 100);
                                        var c = Math.floor(val % 100);
                                        return g + 'g ' + s + 's ' + c + 'c'
                                    }
                                }
                            },
                        },
                    }

                });


            });

        }])
;

angular.module('slow-and-steady', [])
    .controller('SlowAndSteadyCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

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

angular.module('success', [])
    .controller('SuccessCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce)
        {

        }
    ]);
angular.module('survival-and-gardening', [])
    .controller('SurvivalAndGardeningCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('transmogrification', [])
    .controller('TransmogrificationCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('vagrants-endeavor', [])
    .controller('VagrantsEndeavorCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');


        }])
;

angular.module('watch', [])
    .controller('WatchCtrl', ['$scope', '$location', 'http', '$sce', '$stateParams', '$timeout',
        function ($scope, $location, http, $sce, $stateParams, $timeout) {

            // $('html, body').animate({
            //     scrollTop: 0
            // }, 'slow');

            var prevScrollPos = window.scrollY;
            window.onscroll = function() {
                var currentScrollPos = window.scrollY;
                if (prevScrollPos > currentScrollPos) {
                    document.getElementById("main-navbar").style.top = "0";
                } else {
                    document.getElementById("main-navbar").style.top = "-80px";
                }
                prevScrollPos = currentScrollPos;
            }

            $scope.view = 'all';
            $scope.searchQuery = '';
            $scope.comment = '';
            $scope.reply = '';
            $scope.currentVideo = [];

            $scope.lid = 0;
            $scope.lidReplies = 0;

            $scope.showMore = true;

            $scope.chars = [];
            $scope.char = localStorage.getItem('postingChar');

            $scope.moderation = [];

            $scope.getComments = function (lid) {
                var clearComments = false;
                if (typeof lid === 'undefined') {
                    lid = 2147483647;
                    //$scope.currentVideo.comments = [];
                    clearComments = true;
                }

                $scope.comment = '';

                http.post({
                    m: 'video',
                    w: 'getComments',
                    p: {
                        id: $scope.id,
                        lid: lid
                    }
                }).then(function (data) {
                    if (clearComments)
                        $scope.currentVideo.comments = [];

                    angular.forEach(data.data.result.comments, function (va, ke) {
                        va.showReplies = false;
                        va.confirmation = -1;
                        $scope.lid = va.id;
                        $scope.currentVideo.comments.push(va)
                    });
                    $scope.currentVideo.commentsCount = data.data.result.commentsCount;
                    $scope.showMore = data.data.result.commentsCount > $scope.currentVideo.comments.length;
                });
            }

            $scope.getLikes = function () {
                http.post({
                    m: 'video',
                    w: 'likes',
                    p: {
                        id: $scope.id
                    }
                }).then(function (data) {
                    $scope.likes = data.data.result;
                });
            }

            $scope.getViews = function (id) {
                http.post({
                    m: 'video',
                    w: 'getViews',
                    p: {
                        id: id
                    }
                }).then(function (data) {
                    $scope.currentVideo.views = data.data.result;
                });
            }

            $scope.nothing = true;

            $scope.filterChannels = function () {

                $scope.channels = $scope.getChannels();

                $scope.id = $stateParams['id'];

                $scope.view = '';
                $scope.currentChannel = [];
                $scope.currentVideo = [];
                $scope.otherVideos = [];

                if ($location.$$path.indexOf('watch') !== -1 && $location.$$path.indexOf('watch/') === -1) {
                    $scope.view = 'all';
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }


                if ($location.$$path.indexOf('channel') !== -1) {
                    $scope.view = 'channel';
                    angular.forEach($scope.channels, function (va, ke) {
                        if ($scope.id == va.name_slug)
                            $scope.currentChannel = va;
                    });
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }

                if ($location.$$path.indexOf('watch/') !== -1 && $location.$$path.indexOf('watch/channel') === -1) {
                    $scope.view = 'video';
                    $scope.channel = '';
                    angular.forEach($scope.channels, function (va, ke) {
                        angular.forEach(va.videos, function (va2, ke2) {
                            if (va2.id == $scope.id) {

                                $scope.getViews($scope.id);
                                $scope.getComments();
                                $scope.getLikes();

                                $scope.currentVideo = va2;
                                $scope.channel = va.name;
                            }
                        });
                    });
                    angular.forEach($scope.channels, function (va, ke) {
                        if (va.name == $scope.channel) {
                            angular.forEach(va.videos, function (va2, ke2) {
                                if (va2.id !== $scope.currentVideo.id)
                                    $scope.otherVideos.push(va2);
                            });
                        }
                    });
                    $('html, body').animate({
                        scrollTop: 245
                    }, 'slow');
                }

                if ($location.$$path.indexOf('moderation') !== -1) {
                    $scope.view = 'moderation';
                    $scope.nothing = true;

                    http.post({
                        m: 'video',
                        w: 'commentsAdmin'
                    }).then(function (data) {
                        if (data.data.result.nothing === 'here') {
                            $scope.nothing = true;
                            return;
                        }
                        $scope.nothing = false;
                        $scope.moderation = data.data.result;
                    });
                }
            }

            $scope.moderate = function (id, i) {
                http.post({
                    m: 'video',
                    w: 'moderate',
                    p: {
                        id: id,
                        i: i
                    }
                }).then(function (data) {
                    if (data.data.result.moderated == 'ok')
                        angular.forEach($scope.moderation, function (va, ke) {
                            if (va.id === id)
                                $scope.moderation.splice(ke, 1);
                        })
                });
            }

            $scope.initVideos = function () {
                if ($scope.channelsNum() === 0) {

                    http.post({
                        m: 'video',
                        w: 'get'
                    }).then(function (data) {
                        $scope.setChannels(data.data.result);
                        $scope.filterChannels();
                    });

                } else {
                    $scope.filterChannels();
                }
            }

            $scope.initVideos();

            $scope.$on('initVideos', function (event, args) {
                $scope.setChannels([]);
                $scope.initVideos();
            });

            $scope.addingComment = false;
            $scope.commentLimit = false;
            $scope.commentLevel = false

            $scope.toAddComment = function () {
                if ($scope.addingComment) {
                    $scope.addingComment = false;
                    return
                }

                http.post({
                    m: 'video',
                    w: 'ci',
                    p: {}
                }).then(function (data) {
                    if (data.data.result.login) {
                        $scope.comment = '';
                        $scope.addingComment = true;
                        $timeout(function () {
                            document.getElementById('comment').focus();
                        }, 100);
                        $scope.getChars();
                    } else {
                        $scope.openLoginModal('watch/' + $scope.currentVideo.id);
                    }
                });

            }

            $scope.cancelAddComment = function () {
                $scope.comment = '';
                $scope.addingComment = false;
            }

            $scope.working = false;
            $scope.addComment = function (c) {
                if ($scope.working)
                    return;

                if (c.length > 0) {
                    $scope.commentLimit = false;
                    $scope.commentLevel = false;
                    $scope.working = true;
                    http.post({
                        m: 'video',
                        w: 'comment',
                        p: {
                            id: $scope.currentVideo.id,
                            comment: c,
                            char: $scope.char
                        }
                    }).then(function (data) {
                        $scope.working = false;
                        if (data.data.result.limit) {
                            $scope.commentLimit = true;
                            return
                        }
                        if (data.data.result.minlvl15) {
                            $scope.commentLevel = true;
                            return
                        }
                        $scope.addingComment = false;
                        $scope.currentVideo.commentsCount = data.data.result.commentsCount;
                        data.data.result.comment.confirmation = -1;
                        $scope.currentVideo.comments.unshift(data.data.result.comment);
                    });
                }
            }


            $scope.showReplies = function (c, lid) {
                if (typeof lid == 'undefined') {
                    lid = 0;
                    if (typeof c.replies == 'undefined')
                        c.replies = [];
                }

                if (c.showReplies && lid === 0) {
                    c.showReplies = false;
                    return;
                }

                if (lid === 0 && c.replies.length > 0) {
                    c.showReplies = !c.showReplies;
                    return;
                }

                http.post({
                    m: 'video',
                    w: 'getReplies',
                    p: {
                        parent: c.id,
                        lid: lid
                    }
                }).then(function (data) {

                    angular.forEach(data.data.result.replies, function (va, ke) {
                        $scope.lidReplies = va.id
                        c.replies.push(va);
                        c.reply = '';
                        va.confirmation = -1;
                    });

                    c.showMoreReplies = data.data.result.repliesCount > c.replies.length;
                    c.showPreviousReplies = false;

                    c.showReplies = true;

                });
            }

            $scope.showPreviousReplies = function (c, lid) {
                http.post({
                    m: 'video',
                    w: 'getReplies',
                    p: {
                        parent: c.id,
                        lid: lid,
                        previous: true
                    }
                }).then(function (data) {
                    angular.forEach(data.data.result.replies, function (va, ke) {
                        va.confirmation = -1;
                        c.replies.unshift(va);
                    });
                    c.showPreviousReplies = c.repliesCount > c.replies.length;
                })
            }

            $scope.toReply = function (c) {
                $scope.reply = '';
                http.post({
                    m: 'video',
                    w: 'ci',
                    p: {}
                }).then(function (data) {
                    if (data.data.result.login) {
                        c.addingReply = !c.addingReply;
                        if (c.addingReply) {
                            $timeout(function () {
                                document.getElementById("reply-" + c.id).focus();
                            }, 100);
                            $scope.getChars();
                        }
                    } else {
                        $scope.openLoginModal('watch/' + $scope.currentVideo.id);
                    }
                });

            }

            $scope.cancelAddReply = function (c) {
                c.reply = '';
                c.addingReply = false;
            }

            $scope.addReply = function (c) {
                if ($scope.working)
                    return;
                if (c.reply.length > 0) {
                    c.replyLimit = false;
                    c.replyLevel = false;
                    $scope.working = true;
                    http.post({
                        m: 'video',
                        w: 'comment',
                        p: {
                            id: $scope.currentVideo.id,
                            parent: c.id,
                            comment: c.reply,
                            char: $scope.char
                        }
                    }).then(function (data) {
                        $scope.working = false;
                        if (data.data.result.limit) {
                            c.replyLimit = true;
                            return
                        }
                        if (data.data.result.limit) {
                            c.replyLevel = true;
                            return
                        }
                        $scope.cancelAddReply(c);
                        angular.forEach(data.data.result.replies, function (va, ke) {
                            va.confirmation = -1
                        });

                        c.replies = data.data.result.replies;
                        c.repliesCount = data.data.result.repliesCount;
                        c.showMoreReplies = false;
                        c.showPreviousReplies = c.repliesCount > data.data.result.replies.length;
                        c.showReplies = true;
                    });
                }
            }

            $scope.like = function (l) {
                http.post({
                    m: 'video',
                    w: 'like',
                    p: {
                        id: $scope.id,
                        l: l
                    }
                }).then(function (data) {
                    if (data.data.result.login == 0) {
                        $scope.openLoginModal('watch/' + $scope.currentVideo.id);
                    } else {
                        $scope.getLikes();
                    }

                });
            }

            $scope.editComment = function (c, action) {
                if (action === 'open') {
                    c.edit = true;
                    c.originalComment = c.comment;
                    $timeout(function () {
                        document.getElementById("edit-" + c.id).focus();
                    }, 100);
                    if ($scope.chars.length === 0)
                        $scope.getChars();
                    return
                }
                if (action === 'save' && c.comment.length > 0) {
                    if (c.comment === c.originalComment && c.char === $scope.char) {
                        c.edit = false;
                        return
                    }
                    http.post({
                        m: 'video',
                        w: 'editComment',
                        p: {
                            id: c.id,
                            comment: c.comment,
                            char: $scope.char
                        }
                    }).then(function (data) {
                        c.char = data.data.result.char;
                        c.class = data.data.result.class;
                        c.edit = false;
                    });
                }
            }

            $scope.editReply = function (r, action) {
                if (action === 'open') {
                    r.edit = true;
                    r.originalReply = r.reply;
                    $timeout(function () {
                        document.getElementById("editReply-" + r.id).focus();
                    }, 100);
                    if ($scope.chars.length === 0)
                        $scope.getChars();
                    return
                }
                if (action === 'save' && r.reply.length > 0) {
                    if (r.reply === r.originalReply && r.char === $scope.char) {
                        r.edit = false;
                        return
                    }
                    http.post({
                        m: 'video',
                        w: 'editComment',
                        p: {
                            id: r.id,
                            comment: r.reply,
                            char: $scope.char
                        }
                    }).then(function (data) {
                        r.char = data.data.result.char;
                        r.class = data.data.result.class;
                        r.edit = false;
                    });
                }
            }

            $scope.cancelEditComment = function (c) {
                c.edit = false;
                c.comment = c.originalComment;
            }

            $scope.cancelEditReply = function (r) {
                r.edit = false;
                r.reply = r.originalReply;
            }

            $scope.deleteComment = function (c, confirmation) {
                c.confirmation = confirmation;

                if (c.confirmation === 1) {

                    http.post({
                        m: 'video',
                        w: 'deleteComment',
                        p: {
                            id: c.id
                        }
                    }).then(function (data) {
                        angular.forEach($scope.currentVideo.comments, function (va, ke) {
                            if (va.id == c.id) {
                                $scope.currentVideo.comments.splice(ke, 1);
                                $scope.currentVideo.commentsCount--;
                            }
                        });
                        $scope.showMore = $scope.currentVideo.commentsCount > $scope.currentVideo.comments.length;
                    });
                }
            }

            $scope.deleteReply = function (reply, parent, confirmation) {
                reply.confirmation = confirmation;

                if (reply.confirmation === 1) {

                    http.post({
                        m: 'video',
                        w: 'deleteComment',
                        p: {
                            id: reply.id
                        }
                    }).then(function (data) {
                        angular.forEach(parent.replies, function (va, ke) {
                            if (va.id === reply.id) {
                                parent.replies.splice(ke, 1);
                                parent.repliesCount--;
                            }
                        });
                        if (parent.repliesCount == 0) {
                            parent.showMoreReplies = false;
                            parent.showReplies = false;
                        }
                    });
                }
            }

            $scope.selectingChar = false;

            $scope.changeChar = function (n) {
                if (n === 0) {
                    $scope.selectingChar = true;
                    return;
                }

                $scope.char = n;
                localStorage.setItem('postingChar', n);
                $scope.selectingChar = false;
            }

            $scope.getChars = function () {
                if ($scope.chars.length === 0) {
                    http.post({
                        m: 'video',
                        w: 'getChars',
                        p: {}
                    }).then(function (data) {
                        $scope.chars = data.data.result;
                        if ($scope.char === null) {
                            $scope.char = $scope.chars[0].name;
                            localStorage.setItem('postingChar', $scope.char);
                        }
                    });
                }
            }

        }])
;

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

angular.module('armory', [])
    .controller('ArmoryCtrl', ['$scope', '$location', 'http', '$sce', '$stateParams', '$timeout',
        function ($scope, $location, http, $sce, $stateParams, $timeout) {

            // $('html, body').animate({
            //     scrollTop: 0
            // }, 'slow');

            $scope.state = '';

            if ($stateParams.character)
                $scope.state = 'character';

            $scope.q = '';

            $scope.results = {};

            $scope.armorySearch = function (q) {

                if (!q)
                    return;
                if (q.length < 2)
                    return;

                http.post({
                    m: 'armory',
                    w: 'search',
                    p: {
                        q: q
                    }
                }).then(function (data) {

                    $scope.results = data.data.result;

                });

            }

            $scope.goToCharacter = function (c) {
                $location.url('armory/character/' + c);
            }

            $scope.c = {}

            $scope.getCharacter = function (c) {
                http.post({
                    m: 'armory',
                    w: 'character',
                    p: {
                        c: c
                    }
                }).then(function (data) {

                    $scope.c = data.data.result;

                });
            }


            if ($scope.state == 'character') {
                $scope.getCharacter($stateParams.character);
            }

            $scope.getItem = function (slot) {
                var rd = false;
                angular.forEach($scope.c.gear, function (va, ke) {

                    if (parseInt(va['slot']) === slot) {
                        rd = va;
                    }
                });

                return rd;
            };


        }])
;

angular.module('classes', [])
    .controller('ClassesCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            // $('html, body').animate({
            //     scrollTop: 0
            // }, 'slow');


        }])
;

angular.module('home', [])
    .controller('HomeCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            // $('html, body').animate({
            //     scrollTop: 0
            // }, 'slow');

            $scope.videos = [
                $sce.trustAsResourceUrl('https://player.vimeo.com/video/748353959?h=cd57f9c652')
            ];
            $scope.videosIndex = 0;


            $scope.ytVideo = function (dir) {
                if (dir == 'prev') {
                    if ($scope.videosIndex == 0)
                        return;
                    $scope.videosIndex--;
                }
                if (dir == 'next') {
                    if ($scope.videosIndex == ($scope.videos.length - 1))
                        return;
                    $scope.videosIndex++;
                }
            }

        }]);

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

angular.module('ucp', ['ui.bootstrap'])
    .controller('UcpCtrl', ['$scope', '$location', 'http', '$sce', '$stateParams', '$timeout',
        function ($scope, $location, http, $sce, $stateParams, $timeout) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.emailChange = {
                old: '',
                new: '',
                result: '',
                done: false
            }

            $scope.rank = localStorage.getItem('rank');

            $scope.shop_logs = [];
            $scope.shop_coins_history = [];
            $scope.logsPage = 1;
            $scope.historyPage = 1;
            $scope.logsLimit = 10;
            $scope.historyLimit = 10;
            $scope.total_logs_pages = 0;
            $scope.total_pages_shop_coins = 0;

            $scope.pageChanged = function(logsPage, historyPage) {
                $scope.logsPage = logsPage;
                $scope.historyPage = historyPage;
                $scope.get_history_shop();
            };


            $scope.get_history_shop = function () {
                http.post({
                    m: 'ucp',
                    w: 'get_history_shop',
                    p: {
                        logsPage: $scope.logsPage,
                        logsLimit: $scope.logsLimit,
                        historyPage: $scope.historyPage,
                        historyLimit: $scope.historyLimit
                    }
                }).then(function (data) {
                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.shop_logs = data.data.result.shop_logs;
                    $scope.shop_coins_history = data.data.result.shop_coins_history;
                    $scope.logsPage = data.data.result.current_logs_page;
                    $scope.historyPage = data.data.result.current_history_page;
                    $scope.total_logs_pages = data.data.result.total_logs_pages;
                    $scope.total_pages_shop_coins = data.data.result.total_pages_shop_coins;

                    $scope.total_logs_items = $scope.total_logs_pages * $scope.logsLimit;
                    $scope.total_coins = $scope.total_pages_shop_coins * $scope.historyLimit;

                });
            }

            // unstuck
            $scope.unstuck_characters = [];
            $scope.unstuck = {
                character: '0',
            }

            $scope.unstucking = false;
            $scope.unstuck_complete = false;
            $scope.unstuck_result = '';

            $scope.get_unstuck_characters = function () {
                http.post({
                    m: 'ucp',
                    w: 'get_unstuck_list',
                    p: {}
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.unstuck_characters = data.data.result;
                });
            }


            $scope.unstuck_eligible_status = function (guid) {
                var status = -1;
                var cooldown = -1;

                angular.forEach($scope.unstuck_characters, function (va, ke) {
                    if (va.guid == guid) {
                        status = 0;
                        cooldown = 0;
                        if (va.online == 1)
                            status = 1;
                        if (va.cd != 0) {
                            status = 2;
                            cooldown = va.cd;
                        }
                    }
                });

                return {
                    status: status,
                    cooldown: cooldown
                }
            }

            $scope.unstuck_do = function (guid) {
                $scope.unstucking = true;
                http.post({
                    m: 'ucp',
                    w: 'unstuck',
                    p: {
                        guid: guid
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.unstucking = false;
                    if (data.data.result.err) {
                        $scope.unstuck_complete = false
                    } else {
                        $scope.unstuck_complete = true;
                    }
                    $scope.unstuck_result = data.data.result.details;
                });
            }

            if (typeof $stateParams.token !== 'undefined') {
                $scope.view = 'email-changed';
                $scope.emailChange.result = '';
                http.post({
                    m: 'ucp',
                    w: 'activateNewEmail',
                    p: {
                        token: $stateParams.token,
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.emailChange.result = data.data.result.details;

                });
            } else {
                $scope.view = $stateParams.route;
                if ($scope.view == 'services') {
                    $scope.get_unstuck_characters();
                }
                if ($scope.view == 'history_shop') {
                    $scope.get_history_shop();
                }
            }


            $scope.data = {};

            $scope.getUCP = function() {

                http.post({
                    m: 'ucp',
                    w: 'get',
                    p: {
                        view: $scope.view
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    if ($scope.view == 'overview')
                        angular.forEach(data.data.result.status.messages, function (v, k) {
                            v.m = $sce.trustAsHtml(v.message);
                        });

                    $scope.data = data.data.result;
                });

            }

            $scope.getUCP();

            // email change

            $scope.toggleEmailChangeModal = function () {
                $scope.emailChange = {
                    old: '',
                    new: '',
                    result: '',
                    done: false
                }
                $('#emailChange').modal('toggle')
            }

            $scope.appeal = {
                message: '',
                err: ''
            }
            $scope.toggleBanAppealModal = function () {
                $scope.appeal = {
                    message: '',
                    err: ''
                }

                http.post({
                    m: 'ucp',
                    w: 'mark_read',
                    p: {}
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                });

                $('#banAppeal').modal('toggle');

                $timeout(function () {
                    $("#messageHistory").animate({scrollTop: $('#messageHistory').prop("scrollHeight")}, 100);
                }, 500);
            }

            $scope.sendAppeal = function () {
                http.post({
                    m: 'ucp',
                    w: 'add_appeal',
                    p: {
                        message: $scope.appeal.message
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.appeal.err = data.data.result.details

                    if (!data.data.result.err) {
                        $scope.appeal.message = '';
                        http.post({
                            m: 'ucp',
                            w: 'get',
                            p: {
                                view: $scope.view
                            }
                        }).then(function (data) {

                            if (data.data.result.details && data.data.result.details == 'Not logged in.')
                                $scope.logout();

                            if ($scope.view == 'overview')
                                angular.forEach(data.data.result.status.messages, function (v, k) {
                                    v.m = $sce.trustAsHtml(v.message);
                                });

                            $scope.data = data.data.result;

                            $timeout(function () {
                                $("#messageHistory").animate({scrollTop: $('#messageHistory').prop("scrollHeight")}, 100);
                            }, 500);

                        });
                    }
                });
            }

            $scope.changeEmailAddress = function () {

                if (!$scope.emailChange.old) {
                    $scope.emailChange.result = 'Invalid old email address';
                    return;
                }
                if (!$scope.emailChange.new) {
                    $scope.emailChange.result = 'Invalid new email address';
                    return;
                }

                if ($scope.emailChange.old.length === 0 || $scope.emailChange.new.length === 0) {
                    $scope.emailChange.result = 'Email address can\'t be empty';
                    return;
                }

                if ($scope.emailChange.old === $scope.emailChange.new) {
                    $scope.emailChange.result = 'New and old addresses cannot be the same.';
                    return;
                }

                http.post({
                    m: 'ucp',
                    w: 'changeEmail',
                    p: {
                        old: $scope.emailChange.old,
                        new: $scope.emailChange.new,
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.emailChange.result = data.data.result.details;
                    $scope.emailChange.done = !data.data.result.err;

                });
            }

            $scope.transfer_complete = false;
            $scope.confirmation_checked = false;

            $scope.transfer_account = {
                needNewAccount: false,
                banned: false,
                online: false,
                in_progress: false,
                account_name: '',
                user_password: '',
                user_password2: '',
                realm_id: '0'
            }

            $scope.character_queue_status = [];

            $scope.realm_lists = [
                {
                    id: 2,
                    realmName: 'Ravenshire'
                },
                {
                    id: 3,
                    realmName: 'Emerald Dream'
                }
            ];

            $scope.transfer_err = false;

            $scope.toggleTransferAccountModal = function (toggle) {
                http.post({
                    m: 'ucp',
                    w: 'checkTransferStatus',
                }).then(function (data) {
                    data = data.data.result;


                    if (data.in_progress) {
                        $scope.transfer_account.in_progress = data.in_progress;
                    }
                    if (data.transfer_complete) {
                        $scope.transfer_complete = data.transfer_complete;
                    }
                    if (data.characters) {
                        $scope.character_queue_status = data.characters;
                    }
                    if (data.banned) {
                        $scope.transfer_account.banned = data.banned;
                    }
                    if (data.online) {
                        $scope.transfer_account.online = data.online;
                    }
                    if (data.username_exists) {
                        $scope.transfer_account.needNewAccount = data.username_exists;
                    }
                    if (data.error) {
                        $scope.transfer_err = data.error;
                    }
                });

                if (toggle) {
                    $('#transferAccount').modal('toggle');
                }
            }

            $scope.transferAccount = function () {
                if ($scope.transfer_account.needNewAccount) {
                    if ($scope.transfer_account.account_name <= 2 ||
                        $scope.transfer_account.user_password <= 2 ||
                        $scope.transfer_account.user_password2 <= 2 ||
                        $scope.transfer_account.user_password != $scope.transfer_account.user_password2) {
                        $scope.transfer_err = true;
                        return;
                    }
                }

                http.post({
                    m: 'ucp',
                    w: 'transferAccount',
                    p: {
                        data: $scope.transfer_account
                    }
                }).then(function (data) {
                    if (data.data.result.response.username) {
                        $scope.response = data.data.result.response.username;
                    } else {
                        $scope.response = data.data.result.response;
                    }
                    if (data.data.result.error) {
                        $scope.transfer_err = data.data.result.error;
                    }

                    if ($scope.response.indexOf('Successfully added') !== -1) {
                        $scope.transfer_account.in_progress = true;
                        $scope.toggleTransferAccountModal(false);
                    }
                });
            }

            $scope.beginTransferCharacter = function (guid) {
                $scope.transfer_err = false;
                $scope.response = '';

                http.post({
                    m: 'ucp',
                    w: 'beginTransferCharacter',
                    p: {
                        guid: guid
                    }
                }).then(function (data) {
                    if (data.data.result.error) {
                        $scope.transfer_err = data.data.result.error;
                    }
                    if (data.data.result.response) {
                        $scope.response = data.data.result.response;
                    }

                    if (!$scope.transfer_err) {
                        $scope.toggleTransferAccountModal(false);
                    }
                });
            }

            $scope.completeTransferCharacter = function (guid) {
                $scope.transfer_err = false;
                $scope.response = '';

                http.post({
                    m: 'ucp',
                    w: 'completeTransferCharacter',
                    p: {
                        guid: guid
                    }
                }).then(function (data) {
                    if (data.data.result.error) {
                        $scope.transfer_err = data.data.result.error;
                    }
                    if (data.data.result.response) {
                        $scope.response = data.data.result.response;
                    }

                    if (data.data.result.transferComplete) {
                        $scope.logout(true);
                    }

                    if (!$scope.transfer_err) {
                        $scope.toggleTransferAccountModal(false);
                    }
                });
            }


            // delete account
            $scope.delete_account = {
                checkbox: false,
                email: '',
                password: '',
                result: ''
            }
            $scope.toggleDeleteAccountModal = function () {
                $scope.delete_account = {
                    checkbox: false,
                    email: '',
                    password: '',
                    result: ''
                }
                $('#deleteAccount').modal('toggle');
            }
            $scope.delete_account_checkbox_toggle = function () {
                $scope.delete_account.checkbox = !$scope.delete_account.checkbox;
            }
            $scope.deleteAccount = function () {
                http.post({
                    m: 'ucp',
                    w: 'deleteAccount',
                    p: {
                        email: $scope.delete_account.email,
                        password: $scope.delete_account.password
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    if (data.data.result.err) {
                        $scope.delete_account.result = data.data.result.details;
                    } else {
                        $('#deleteAccount').modal('toggle');
                        $timeout(function () {
                            $scope.logout();
                        }, 750);
                    }
                });
            }


            var update_email_sub_timer;

            // newsletter
            $scope.toggleEmailSub = function () {
                if ($scope.data.email_sub === 1)
                    $scope.data.email_sub = 0;
                else
                    $scope.data.email_sub = 1;

                $timeout.cancel(update_email_sub_timer);

                update_email_sub_timer = $timeout(function () {
                    http.post({
                        m: 'ucp',
                        w: 'setEmailSub',
                        p: {
                            to: $scope.data.email_sub
                        }
                    }).then(function (data) {

                        if (data.data.result.details && data.data.result.details == 'Not logged in.')
                            $scope.logout();

                    });
                }, 1000)

            }

            $scope.security = {
                c_password: '',
                n_password: '',
                n_password2: '',
                pw_change_result: ''
            }

            $scope.change_password = function () {

                if ($scope.passwords_valid()) {

                    http.post({
                        m: 'ucp',
                        w: 'change_password',
                        p: {
                            data: $scope.security
                        }
                    }).then(function (data) {

                        if (data.data.result.details && data.data.result.details == 'Not logged in.')
                            $scope.logout();

                        if (data.data.result.err) {

                        } else {
                            $scope.security = {
                                c_password: '',
                                n_password: '',
                                n_password2: ''
                            }
                        }

                        $scope.security.pw_change_result = data.data.result.details;

                    });
                }

            }

            $scope.passwords_valid = function () {
                if ($scope.security.c_password == '' || $scope.security.n_password == ''
                    || $scope.security.n_password == '')
                    return false;

                if ($scope.security.n_password != '' && $scope.security.n_password != $scope.security.n_password2)
                    return false;

                return /^[\dA-Za-z!?%*$\-+]{4,16}$/.test($scope.security.n_password);
            }

            $scope.pw_valid = function(pw) {
                if (pw == '')
                    return true;
                return /^[\dA-Za-z!?%*$\-+]{4,16}$/.test(pw);
            }

            $scope.restore_result = 'Character restored';
            $scope.restoreCharacter = function(name) {

                http.post({
                    m: 'ucp',
                    w: 'restoreCharacter',
                    p: {
                        name: name
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.restore_result = data.data.result.details;

                    if (data.data.result.err) {
                    } else {
                        $scope.getUCP();
                    }

                });

            }

        }])
;
angular.module('directives', [
    'turtle-video'
])
    .directive('enterSubmit', [function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.enterSubmit);
                    });

                    event.preventDefault();
                }
            });
        };
    }])
    .directive('tooltip', [function () {
        return {
            link: function (scope, element) {
                element.tooltip();
            }
        };
    }]);

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

angular.module('filters', [
    'ucfirst'
]);
angular.module('ucfirst', [])
    .filter('ucfirst', [function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    }]);
angular.module('http.service', [])
    .factory('http', ['$http', function ($http) {

        return {
            get: function (params) {
                return $http({
                    url: "api/",
                    method: "GET",
                    params: params
                });
            },
            post: function (params) {
                return $http({
                    method: 'POST',
                    url: typeof params.url !== 'undefined' ? 'api/' + params.url : 'api/index.php?url=' + params.m + '/' + params.w,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        angular.forEach(obj, function (va, ke) {
                            if (typeof va === 'object') va = angular.toJson(va);
                            str.push(encodeURIComponent(ke) + "=" + encodeURIComponent(va));
                        });
                        return str.join("&");
                    },
                    data: params
                })
            }
        }
    }]);

angular.module('modules', [
    'filters',
    'directives',
    'home',
    'donate',
    'success',
    'fail',
    'changelog',
    'sound-design',
    'reset',
    'activate',
    'new-races',
    'class-race-combinations',
    'seasonal-events',
    'new-locations-and-maps',
    'additional-transport-routes',
    'client-interface-improvements',
    'player-versus-player-content',
    'hardcore-mode',
    'slow-and-steady',
    'beginners-guild',
    'chronoboon-displacer',
    'character-customizations',
    'achievement-titles',
    'guild-banks',
    'transmogrification',
    'dynamic-mount-speed',
    'survival-and-gardening',
    'raids-and-dungeons',
    'new-factions-and-quests',
    'items-and-recipes',
    'pets-and-mounts',
    'roleplay',
    'logos',
    'classes',
    'population-graph',
    'community-artworks',
    'shellcoin',
    'watch',
    'ucp',
    'rules',
    'everlook-broadcasting',
    'vagrants-endeavor',
    'new-challenges'
]);

"use strict"
angular.module('tw', [
    'ui.router',
    'templates',
    'http.service',
    'modules',
])

    .run(['$rootScope', '$templateCache', function ($rootScope, $templateCache) {
    }])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: "/home",
                views: {
                    "main": {
                        templateUrl: "/home/home.html",
                        controller: "HomeCtrl"
                    }
                }
            })

            .state('reset', {
                url: "/reset/:token_key/:pass",
                views: {
                    "main": {
                        templateUrl: "/reset/reset.html",
                        controller: "ResetCtrl"
                    }
                }
            })

            .state('activate', {
                url: "/activate/:email/:token",
                views: {
                    "main": {
                        templateUrl: "/activate/activate.html",
                        controller: "ActivateCtrl"
                    }
                }
            })

            .state('donate', {
                url: "/donate",
                views: {
                    "main": {
                        templateUrl: "/donate/donate.html",
                        controller: "DonateCtrl"
                    }
                }
            })

            .state('donatedev', {
                url: "/donatedev",
                views: {
                    "main": {
                        templateUrl: "/donate/donate.html",
                        controller: "DonateCtrl"
                    }
                }
            })

            .state('success', {
                url: "/success",
                views: {
                    "main": {
                        templateUrl: "/success/success.html",
                        controller: "SuccessCtrl"
                    }
                }
            })

            .state('fail', {
                url: "/fail",
                views: {
                    "main": {
                        templateUrl: "/fail/fail.html",
                        controller: "FailCtrl"
                    }
                }
            })

            .state('changelog', {
                url: "/changelog",
                views: {
                    "main": {
                        templateUrl: "/changelog/changelog.html",
                        controller: "ChangelogCtrl"
                    }
                }
            })

            .state('sound-design', {
                url: "/sound-design",
                views: {
                    "main": {
                        templateUrl: "/sound-design/sound-design.html",
                        controller: "SoundDesignCtrl"
                    }
                }
            })

            .state('new-races', {
                url: "/new-races",
                views: {
                    "main": {
                        templateUrl: "/new-races/new-races.html",
                        controller: "NewRacesCtrl"
                    }
                }
            })

            .state('class-race-combinations', {
                url: "/class-race-combinations",
                views: {
                    "main": {
                        templateUrl: "/class-race-combinations/class-race-combinations.html",
                        controller: "ClassRaceCombinationsCtrl"
                    }
                }
            })

            .state('seasonal-events', {
                url: "/seasonal-events",
                views: {
                    "main": {
                        templateUrl: "/seasonal-events/seasonal-events.html",
                        controller: "SeasonalEventsCtrl"
                    }
                }
            })

            .state('new-locations-and-maps', {
                url: "/new-locations-and-maps",
                views: {
                    "main": {
                        templateUrl: "/new-locations-and-maps/new-locations-and-maps.html",
                        controller: "NewLocationsAndMapsCtrl"
                    }
                }
            })

            .state('additional-transport-routes', {
                url: "/additional-transport-routes",
                views: {
                    "main": {
                        templateUrl: "/additional-transport-routes/additional-transport-routes.html",
                        controller: "AdditionalTransportRoutesCtrl"
                    }
                }
            })

            .state('client-interface-improvements', {
                url: "/client-interface-improvements",
                views: {
                    "main": {
                        templateUrl: "/client-interface-improvements/client-interface-improvements.html",
                        controller: "ClientInterfaceImprovementsCtrl"
                    }
                }
            })

            .state('player-versus-player-content', {
                url: "/player-versus-player-content",
                views: {
                    "main": {
                        templateUrl: "/player-versus-player-content/player-versus-player-content.html",
                        controller: "PlayerVersusPlayerContentCtrl"
                    }
                }
            })

            .state('hardcore-mode', {
                url: "/hardcore-mode",
                views: {
                    "main": {
                        templateUrl: "/hardcore-mode/hardcore-mode.html",
                        controller: "HardcoreModeCtrl"
                    }
                }
            })

            .state('slow-and-steady', {
                url: "/slow-and-steady",
                views: {
                    "main": {
                        templateUrl: "/slow-and-steady/slow-and-steady.html",
                        controller: "SlowAndSteadyCtrl"
                    }
                }
            })

            .state('chronoboon-displacer', {
                url: "/chronoboon-displacer",
                views: {
                    "main": {
                        templateUrl: "/chronoboon-displacer/chronoboon-displacer.html",
                        controller: "ChronoboonDisplacerCtrl"
                    }
                }
            })

            .state('character-customizations', {
                url: "/character-customizations",
                views: {
                    "main": {
                        templateUrl: "/character-customizations/character-customizations.html",
                        controller: "CharacterCustomizationsCtrl"
                    }
                }
            })

            .state('achievement-titles', {
                url: "/achievement-titles",
                views: {
                    "main": {
                        templateUrl: "/achievement-titles/achievement-titles.html",
                        controller: "AchievementTitlesCtrl"
                    }
                }
            })

            .state('guild-banks', {
                url: "/guild-banks",
                views: {
                    "main": {
                        templateUrl: "/guild-banks/guild-banks.html",
                        controller: "GuildBanksCtrl"
                    }
                }
            })

            .state('transmogrification', {
                url: "/transmogrification",
                views: {
                    "main": {
                        templateUrl: "/transmogrification/transmogrification.html",
                        controller: "TransmogrificationCtrl"
                    }
                }
            })

            .state('dynamic-mount-speed', {
                url: "/dynamic-mount-speed",
                views: {
                    "main": {
                        templateUrl: "/dynamic-mount-speed/dynamic-mount-speed.html",
                        controller: "DynamicMountSpeedCtrl"
                    }
                }
            })

            .state('survival-and-gardening', {
                url: "/survival-and-gardening",
                views: {
                    "main": {
                        templateUrl: "/survival-and-gardening/survival-and-gardening.html",
                        controller: "SurvivalAndGardeningCtrl"
                    }
                }
            })

            .state('raids-and-dungeons', {
                url: "/raids-and-dungeons",
                views: {
                    "main": {
                        templateUrl: "/raids-and-dungeons/raids-and-dungeons.html",
                        controller: "RaidsAndDungeonsCtrl"
                    }
                }
            })

            .state('new-factions-and-quests', {
                url: "/new-factions-and-quests",
                views: {
                    "main": {
                        templateUrl: "/new-factions-and-quests/new-factions-and-quests.html",
                        controller: "NewFactionsAndQuestsCtrl"
                    }
                }
            })

            .state('items-and-recipes', {
                url: "/items-and-recipes",
                views: {
                    "main": {
                        templateUrl: "/items-and-recipes/items-and-recipes.html",
                        controller: "ItemsAndRecipesCtrl"
                    }
                }
            })

            .state('pets-and-mounts', {
                url: "/pets-and-mounts",
                views: {
                    "main": {
                        templateUrl: "/pets-and-mounts/pets-and-mounts.html",
                        controller: "PetsAndMountsCtrl"
                    }
                }
            })

            .state('roleplay', {
                url: "/roleplay",
                views: {
                    "main": {
                        templateUrl: "/roleplay/roleplay.html",
                        controller: "RoleplayCtrl"
                    }
                }
            })

            .state('logos', {
                url: "/logos",
                views: {
                    "main": {
                        templateUrl: "/logos/logos.html",
                        controller: "LogosCtrl"
                    }
                }
            })

            .state('druid', {
                url: "/druid",
                views: {
                    "main": {
                        templateUrl: "/classes/druid.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('hunter', {
                url: "/hunter",
                views: {
                    "main": {
                        templateUrl: "/classes/hunter.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('mage', {
                url: "/mage",
                views: {
                    "main": {
                        templateUrl: "/classes/mage.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('paladin', {
                url: "/paladin",
                views: {
                    "main": {
                        templateUrl: "/classes/paladin.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('priest', {
                url: "/priest",
                views: {
                    "main": {
                        templateUrl: "/classes/priest.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('rogue', {
                url: "/rogue",
                views: {
                    "main": {
                        templateUrl: "/classes/rogue.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('shaman', {
                url: "/shaman",
                views: {
                    "main": {
                        templateUrl: "/classes/shaman.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('warlock', {
                url: "/warlock",
                views: {
                    "main": {
                        templateUrl: "/classes/warlock.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('warrior', {
                url: "/warrior",
                views: {
                    "main": {
                        templateUrl: "/classes/warrior.html",
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('population-graph', {
                url: "/population-graph",
                views: {
                    "main": {
                        templateUrl: "/population-graph/population-graph.html",
                        controller: "PopulationGraphCtrl"
                    }
                }
            })

            .state('community-artworks', {
                url: "/community-artworks",
                views: {
                    "main": {
                        templateUrl: "/community-artworks/community-artworks.html",
                        controller: "CommunityArtworksCtrl"
                    }
                }
            })

            .state('shellcoin', {
                url: "/shellcoin",
                views: {
                    "main": {
                        templateUrl: "/shellcoin/shellcoin.html",
                        controller: "ShellcoinCtrl"
                    }
                }
            })

            .state('watchHome', {
                url: "/watch",
                views: {
                    "main": {
                        templateUrl: "/watch/watch.html",
                        controller: "WatchCtrl"
                    }
                }
            })

            .state('watchVideo', {
                url: "/watch/:id",
                views: {
                    "main": {
                        templateUrl: "/watch/watch.html",
                        controller: "WatchCtrl"
                    }
                }
            })

            .state('watchChannel', {
                url: "/watch/channel/:id",
                views: {
                    "main": {
                        templateUrl: "/watch/watch.html",
                        controller: "WatchCtrl"
                    }
                }
            })

            .state('ucp', {
                url: "/ucp/:route",
                views: {
                    "main": {
                        templateUrl: "/ucp/ucp.html",
                        controller: "UcpCtrl"
                    }
                }
            })

            .state('ucp-email-confirm', {
                url: "/ucp/confirm-email-change/:token",
                views: {
                    "main": {
                        templateUrl: "/ucp/ucp.html",
                        controller: "UcpCtrl"
                    }
                }
            })

            .state('rules', {
                url: "/rules",
                views: {
                    "main": {
                        templateUrl: "/rules/rules.html",
                        controller: "RulesCtrl"
                    }
                }
            })

            .state('everlook-broadcasting', {
                url: "/everlook-broadcasting",
                views: {
                    "main": {
                        templateUrl: "/everlook-broadcasting/everlook-broadcasting.html",
                        controller: "EverlookBroadcastingCtrl"
                    }
                }
            })

            .state('vagrants-endeavor', {
                url: "/vagrants-endeavor",
                views: {
                    "main": {
                        templateUrl: "/vagrants-endeavor/vagrants-endeavor.html",
                        controller: "VagrantsEndeavorCtrl"
                    }
                }
            })

            .state('new-challenges', {
                url: "/new-challenges",
                views: {
                    "main": {
                        templateUrl: "/new-challenges/new-challenges.html",
                        controller: "NewChallengesCtrl"
                    }
                }
            })

        ;


        $urlRouterProvider.otherwise('/home');
    }])

    .controller('MainCtrl', ['$scope', '$http', 'http', '$location', '$state', '$sce', '$rootScope',
        function ($scope, $http, http, $location, $state, $sce, $rootScope) {

            $scope.modal = 'register';
            $scope.channels = [];

            $scope.visitorCountry = null;

            $scope.channelsNum = function () {
                return $scope.channels.length
            }
            $scope.getChannels = function () {
                return $scope.channels
            }
            $scope.setChannels = function (c) {
                $scope.channels = c
            }

            $scope.getVisitorCountry = function () {
                http.post({
                    m: 'matomo',
                    w: 'getGeoLocation',
                }).then(function (data) {
                    data = data.data.result;
                    $scope.visitorCountry = data.response;
                });
            }

            $scope.getVisitorCountry();

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

                // if (mo == 'register')
                //     setTimeout(function () {
                //         grecaptcha.render("captcha_div", {
                //             sitekey: "6Lfbnm4UAAAAAH2W-PWm4EIfValJxMgQcBmX4My1",
                //             theme: "dark"
                //         });
                //     }, 100);
            }

            $scope.openLoginModal = function (redirect) {
                window.location.href = "login.php?redirect=" + redirect;
                // if (typeof redirect !== 'undefined')
                //     $scope.redirect_after_login = redirect;
                // $scope.changeModal('login');
                // $('#register').modal('show');
            }

            $scope.captchaImage = '';
            $scope.refreshCaptchaImage = function () {
                $scope.captchaImage = 'api/index.php?url=register/generateCaptchaImage&p=&t=' + new Date().getTime();
            }
            $scope.openRegisterModal = function () {
                http.post({
                    m: 'matomo',
                    w: 'getGeoLocation',
                }).then(function (data) {
                    data = data.data.result;
                    var userCountry = data.response;

                    if (userCountry === 'CN' || userCountry === 'IN' || userCountry === 'SG' || userCountry === 'TW' || userCountry === 'HK') {
                        window.location.href = 'https://cn.turtle-wow.org'
                    } else {
                        $scope.changeModal('register');
                        $('#register').modal('show');
                    }

                });
            }

            $scope.closeRegisterModal = function () {
                $scope.changeModal('register');
                $('#register').modal('hide');
            }

            $scope.openDatabaseModal = function () {
                $('#database').modal('show');
            }

            $scope.closeDatabaseModal = function () {
                $('#database').modal('hide');
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
            $scope.login_data = {
                email: '',
                password: ''
            }

            $scope.register_err = false;
            $scope.login_err = false;
            $scope.response = '';

            $scope.redirect_after_login = 'donatedev';
            $scope.login_err_msg = '';

            $scope.user = {
                'user_id': localStorage.getItem('user_id'),
                'username': localStorage.getItem('username'),
                'email': localStorage.getItem('email'),
                'tokens': localStorage.getItem('tokens'),
                'rank': localStorage.getItem('rank'),
            };

            // angular.forEach(['user_id', 'username', 'email', 'tokens'], function (value, key) {
            //     let savedVal = localStorage.getItem(value);
            //     if (savedVal == null)
            //         return;
            //
            //     if ($scope.user == null)
            //         $scope.user = {};
            //
            //     $scope.user[value] = savedVal;
            // });

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
                        $scope.modal = 'register';
                        return;
                    }

                    if ($scope.response.indexOf('Forbidden') !== -1 ) {
                        $scope.modal = 'register';
                        window.location.href = 'https://cn.turtle-wow.org';
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

            $scope.login = function () {
                $scope.login_err = false;
                $scope.login_err_msg = '';

                if ($scope.login_data.username == undefined || $scope.login_data.password == undefined || $scope.login_data.username.length <= 0 || $scope.login_data.password.length <= 0) {
                    $scope.login_err = true;
                    $scope.login_err_msg = "Fill in correctly marked inputs:";
                    return;
                }

                http.post({
                    url: 'login.php',
                    m: 'register',
                    w: 'login',
                    p: {
                        data: $scope.login_data
                    }
                }).then(function (data) {
                    data = data.data.result;
                    if (data.result != 0) {
                        /// Error
                        $scope.login_err = true;
                        $scope.login_err_msg = data.msg;
                        return;
                    } else {
                        $scope.user = data.datas;
                        angular.forEach($scope.user, function (value, key) {
                            localStorage.setItem(key, value);
                        });
                        // why not
                        localStorage.removeItem('postingChar');
                        $scope.closeRegisterModal();

                        if ($scope.redirect_after_login !== '') {

                            if ($scope.redirect_after_login === 'current') {
                                // do nothing, logout button will show
                            } else {
                                if ($scope.redirect_after_login.indexOf('watch/') !== -1)
                                    $rootScope.$broadcast('initVideos');
                                $scope.goToPage($scope.redirect_after_login);
                                $scope.redirect_after_login = 'donatedev';
                            }

                        }
                    }
                });
            }

            $scope.getLoginStatus = function () {

                http.post({
                    m: 'register',
                    w: 'loginStatus',
                    p: {}
                }).then(function (data) {
                    data = data.data.result;
                    if (data.loggedIn) {
                        $scope.user = data.datas;
                        angular.forEach($scope.user, function (value, key) {
                            localStorage.setItem(key, value);
                        });
                        // clear posting user on login
                        localStorage.removeItem('postingChar');
                    } else {
                        $scope.channels = [];
                        angular.forEach(['user_id', 'username', 'email', 'tokens'], function (value, key) {
                            localStorage.removeItem(value);
                        });
                        localStorage.removeItem('postingChar');
                        $scope.user = null;
                    }
                });

            }

            $scope.currentRoute = function () {
                if ($location.url().indexOf('reset/') !== -1)
                    return '/home'
                return $location.url();
            }

            $scope.getLoginStatus();

            $scope.logout = function (successTransfer = false) {
                http.post({
                    m: 'register',
                    w: 'logout',
                    p: {}
                }).then(function (data) {
                    $scope.channels = [];
                    angular.forEach(['user_id', 'username', 'email', 'tokens'], function (value, key) {
                        localStorage.removeItem(value);
                    });
                    $scope.user = null;
                    localStorage.removeItem('postingChar');
                    if (successTransfer) {
                        alert('Your account has been successfully transferred. You will be logged out in 5 sec.');
                        setTimeout(function () {
                            $scope.goToPage('home');
                        }, 5000);
                    } else {
                        $scope.goToPage('home');
                    }
                });
            }

            $scope.isLoggedIn = function () {
                return $scope.user != null;
            }

            $scope.moveToDonate = function () {
                $scope.collapseNavBar();
                if (!$scope.isLoggedIn()) {
                    $scope.openLoginModal('donatedev');
                    return;
                }

                $scope.goToPage('donatedev');
            }

            $scope.moveToRules = function () {
                $scope.collapseNavBar();
                $scope.goToPage('rules');
            }

            $scope.settings = {};

            $scope.featuresMenuVisible = false;

            $scope.lightbox_images = [];
            $scope.lightbox_image = '';

            $scope.add_lightbox_images = function (im) {
                $scope.lightbox_images = im;
                angular.forEach($scope.lightbox_images, function (va, ke) {
                    if (va.active)
                        $scope.lightbox_image = va.image;
                })
            }

            $scope.lb = function (image) {
                $scope.lightbox_image = image;
                $('#lightbox').modal('show');
            }

            $scope.goToPage = function (page) {
                $scope.collapseNavBar();
                if ($scope.featuresMenuVisible)
                    $scope.featuresMenuVisible = false;
                $location.url(page);
            }

            $scope.collapseNavBar = function () {
                $scope.navBarContent = document.getElementById("navbarSupportedContent");
                if ($scope.navBarContent && $scope.navBarContent.classList.contains("show")) {
                    $scope.navBarContent.classList.remove("show");
                }
            }

        }]);
