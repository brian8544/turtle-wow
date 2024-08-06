@include('layout.head')

<body>

@include('layout.header')

<div class="section mb-5" id="reset" style="background-image: url({{ Vite::asset('resources/images/bg1-new.png') }})">
    <div class="container-fluid pt-1">
        <div class="container pt-5 pb-5">
            <div class="row p-5 mt-5 mb-5">
                <div class="col-lg-12 ">
                    <h2 class="orange-text mb-2 font-weight-bold">{{ __('page_activate')['title'] }}</h2>
                    <p class="w-50 mt-3 text-white">
                        {{ $message }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>
