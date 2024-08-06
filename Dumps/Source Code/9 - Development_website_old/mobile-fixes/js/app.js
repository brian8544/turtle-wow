"use strict"
angular.module('tw', [
    'ui.router',
    'http.service',
    'modules',
])

    .run(['$rootScope', function ($rootScope) {
    }])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: "/home",
                views: {
                    "main": {
                        templateUrl: "src/home/home.html?ver=" + Math.random(),
                        controller: "HomeCtrl"
                    }
                }
            })

            .state('reset', {
                url: "/reset/:token_key/:pass",
                views: {
                    "main": {
                        templateUrl: "src/reset/reset.html?ver=" + Math.random(),
                        controller: "ResetCtrl"
                    }
                }
            })

            .state('activate', {
                url: "/activate/:email/:token",
                views: {
                    "main": {
                        templateUrl: "src/activate/activate.html?ver=" + Math.random(),
                        controller: "ActivateCtrl"
                    }
                }
            })

            .state('donate', {
                url: "/donate",
                views: {
                    "main": {
                        templateUrl: "src/pages/donate/donate.html?ver=" + Math.random(),
                        controller: "DonateCtrl"
                    }
                }
            })

            .state('changelog', {
                url: "/changelog",
                views: {
                    "main": {
                        templateUrl: "src/pages/changelog/changelog.html?ver=" + Math.random(),
                        controller: "ChangelogCtrl"
                    }
                }
            })

            .state('sound-design', {
                url: "/sound-design",
                views: {
                    "main": {
                        templateUrl: "src/pages/sound-design/sound-design.html?ver=" + Math.random(),
                        controller: "SoundDesignCtrl"
                    }
                }
            })

            .state('new-races', {
                url: "/new-races",
                views: {
                    "main": {
                        templateUrl: "src/pages/new-races/new-races.html?ver=" + Math.random(),
                        controller: "NewRacesCtrl"
                    }
                }
            })

            .state('class-race-combinations', {
                url: "/class-race-combinations",
                views: {
                    "main": {
                        templateUrl: "src/pages/class-race-combinations/class-race-combinations.html?ver=" + Math.random(),
                        controller: "ClassRaceCombinationsCtrl"
                    }
                }
            })

            .state('seasonal-events', {
                url: "/seasonal-events",
                views: {
                    "main": {
                        templateUrl: "src/pages/seasonal-events/seasonal-events.html?ver=" + Math.random(),
                        controller: "SeasonalEventsCtrl"
                    }
                }
            })

            .state('new-locations-and-maps', {
                url: "/new-locations-and-maps",
                views: {
                    "main": {
                        templateUrl: "src/pages/new-locations-and-maps/new-locations-and-maps.html?ver=" + Math.random(),
                        controller: "NewLocationsAndMapsCtrl"
                    }
                }
            })

            .state('additional-transport-routes', {
                url: "/additional-transport-routes",
                views: {
                    "main": {
                        templateUrl: "src/pages/additional-transport-routes/additional-transport-routes.html?ver=" + Math.random(),
                        controller: "AdditionalTransportRoutesCtrl"
                    }
                }
            })

            .state('client-interface-improvements', {
                url: "/client-interface-improvements",
                views: {
                    "main": {
                        templateUrl: "src/pages/client-interface-improvements/client-interface-improvements.html?ver=" + Math.random(),
                        controller: "ClientInterfaceImprovementsCtrl"
                    }
                }
            })

            .state('player-versus-player-content', {
                url: "/player-versus-player-content",
                views: {
                    "main": {
                        templateUrl: "src/pages/player-versus-player-content/player-versus-player-content.html?ver=" + Math.random(),
                        controller: "PlayerVersusPlayerContentCtrl"
                    }
                }
            })

            .state('hardcore-mode', {
                url: "/hardcore-mode",
                views: {
                    "main": {
                        templateUrl: "src/pages/hardcore-mode/hardcore-mode.html?ver=" + Math.random(),
                        controller: "HardcoreModeCtrl"
                    }
                }
            })

            .state('slow-and-steady', {
                url: "/slow-and-steady",
                views: {
                    "main": {
                        templateUrl: "src/pages/slow-and-steady/slow-and-steady.html?ver=" + Math.random(),
                        controller: "SlowAndSteadyCtrl"
                    }
                }
            })

            .state('beginners-guild', {
                url: "/beginners-guild",
                views: {
                    "main": {
                        templateUrl: "src/pages/beginners-guild/beginners-guild.html?ver=" + Math.random(),
                        controller: "BeginnersGuildCtrl"
                    }
                }
            })

            .state('chronoboon-displacer', {
                url: "/chronoboon-displacer",
                views: {
                    "main": {
                        templateUrl: "src/pages/chronoboon-displacer/chronoboon-displacer.html?ver=" + Math.random(),
                        controller: "ChronoboonDisplacerCtrl"
                    }
                }
            })

            .state('character-customizations', {
                url: "/character-customizations",
                views: {
                    "main": {
                        templateUrl: "src/pages/character-customizations/character-customizations.html?ver=" + Math.random(),
                        controller: "CharacterCustomizationsCtrl"
                    }
                }
            })

            .state('achievement-titles', {
                url: "/achievement-titles",
                views: {
                    "main": {
                        templateUrl: "src/pages/achievement-titles/achievement-titles.html?ver=" + Math.random(),
                        controller: "AchievementTitlesCtrl"
                    }
                }
            })

            .state('guild-banks', {
                url: "/guild-banks",
                views: {
                    "main": {
                        templateUrl: "src/pages/guild-banks/guild-banks.html?ver=" + Math.random(),
                        controller: "GuildBanksCtrl"
                    }
                }
            })

            .state('transmogrification', {
                url: "/transmogrification",
                views: {
                    "main": {
                        templateUrl: "src/pages/transmogrification/transmogrification.html?ver=" + Math.random(),
                        controller: "TransmogrificationCtrl"
                    }
                }
            })

            .state('dynamic-mount-speed', {
                url: "/dynamic-mount-speed",
                views: {
                    "main": {
                        templateUrl: "src/pages/dynamic-mount-speed/dynamic-mount-speed.html?ver=" + Math.random(),
                        controller: "DynamicMountSpeedCtrl"
                    }
                }
            })

            .state('survival-and-gardening', {
                url: "/survival-and-gardening",
                views: {
                    "main": {
                        templateUrl: "src/pages/survival-and-gardening/survival-and-gardening.html?ver=" + Math.random(),
                        controller: "SurvivalAndGardeningCtrl"
                    }
                }
            })

            .state('raids-and-dungeons', {
                url: "/raids-and-dungeons",
                views: {
                    "main": {
                        templateUrl: "src/pages/raids-and-dungeons/raids-and-dungeons.html?ver=" + Math.random(),
                        controller: "RaidsAndDungeonsCtrl"
                    }
                }
            })

            .state('new-factions-and-quests', {
                url: "/new-factions-and-quests",
                views: {
                    "main": {
                        templateUrl: "src/pages/new-factions-and-quests/new-factions-and-quests.html?ver=" + Math.random(),
                        controller: "NewFactionsAndQuestsCtrl"
                    }
                }
            })

            .state('items-and-recipes', {
                url: "/items-and-recipes",
                views: {
                    "main": {
                        templateUrl: "src/pages/items-and-recipes/items-and-recipes.html?ver=" + Math.random(),
                        controller: "ItemsAndRecipesCtrl"
                    }
                }
            })

            .state('pets-and-mounts', {
                url: "/pets-and-mounts",
                views: {
                    "main": {
                        templateUrl: "src/pages/pets-and-mounts/pets-and-mounts.html?ver=" + Math.random(),
                        controller: "PetsAndMountsCtrl"
                    }
                }
            })

            .state('roleplay', {
                url: "/roleplay",
                views: {
                    "main": {
                        templateUrl: "src/pages/roleplay/roleplay.html?ver=" + Math.random(),
                        controller: "RoleplayCtrl"
                    }
                }
            })

            .state('logos', {
                url: "/logos",
                views: {
                    "main": {
                        templateUrl: "src/pages/logos/logos.html?ver=" + Math.random(),
                        controller: "LogosCtrl"
                    }
                }
            })

            .state('druid', {
                url: "/druid",
                views: {
                    "main": {
                        templateUrl: "src/classes/druid.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('hunter', {
                url: "/hunter",
                views: {
                    "main": {
                        templateUrl: "src/classes/hunter.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('mage', {
                url: "/mage",
                views: {
                    "main": {
                        templateUrl: "src/classes/mage.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('paladin', {
                url: "/paladin",
                views: {
                    "main": {
                        templateUrl: "src/classes/paladin.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('priest', {
                url: "/priest",
                views: {
                    "main": {
                        templateUrl: "src/classes/priest.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('rogue', {
                url: "/rogue",
                views: {
                    "main": {
                        templateUrl: "src/classes/rogue.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('shaman', {
                url: "/shaman",
                views: {
                    "main": {
                        templateUrl: "src/classes/shaman.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('warlock', {
                url: "/warlock",
                views: {
                    "main": {
                        templateUrl: "src/classes/warlock.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('warrior', {
                url: "/warrior",
                views: {
                    "main": {
                        templateUrl: "src/classes/warrior.html?ver=" + Math.random(),
                        controller: "ClassesCtrl"
                    }
                }
            })

            .state('population-graph', {
                url: "/population-graph",
                views: {
                    "main": {
                        templateUrl: "src/pages/population-graph/population-graph.html?ver=" + Math.random(),
                        controller: "PopulationGraphCtrl"
                    }
                }
            })

            .state('community-artworks', {
                url: "/community-artworks",
                views: {
                    "main": {
                        templateUrl: "src/pages/community-artworks/community-artworks.html?ver=" + Math.random(),
                        controller: "CommunityArtworksCtrl"
                    }
                }
            })


        ;


        $urlRouterProvider.otherwise('/home');
    }])

    .controller('MainCtrl', ['$scope', '$http', 'http', '$location', '$state', '$sce', '$rootScope',
        function ($scope, $http, http, $location, $state, $sce, $rootScope) {

            $scope.t = {};
            $scope.i = {}

            $scope.modal = 'register';
            // $scope.modal = 'forgot';

            // $('#register').modal('show');

            $scope.changeModal = function (mo) {
                $scope.modal = mo;
                $scope.response = '';
                $scope.register_data = {
                    account_name: '',
                    email_address: '',
                    user_password: '',
                    user_password2: '',
                    forum_name: '',
                }
                if (mo == 'register')
                    setTimeout(function () {
                        grecaptcha.render("captcha_div", {
                            sitekey: "6Lfbnm4UAAAAAH2W-PWm4EIfValJxMgQcBmX4My1",
                            theme: "dark"
                        });
                    }, 100);
            }

            $scope.openLoginModal = function () {
                $scope.changeModal('login');
                $('#register').modal('show');
            }

            $scope.openRegisterModal = function () {
                $scope.changeModal('register');
                $('#register').modal('show');
            }

            $scope.closeRegisterModal = function () {
                $scope.changeModal('register');
                $('#register').modal('hide');
            }

            $scope.validEmail = function (email) {
                return email.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            }

            // $scope.register_data = {
            //     account_name: 'xerr' + Math.floor(10000 * Math.random()),
            //     email_address: '',
            //     user_password: 'oomm',
            //     user_password2: 'oomm',
            //     forum_name: 'xerr' + Math.floor(10000 * Math.random()),
            // }

            $scope.register_data = {
                account_name: '',
                email_address: '',
                user_password: '',
                user_password2: '',
                forum_name: '',
            }

            $scope.register_err = false;
            $scope.response = '';

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
                        forum_name: ''
                    }
                });

            }

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
                        data: $scope.register_data,
                        gRecaptchaResponse: grecaptcha.getResponse()
                        // gRecaptchaResponse: $('#g-recaptcha-response').val()
                    }
                }).then(function (data) {

                    $scope.registering = false;

                    $scope.response = data.data.result.response;

                    if ($scope.response.indexOf('Captcha verification failed') !== -1 ||
                        $scope.response.indexOf('already in use') !== -1 ||
                        $scope.response.indexOf('You must') !== -1 ||
                        $scope.response.indexOf('There was a problem creating your account') !== -1
                    ) {
                        $scope.modal = 'register';
                        return;
                    }
                    $scope.modal = 'ok';

                    $scope.register_data = {
                        account_name: '',
                        email_address: '',
                        user_password: '',
                        user_password2: '',
                        forum_name: ''
                    }
                });
            }

            $scope.settings = {};

            // http.post({
            //     m: 'settings',
            //     w: 'get',
            //     p: {}
            // }).then(function (data) {
            //     angular.forEach(data.data.result, function (va, ke) {
            //         $scope.settings[va.code] = va.value;
            //     });
            // });

            // $rootScope.$on('$viewContentLoaded', function (event) {
            //     $scope.url = $location.$$url;
            //
            //     if ($state.current.name !== '') {
            //
            //         $scope.t = {};
            //         $scope.i = {}
            //
            //         $scope.s = $state.current.name;
            //
            //         http.post({
            //             m: 'texts',
            //             w: 'get',
            //             p: {
            //                 section: $scope.s
            //             }
            //         }).then(function (data) {
            //             if (data.data.result.texts == 'prices') {
            //                 angular.forEach(data.data.result.texts1, function (va, ke) {
            //                     if (va.type === 1)
            //                         va.text = decodeURIComponent(atob(va.text));
            //                     $scope.t[va.code] = $sce.trustAsHtml(va.text);
            //                 });
            //                 angular.forEach(data.data.result.texts2, function (va, ke) {
            //                     if (va.type === 1)
            //                         va.text = decodeURIComponent(atob(va.text));
            //                     $scope.t[va.code] = $sce.trustAsHtml(va.text);
            //                 });
            //                 angular.forEach(data.data.result.texts3, function (va, ke) {
            //                     if (va.type === 1)
            //                         va.text = decodeURIComponent(atob(va.text));
            //                     $scope.t[va.code] = $sce.trustAsHtml(va.text);
            //                 });
            //             } else {
            //                 angular.forEach(data.data.result.texts, function (va, ke) {
            //                     if (va.type === 1)
            //                         va.text = decodeURIComponent(atob(va.text));
            //                     $scope.t[va.code] = $sce.trustAsHtml(va.text);
            //                 });
            //             }
            //
            //         });
            //
            //         http.post({
            //             m: 'images',
            //             w: 'get',
            //             p: {
            //                 section: $scope.s
            //             }
            //         }).then(function (data) {
            //             if (data.data.result.images == 'prices') {
            //                 angular.forEach(data.data.result.images1, function (va, ke) {
            //                     $scope.i[va.code] = va.image;
            //                 });
            //                 angular.forEach(data.data.result.images2, function (va, ke) {
            //                     $scope.i[va.code] = va.image;
            //                 });
            //                 angular.forEach(data.data.result.images3, function (va, ke) {
            //                     $scope.i[va.code] = va.image;
            //                 });
            //             } else {
            //                 angular.forEach(data.data.result.images, function (va, ke) {
            //                     $scope.i[va.code] = va.image;
            //                 });
            //             }
            //         });
            //
            //     }
            // });

            $scope.ti = {}

            // http.post({
            //     m: 'texts',
            //     w: 'get',
            //     p: {
            //         section: "index"
            //     }
            // }).then(function (data) {
            //     angular.forEach(data.data.result.texts, function (va, ke) {
            //         if (va.type === 1)
            //             va.text = decodeURIComponent(atob(va.text));
            //         $scope.ti[va.code] = $sce.trustAsHtml(va.text);
            //     });
            //
            // });

            $scope.im = {}

            // http.post({
            //     m: 'images',
            //     w: 'get',
            //     p: {
            //         section: "index"
            //     }
            // }).then(function (data) {
            //     angular.forEach(data.data.result.images, function (va, ke) {
            //         $scope.im[va.code] = va.image;
            //     });
            //
            // });

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

            $scope.lb = function(image) {
                $scope.lightbox_image = image;
                $('#lightbox').modal('show');
            }



            $scope.goToPage = function(page) {
                $scope.collapseNavBar();
                if ($scope.featuresMenuVisible)
                    $scope.featuresMenuVisible = false;
                $location.url(page);
            }

            $scope.collapseNavBar = function() {
                const navBarContent = document.getElementById("navbarSupportedContent");
                if (navBarContent && navBarContent.classList.contains("show")) {
                    console.log("closing");
                    navBarContent.classList.remove("show");
                }
            }

        }]);
