<html lang="{{ app()->getLocale() }}">

<head>

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>

    <link rel="icon" type="image/x-icon" href="{{ Vite::asset('resources/images/favicon.ico')}}">

    {!! SEO::generate() !!}

    <!--   audio player-->
    <link rel="stylesheet" type="text/css"
          href="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/css/green-audio-player.min.css">
    <script src="https://cdn.jsdelivr.net/gh/greghub/green-audio-player/dist/js/green-audio-player.min.js"></script>
    <link href="https://fonts.cdnfonts.com/css/friz-quadrata-std" rel="stylesheet">


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

    <link rel="preconnect" href="https://fonts.gstatic.com"/>

    {{--<link rel="stylesheet" href="{{ asset('build/assets/css/app.css') }}" >--}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    {{--<script async src="https://www.googletagmanager.com/gtag/js?id=UA-125328091-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'UA-125328091-1');
    </script>--}}

    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">

    @if (config('app.env') == 'production')
        <!-- Matomo -->
        <script>
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            @auth('account')
            _paq.push(['setUserId', '{{Auth::guard('account')->user()->email}}']);
            @endauth
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function () {
                var u = "{{ config('customs.matomo.url') }}";
                _paq.push(['setTrackerUrl', u + 'matomo.php']);
                _paq.push(['setSiteId', '{{ config('customs.matomo.id') }}']);
                var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.async = true;
                g.src = u + 'matomo.js';
                s.parentNode.insertBefore(g, s);
            })();
        </script>
        <!-- End Matomo Code -->
    @endif

    <style>
        body {
            background: url("{{ Vite::asset('resources/images/background.webp') }}") #000 no-repeat;
        }
    </style>

</head>

<body>

@include('layout.header')

<div class="container hardcore">
    @livewire('hardcore')

    @livewire('hardcore-modal')
</div>
<script>
    function selectRealm(selectedElement) {
        document.querySelectorAll('.realm').forEach(realm => {
            realm.classList.remove('active');
        });

        selectedElement.classList.add('active');

    }
</script>
@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>
</html>
