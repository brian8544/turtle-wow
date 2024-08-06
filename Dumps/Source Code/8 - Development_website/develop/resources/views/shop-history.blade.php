@include('layout.head')

<body>

<div class="container ucp mt-5" style="padding: 0; width: 100%">
    @livewire('shop-history-table', ['accountId' => request()->query('accountId'), 'username' => request()->query('username')])
</div>

<script>
    function selectRealm(selectedElement) {
        document.querySelectorAll('.realm').forEach(realm => {
            realm.classList.remove('active');
        });

        selectedElement.classList.add('active');

    }
</script>


@include('layout.dependency')

@include('layout.script')
</body>
</html>

