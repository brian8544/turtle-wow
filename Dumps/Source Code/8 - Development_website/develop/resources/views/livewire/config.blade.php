<div class="container ucp pt-4 config" style="width: 100%">


        <div class="d-flex align-items-center justify-content-between">
            <h3 class="m-3 text-white">
                {{ __('world_config')['title'] }}
            </h3>
            <div class="d-flex justify-content-center">
                <div class="realm-selector">
                    @forelse ($realms as $key => $realm)

                    <div class="realm {{ $selectedRealm == $key ? 'active': '' }}" wire:click="setRealm('{{ $key }}')">{{ config('customs.realms')[$key]['name'] }}</div>
                    @empty
                    @endforelse

                </div>
            </div>
            <button class="btn btn-primary" type="button" style="border-radius: 20px;" wire:click="reloadConfig">
                <i class="fa fa-arrow-rotate-forward mr-1"></i>{{ __('world_config')['reload_config'] }}
            </button>
        </div>

    @if ($message)
        <div id="messageBox" class="alert alert-info mt-3 mb-5" style="display: block;">
            {{ $message }}
        </div>
    @endif


    <table class="table table-responsive text-dark-white">
            <tr>
                <th>{{ __('world_config')['table']['variable'] }}</th>
                <td>{{ __('world_config')['table']['value'] }}</td>
                <th>{{ __('world_config')['table']['info'] }}</th>
            </tr>
            @forelse($realms[$selectedRealm] as $key => $realm)
            <tr>
                <th>{{ $key }}</th>
                <td contenteditable="{{ $key !== 'realm_id' ? 'true' : 'false' }}" id="value-{{ $key }}">{{ $realm }}</td>
                <td contenteditable="false">{{ __('world_config')[$key] }}</td>
                <td>
                    <button class="btn btn-primary text-white" onclick="updateVariable('{{ $key }}', '{{ $realm }}')">{{ __('button')['save'] }}</button>
                </td>

            </tr>
            @empty
            @endforelse
        </table>

</div>

<script>
    function updateVariable(key, value) {
        let newValue = document.getElementById('value-' + key).innerText;
        if (newValue !== value) {
            Livewire.dispatch('updateVariable', { variable: key, value: newValue });
        }
    }
</script>
