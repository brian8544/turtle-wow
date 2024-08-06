@include('layout.head')

<body>

@dynamicContent('slow-and-steady')

@include('layout.header')

@sectionContent('slow-and-steady.section.1')

@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>
