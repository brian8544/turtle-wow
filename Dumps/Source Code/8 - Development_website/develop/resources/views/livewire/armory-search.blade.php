<div ui-view="main" class="ng-scope mb-5 pb-5">
    <div class="turtlep title d-flex justify-content-center" style="cursor: pointer;">
        <img src="{{ Vite::asset('resources/images/armory/armory.png') }}">
    </div>

    <div class="w-100 d-flex justify-content-center">
        <div class="realm-selector flex-row">
            @forelse(config('customs.realms') as $key => $realm)
                @if ($realm['id'])
                    <div class="realm {{ $selectedRealm == $key ? 'active': '' }}" wire:click="setRealm('{{ $key }}')">{{ $realm['name'] }}</div>
                @endif
            @empty
            @endforelse
        </div>
    </div>

    <div class="container ng-scope mb-5">

        <div class="row">
            <div class="col-lg-12">


                <div class="search center-block">


                        <input type="text" class="searchfield"
                               id="searchCharacter"
                               placeholder="Search for turtles..."
                               wire:model.live.debounce.800ms="searchCharacter">
                        <div wire:loading.delay>
                            @livewire('loader-component')
                        </div>
                        <table class="table table-striped">
                            @if ($searchResults)
                                @if ($searchResults->count() > 0)
                                    @forelse ($searchResults as $result)
                                        <tr>
                                            <td class="text-left" colspan="2" style="width: 60%">
                                                <a href="{{ route('armory.character', ['realmName' => $realmName, 'name' => $result->name]) }}" class="result">
                                                    <img class="classIconSmall" src="{{ Vite::asset('resources/images/armory/' . $result->classIcon . '.png') }}">
                                                    <span class="{{ $result->className }}">{{ $result->name }}</span>,
                                                    {{ $result->level }}
                                                    {{ $result->raceName }}
                                                    <img class="classIconSmall" src="{{ Vite::asset('resources/images/armory/' . $result->faction . '.png') }}">
                                                </a>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td class="text-center" colspan="2">
                                                <span class="text-danger">No turtles found.</span>
                                            </td>
                                        </tr>
                                    @endforelse
                                @else
                                    <tr>
                                        <td class="text-center" colspan="2">
                                            <span class="text-danger">No turtles found.</span>
                                        </td>
                                    </tr>
                                @endif
                            @endif
                        </table>


                </div>

            </div>
        </div>

    </div>
</div>
