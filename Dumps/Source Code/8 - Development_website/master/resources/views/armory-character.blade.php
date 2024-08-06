@include('layout.head')


@vite(['resources/css/armory.css'])

<body>
@include('layout.header')

<div class="container">
    <div class="col-lg-12 d-flex justify-content-center" style="cursor: pointer;"><img
            src="https://forum.turtle-wow.org/styles/pbwow3/theme/images/theme/logo.png" alt="Turtle Wow Armory"
            class="center-block" style="max-height: 300px;"></div>
</div>

@livewire('armory-profile')

@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>


</body>

</html>
