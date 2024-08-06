<!--<!doctype html>-->
<?php
require "admin/api/capi/config/config.php";
?>
<html lang="en" ng-app="tw">

<head>

    <meta charset="utf-8"/>
    <title>Turtle WoW — Mysteries of Azeroth</title>
    <meta name="description"
          content="A story expansion made by the Turtle WoW Team, inspired by the Warcraft universe of Blizzard Entertainment."/>
    <meta name="keywords"
          content="World of Warcraft, WoW, WoW Classic, WoW Vanilla, Vanilla+, Vanilla Plus, 1.16.0, 1.16.1, 1.16.2, 1.16.3, 1.16.4, 1.17, 1.17.0, Beyond the Greymane Wall,  Mysteries of Azeroth, Custom WoW Expansion, Turtle WoW, Custom Vanilla, Extended Vanilla, Continued Vanilla, High Elves, Goblins, Vanilla Expanded, New Raids, New Bosses, Mirage Raceway, Survival, New Items, New Skills, New Quests, Private WoW Server, Play WoW Free"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>

    <link rel="icon" type="image/x-icon" href="favicon.ico">


    <meta property="og:title" content="Turtle WoW — Mysteries of Azeroth"/>
    <meta property="og:description"
          content="A story expansion made by the Turtle WoW Team, inspired by the Warcraft universe of Blizzard Entertainment."/>
    <meta property="og:image" content="images/logo/web_logo.png"/>
    <meta property="og:site_name" content="Turtle WoW — Mysteries of Azeroth"/>
    <meta property="og:url" content="https://www.turtle-wow.org"/>

    <!--   audio player-->
    <link rel="stylesheet" type="text/css"
          href="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/css/green-audio-player.min.css">
    <script src="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/js/green-audio-player.min.js"></script>

    <!--   video player-->
    <link href="https://vjs.zencdn.net/7.20.3/video-js.css" rel="stylesheet"/>
    <!--   tooltips-->
    <script>
        var whTooltips = {
            colorLinks: false,
            iconizeLinks: false,
            renameLinks: false,
            iconSize: 'medium'
        };
    </script>
    <!--   <script src="js/vendor/tt/newpower.js"></script>-->
    <!--   <script src="js/vendor/tt/wowhead2023/tooltips.js"></script>-->

    <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css"/>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>

    <link rel="stylesheet" href="dist/css/vendor.min.css?ver=<?= time() ?>">
    <link rel="stylesheet" href="dist/css/turtle.min.css?ver=<?= time() ?>">

    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125328091-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'UA-125328091-1');
    </script>

    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">

    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" defer></script>

</head>

<body ng-controller="MainCtrl">

<a id="top"></a>

<div class="top-sticky" id="main-navbar">
    <div class="container pl-0 pr-0">

        <nav class="navbar navbar-expand-lg navbar-dark">

            <a class="navbar-brand logo" ng-href="#/home">
                <img ng-src="images/logo/logo.svg" alt="Turtle WoW"/>
            </a>

            <button id="navbar-toggler" class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <ul class="navbar-nav ml-4">

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="featuresDropdown" role="button"
                           ng-class="{'hover' : featuresMenuVisible}" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false" ng-click="featuresMenuVisible = !featuresMenuVisible">
                            OUR FEATURES
                        </a>
                        <div class="section" aria-labelledby="featuresDropdown" id="features"
                             ng-if="featuresMenuVisible">
                            <div class="container-fluid">
                                <div class="container p-5">

                                    <div class="row">
                                        <div class="col-lg-3">
                                            <!--                     <a ng-click="goToPage('changelog')">Changelog <span class="sup">NEW</span></a><Br>-->
                                            <a ng-click="goToPage('new-races')">Two new playable races</a><Br>
                                            <a ng-click="goToPage('class-race-combinations')">Additional class & race
                                                combinations</a><Br>
                                            <a ng-click="goToPage('character-customizations')">New character
                                                customizations</a><Br>
                                            <a ng-click="goToPage('sound-design')">Original soundtracks &
                                                voice-acting</a><Br>
                                            <a ng-click="goToPage('new-factions-and-quests')">New factions &
                                                quests</a><Br>
                                            <a ng-click="goToPage('new-locations-and-maps')">New locations &
                                                maps</a><Br>
                                            <a ng-click="goToPage('raids-and-dungeons')">Raids & dungeons</a><Br>
                                            <a ng-click="goToPage('roleplay')">Roleplay & community events</a><Br>
                                            <a href="https://forum.turtle-wow.org/viewforum.php?f=70" target="_blank">Itemization</a><Br>
                                            <a ng-click="goToPage('additional-transport-routes')">Additional transport
                                                routes</a><Br>
                                        </div>
                                        <div class="col-lg-3">
                                            <a ng-click="goToPage('player-versus-player-content')">Player vs Player
                                                content</a><Br>
                                            <a ng-click="goToPage('seasonal-events')">Exciting seasonal events</a><Br>
                                            <a ng-click="goToPage('community-artworks')">Official & community
                                                artworks</a><Br>
                                            <a ng-click="goToPage('client-interface-improvements')">Client UI
                                                improvements</a><Br>
                                            <a ng-click="goToPage('pets-and-mounts')">New pets & mounts</a><Br>
                                            <a ng-click="goToPage('logos')">Logotypes</a><Br>
                                            <a href="https://turtle-wow.fandom.com/wiki/Turtle_WoW_Wiki"
                                               target="_blank">Turtle WoW Community Wiki</a><Br>
                                            <a ng-click="goToPage('population-graph')">Population Graph</a><Br>
                                            <a href="https://dev.turtle-wow.org/" target="_blank">Development
                                                Tools</a><Br>
                                            <!--                            <a ng-click="goToPage('addons')">Addons</a><Br>-->
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <p class="main-menu-title mb-0">Gameplay Features
                                                        <span class="chev pull-right m-0"> <i
                                                                    class="fa fa-fw fa-angle-down"></i> </span>
                                                    </p>
                                                </div>
                                                <div class="col-lg-4">
                                                    <a class="white" ng-click="goToPage('guild-banks')">Guild Vaults</a>
                                                    <a class="white" ng-click="goToPage('transmogrification')">Transmogrification</a>
                                                    <a class="white" ng-click="goToPage('achievement-titles')">Achievement
                                                        Titles</a>
                                                </div>
                                                <div class="col-lg-4">
                                                    <a class="white" ng-click="goToPage('dynamic-mount-speed')">Dynamic
                                                        Mount Speed</a>
                                                    <br>
                                                    <a class="white" ng-click="goToPage('chronoboon-displacer')">Chronoboon
                                                        Displacer</a><br>
                                                    <a class="white" ng-click="goToPage('everlook-broadcasting')">Everlook
                                                        Brodcasting Co.</a><Br>
                                                </div>
                                                <div class="col-lg-4">
                                                    <a class="white" ng-click="goToPage('survival-and-gardening')">Survival
                                                        & Gardening</a>
                                                    <br>
                                                    <a class="white" ng-click="goToPage('shellcoin')">Shell Co.
                                                        Trading</a>
                                                </div>


                                                <div class="col-lg-12">
                                                    <p class="main-menu-title mb-0 mt-4">Challenges
                                                        <span class="chev pull-right m-0">
                                                                <i class="fa fa-fw fa-angle-down"></i>
                                                            </span>
                                                    </p>
                                                </div>
                                                <div class="col-lg-4">
                                                    <a class="white" ng-click="goToPage('hardcore-mode')">Hardcore
                                                        Mode</a>
                                                </div>
                                                <div class="col-lg-4">
                                                    <a class="white" ng-click="goToPage('slow-and-steady')">Slow &
                                                        Steady Mode</a>
                                                </div>
                                                <div class="col-lg-4">
                                                    <a class="white"
                                                       ng-click="goToPage('player-versus-player-content#war-mode')">War
                                                        Mode</a>
                                                </div>
                                                <div class="col-lg-4">
                                                    <a class="white" ng-click="goToPage('vagrants-endeavor')">Vagrant's
                                                        Endeavor</a>
                                                </div>

                                                <div class="col-lg-12">
                                                    <p class="main-menu-title mb-0 mt-4">Class Changes
                                                        <span class="chev pull-right m-0">
                                                                <i class="fa fa-fw fa-angle-down"></i>
                                                            </span>
                                                    </p>
                                                </div>
                                                <div class="col-lg-2">
                                                    <a class="white" ng-click="goToPage('druid')">Druid</a><Br>
                                                    <a class="white" ng-click="goToPage('hunter')">Hunter</a>
                                                </div>
                                                <div class="col-lg-2">
                                                    <a class="white" ng-click="goToPage('mage')">Mage</a><Br>
                                                    <a class="white" ng-click="goToPage('paladin')">Paladin</a>
                                                </div>
                                                <div class="col-lg-2">
                                                    <a class="white" ng-click="goToPage('priest')">Priest</a><Br>
                                                    <a class="white" ng-click="goToPage('rogue')">Rogue</a>
                                                </div>
                                                <div class="col-lg-2">
                                                    <a class="white" ng-click="goToPage('shaman')">Shaman</a><Br>
                                                    <a class="white" ng-click="goToPage('warlock')">Warlock</a>
                                                </div>
                                                <div class="col-lg-2">
                                                    <a class="white" ng-click="goToPage('warrior')">Warrior</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="https://turtle-wow.org/#/rules">
                            RULES
                        </a>
                    </li>
                    <!--               <li class="nav-item">-->
                    <!--                  <a class="nav-link hand" ng-click="moveToRules()">RULES</a>-->
                    <!--               </li>-->
                    <li class="nav-item" ng-if="isLoggedIn()">
                        <a class="nav-link hand" ng-click="moveToDonate()">DONATE</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="_blank" href="https://armory.turtle-wow.org/">ARMORY</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="_blank" href="https://talents.turtle-wow.org/">TALENTS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="_blank" href="https://database.turtle-wow.org/">DATABASE</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="_blank" href="https://armory.turtle-wow.org/hardcore/">HARDCORE</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" ng-href="#/watch">TURTLE TV</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" target="_blank" href="https://forum.turtle-wow.org/">FORUM</a>
                    </li>
                    <li class="nav-item d-md-none d-lg-none">
                        <a class="nav-link" target="_blank" ng-href="#/ucp/overview">UCP</a>
                    </li>
                    <li class="nav-item d-md-none d-lg-none">
                        <a class="nav-link" target="_blank" ng-click="logout()">Logout</a>
                    </li>
                </ul>

                <ul class="nav justify-content-end ml-auto d-xs-none d-sm-none d-lg-block d-md-block">

                    <li class="nav-item dropdown" ng-if="isLoggedIn()">
                        <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                            {{user.username}}
                        </a>
                        <div class="dropdown-menu" style="left: auto; right: 0;">
                            <a class="dropdown-item" ng-href="#/ucp/overview">Account Management </a>
                            <a class="dropdown-item" ng-href="#/ucp/security">Security</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item hand" ng-click="logout()">Logout</a>
                        </div>
                    </li>

                    <!--               <li class="nav-item login pull-right" ng-if="isLoggedIn()">-->
                    <!--                  <a class="nav-link hand" ng-click="logout()">Logout-->
                    <!--                     <img src="images/icon_login.png">-->
                    <!--                  </a>-->
                    <!--               </li>-->
                    <li class="nav-item login pull-right" ng-if="!isLoggedIn()">
                        <a class="nav-link hand" href="login.php?redirect={{currentRoute()}}">Login
                            <img src="images/icon_login.png">
                        </a>
                    </li>
                </ul>

            </div>

        </nav>

    </div>
</div>

<div class="main" ui-view="main">
</div>

<div class="modal fade" id="register" tabindex="-1" aria-labelledby="registerLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" ng-class="{'done' : modal == 'ok'}">
            <div class="modal-body p-0">

                <a class="hand modalClose" ng-click="closeRegisterModal()">&times;</a>

                <div class="row">

                    <div class="col-lg-2"></div>

                    <div class="col-lg-8 text-center p-5" ng-if="modal == 'register'">

                        <h5 class="text-white">Create new account</h5>

                        <BR><BR>

                        <div ng-if="register_err" class="orange-text pb-2">
                            Fill in correctly marked inputs:<br>
                        </div>

                        <input type="text" class="form-control" placeholder="Account Name"
                               ng-class="{'invalid' : register_data.account_name.length <= 2}"
                               ng-model="register_data.account_name">
                        <input type="text" class="form-control" placeholder="E-mail"
                               ng-class="{'invalid' : !validEmail(register_data.email_address)}"
                               ng-model="register_data.email_address">
                        <input type="text" class="form-control" placeholder="Forum Username"
                               ng-class="{'invalid' : register_data.forum_name.length <= 2}"
                               ng-model="register_data.forum_name">
                        <input type="password" class="form-control w-50 pull-left" placeholder="Password"
                               ng-class="{'invalid' : register_data.user_password.length <= 2}"
                               ng-model="register_data.user_password">
                        <input type="password" class="form-control w-50 pull-right"
                               ng-class="{'invalid' : register_data.user_password != register_data.user_password2 }"
                               placeholder="Repeat Password" ng-model="register_data.user_password2">

                        <Br>
                        <Br>
                        <Br>

                        <img ng-src="{{captchaImage}}" class="img-fluid">

                        <div id="turnstile_reg" data-theme="dark"></div>

                        <BR><BR>

                        <img src="images/registerbutton.png" class="w-100 hand register" ng-click="register()"
                             ng-class="{'desat' : registering }">

                        <div class="response m-3 text-white" ng-if="response != ''">
                            {{response}}
                        </div>

                        <img src="images/footerline.png" class="mt-5 mb-5 w-100">

                        <a class="hand mr-3" ng-click="openLoginModal('/home')">
                            <img src="images/icon_user_small.png" class="mr-2">
                            Log in
                        </a>

                        <a class="hand ml-3" ng-click="changeModal('forgot')">
                            <img src="images/icon_exclamation.png" class="mr-2">
                            Forgot Password
                        </a>

                    </div>

                    <div class="col-lg-8 text-center p-5" ng-if="modal == 'login'">

                        <h5 class="text-white">my account</h5>

                        <BR><BR>

                        <div ng-if="login_err" class="orange-text pb-2">
                            {{login_err_msg}}
                        </div>

                        <input type="text" class="form-control" placeholder="Username" ng-model="login_data.username"
                               ng-class="{'invalid' : login_data.username.length <= 2 }">
                        <input type="password" class="form-control" placeholder="Password"
                               ng-model="login_data.password"
                               ng-class="{'invalid' : login_data.password.length <= 2 }">

                        <img src="images/button_login.png" class="w-100 hand register mt-2" ng-click="login()">

                        <img src="images/footerline.png" class="mt-5 mb-5 w-100">

                        <a class="hand mr-3" ng-click="changeModal('forgot')">
                            <img src="images/icon_user_small.png" class="mr-2">
                            Forgot Password
                        </a>

                        <a class="hand ml-3" ng-click="changeModal('register')">
                            <img src="images/icon_user_small.png" class="mr-2">
                            Create new account
                        </a>


                    </div>

                    <div class="col-lg-8 text-center p-5" ng-if="modal == 'forgot'">

                        <h5 class="text-white">forgot your password?</h5>

                        <BR><BR>

                        <input type="email" class="form-control" placeholder="E-mail"
                               ng-class="{'invalid' : register_err }"
                               ng-model="register_data.email_address">


                        <img src="images/buttonforgot.png" class="w-100 hand register mt-5"
                             ng-class="{'desat' : registering }" ng-click="forgot()">

                        <div class="response m-3 text-white" ng-if="response != ''">
                            {{response}}
                        </div>

                        <img src="images/footerline.png" class="mt-5 mb-5 w-100">

                        <a class="hand" ng-click="changeModal('register')">
                            <img src="images/icon_user_small.png" class="mr-2"> Create new account
                        </a>

                    </div>

                    <div class="col-lg-8 text-center p-5" ng-if="modal == 'resetok'">

                        <h3 class="text-white orange-text mt-3 mb-2">Done!</h3>

                        <img src="images/footerline.png" class="mt-3 mb-4 w-50">

                        <p class="text-white">
                            {{response}}
                        </p>

                    </div>

                    <div class="col-lg-8 text-center p-5" ng-if="modal == 'ok'">

                        <h3 class="text-white orange-text mt-3 mb-2">Done!</h3>

                        <img src="images/footerline.png" class="mt-3 mb-4 w-50">


                        <p class="text-white">
                            {{response}}
                        </p>

                        <a class="hand play" href="https://forum.turtle-wow.org/viewtopic.php?t=7709"
                           target="_blank"><img
                                    src="images/button_done.png"></a>

                    </div>

                    <div class="col-lg-8 text-center p-5" ng-if="modal == 'failed'">

                        <h3 class="text-white orange-text mt-3 mb-2">Failed!</h3>

                        <img src="images/footerline.png" class="mt-3 mb-4 w-50">


                        <p class="text-white">
                            {{response}}
                        </p>

                        <a class="hand" ng-click="changeModal('register')">
                            <img src="images/icon_user_small.png" class="mr-2"> Go Back
                        </a>


                    </div>

                </div>

            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="database" tabindex="-1" aria-labelledby="databaseLabel" aria-hidden="true"
     ng-if="visitorCountry !== 'RU' && visitorCountry !== 'UA'">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">

                <a class="hand modalClose" ng-click="closeDatabaseModal()">&times;</a>

                <div class="row">

                    <div class="col-lg-2"></div>

                    <div class="col-lg-8 text-center p-5">
                        <h6 style="color:#666">
                            Turtle WoW
                            <br>
                            INDIVIDUAL ENTREPRENEUR
                            <br>
                            Taxpayer registration number:
                            <br>
                            3518113436
                            <br>
                            Date and number of entry in the Unified State Register of Legal Entities, Individual
                            Entrepreneurs and Public Organizations:
                            <br>
                            06.10.2022, 2010350000000214420
                            <br>
                            Ukraine, Kharkov, Gaceva 7A
                        </h6>
                    </div>

                </div>

            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="lightbox" tabindex="-1" aria-labelledby="lightboxLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">

                <img ng-src="{{lightbox_image}}" class="w-100">

            </div>
        </div>
    </div>
</div>

<div class="section mb-5" id="footer">
    <div class="container-fluid">
        <div class="container">

            <br>
            <br>

            <p class="m-auto w-75">
                Mysteries of Azeroth — is a story expansion made by the Turtle WoW Team, inspired by the Warcraft
                universe
                of Blizzard Entertainment.
                <br>
                World of Warcraft remains the intellectual property of Blizzard Entertainment.
            </p>

            <Br>
            <Br>

            <a href="https://turtle-wow.org/#/rules" target="_blank" class="orange-text">Server
                Rules & Terms of Use</a><br>
            <p ng-click="openDatabaseModal()" style="cursor: pointer;opacity: 50%"
               ng-if="visitorCountry !== 'RU' && visitorCountry !== 'UA'">Legal Information</p>


        </div>
    </div>
</div>


<script src="js/vendor/jquery-3.5.1.min.js"></script>
<script src="js/vendor/bootstrap.bundle.min.js"></script>
<script src="js/vendor/angular/angular.min.js"></script>
<script src="js/vendor/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="js/vendor/md5.js"></script>

<script src="https://vjs.zencdn.net/7.20.3/video.min.js"></script>

<script src="node_modules/chart.js/dist/chart.js"></script>

<script src="dist/js/turtle.min.js?ver=<?= time() ?>"></script>
<script src="dist/templates/templates.js?ver=<?= time() ?>"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/1.0.2/chartjs-plugin-annotation.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.6/ui-bootstrap-tpls.min.js"></script>


<!-- Meta Pixel Code -->
<script>
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '356731841933760');
    fbq('track', 'PageView');
</script>
<noscript>
    <img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=356731841933760&ev=PageView&noscript=1"/>
</noscript>
<!-- End Meta Pixel Code -->

<script>
    $(document).ready(function () {
        $('#register').on('shown.bs.modal', function () {
            turnstile.render('#turnstile_reg', {
                sitekey: '<?php echo CF_TURNSTILE_SITE_KEY;?>',
                callback: function (token) {
                    var scope = angular.element($("#register")).scope();
                    scope.$apply(function () {
                        scope.register_data.captchaInput = token;
                    });
                },
            });
        });
    });
</script>

<script>
    $(document).ready(function () {
        $(document).mouseup(function (e) {
            var navbar = $(".navbar-collapse");
            if (!navbar.is(e.target) && navbar.has(e.target).length === 0 && $(".navbar-toggler").attr("aria-expanded") === "true") {
                navbar.collapse('hide');
            }
        });

        $(document).keydown(function (e) {
            if (e.key === "Escape" && $(".navbar-toggler").attr("aria-expanded") === "true") {
                $(".navbar-collapse").collapse('hide');
            }
        });
    });
</script>
<script>
    $(document).ready(function () {
        function closeDropdown() {
            angular.element($("#featuresDropdown")).scope().$apply(function () {
                angular.element($("#featuresDropdown")).scope().featuresMenuVisible = false;
            });
        }

        $(document).mouseup(function (e) {
            var dropdownToggle = $(".dropdown");

            if (!dropdownToggle.is(e.target) && dropdownToggle.has(e.target).length === 0 && $(".dropdown-toggle").attr("aria-expanded") === "true") {
                closeDropdown();
            }
        });

        $(document).keydown(function (e) {
            if (e.key === "Escape" && $(".dropdown-toggle").attr("aria-expanded") === "true") {
                closeDropdown();
            }
        });
    });
</script>


</body>

</html>