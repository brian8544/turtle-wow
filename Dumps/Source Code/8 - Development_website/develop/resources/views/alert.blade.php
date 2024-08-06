@dynamicContent('alert')
SERVERALERT:<html><body>
@sectionContent('serveralert.' . config('app.web_env'))
@if (config('app.web_env') == 'CN')
    @forelse($realms as $realm)
        <p align="left">{{ $realm['name'] }}:
            @if ($realm['online'])
                @if ($realm['online_players'] > 6000)
                    {{ __('serveralert')['population']['high'] }}
                @elseif ($realm['online_players'] >= 3000)
                    {{ __('serveralert')['population']['medium'] }}
                @elseif ($realm['online_players'] > 0)
                    {{ __('serveralert')['population']['low'] }}
                @endif
                @if ($realm['queue'] >= 1000)
                    {{ __('serveralert')['queue']['high'] }}
                @elseif ($realm['queue'] >= 200)
                    {{ __('serveralert')['queue']['medium'] }}
                @elseif ($realm['queue'] > 0)
                    {{ __('serveralert')['queue']['low'] }}
                @endif
            @else
                {{ __('serveralert')['offline'] }}
            @endif
        </p>
    @empty
    @endforelse
@endif
@if (config('app.web_env') == 'EN')
    @forelse($realms as $key => $realm)
        <p align="left">{{ $realm['name'] }}: |cff8dc63fONLINE|r</p>
        <p align="left">Players in the world: {{ $realm['online_players'] }}</p>
        @if ($key == 1)
            <p align="left">Default rates: x1.0, optional: x0.5</p>
        @else
            <p align="left">Default rates: x2.0, optional: x1.0</p>
        @endif
        <p align="left">Uptime: {{ $realm['uptime']['days'] }} days, {{ $realm['uptime']['hours'] }} hours, {{ $realm['uptime']['minutes']}} minutes</p><br/>
    @empty
    @endforelse
@endif
</body></html>
