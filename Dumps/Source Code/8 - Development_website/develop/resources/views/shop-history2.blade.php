@include('layout.head')

<body>

<div class="container ucp mt-5" style="padding: 0; width: 100%">
    @livewire('shop-history-table2', ['accountId' => request()->query('accountId'), 'username' => request()->query('username')])
</div>


@include('layout.dependency')

@include('layout.script')
</body>
</html>

