<!--<!doctype html>-->

<?php

//require "admin/api/capi/config/config.php";
//include_once 'api/capi/libs/database/mysql.php';
//
//$db = new MYSQL_Database(DB_TYPE, DB_HOST, DB_NAME, DB_USER, DB_PASS);
//$db->exec("set names utf8");
//
//$data = $db->select("select * from settings");
//$settings = [];
//foreach ($data as $key => $d)
//    $settings[$d['code']] = $d['value'];

?>

<html lang="en" ng-app="tw">

<head>

    <meta charset="utf-8" />
    <!--   <title>--><? //=$settings['site_title']
                        ?>
    <!--</title>-->
    <!--   <meta name="description" content="--><? //=$settings['site_description']
                                                ?>
    <!--"/>-->
    <!--   <meta name="keywords" content="--><? //=$settings['site_keywords']
                                                ?>
    <!--"/>-->

    <title>Turtle WoW — Mysteries of Azeroth</title>

    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <meta name="keywords" content="World of Warcraft, WoW, WoW Classic, WoW Vanilla, Vanilla+, Vanilla Plus, 1.15.1, 1.15.2, Custom Vanilla, Extended Vanilla, Continued Vanilla, High Elves, Goblins, Vanilla Expanded, New Raids, New Bosses, Mirage Raceway, Survival, New Items, New Skills, New Quests, Private WoW Server, Play WoW Free">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

    <!--<meta property="og:title" content="--><? //= $settings['site_title'] 
                                                ?>
    <!--"/>-->
    <!--<meta property="og:description" content="--><? //= $settings['site_description'] 
                                                    ?>
    <!--"/>-->

    <!--   audio player-->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/css/green-audio-player.min.css">
    <script src="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/js/green-audio-player.min.js"></script>

    <!--   tooltips-->
    <script>
        var whTooltips = {
            colorLinks: false,
            iconizeLinks: false,
            renameLinks: false,
            iconSize: 'medium'
        };
    </script>
    <script src="js/vendor/tt/newpower.js"></script>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/vendor/bootstrap.min.css" />
    <link rel="stylesheet" href="css/style.css?ver=<?= rand() ?>" />
    <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />


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

</head>

<body ng-controller="MainCtrl">

    <a id="top"></a>

    <div class="top-sticky">
        <div class="container pl-0 pr-0">

            <nav class="navbar navbar-expand-lg navbar-dark">

                <a class="navbar-brand logo" ng-href="#/home">
                    <img ng-src="images/logo/logo.svg" alt="Turtle WoW" />
                </a>

                <button id="navbar-toggler" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav ml-4">

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="featuresDropdown" role="button" ng-class="{'hover' : featuresMenuVisible}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ng-click="featuresMenuVisible = !featuresMenuVisible">
                                OUR FEATURES
                            </a>
                            <div class="section" aria-labelledby="featuresDropdown" id="features" ng-if="featuresMenuVisible">
                                <div class="container-fluid">
                                    <div class="container p-5">

                                        <div class="row">
                                            <div class="col-lg-3">
                                                <!--                     <a ng-click="goToPage('changelog')">Changelog <span class="sup">NEW</span></a><Br>-->
                                                <a ng-click="goToPage('new-races')">Two new playable races</a><Br>
                                                <a ng-click="goToPage('class-race-combinations')">Additional class & race
                                                    combinations</a><Br>
                                                <a ng-click="goToPage('character-customizations')">New character customizations</a><Br>
                                                <a ng-click="goToPage('sound-design')">Original soundtracks & voice-acting</a><Br>
                                                <a ng-click="goToPage('new-factions-and-quests')">New factions & quests</a><Br>
                                                <a ng-click="goToPage('new-locations-and-maps')">New locations & maps</a><Br>
                                                <a ng-click="goToPage('raids-and-dungeons')">Raids & dungeons</a><Br>
                                                <a ng-click="goToPage('roleplay')">Roleplay & community events</a><Br>
                                                <a ng-click="goToPage('items-and-recipes')">Items & recipes</a><Br>
                                                <a ng-click="goToPage('additional-transport-routes')">Additional transport routes</a><Br>
                                            </div>
                                            <div class="col-lg-3">
                                                <a ng-click="goToPage('player-versus-player-content')">Player vs Player content</a><Br>
                                                <a ng-click="goToPage('seasonal-events')">Exciting seasonal events</a><Br>
                                                <a ng-click="goToPage('community-artworks')">Community artworks</a><Br>
                                                <a ng-click="goToPage('client-interface-improvements')">Client UI improvements</a><Br>
                                                <a ng-click="goToPage('pets-and-mounts')">New pets & mounts</a><Br>
                                                <a ng-click="goToPage('logos')">Logotypes</a><Br>
                                                <a href="https://turtle-wow.fandom.com/wiki/Turtle_WoW_Wiki" target="_blank">Wiki</a><Br>
                                                <a href="https://turtle-census.org/" target="_blank">Census</a><Br>
                                                <a ng-click="goToPage('population-graph')">Population Graph</a><Br>
                                                <a href="https://dev.turtle-wow.org/" target="_blank">Development Tools</a><Br>
                                                <!--                            <a ng-click="goToPage('addons')">Addons</a><Br>-->
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <p class="main-menu-title mb-0">Gameplay Features
                                                            <span class="chev pull-right m-0"> <i class="fa fa-fw fa-angle-down"></i> </span>
                                                        </p>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white" ng-click="goToPage('guild-banks')">Guild Vaults</a>
                                                        <a class="white" ng-click="goToPage('transmogrification')">Transmogrification</a>
                                                        <a class="white" ng-click="goToPage('achievement-titles')">Achievement Titles</a>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white" ng-click="goToPage('dynamic-mount-speed')">Dynamic Mount Speed</a>
                                                        <a class="white" ng-click="goToPage('beginners-guild')">Beginner's Guilds</a>
                                                        <a class="white" ng-click="goToPage('chronoboon-displacer')">Chronoboon
                                                            Displacer</a>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white" ng-click="goToPage('survival-and-gardening')">Survival &
                                                            Gardening</a>
                                                        <a class="white" ng-click="goToPage('raids-and-dungeons#cross-faction')">Cross-faction
                                                            Play</a>
                                                    </div>

                                                    <div class="col-lg-12">
                                                        <p class="main-menu-title mb-0 mt-4">Challenges
                                                            <span class="chev pull-right m-0">
                                                                <i class="fa fa-fw fa-angle-down"></i>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white" ng-click="goToPage('hardcore-mode')">Hardcore Mode</a>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white" ng-click="goToPage('slow-and-steady')">Slow & Steady Mode</a>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white" ng-click="goToPage('player-versus-player-content#war-mode')">War
                                                            Mode</a>
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
                            <a class="nav-link" target="_blank" href="https://forum.turtle-wow.org/viewtopic.php?f=2&t=2097">
                                RULES
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" ng-href="#/donate" ng-click="collapseNavBar()">DONATE</a>
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
                            <a class="nav-link" target="_blank" href="https://forum.turtle-wow.org/">FORUM</a>
                        </li>

                    </ul>

                    <ul class="nav justify-content-end ml-auto">
                        <li class="nav-item login pull-right">
                            <a class="nav-link hand" ng-click="openRegisterModal()">Register
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

                            <input type="text" class="form-control" placeholder="Account Name" ng-class="{'invalid' : register_data.account_name.length <= 2}" ng-model="register_data.account_name">
                            <input type="text" class="form-control" placeholder="E-mail" ng-class="{'invalid' : !validEmail(register_data.email_address)}" ng-model="register_data.email_address">
                            <input type="text" class="form-control" placeholder="Forum Username" ng-class="{'invalid' : register_data.forum_name.length <= 2}" ng-model="register_data.forum_name">
                            <input type="password" class="form-control w-50 pull-left" placeholder="Password" ng-class="{'invalid' : register_data.user_password.length <= 2}" ng-model="register_data.user_password">
                            <input type="password" class="form-control w-50 pull-right" ng-class="{'invalid' : register_data.user_password != register_data.user_password2 }" placeholder="Repeat Password" ng-model="register_data.user_password2">

                            <div class="g-recaptcha" data-theme="dark" id="captcha_div" data-sitekey="6Lfbnm4UAAAAAH2W-PWm4EIfValJxMgQcBmX4My1"></div>

                            <BR><BR><BR>

                            <img src="images/registerbutton.png" class="w-100 hand register" ng-click="register()" ng-class="{'desat' : registering }">

                            <div class="response m-3 text-white" ng-if="response != ''">
                                {{response}}
                            </div>

                            <img src="images/footerline.png" class="mt-5 mb-5 w-100">

                            <!--                  <a class="hand mr-3" ng-click="changeModal('login')">-->
                            <!--                     <img src="images/icon_exclamation.png" class="mr-2">-->
                            <!--                     Log in-->
                            <!--                  </a>-->

                            <a class="hand ml-3" ng-click="changeModal('forgot')">
                                <img src="images/icon_exclamation.png" class="mr-2">
                                Forgot Password
                            </a>

                        </div>

                        <div class="col-lg-8 text-center p-5" ng-if="modal == 'login'">

                            <h5 class="text-white">my account</h5>

                            <BR><BR>

                            <input type="text" class="form-control" placeholder="E-mail" disabled>
                            <input type="password" class="form-control" placeholder="Password" disabled>


                            <img src="images/button_login.png" class="w-100 disabled-hand register mt-2 desat">

                            <p class="orange-text">Loging in is currently disabled.</p>

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

                            <input type="email" class="form-control" placeholder="E-mail" ng-class="{'invalid' : register_err }" ng-model="register_data.email_address">


                            <img src="images/buttonforgot.png" class="w-100 hand register mt-5" ng-class="{'desat' : registering }" ng-click="forgot()">

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

                            <a class="hand play" href="https://forum.turtle-wow.org/viewtopic.php?f=2&t=1649" target="_blank"><img src="images/button_done.png"></a>

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

                <p class="m-auto w-75">
                    Mysteries of Azeroth — is a story expansion made by the Turtle WoW Team, inspired by the Warcraft
                    universe
                    of Blizzard Entertainment.
                    World of Warcraft remains the intellectual property of Blizzard Entertainment.
                </p>

                <Br>
                <Br>

                <a href="https://forum.turtle-wow.org/viewtopic.php?f=2&t=2097" target="_blank" class="orange-text">Server
                    Rules & Terms of Use</a>

                <img src="images/footerline.png" class="mt-5 mb-5 w-100">



            </div>
        </div>
    </div>


    <script src="js/vendor/jquery-3.5.1.min.js"></script>
    <script src="js/vendor/bootstrap.bundle.min.js"></script>
    <script src="js/vendor/angular/angular.min.js"></script>
    <script src="js/vendor/angular-ui-router/release/angular-ui-router.min.js"></script>

    <script src="node_modules/chart.js/dist/chart.js"></script>

    <script src="src/_services/http.service.js"></script>
    <script src="src/_filters/_ucfirst.js"></script>
    <script src="src/_filters/filters.js"></script>
    <script src="src/_directives/directives.js?ver=<?= rand() ?>"></script>

    <script src="src/home/home.js?ver=<?= rand() ?>"></script>
    <script src="src/reset/reset.js?ver=<?= rand() ?>"></script>
    <script src="src/activate/activate.js?ver=<?= rand() ?>"></script>

    <script src="src/pages/donate/donate.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/changelog/changelog.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/sound-design/sound-design.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/new-races/new-races.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/class-race-combinations/class-race-combinations.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/seasonal-events/seasonal-events.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/new-locations-and-maps/new-locations-and-maps.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/additional-transport-routes/additional-transport-routes.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/client-interface-improvements/client-interface-improvements.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/player-versus-player-content/player-versus-player-content.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/hardcore-mode/hardcore-mode.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/slow-and-steady/slow-and-steady.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/beginners-guild/beginners-guild.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/chronoboon-displacer/chronoboon-displacer.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/character-customizations/character-customizations.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/achievement-titles/achievement-titles.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/guild-banks/guild-banks.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/transmogrification/transmogrification.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/dynamic-mount-speed/dynamic-mount-speed.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/survival-and-gardening/survival-and-gardening.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/raids-and-dungeons/raids-and-dungeons.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/new-factions-and-quests/new-factions-and-quests.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/items-and-recipes/items-and-recipes.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/pets-and-mounts/pets-and-mounts.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/roleplay/roleplay.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/logos/logos.js?ver=<?= rand() ?>"></script>
    <script src="src/classes/classes.js?ver=<?= rand() ?>"></script>

    <script src="src/pages/population-graph/population-graph.js?ver=<?= rand() ?>"></script>
    <script src="src/pages/community-artworks/community-artworks.js?ver=<?= rand() ?>"></script>

    <script src="js/app.modules.js?ver=<?= rand() ?>"></script>
    <script src="js/app.js?ver=<?= rand() ?>"></script>

    <script src='https://www.google.com/recaptcha/api.js'></script>

</body>

</html>