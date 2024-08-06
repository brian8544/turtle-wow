<div class="col-lg-12">
    <a href="{{ route('shop-appeals') }}"><i
            class="fa fa-fw fa-arrow-left"></i> {{ __('shop_history_page')['back_to_list'] }}
    </a>

    <a class="small m-3" href="">
        <i class="fa fa-fw fa-refresh"></i> {{ __('shop_history_page')['refresh'] }}
    </a>

    <h3 class="m-3 text-white">{{ __('shop_history_page')['title'] }} (Username: {{ $username }}, Balance: {{ $balance }})</h3>

    <table class="table text-white">
        <thead>
        <tr>
            <th>#</th>

            <th>{{ __('shop_history_page')['table_headers']['points'] }}</th>
            <th>{{ __('shop_history_page')['table_headers']['actual_points'] }}</th>
            <th>{{ __('shop_history_page')['table_headers']['new_points'] }}</th>
            <th>{{ __('shop_history_page')['table_headers']['type'] }}</th>
            <th>{{ __('shop_history_page')['table_headers']['system'] }}</th>
            <th>{{ __('shop_history_page')['table_headers']['reference'] }}</th>
            <th>{{ __('shop_history_page')['table_headers']['date'] }}</th>

        </tr>
        </thead>
        <tbody>
        @forelse($paymentHistory as $singlePaymentHistory)
            <tr>
                <td>{{ $singlePaymentHistory->id }}</td>
                <td>{{ $singlePaymentHistory->points }}</td>
                <td>{{ $singlePaymentHistory->actual_points }}</td>
                <td>{{ $singlePaymentHistory->new_points }}</td>
                <td>{{ $singlePaymentHistory->type }}</td>
                <td>{{ $singlePaymentHistory->system }}</td>
                <td>{{ $singlePaymentHistory->reference }}</td>
                <td>{{ date('H:i:s d/m/Y', strtotime($singlePaymentHistory->date)) }}</td>
            </tr>
        @empty
        @endforelse
        </tbody>
    </table>

    <div class="w-100 d-flex justify-content-center mt-5">
        <div class="realm-selector">
            <div class="d-flex justify-content-center">
                @forelse(config('customs.realms') as $key => $realm)
                    @if ($realm['id'])
                        <div class="realm {{ $selectedRealm == $key ? 'active': '' }}" onclick="selectRealm(this)" wire:click="setRealm('{{ $key }}')">{{ $realm['name'] }}</div>
                    @endif
                @empty
                @endforelse
            </div>
            <div class="mt-3">
                <table class="table text-white">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>{{ __('shop_history_page')['table_headers']['time'] }}</th>
                        <th>{{ __('shop_history_page')['table_headers']['guid'] }}</th>
                        <th>{{ __('shop_history_page')['table_headers']['item'] }}</th>
                        <th>{{ __('shop_history_page')['table_headers']['price'] }}</th>
                        <th>{{ __('shop_history_page')['table_headers']['type'] }}</th>
                        <th>{{ __('shop_history_page')['table_headers']['refunded'] }}</th>
                        <th>{{ __('shop_history_page')['table_headers']['actions'] }}</th>

                    </tr>
                    </thead>
                    <tbody>
                    @forelse($shopLogs as $shopLog)
                        <tr>
                            <td>{{ $shopLog->id }}</td>
                            <td>{{ date('H:i:s d/m/Y', strtotime($shopLog->time)) }}</td>
                            <td>{{ $shopLog->guid }}</td>
                            <td>{{ $shopLog->item }}</td>
                            <td>{{ $shopLog->price }}</td>
                            <td>1</td>
                            <td>{{ $shopLog->refunded }}</td>
                            <td><a>{{ __('button')['refund'] }}</a></td>
                        </tr>
                    @empty
                    @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
