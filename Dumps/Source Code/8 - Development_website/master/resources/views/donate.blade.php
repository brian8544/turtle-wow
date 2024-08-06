@include('layout.head')

<body>

@include('layout.header')

<div class="section mb-5 donate" id="pages" style="background-image: url({{ Vite::asset('resources/images/donatebg.png') }}">
    @livewire('donate')
</div>


@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

<script>
    const toggleButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-bs-target');
            const collapseElements = document.querySelectorAll('.collapse');
            collapseElements.forEach(collapse => {
                if (collapse.getAttribute('id') !== targetId) {
                    collapse.classList.remove('show');
                }
            });
        });
    });
</script>

</body>

</html>
