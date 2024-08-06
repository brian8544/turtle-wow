@include('layout.head')
<style>
    a, a:hover {
        text-decoration: none;
        color: inherit !important;
    }

    .dropdown-menu a {
        color: white !important;
    }

    .dropdown-menu a:hover {
        color: var(--orange) !important;
    }

    #downloadLinks a:not(.modalClose) {
        color: var(--orange) !important;
    }

    #downloadLinks a:hover {
        color: white !important;
    }

    .modalClose {
        color: white !important;
    }
</style>
<body>

@dynamicContent('home')

@include('layout.header')

@livewire('register-modal')

@php
    $visitorCountry = isset($_SERVER['HTTP_CF_IPCOUNTRY']) ? $_SERVER['HTTP_CF_IPCOUNTRY'] : null;
@endphp

<div class="modal fade" id="downloadLinks" tabindex="-1" aria-labelledby="registerLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body p-0">

                <a class="hand modalClose" data-bs-dismiss="modal">&times;</a>

                <div class="row">

                    <div class="col-lg-2"></div>

                    <div class="col-lg-8 text-center p-5">

                        @sectionContent('home.download.links.' . config('app.web_env'))


                        <img alt="Footer line" src="{{ Vite::asset('resources/images/footerline.png') }}"
                             class="mt-5 mb-5 w-100">

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

@if ($visitorCountry != "RU" && $visitorCountry != "UA")
    <div class="modal fade" id="legalInformation" tabindex="-1" aria-labelledby="registerLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body p-0">

                    <a class="hand modalClose" data-bs-dismiss="modal">&times;</a>

                    <div class="row">

                        <div class="col-lg-2"></div>

                        <div class="col-lg-8 text-center p-5">
                            <h6 style="color:#666">
                                @sectionContent('home.legal.information')
                            </h6>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endif

<div class="section" id="home1" style="background-image: url({{ Vite::asset('resources/images/bg1-new.png') }}">
    <div class="container-fluid pt-5">

        <div class="container pt-5">

            <div class="alert alert-warning mtn w-75 d-none">
                {{ __('page_home')['maintenance'] }}
                <img alt="Exclamation Mark" src="{{ Vite::asset('resources/images/exclamation.png') }}"
                     class="pull-right">
            </div>

            @if (config('customs.url.youtube'))
                <a href="{{ config('customs.url.youtube') }}" target="_blank" class="icons"><img alt="Youtube Icon"
                                                                                                 src="{{ Vite::asset('resources/images/icon youtube.png') }}"></a>
            @endif
            @if (config('customs.url.bilibili'))
                <a href="{{ config('customs.url.bilibili') }}" target="_blank" class="icons"><img alt="Bilibili Icon"
                                                                                                  src="{{ Vite::asset('resources/images/icon bilibili.png') }}"></a>
            @endif
            <a href="{{ config('customs.url.discord') }}" target="_blank" class="icons">
                <img alt="Discord Icon" src="{{ Vite::asset('resources/images/icon discord.png') }}"></a>
            <a href="{{ config('customs.url.instagram') }}" target="_blank" class="icons">
                <img alt="Instagram Icon" src="{{ Vite::asset('resources/images/icon instagram.png') }}"></a>
            <a href="{{ config('customs.url.twitter') }}" target="_blank" class="icons">
                <img alt="Twitter Icon" src="{{ Vite::asset('resources/images/icon twitter.png') }}"></a>
            <a href="{{ config('customs.url.soundcloud') }}" target="_blank" class="icons soundcloud">
                <img alt="SoundCloud Icon" src="{{ Vite::asset('resources/images/icon soundcloud.png') }}"></a>


            <a href="{{ route('watch') }}" target="_blank" class="icons">
                <img alt="Turtle TV Icon" src="{{ Vite::asset('resources/images/icon turtletv.png') }}"
                     style="width: 30px; margin-left: 3px;"></a>

            <a href="{{ config('customs.url.spotify') }}" target="_blank" class="icons">
                <img alt="Spotify Icon" src="{{ Vite::asset('resources/images/icon spotify.png') }}"
                     style="width: 30px; margin-left: 3px;"></a>


            <a href="{{ config('customs.url.apple_music') }}" target="_blank" class="icons apple">
                <img alt="Apple Music Icon" src="{{ Vite::asset('resources/images/icon apple.png') }}"
                     style="width: 32px; margin-left: 3px;"></a>


            <h2 class="mt-4">@sectionContent('home1.title')</h2>
            <div class="row">
                <div class="col-lg-7">
                    <p class="pt-3">
                        @sectionContent('home1.text')
                    </p>

                    <div class="row">
                        @guest('account')
                            <a href="#" id="button-sign-up" data-bs-toggle="modal" class="col"
                               data-bs-target="#register">
                                <h4>{{ __('button')['sign_up'] }}</h4>
                            </a>
                        @endguest
                        @auth('account')
                            <a id="button-am" class="col" href="{{ route('profile') }}">
                                <h4>{{ __('button')['account_management'] }}</h4></a>
                        @endauth

                        @if (config('app.web_env') == "EN")
                            <a id="button-download-client" class="col"
                               href="{{ config('customs.url.download_client') }}" target="_blank">
                                <h4>{{ __('button')['download_client'] }}</h4>
                            </a>
                        @else
                            <a id="button-download-client" data-bs-toggle="modal" class="col"
                               data-bs-target="#downloadLinks">
                                <h4>{{ __('button')['download_client'] }}</h4>
                            </a>
                        @endif
                    </div>
                </div>
                <div class="col-lg-4">
                </div>

            </div>

        </div>

    </div>
</div>

<div class="section" id="home2" style="background-image: url({{ Vite::asset('resources/images/bg2.png') }}">
    <div class="container-fluid">

        <div class="container pt-5">

            <div class="row" id="box1">
                <div class="col-lg-12 twbox">
                    <div class="graphic"></div>
                    <div class="row">
                        <div class="col-lg-6"></div>
                        <div class="col-lg-6 pt-5 pb-5 pr-5">
                            <a href="{{ route('new-races') }}" class="hand">
                                <h3>@sectionContent('home2.box1.title.1')</h3>
                                <h2 class="orange-text">@sectionContent('home2.box1.title.2')</h2>
                            </a>
                            <img src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-3 mb-4 w-100">
                            <p style="width: 80%;">
                                @sectionContent('home2.box1.text')
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row mt-5" id="box2">
                <div class="col-lg-5 mt-0 pt-5 pb-0">

                    <h3 class="orange-text mt-5">@sectionContent('home2.box2.title.1')</h3>
                    <h1 class="orange-text font-weight-bold">@sectionContent('home2.box2.title.2')</h1>
                    @sectionContent('home2.box2.text')
                </div>

                <div class="col-lg-12"></div>

                <div class="col-lg-6 smallBox" id="sb1">
                    <div class="inner p-5">
                        <a href="{{ route('new-races') }}" class="hand">
                            <div class="image"></div>
                            <h4>@sectionContent('home2.sb1.title.1')</h4>
                            <h4 class="orange-text font-weight-bold">@sectionContent('home2.sb1.title.2')</h4>
                        </a>
                        <p class="mt-5">
                            @sectionContent('home2.sb1.text')
                        </p>
                    </div>
                </div>
                <div class="col-lg-6 smallBox" id="sb2">
                    <div class="inner p-5">
                        <a href="{{ route('new-races') }}" class="hand">
                            <div class="image"></div>
                            <h4>@sectionContent('home2.sb2.title.1')</h4>
                            <h4 class="orange-text font-weight-bold">@sectionContent('home2.sb2.title.2')</h4>
                        </a>
                        <p class="mt-5">
                            @sectionContent('home2.sb2.text')
                        </p>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>

<div class="section d-none" id="changelog_home"
     style="background-image: url({{ Vite::asset('resources/images/changelogglow.png') }}">
    <div class="container-fluid">

        <div class="container">

            <div class="row">

                <div class="col-lg-4">
                    <img src="{{ Vite::asset('resources/images/cog.png') }}">
                    <p class="cDate">
                        December 12 | 2021
                    </p>
                    <p class="cDescription">
                        Name of change and some other description. Name of change and some7other description
                    </p>
                </div>
                <div class="col-lg-4">
                    <img src="{{ Vite::asset('resources/images/cog.png') }}">
                    <p class="cDate">
                        December 12 | 2021
                    </p>
                    <p class="cDescription">
                        Name of change and some other description. Name of change and some7other description
                    </p>
                </div>
                <div class="col-lg-4">
                    <img src="{{ Vite::asset('resources/images/cog.png') }}">
                    <p class="cDate">
                        December 12 | 2021
                    </p>
                    <p class="cDescription">
                        Name of change and some other description. Name of change and some7other description
                    </p>
                </div>

            </div>

            <a href="#"><img src="{{ Vite::asset('resources/images/changelog.png') }}"
                             style="margin-bottom: -50px;"></a>

        </div>

    </div>
</div>

<div class="section mt-5" id="home4">
    <div class="container-fluid">

        <div class="container">

            <div class="row">

                <div class="col-lg-4">
                    <div class="lore4 p-3"
                         style="background-image: url({{ Vite::asset('resources/images/home41.png') }}">
                        <a href="{{ route('sound-design') }}" class="hand">
                            <h2 class="orange-text mt-5 pt-3  font-weight-bold">
                                @sectionContent('home4.column1.title.1')</h2>
                            <h4 class="orange-text middle  font-weight-bold">
                                @sectionContent('home4.column1.title.2')</h4>
                            <h3 class="orange-text  font-weight-bold">@sectionContent('home4.column1.title.3')</h3>
                        </a>
                        <p>
                            @sectionContent('home4.column1.text')
                        </p>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="lore4 p-3"
                         style="background-image: url({{ Vite::asset('resources/images/home42.png') }}">
                        <a href="{{ route('new-factions-and-quests') }}" class="hand">
                            <h2 class="orange-text mt-5 pt-3  font-weight-bold">
                                @sectionContent('home4.column2.title.1')</h2>
                            <h4 class="orange-text middle font-weight-bold">
                                @sectionContent('home4.column2.title.2')</h4>
                            <h3 class="orange-text font-weight-bold">@sectionContent('home4.column2.title.3')</h3>
                        </a>
                        <p>
                            @sectionContent('home4.column2.text')
                        </p>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="lore4 p-3"
                         style="background-image: url({{ Vite::asset('resources/images/home43.png') }}">
                        <a href="{{ route('new-locations-and-maps') }}" class="hand">
                            <h2 class="orange-text mt-5 pt-3 font-weight-bold">
                                @sectionContent('home4.column3.title.1')</h2>
                            <h4 class="orange-text middle font-weight-bold">
                                @sectionContent('home4.column3.title.2')</h4>
                            <h3 class="orange-text font-weight-bold">@sectionContent('home4.column3.title.3')</h3>
                        </a>
                        <p>
                            @sectionContent('home4.column3.text')
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="section mt-5" id="home5">
    <div class="container-fluid">
        <div class="container">
            <div class="row ml-0 mr-0">
                <div class="col-lg-6 p-5">
                    <a href="{{ route('class-race-combinations') }}" class="hand">
                        <h2 style="color: white;">@sectionContent('home5.title.1')</h2>
                        <h2 class="orange-text font-weight-bold">@sectionContent('home5.title.2')</h2>
                    </a>
                    <img alt="Footer Line" src="{{ Vite::asset('resources/images/footerline.png') }}"
                         class="mt-3 mb-4 w-100">
                    @sectionContent('home5.text')
                </div>
                <div class="col-lg-6">
                    <div class="image"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section mt-5 m-3" id="home6" style="background-image:url({{ Vite::asset('resources/images/boat.png') }}">
    <div class="container">
        <div class="row">

            <div class="col-lg-6"></div>
            <div class="col-lg-6">
                <a href="{{ route('additional-transport-routes') }}" class="hand">
                    <h1 class="orange-text">@sectionContent('home6.title.1')</h1>
                    <h1 class="orange-text">@sectionContent('home6.title.2')</h1>
                </a>
                <p class="mt-3 w-75">
                    @sectionContent('home6.text')
                </p>
                <BR><BR>
                <a href="{{ route('additional-transport-routes') }}"><img alt="Transport Routes Button"
                                                                          src="{{ Vite::asset('resources/images/transportsbutton.png') }}">
                </a>
            </div>
        </div>
    </div>
</div>

<div class="section" id="home7" style="margin-top: -100px;">
    <div class="container-fluid">
        <div class="container">
            <div class="row" id="box3">
                <div class="col-lg-6 smallBox" id="sb3">
                    <div class="inner p-5">
                        <a href="{{ route('survival-and-gardening') }}" class="hand">
                            <div class="image"></div>
                            <h4>@sectionContent('home7.sb3.title.1')</h4>
                            <h4 class="orange-text">@sectionContent('home7.sb3.title.2')</h4>
                        </a>
                        <p class="mt-5">
                            @sectionContent('home7.sb3.text')
                        </p>
                    </div>
                </div>
                <div class="col-lg-6 smallBox" id="sb4">
                    <div class="inner p-5">
                        <a href="{{ route('seasonal-events') }}" class="hand">
                            <div class="image"></div>
                            <h4>@sectionContent('home7.sb4.title.1')</h4>
                            <h4 class="orange-text">@sectionContent('home7.sb4.title.2')</h4>
                        </a>
                        <p class="mt-5">
                            @sectionContent('home7.sb4.text')
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="section mt-5" id="home8">
    <div class="container-fluid">

        <div class="container">

            <div class="row">

                <div class="col-lg-4">
                    <div class="lore4 p-3 pt-5"
                         style="background-image: url({{ Vite::asset('resources/images/items.png') }}">
                        <h2 class="orange-text mt-5 font-weight-bold">@sectionContent('home8.column1.title.1')</h2>
                        <h4 class="orange-text middle font-weight-bold">
                            @sectionContent('home8.column1.title.2')</h4>
                        <h3 class="orange-text font-weight-bold">@sectionContent('home8.column1.title.3')</h3>
                        <p>
                            @sectionContent('home8.column1.text')
                        </p>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="lore4 p-3 pt-5"
                         style="background-image: url({{ Vite::asset('resources/images/raids.png') }}">
                        <a href="{{ route('raids-and-dungeons') }}" class="hand">
                            <h2 class="orange-text mt-5 font-weight-bold">@sectionContent('home8.column2.title.1')</h2>
                            <h4 class="orange-text middle font-weight-bold">
                                @sectionContent('home8.column2.title.2')</h4>
                            <h3 class="orange-text font-weight-bold">@sectionContent('home8.column2.title.3')</h3>
                        </a>
                        <p>
                            @sectionContent('home8.column2.text')
                        </p>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="lore4 p-3 pt-5"
                         style="background-image: url({{ Vite::asset('resources/images/arena.png') }}">
                        <a href="{{ route('player-versus-player-content') }}" class="hand">
                            <h2 class="orange-text mt-5 font-weight-bold">@sectionContent('home8.column3.title.1')</h2>
                            <h4 class="orange-text middle font-weight-bold">
                                @sectionContent('home8.column3.title.2')</h4>
                            <h3 class="orange-text font-weight-bold">@sectionContent('home8.column3.title.3')</h3>
                        </a>
                        <p>
                            @sectionContent('home8.column3.text')
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="section mt-5 mb-4" id="home9">
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4" id="main-video-1">
                    @livewire("video-embed", ['id' => '72ef6fce'])
                </div>
                <div class="col-lg-4 mb-4" id="main-video-2">
                    @livewire("video-embed", ['id' => 'd169db12'])
                </div>
                <div class="col-lg-4 mb-4" id="main-video-3">
                    @livewire("video-embed", ['id' => '62844b89'])
                </div>
            </div>
        </div>
    </div>
</div>


<div class="section" id="home10">
    <div class="container-fluid">
        <div class="container">
            <div class="row ml-0 mr-0">
                <div class="col-lg-6">
                </div>
                <div class="col-lg-6 p-5">
                    <a href="{{ route('guild-banks') }}" class="hand">
                        <h2 class="orange-text">@sectionContent('home10.title')</h2>
                    </a>
                    <img alt="Footer Line" src="{{ Vite::asset('resources/images/footerline.png') }}"
                         class="mt-4 mb-4 w-100">
                    <p class="w-75">
                        @sectionContent('home10.text')
                    </p>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="section mt-5 mb-5" id="home11">
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-5">
                    <a href="{{ route('character-customizations') }}" class="hand">
                        <h2 class="orange-text">@sectionContent('home11.title.1')</h2>
                        <h2 class="orange-text">@sectionContent('home11.title.2')</h2>
                    </a>
                    <p class="mt-4 w-75">
                        @sectionContent('home11.text')
                    </p>

                </div>
            </div>
        </div>
    </div>
</div>

<div class="section mt-5 mb-5" id="home12">
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="cow"></div>
                    <div class="p-5 ml-7">
                        <h4>@sectionContent('home12.column1.title.1')</h4>
                        <h3 class="orange-text font-weight-bold">@sectionContent('home12.column1.title.2')</h3>
                        <img alt="Footer Line" src="{{ Vite::asset('resources/images/footerline.png') }}"
                             class="mt-3 mb-4 w-100">
                        <p class="w-75">
                            @sectionContent('home12.column1.text')
                        </p>
                    </div>
                </div>
                <div class="col-lg-6 cow2">
                    <div class="p-5">
                        <a href="{{ route('client-interface-improvements') }}" class="hand">
                            <h4>@sectionContent('home12.column2.title.1')</h4>
                            <h3 class="orange-text font-weight-bold">@sectionContent('home12.column2.title.2')</h3>
                        </a>
                        @sectionContent('home12.column2.text')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="pb-5" id="texture"
     style="background-image: url({{ Vite::asset('resources/images/background-texture.webp') }})">

    <div class="section mt-5" id="home13">
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-lg-1"></div>
                    <div class="col-lg-5">

                        <a href="{{ route('pets-and-mounts') }}" class="hand">
                            <h2 class="orange-text">@sectionContent('home13.title')</h2>
                        </a>
                        <p class="mt-4">
                            @sectionContent('home13.text')
                        </p>

                        <br>

                        <a href="{{ route('pets-and-mounts') }}"><img alt="Pets and Mounts Button"
                                                                      src="{{ Vite::asset('resources/images/buttonpets.png') }}"></a>

                    </div>
                </div>
            </div>
        </div>
    </div>

    @sectionContent('home.14')

    @sectionContent('home15.section.1')




    {{--<div class="section mt-5" id="home15">
        <div class="container-fluid" style="margin-top: 7rem">
            <div class="container">
                <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column align-items-center w-100">
                        <div class="d-flex justify-content-center" style="margin-top: -3.5rem">
                            <a href="{{ route('classic-dungeons-update') }}" class="hand">
                                <h3 class="orange-text d-flex justify-content-center">Classic Dungeons</h3>
                                <h1 class="orange-text d-flex justify-content-center" style="margin-bottom: 0; text-align: center">Map &
                                    Encounter</h1>
                                <h1 class="orange-text d-flex justify-content-center">Update</h1>
                            </a>
                        </div>


                        <p class="text-white pb-4" style="max-width: 35rem; text-align: center">
                            These additions are designed to enrich the exploration and combat experience in familiar
                            dungeons with new lore, challenges, and rewards. All new locations and encounters are
                            optional,
                            providing flexibility for players.
                        </p>

                        <div class="row w-100">

                            <div class="col-lg-4">
                                <div class="lore4 p-3 pb-4"
                                     style="background-image: url({{ Vite::asset('resources/images/sfk.webp') }})">
                                    <h4 class="orange-text mt-5 pt-3 mb-0">
                                        Shadowfang Keep</h4>
                                    <h6 class="orange-text">
                                        The Chapel</h6>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="lore4 p-3 pb-4"
                                     style="background-image: url({{ Vite::asset('resources/images/smgy.webp') }}">
                                    <h4 class="orange-text mt-5 pt-3 mb-0">
                                        Scarlet Monastery</h4>
                                    <h6 class="orange-text">
                                        Graveyard: Prison</h6>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="lore4 p-3 pb-4"
                                     style="background-image: url({{ Vite::asset('resources/images/wc.webp') }}">
                                    <h4 class="orange-text mt-5 pt-3 mb-0">
                                        Wailing Caverns</h4>
                                    <h6 class="orange-text">
                                        Kolkar's Birthright</h6>
                                </div>
                            </div>

                        </div>

                        <div class="row w-100 mt-3">

                            <div class="col-lg-4">
                                <div class="lore4 p-3 pb-4"
                                     style="background-image: url({{ Vite::asset('resources/images/wc-second.webp') }}">
                                    <h4 class="orange-text mt-5 pt-3 mb-0">
                                        Wailing Caverns</h4>
                                    <h6 class="orange-text">
                                        The Overgrowth</h6>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="lore4 p-3 pb-4"
                                     style="background-image: url({{ Vite::asset('resources/images/dm-second.webp') }}">
                                    <h4 class="orange-text mt-5 pt-3 mb-0">
                                        The Deadmines</h4>
                                    <h6 class="orange-text">
                                        Harvest Golem Foundary</h6>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="lore4 p-3 pb-4"
                                     style="background-image: url({{ Vite::asset('resources/images/dm-lab.webp') }}">
                                    <h4 class="orange-text mt-5 pt-3 mb-0">
                                        The Deadmines</h4>
                                    <h6 class="orange-text">
                                        The Laboratory</h6>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <div class="section mt-5 mb-5" id="home16"
         style="background-image:url({{ Vite::asset('resources/images/class-changes.webp') }}); background-color: #100d0c">
        <div class="container">
            <div class="row">

                <div class="col-lg-6"></div>
                <div class="col-lg-6">
                    <h4 class="orange-text">Class Changes</h4>
                    <h1 class="orange-text font-weight-bold">Making</h1>
                    <h1 class="orange-text font-weight-bold">Your Spec Viable!</h1>

                    <p class="mt-3 w-75">
                        Every class and specialization has been shown some extra love, with new and reworked talents,
                        abilities, and interactions allowing every playstyle to shine while staying true to the vanilla
                        wow spirit of unique class identity.
                    </p>

                </div>
            </div>
        </div>
    </div>

    <div class="section mb-5" id="home19">
        <div class="container-fluid">
            <div class="container">
                <div class="row" style="position: relative; height: 24rem;">
                    <img alt="Radio Section" src="{{ Vite::asset('resources/images/radio-section.webp') }}">
                    <div class="col-lg-1"></div>
                    <div class="col-lg-5 d-flex flex-column justify-content-end">
                        <a href="{{ route('radio') }}" class="hand">
                            <h4 class="text-white mb-0">In-Game Radio</h4>
                            <h2 class="orange-text mb-0 font-weight-bold">Everlook</h2>
                            <h2 class="orange-text font-weight-bold">Broadcasting Co.</h2>

                        </a>
                        <p class="mt-4 w-75 text-white">
                            More than just static, it’s Everlook Radio magic! 24/7 tunes only a click away, accessible
                            in-game or in your browser!
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </div>
<div class="texture mb-5 pb-5" style="background-image: url({{ Vite::asset('resources/images/background-texture.webp') }})">
    <div class="section" id="home17">
        <div class="container-fluid" style="margin-top: 7rem">
            <div class="container">
                <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column align-items-center w-100">
                        <div class="row w-100">

                            <div class="col-lg-4">
                                <div class="lore4 p-3 pb-4 mobile-move"
                                     style="background-image: url({{ Vite::asset('resources/images/ui.webp') }})">
                                    <a href="{{ route('client-interface-improvements') }}">
                                        <h4 class="orange-text mt-5 pt-3 mb-0 d-flex justify-content-center">User</h4>
                                        <h2 class="orange-text font-weight-bold">
                                            Interface</h2>
                                    </a>
                                    <h6 class="orange-text">
                                        Reduced Add-On Dependency</h6>
                                    <p class="text-gray">
                                        A better experience, by default — no more scouring the web for 20 year old
                                        addons! With UI adjustments and updates all in the existing vanilla style,
                                        you’ll be able to experience all the game has to offer without downloading
                                        anything extra.
                                    </p>
                                </div>
                            </div>

                            <div class="col-lg-4 lore4 d-flex align-items-end itemization" style="position: relative; z-index: -3">
                                <img class="w-100" src="{{ Vite::asset('resources/images/itemization.webp') }}"
                                     alt="Itemization Picture" id="itemization-image">
                                <div class="p-3 pb-4">
                                    <a href="https://forum.turtle-wow.org/viewforum.php?f=70" target="_blank">
                                        <h2 class="orange-text font-weight-bold d-flex flex-column align-items-center">
                                            Itemization</h2>

                                    </a>
                                    --}}{{--  <h6 class="orange-text">
                                          Reduced Add-On Dependency</h6>--}}{{--
                                    <p class="text-gray">
                                        Explore the new progression in Turtle WoW’s vanilla+ world. New dungeons, raids,
                                        and alternatives for existing tier sets allow new and refreshing progression for
                                        vanilla veterans and classic newcomers alike!
                                    </p>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="lore4 p-3 pb-4"
                                     style="background-image: url({{ Vite::asset('resources/images/jewel.webp') }}">
                                    <h4 class="orange-text mt-5 pt-3 mb-0">New Primary</h4>
                                    <h2 class="orange-text font-weight-bold">
                                        Profession</h2>
                                    <h6 class="orange-text">
                                        Jewelcrafting</h6>
                                    <p class="text-gray">
                                        Create new, powerful gear and gems with our custom profession Jewelcrafting!
                                        Explore the specialty of Goldsmithing and craft equipment, or try your hand at
                                        Gemology to enhance existing rings and necklaces!
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section mt-4" id="home18">
        <div class="container-fluid">
            <div class="container">
                <div class="row m-3">
                    <div class="col-lg-6">
                    </div>
                    <div class="col-lg-6 mt-5">
                        <h5 class="text-white mt-4">Test your strength with</h5>
                        <h2 class="orange-text font-weight-bold">Leveling Challenges</h2>
                        <img alt="Footer Line" src="{{ Vite::asset('resources/images/footerline.png') }}"
                             class="mt-4 mb-4 w-100">
                        <p class="w-75 text-white">
                            Prove yourself or die trying! Whether you take on the Hardcore challenge and prove your
                            skill as a mortal, or embark on a journey to kill that which has no life in the Hambringer
                            challenge, our numerous challenge modes provide motivation to get back into the world and
                            level another alt!
                        </p>
                        <div class="challenge-links">
                            <a href="{{ route('hardcore-mode') }}" class="orange-text">Hardcore</a>
                            <span class="separator">&bull;</span>
                            <a href="{{ route('player-versus-player-content') }}#war-mode" class="orange-text">War
                                Mode</a>
                            <span class="separator">&bull;</span>
                            <a href="{{ route('slow-and-steady') }}" class="orange-text">Slow and Steady</a>
                            <span class="separator">&bull;</span>
                            <a href="{{ route('vagrants-endeavor') }}" class="orange-text">Vagrant's Endeavor</a>
                            <span class="separator">&bull;</span>
                            <a href="{{ route('boaring-adventure') }}" class="orange-text">Boaring Adventure</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>--}}

{{--
<div class="section mb-5" id="team">
    <div class="container-fluid">
        <div class="container">
            <img src="{{ Vite::asset('resources/images/logoteam.png') }}">
            <h2 class="orange-text mb-2">@sectionContent('team.title')</h2>
            <p class="m-auto w-50">
                @sectionContent('team.text')
            </p>

           @sectionContent('team.credits')

            <br>
            </div>


        </div>
    </div>--}}{{--
</div>--}}

@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

<script type="module">
    Livewire.on('reset-turnstile', () => {
        turnstile.reset('#turnstile-container');
    });
</script>

</body>

</html>
