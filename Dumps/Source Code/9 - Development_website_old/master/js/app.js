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
