@include('layout.head')

<body>


@include('layout.header')

<div class="section mb-5" id="pages">
    <style>
        .custom-nav-tabs {
            padding: 10px;
        }

        .custom-nav-link {
            background-color: var(--dark-gray);
            border-radius: 5px;
            margin-right: 10px;
            border: 1px solid transparent;
        }

        .custom-nav-link.active {
            color: var(--orange) !important;
            border-color: transparent;
        }
    </style>

    @livewire('population-graph')
</div>


@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

</body>

</html>
