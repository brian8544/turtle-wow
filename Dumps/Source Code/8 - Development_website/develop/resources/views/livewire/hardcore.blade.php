<div class="row">
    @php
        $classes = ['', 'Warrior',
           'Paladin', 'Hunter',
           'Rogue', 'Priest', '',
           'Shaman', 'Mage',
           'Warlock', '', 'Druid',
       ];

       $races = [
           '',
           'Human',
           'Orc',
           'Dwarf',
           'Nightelf',
           'Undead',
           'Tauren',
           'Gnome',
           'Troll',
           'Goblin',
           'Highelf'
       ];
   @endphp
    <div class="col-lg-12">
        <img src="{{ Vite::asset('resources/images/logoteam.png') }}" alt="Turtle WoW"
             class="center-block" style="max-height: 300px;">
        <BR>
        <h3>{{ __('hardcore')['hardcore_scoreboard'] }}</h3>
        <h3 style="margin-top: -14px !important;">
            <a class="text-center" href="{{ route('hardcore-mode') }}" target="_blank">{{ __('hardcore')['learn_more'] }}</a>
        </h3>
    </div>
    <div class="w-100 d-flex justify-content-center">
        <div class="realm-selector">
            @forelse(config('customs.realms') as $key => $realm)
                @if ($realm['id'] && $realm['hardcore'])
                <div class="realm {{ $selectedRealm == $key ? 'active': '' }}" onclick="selectRealm(this)" wire:click="setRealm('{{ $key }}')">{{ $realm['name'] }}</div>
                @endif
            @empty
            @endforelse
        </div>
    </div>
    <div class="col-lg-4 text-center">
        <table class="table table-striped">
            <thead class="hand" data-bs-toggle="modal" data-bs-target="#hardcoreModal" wire:click="$dispatchTo('hardcore-modal', 'openModal', { mortalityStatus: 1, realm: {{ $selectedRealm }} })">
            <tr>
                <th>{{ __('hardcore')['still_standing'] . " " . __('custom.hc_table_label', ['current' => $paginationNumber, 'total' => $stillStandingCount]) }}</th>
            </tr>
            </thead>
            <tbody>
            @forelse($stillStanding as $char)
            <tr>
                <td style="text-align: left;">
                    <img src="{{ Vite::asset('resources/images/races/' . strtolower($races[$char['race']]) . '-' . ($char->gender == 0 ? 'male.png' : 'female.png')) }}"
                         width="25">
                    <img src="{{ Vite::asset('resources/images/' . $classes[$char->class] . '.png') }}" width="25">
                    <span style="color: #eed323 !important;">{{ $char->level }}</span>
                    <span class="{{ $classes[$char['class']] }}">{{ $char->name }}</span>
                    <div style="height: 2px; width: calc(100% + 16px); background: rgba(18,108,115, 0.25); position: relative; left: -8px; bottom: -8px;">
                        <div style="background-color: rgb(18 108 115); height: 2px; width: {{ $char['percent'] }}%;"></div>
                    </div>
                </td>
            </tr>
            @empty
            @endforelse
            </tbody>
        </table>
    </div>

    <div class="col-lg-4 text-center">
        <table class="table table-striped">
            <thead class="hand" data-bs-toggle="modal" data-bs-target="#hardcoreModal" wire:click="$dispatchTo('hardcore-modal', 'openModal', { mortalityStatus: 3, realm: {{ $selectedRealm }} })">
            <tr>
                <th>{{ __('hardcore')['fallen_heroes'] . " " . __('custom.hc_table_label', ['current' => $paginationNumber, 'total' => $fallenCount]) }}</th>
            </tr>
            </thead>
            <tbody>
            @forelse($fallen as $char)
                <tr>
                    <td style="text-align: left; filter:saturate(0)">
                        <img src="{{ Vite::asset('resources/images/races/' . strtolower($races[$char['race']]) . '-' . ($char->gender == 0 ? 'male.png' : 'female.png')) }}"
                             width="25">
                        <img src="{{ Vite::asset('resources/images/' . $classes[$char->class] . '.png') }}" width="25">
                        <span style="color: #eed323 !important;">{{ $char->level }}</span>
                        <span class="{{ $classes[$char->class] }}">{{ $char->name }}</span>
                        <div style="height: 2px; width: calc(100% + 16px); background: rgba(18,108,115, 0.25); position: relative; left: -8px; bottom: -8px;">
                            <div style="background-color: rgb(18 108 115); height: 2px; width: {{ $char->percent }}%;"></div>
                        </div>
                    </td>
                </tr>
            @empty
            @endforelse
            </tbody>
        </table>
    </div>

    <div class="col-lg-4 text-center">
        <table class="table table-striped">
            <thead class="hand" data-bs-toggle="modal" data-bs-target="#hardcoreModal" wire:click="$dispatchTo('hardcore-modal', 'openModal', { mortalityStatus: 2, realm: {{ $selectedRealm }} })">
            <tr>
                <th>{{ __('hardcore')['immortals'] . " " . __('custom.hc_table_label', ['current' => $paginationNumber, 'total' => $immortalsCount]) }}</th>
            </tr>
            </thead>
            <tbody>
            @forelse($immortals as $char)
                <tr>
                    <td style="text-align: left;">
                        <img src="{{ Vite::asset('resources/images/races/' . strtolower($races[$char['race']]) . '-' . ($char->gender == 0 ? 'male.png' : 'female.png')) }}"
                             width="25">
                        <img src="{{ Vite::asset('resources/images/' . $classes[$char->class] . '.png') }}" width="25">
                        <span style="color: #eed323 !important;">{{ $char->level }}</span>
                        <span class="{{ $classes[$char->class] }}">{{ $char->name }}</span>
                        <div style="height: 2px; width: calc(100% + 16px); background: rgba(18,108,115, 0.25); position: relative; left: -8px; bottom: -8px;">
                            <div style="background-color: rgb(18 108 115); height: 2px; width: {{ $char->percent }}%;"></div>
                        </div>
                    </td>
                </tr>
            @empty
            @endforelse
            </tbody>
        </table>
    </div>
</div>
