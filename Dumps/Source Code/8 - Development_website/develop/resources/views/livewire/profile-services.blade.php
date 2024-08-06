@dynamicContent('profile')
<div class="tab-pane col-lg-7 mt-2 fade" id="services" role="tabpanel" aria-labelledby="profile-services" wire:ignore.self>
    @sectionContent('profile.services')
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
    <form wire:submit.prevent="unstuck" id="unstuck">
        <label class="text-white w-100">
            {{ __('page_profile')['services']['character'] }}
            <select class="form-control" wire:model="character">
                <option value="0">{{ __('page_profile')['services']['select_a_character'] }}</option>
                @forelse ($characters as $character)
                    <option value="{{ $character->guid }}">{{ $character->name }}</option>
                @empty
                @endforelse
            </select>
        </label>

        <label>&nbsp;</label><br>

        <button class="btn btn-sm btn-primary">
            <i class="fa fa-fw fa-check" wire:loading.remove></i>
            <i class="fa fa-fw fa-spin fa-spinner" wire:loading></i>
            {{ __('button')['unstuck'] }}
        </button>
        <br>
    </form>

    <div class="text-white">
        {{ $message }}
    </div>
</div>
