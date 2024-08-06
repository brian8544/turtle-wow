@dynamicContent('profile')
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
<div class="tab-pane col-lg-7 mt-2 fade" id="characters" role="tabpanel" aria-labelledby="profile-characters" wire:ignore.self>
    <h3 class="orange-text">{{ __('page_profile')['characters']['title'] }}</h3>
    <div class="w-100 d-flex mb-3">
        <div class="d-flex">
            @forelse(config('customs.realms') as $key => $realm)
                @if ($realm['id'])
                    <div class="realm {{ $selectedRealm == $key ? 'active': '' }}" onclick="selectRealm(this)" wire:click="setRealm('{{ $key }}')">{{ $realm['name'] }}</div>
                @endif
            @empty
            @endforelse
        </div>
    </div>

    <table class="table table-striped light-borders table-hover">
        @sectionContent('profile.characters')
        <tbody>
        @forelse($characters as $character)
            <tr>
                <td>{{ $loop->index + 1 }}</td>
                <td class="game-class-{{ $character->class }} game-class">

                    <img alt="WoW Race" src="{{ Vite::asset('resources/images/races/' . strtolower($races[$character->race]) . '-' . ($character->gender == 0 ? 'male.png' : 'female.png')) }}" style="width: 24px;" @if ($character->mortality_status == 3) class="desat" @endif>

                    <a {{--href="https://armory.turtle-wow.org/#!/character/{{ $characterRealm1->name }}"--}}
                       target="_blank" class="@if ($character->mortality_status == 3) deset @endif">{{ $character->name }}</a>

                </td>
                <td>{{ $character->level }}</td>
                <td>
                    @switch ($character->mortality_status)
                        @case (1)
                            <span>{{ __('page_profile')['characters']['still_standing'] }}</span>
                            @break
                        @case (2)
                            <span>{{ __('page_profile')['characters']['immortal'] }}</span>
                            @break
                        @case (3)
                            <span>{{ __('page_profile')['characters']['fallen'] }}</span>
                            @break
                        @default
                            <span class="text-gray2">-</span>
                            @break
                    @endswitch
                </td>
                <td>
                    @forelse($character->glyphs as $glyph)
                        <img
                            @if ($glyph->spell == 50004)
                                src="{{ Vite::asset('resources/images/icons/spells/spell_nature_sleep.png') }}"
                            style="width: 24px; margin-right: 5px;"
                            data-toggle="tooltip" data-placement="top" data-title="{{ __('page_profile')['characters']['exhaustion'] }}"
                            class="float-left">
                        @endif
                        <img
                            @if ($glyph->spell == 50000)
                                src="{{ Vite::asset('resources/images/icons/spells/spell_nature_timestop.png') }}"
                            style="width: 24px; margin-right: 5px;"
                            data-toggle="tooltip" data-placement="top" data-title="{{ __('page_profile')['characters']['slow_and_steady'] }}"
                            class="float-left">
                        @endif
                        <img
                            @if ($glyph->spell == 50008)
                                src="{{ Vite::asset('resources/images/icons/spells/ability_dualwield.png') }}"
                            style="width: 24px; margin-right: 5px;"
                            data-toggle="tooltip" data-placement="top" data-title="{{ __('page_profile')['characters']['war_mode'] }}"
                            class="float-left">
                        @endif
                    @empty
                    @endforelse
                </td>
            </tr>
        @empty
        @endforelse
        </tbody>
    </table>

    @if ($message != '')
        <div class="text-gray2">
            <i class="fa fa-fw fa-info"></i> {{ $message }}
        </div>
    @endif
</div>
