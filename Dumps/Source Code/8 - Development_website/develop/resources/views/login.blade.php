@include('layout.head')

<style>

    @font-face {
        font-family: 'Fontin-Sans';
        src: url({{ Vite::asset('resources/fonts/Fontin-Sans-CR-SC.ttf.woff') }}) format('woff'),
        url({{ Vite::asset('resources/fonts/Fontin-Sans-CR-SC.ttf.svg') }}#Fontin-Sans-CR-SC) format('svg'),
        url({{ Vite::asset('resources/fonts/Fontin-Sans-CR-SC.ttf.eot') }});
        font-weight: normal;
        font-style: normal;
    }

    body {
        background-image: url({{ Vite::asset('resources/images/bg2.png') }});
        background-size: cover;
    }

    h5, p, a {
        font-family: Fontin-Sans;
    }

    .login-box {
        margin-top: 200px !important;
        border-radius: 0;
        border: 1px solid rgba(158, 151, 131, .1);
        background-color: var(--dark-gray);
        opacity: 0.98;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    }

    .btn-success {
        border: 1px solid #3f5f22;
        background: rgb(71 105 49);
        background: radial-gradient(circle, rgb(71 105 49) 0%, rgb(41 70 33) 100%);
        border-radius: 1px;
        font-family: Fontin-Sans;
        color: #9cbc5c;
        font-size: 20px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .btn-success:hover {
        border: 1px solid #527e2d;
        background: rgb(71 105 49);
        background: radial-gradient(circle, rgb(127, 183, 85) 0%, rgb(41 70 33) 100%);
        color: #bee375;
    }

    a {
        color: #3f5f22;
    }

    a:hover {
        color: #3f5f22 !important;
        text-decoration: underline;
    }
</style>

<body>

@livewire('login')

@include('layout.dependency')

@include('layout.script')

<script type="module">
    Livewire.on('reset-turnstile', () => {
        turnstile.reset('#turnstile-login-container');
    });
</script>

</body>
</html>
