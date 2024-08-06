@include('layout.head')

<body>


@include('layout.header')

<div class="section mb-5 watch" id="pages">
    <div class="container-fluid pb-5">
        @livewire('watch-tv')
    </div>
</div>



@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>
