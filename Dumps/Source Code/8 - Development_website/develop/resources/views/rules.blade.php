@include('layout.head')

<body>
@dynamicContent('rules')

@include('layout.header')

<div class="main">
    <div class="section mb-5 rules" id="pages">
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
        <div class="container-fluid pb-5">
            <div class="container pt-5 pb-5">
                <ul class="nav custom-nav-tabs" id="myTab" role="tablist">
                    @forelse(config('customs.realms') as $key => $realm)
                        @if ($realm['id'])
                            <li class="nav-item" role="presentation">
                                <button class="nav-link custom-nav-link {{ $loop->first ? 'active': '' }}"
                                        id="rules-tab-{{ $key }}" data-bs-toggle="tab"
                                        data-bs-target="#rules_{{ $key }}" type="button" role="tab"
                                        aria-controls="rules_{{ $key }}"
                                        aria-selected="true">{{ $realm['name'] }}
                                </button>
                            </li>
                        @endif
                    @empty
                    @endforelse
                </ul>
                <div class="tab-content" id="myTabContent">

                    @forelse(config('customs.realms') as $key => $realm)
                        @if ($realm['id'])
                            @sectionContent('rules.' . config('app.web_env') . '.' . $key)

                        @endif
                    @empty
                    @endforelse
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
