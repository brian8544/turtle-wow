<div class="modal fade" id="hardcoreModal" tabindex="-1" role="dialog" aria-labelledby="hardcoreModalLabel" wire:ignore.self>
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
    <div class="modal-dialog" role="document">
        <div class="modal-content">

            <div class="modal-body text-white">
                <table class="table table-striped">
                    <thead class="hand">
                    <tr>
                        <th>{{ $title }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @forelse($characters as $char)
                        <tr>
                            <td style="text-align: left;@if ($mortalityStatus == 3) filter:saturate(0)@endif">
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

                <div class="my-custom-pagination mt-2">
                    @if ($charactersPaginate)
                        {{ $charactersPaginate->links() }}
                    @endif
                </div>
            </div>

        </div>
    </div>
</div>
