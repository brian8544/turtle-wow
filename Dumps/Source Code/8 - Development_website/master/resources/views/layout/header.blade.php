<div id="main-header">
    <div class="top-sticky" id="main-navbar">
        <div class="container pl-0 pr-0">

            <nav class="navbar navbar-expand-lg navbar-dark">

                <a class="navbar-brand logo" href="{{ route('home') }}">
                    <img
                        src="{{ Vite::asset('resources/images/logo/logo' . (app()->getLocale() == 'zh_cn' ? '_zh_cn.png' : '.svg')) }}"
                        alt="Turtle WoW"/>
                </a>


                <div class="d-flex align-items-center">
                    <div class="appear text-gray hand" style="font-size: 1.5rem">
                        <a href="{{ route('radio') }}" target="_blank" style="color: inherit">
                            <i class="fa fa-radio mr-3"></i>
                        </a>
                    </div>

                    <button id="navbar-toggler" class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav ml-4 align-items-center">

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="featuresDropdown" role="button"
                               data-bs-toggle="collapse" data-bs-target="#features" aria-haspopup="true"
                               aria-expanded="false">
                                {{ __('header')['our_features'] }}
                            </a>
                            <div class="section collapse" aria-labelledby="featuresDropdown" id="features">
                                <div class="container-fluid">
                                    <div class="container p-5">

                                        <div class="row">
                                            <div class="col-lg-3">
                                                <a href="{{ route('new-races') }}">{{ __('new_races_page')['new_races'] }}</a><Br>
                                                <a href="{{ route('class-race-combinations') }}">{{ __('class_race_combinations_page')['class_race_combinations'] }}</a><Br>
                                                <a href="{{ route('character-customizations') }}">{{ __('character_customizations_page')['character_customizations'] }}</a><Br>
                                                <a href="{{ route('sound-design') }}">{{ __('sound_design_page')['sound_design'] }}</a><Br>
                                                <a href="{{ route('new-factions-and-quests') }}">{{ __('new_factions_and_quests_page')['new_factions_and_quests'] }}</a><Br>
                                                <a href="{{ route('new-locations-and-maps') }}">{{ __('new_locations_and_maps_page')['new_locations_and_maps'] }}</a><Br>
                                                <a href="{{ route('raids-and-dungeons') }}">{{ __('raids_and_dungeons_page')['raids_and_dungeons'] }}</a><Br>
                                                <a href="{{ route('roleplay') }}">{{ __('roleplay_page')['roleplay'] }}</a><Br>
                                                <a href="https://forum.turtle-wow.org/viewforum.php?f=70"
                                                   target="_blank">{{ __('itemization_page')['itemization'] }}</a><Br>
                                                <a href="{{ route('additional-transport-routes') }}">{{ __('additional_transport_routes_page')['additional_transport_routes'] }}</a><Br>

                                            </div>

                                            <!--                     <a ng-click="goToPage('changelog')">Changelog <span class="sup">NEW</span></a><Br>-->
                                            <!-- <a ng-click="goToPage('new-races')">Two new playable races</a><Br>
                                             <a ng-click="goToPage('class-race-combinations')">Additional class & race
                                                 combinations</a><Br>
                                             <a ng-click="goToPage('character-customizations')">New character customizations</a><Br>
                                             <a ng-click="goToPage('sound-design')">Original soundtracks & voice-acting</a><Br>
                                             <a ng-click="goToPage('new-factions-and-quests')">New factions & quests</a><Br>
                                             <a ng-click="goToPage('new-locations-and-maps')">New locations & maps</a><Br>
                                             <a ng-click="goToPage('raids-and-dungeons')">Raids & dungeons</a><Br>
                                             <a ng-click="goToPage('roleplay')">Roleplay & community events</a><Br>
                                             <a ng-click="goToPage('items-and-recipes')">Items & recipes</a><Br>
                                             <a ng-click="goToPage('additional-transport-routes')">Additional transport
                                                 routes</a><Br>
                                         </div>-->
                                            <div class="col-lg-3"><!--
                                             <a ng-click="goToPage('player-versus-player-content')">Player vs Player content</a><Br>
                                             <a ng-click="goToPage('seasonal-events')">Exciting seasonal events</a><Br>
                                             <a ng-click="goToPage('community-artworks')">Community artworks</a><Br> -->
                                                <a href="{{ route('player-versus-player-content') }}">{{ __('player_versus_player_page')['player_versus_player'] }}</a><Br>
                                                <a href="{{ route('seasonal-events') }}">{{ __('seasonal_events_page')['seasonal_events'] }}</a><Br>
                                                <a href="{{ route('community-artworks') }}">{{ __('community_artworks_page')['community_artworks'] }}</a><Br>
                                                <a href="{{ route('client-interface-improvements') }}">{{ __('client_ui_page')['client_ui'] }}</a><Br>
                                                <a href="{{ route('pets-and-mounts') }}">{{ __('pets_and_mounts_page')['pets_and_mounts'] }}</a><Br>
                                                <!-- <a ng-click="goToPage('pets-and-mounts')">New pets & mounts</a><Br>-->
                                                <a href="{{ route('classic-dungeons-update') }}">{{ __('patch_1.17.2_page')['patch_1.17.2'] }}</a><Br>
                                                <a href="{{ route('jewelcrafting') }}">{{ __('jewelcrafting_page')['jewelcrafting'] }}</a><Br>

                                                <!-- <a href="https://turtle-wow.fandom.com/wiki/Turtle_WoW_Wiki"
                                                    target="_blank">Wiki</a><Br>
                                                 <a ng-click="goToPage('population-graph')">Population Graph</a><Br>
                                                 <a href="https://dev.turtle-wow.org/" target="_blank">Development Tools</a><Br>-->
                                                <!--                            <a ng-click="goToPage('addons')">Addons</a><Br>-->
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <p class="main-menu-title mb-0">{{ __('header')['gameplay_features'] }}

                                                        </p>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white"
                                                           href="{{ route('guild-banks') }}">{{ __('guild_banks_page')['guild_banks'] }}</a><br>
                                                        <a class="white"
                                                           href="{{ route('transmogrification') }}">{{ __('transmogrification_page')['transmogrification'] }}</a><br>
                                                        <a class="white"
                                                           href="{{ route('achievement-titles') }}">{{ __('achievement_titles_page')['achievement_titles'] }}</a>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white"
                                                           href="{{ route('dynamic-mount-speed') }}">{{ __('dynamic_mount_speed_page')['dynamic_mount_speed'] }}</a><br>
                                                        <!-- <a class="white" ng-click="goToPage('beginners-guild')">Beginner's Guilds</a>-->
                                                        <a class="white"
                                                           href="{{ route('chronoboon-displacer') }}">{{ __('chronoboon_displacer_page')['chronoboon_displacer'] }}</a><br>
                                                        <a class="white"
                                                           href="{{ route('everlook-broadcasting') }}">{{ __('everlook_broadcasting_page')['everlook_broadcasting'] }}</a>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white"
                                                           href="{{ route('survival-and-gardening') }}">{{ __('survival_and_gardening_page')['survival_and_gardening'] }}</a><br>
                                                        @if (config('customs.shellcoin.enabled'))
                                                            <a class="white"
                                                               href="{{ route('shellcoin') }}">{{ __('shellcoin_page')['shellcoin'] }}</a>
                                                            <br>
                                                        @endif

                                                        <!-- <a class="white" ng-click="goToPage('raids-and-dungeons#cross-faction')">Cross-faction</a><br>
                                                     <a class="white" ng-click="goToPage('shellcoin')">Shell Co. Trading</a>-->
                                                    </div>


                                                    <div class="col-lg-12">
                                                        <p class="main-menu-title mb-0 mt-4">{{ __('header')['challenges'] }}

                                                        </p>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white"
                                                           href="{{ route('hardcore-mode') }}">{{ __('hardcore_mode_page')['hardcore_mode'] }}</a><br>
                                                        <a class="white"
                                                           href="{{ route('slow-and-steady') }}">{{ __('slow_and_steady_page')['slow_and_steady'] }}</a>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white"
                                                           href="{{ route('vagrants-endeavor') }}">{{ __('vagrants_endeavor_page')['vagrants_endeavor'] }}</a><br>
                                                        <a class="white"
                                                           href="{{ route('boaring-adventure') }}">{{ __('boaring_adventure_page')['boaring_adventure'] }}</a>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <a class="white"
                                                           href="{{ route('player-versus-player-content') }}#war-mode">{{ __('war_mode_page')['war_mode'] }}</a>
                                                    </div><!--
                                                <div class="col-lg-4">
                                                    <a class="white" ng-click="goToPage('slow-and-steady')">Slow & Steady Mode</a>
                                                </div>
                                                <div class="col-lg-4">
                                                    <a class="white" ng-click="goToPage('player-versus-player-content#war-mode')">War
                                                        Mode</a>
                                                </div>-->

                                                    <div class="col-lg-12">
                                                        <p class="main-menu-title mb-0 mt-4">{{ __('header')['class_changes'] }}

                                                        </p>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <a class="white"
                                                           href="{{ route('druid') }}">{{ __('druid_page')['druid'] }}</a><Br>
                                                        <a class="white"
                                                           href="{{ route('hunter') }}">{{ __('hunter_page')['hunter'] }}</a>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <a class="white"
                                                           href="{{ route('mage') }}">{{ __('mage_page')['mage'] }}</a><Br>
                                                        <a class="white"
                                                           href="{{ route('paladin') }}">{{ __('paladin_page')['paladin'] }}</a>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <a class="white"
                                                           href="{{ route('priest') }}">{{ __('priest_page')['priest'] }}</a><Br>
                                                        <a class="white"
                                                           href="{{ route('rogue') }}">{{ __('rogue_page')['rogue'] }}</a>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <a class="white"
                                                           href="{{ route('shaman') }}">{{ __('shaman_page')['shaman'] }}</a><Br>
                                                        <a class="white"
                                                           href="{{ route('warlock') }}">{{ __('warlock_page')['warlock'] }}</a>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <a class="white"
                                                           href="{{ route('warrior') }}">{{ __('warrior_page')['warrior'] }}</a>
                                                    </div><!--
                                                 <div class="col-lg-2">
                                                     <a class="white" ng-click="goToPage('shaman')">Shaman</a><Br>
                                                     <a class="white" ng-click="goToPage('warlock')">Warlock</a>
                                                 </div>
                                                 <div class="col-lg-2">
                                                     <a class="white" ng-click="goToPage('warrior')">Warrior</a>
                                                 </div>
                                             </div>
                                                </div>-->
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="toolsDropdown" role="button"
                               data-bs-toggle="collapse" data-bs-target="#tools" aria-haspopup="true"
                               aria-expanded="false">
                                {{ __('header')['tools'] }}
                            </a>
                            <div class="section collapse" aria-labelledby="toolsDropdown" id="tools">
                                <div class="container-fluid">
                                    <div class="container p-3 pl-5 pr-5">

                                        <div class="row">
                                            <div class="d-flex flex-column">
                                                @if (config('customs.armory.enabled'))
                                                    <a href="{{ route('armory') }}">{{ __('header')['armory'] }}</a>
                                                @endif
                                                <a href="{{ route('hardcore') }}">{{ __('header')['hardcore'] }}</a>
                                                @if (config('customs.url.talents'))
                                                    <a target="_blank"
                                                       href="{{ config('customs.url.talents') }}">{{ __('header')['talents'] }}</a>
                                                @endif
                                                @if (config('customs.url.database'))
                                                    <a target="_blank"
                                                       href="{{ config('customs.url.database') }}">{{ __('header')['database'] }}</a>
                                                @endif
                                                @if (config('customs.url.wiki'))
                                                    <a href="{{ config('customs.url.wiki') }}"
                                                       target="_blank">{{ __('wiki_page')['wiki'] }}</a>
                                                @endif
                                                @if (config('customs.population_graph.enabled'))
                                                    <a href="{{ route('population-graph') }}">{{ __('population_graph_page')['population_graph'] }}</a>
                                                @endif
                                                @if (config('customs.url.development_tools'))
                                                    <a href="{{ config('customs.url.development_tools') }}"
                                                       target="_blank">{{ __('development_tools_page')['development_tools'] }}</a>
                                                @endif
                                                <a href="{{ route('logos') }}">{{ __('logotypes_page')['logotypes'] }}</a><Br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('rules') }}">
                                {{ __('header')['rules'] }}
                            </a>
                        </li>
                        <!--               <li class="nav-item">-->
                        <!--                  <a class="nav-link hand" ng-click="moveToRules()">RULES</a>-->
                        <!--               </li>-->
                        @auth('account')
                            <li class="nav-item">
                                <a class="nav-link hand" href="{{ route('donate') }}">{{ __('header')['donate'] }}</a>
                            </li>
                        @endauth
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('watch') }}">{{ __('header')['turtle_tv'] }}</a>
                        </li>
                        @if (config('customs.url.database'))
                            <li class="nav-item">
                                <a class="nav-link" target="_blank"
                                   href="{{ config('customs.url.forum') }}">{{ __('header')['forum'] }}</a>
                            </li>
                        @endif
                        @if (config('customs.bug_tracker.enabled'))
                            <li class="nav-item">
                                <a class="nav-link"
                                   href="{{ route('bug-tracker') }}">{{ __('bug_tracker')['bug_tracker'] }}</a>
                            </li>
                        @endif

                        <li class="nav-item">
                            <a class="nav-link"
                               href="{{ config('customs.url.changelog') }}"
                               target="_blank">{{ __('header')['changelog'] }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" target="_blank"
                               href="{{ route('radio') }}">{{ __('radio_page')['radio'] }}</a>
                        </li>
                        {{--<li class="nav-item d-md-none d-lg-none">
                            <a class="nav-link" target="_blank" ng-href="#/ucp/overview">UCP</a>
                        </li>
                        <li class="nav-item d-md-none d-lg-none">
                            <a class="nav-link" target="_blank" ng-click="logout()">Logout</a>
                        </li>--}}
                    </ul>

                    <ul class="nav justify-content-end ml-auto d-xs-none d-sm-none d-lg-block d-md-block">

                        @auth('account')
                            <li class="nav-item dropdown">
                                <div class="d-flex align-items-center search-div">
                                    <!-- Trigger for 2FA reset warning -->
                                    @if (Auth::guard('account')->user()->security && Auth::guard('account')->user()->recovery_code === null)
                                        <i class="fas fa-exclamation-circle text-danger hand" data-bs-toggle="dropdown"
                                           data-bs-target="#reset2FADropdown"></i>


                                        <!-- Dropdown Menu for 2FA reset -->
                                        <div class="dropdown-menu p-3" id="reset2FADropdown"
                                             aria-labelledby="reset2FADropdownButton"
                                             style="width: 27rem; text-align: center; left: -17rem;">
                                            <a style="text-align: center">{{ __('header')['need_reset_2_fa_code'] }}</a>
                                        </div>
                                    @endif

                                    <!-- Trigger for user account dropdown -->
                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                       data-bs-target="#userAccountDropdown" aria-expanded="false">
                                        {{ auth()->guard('account')->user()->username }}
                                    </a>

                                    <!-- Dropdown Menu for user account -->
                                    <div class="dropdown-menu" id="userAccountDropdown"
                                         aria-labelledby="userAccountDropdownButton" style="right: 0; left: unset;">
                                        <a class="dropdown-item"
                                           href="{{ route('profile') }}#profile-overview">{{ __('header')['account_management'] }}</a>
                                        @if (auth('account')->user()->rank >= 3)
                                            <a class="dropdown-item" target="_blank"
                                               href="{{ route('ban-appeals') }}">{{ __('gm_ban_appeals_page')['ban_appeals'] }}</a>
                                            <a class="dropdown-item" target="_blank"
                                               href="{{ route('shop-appeals') }}">{{ __('shop_appeals_page')['shop_appeals'] }}</a>
                                        @endif
                                        @if ((auth('account')->user()->rank >= 5) || (Auth::guard(app('VoyagerGuard'))->check() && Auth::guard(app('VoyagerGuard'))->user()->can('browse_admin')))
                                            <a class="dropdown-item" target="_blank"
                                               href="{{ route('world-config') }}">{{ __('header')['world_config'] }}</a>
                                        @endif
                                        <a class="dropdown-item"
                                           href="{{ route('profile') }}#profile-security">{{ __('header')['security'] }}</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item hand" href="{{ route('logout') }}"
                                           onclick="event.preventDefault(); document.getElementById('frm-logout').submit(); var event = new Event('analytic-log-out-user'); document.dispatchEvent(event);">
                                            <i class="fa-solid fa-right-from-bracket"></i>
                                            {{ __('header')['logout'] }}
                                        </a>
                                        <form id="frm-logout" action="{{ route('logout') }}" method="POST"
                                              style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </div>
                                </div>
                            </li>
                        @endauth

                        <!--               <li class="nav-item login pull-right" ng-if="isLoggedIn()">-->
                        <!--                  <a class="nav-link hand" ng-click="logout()">Logout-->
                        <!--                     <img src="images/icon_login.png">-->
                        <!--                  </a>-->
                        <!--               </li>-->

                        @guest('account')
                            <li class="nav-item login pull-right">
                                <a class="nav-link hand" href="{{ route('login') }}">{{ __('header')['login'] }}
                                    <img src="{{ Vite::asset('resources/images/icon_login.png') }}">
                                </a>
                            </li>
                        @endguest
                    </ul>
                    <ul class="nav justify-content-end">
                        <li class="nav-item dropdown">
                            @foreach($available_locales as $locale_name => $available_locale)
                                @if ($available_locale === $current_locale)
                                    <a class="nav-link dropdown-toggle" id="lang-dropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        {{-- <img
                                             src="{{ Vite::asset('resources/images/icons/' . $available_locale . '_flag.png') }}"
                                             alt="{{ $current_locale }}" class="flag-img">--}}
                                        @if($current_locale === 'zh_cn')
                                            CN
                                        @elseif($current_locale === 'en')
                                            EN
                                        @endif
                                    </a>
                                @endif
                            @endforeach
                            <div id="flag-menu" class="dropdown-menu" style="left: auto; right: 0; min-width: 0">
                                @foreach($available_locales as $locale_name => $available_locale)
                                    @if ($available_locale === $current_locale)

                                    @else
                                        @if($available_locale === 'zh_cn')
                                            <a class="dropdown-item" style="color: var(--blue-gray)"
                                               href="{{ route('language', ['locale' => $available_locale]) }}">CN</a>
                                        @elseif($available_locale === 'en')
                                            <a class="dropdown-item" style="color: var(--blue-gray)"
                                               href="{{ route('language', ['locale' => $available_locale]) }}">EN</a>
                                        @endif
                                    @endif
                                @endforeach
                            </div>
                        </li>
                    </ul>
                </div>


            </nav>

            @auth('account')
                @if (!Auth::guard('account')->user()->hasVerifiedEmail())
                    @livewire('verification-message')
                @endif
            @endauth

            <script>
                document.addEventListener('DOMContentLoaded', function () {
                    var myNavbar = document.getElementById('navbarSupportedContent');
                    var featuresDropdown = document.getElementById('featuresDropdown');
                    var toolsDropdown = document.getElementById('toolsDropdown');
                    var features = document.getElementById('features');
                    var tools = document.getElementById('tools');

                    document.addEventListener('click', function (event) {
                        var isClickInsideFeatures = featuresDropdown.contains(event.target);
                        var isClickInsideTools = toolsDropdown.contains(event.target);

                        if (!myNavbar.contains(event.target)) {
                            closeAllMenus();
                        } else if (isClickInsideFeatures) {
                            toggleMenu(features, tools);
                        } else if (isClickInsideTools) {
                            toggleMenu(tools, features);
                        }
                    });

                    document.addEventListener('keydown', function (event) {
                        if (event.key === 'Escape') {
                            closeAllMenus();
                        }
                    });

                    function toggleMenu(menuToToggle, menuToClose) {
                        if (menuToClose.classList.contains('show')) {
                            menuToClose.classList.remove('show');
                            menuToClose.previousElementSibling.setAttribute('aria-expanded', 'false');
                        }

                        var isMenuOpen = menuToToggle.classList.contains('show');

                    }

                    function closeAllMenus() {
                        closeMenu(featuresDropdown, features);
                        closeMenu(toolsDropdown, tools);
                    }

                    function closeMenu(dropdown, menu) {
                        dropdown.setAttribute('aria-expanded', 'false');
                        menu.classList.remove('show');
                    }
                });

                function lightOrDark(color) {

                    // Check the format of the color, HEX or RGB?
                    if (color.match(/^rgb/)) {

                        // If HEX --> store the red, green, blue values in separate variables
                        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

                        r = color[1];
                        g = color[2];
                        b = color[3];
                    } else {

                        // If RGB --> Convert it to HEX: http://gist.github.com/983661
                        color = +("0x" + color.slice(1).replace(
                                color.length < 5 && /./g, '$&$&'
                            )
                        );

                        r = color >> 16;
                        g = color >> 8 & 255;
                        b = color & 255;
                    }

                    hsp = Math.sqrt(
                        0.299 * (r * r) +
                        0.587 * (g * g) +
                        0.114 * (b * b)
                    );

                    // Using the HSP value, determine whether the color is light or dark
                    if (hsp > 127.5) {
                        return 'light';
                    } else {
                        return 'dark';
                    }
                }

                document.addEventListener('DOMContentLoaded', function () {
                    document.querySelectorAll('.flair-badge').forEach(function (badge) {
                        var borderColor = window.getComputedStyle(badge).borderColor;

                        if (lightOrDark(borderColor) === 'dark') {
                            badge.style.filter = 'invert(100%)';
                        }
                    });
                });

            </script>
        </div>
        {{-- @auth('account')
             @if(request()->route()->getName() != 'radio')
                 <div class="btn top-sticky d-flex flex-column align-items-center disappear" id="radioControlBtn"
                      style="background: none">
                     <div class="d-flex gray-link" id="radio-text"><a class="gray-link" href="{{ route('radio') }}">Listen to
                             Radio!</a>&nbsp;
                         <span onclick="togglePlayerVisibility()" class="d-flex align-items-center" id="togglePlayerBtn">
                         <i class="fas fa-close"></i>
                     </span>
                     </div>
                     <div class="mobile-player d-flex justify-content-between align-items-center"
                          style="scale: 0.6; margin-top: -1rem;" id="playerPanel">
                         <i class="fa fa-volume-down"></i>
                         <i class="fa fa-play" id="playPauseBtn"></i>
                         <i class="fa fa-volume-up"></i>
                         <input type="range" class="volume-slider invisible" min="0" max="100" value="50"
                                aria-label="Volume">
                     </div>
                 </div>
             @endif
         @endauth
     --}}
    </div>
</div>

