@include('layout.head')

<body>

@include('layout.header')

@livewire('reset-password-form', ['token' => $token])

@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>
