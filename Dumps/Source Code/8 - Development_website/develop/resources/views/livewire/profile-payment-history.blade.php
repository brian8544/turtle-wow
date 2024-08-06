<div class="col-lg-12 collapse" id="history" role="tabpanel"
     aria-labelledby="profile-history-shop" wire:ignore.self>
    @php
    $unseenMessages = 0;
    $shopAppealId = 0;
    if ($user->latestShopAppeal()) {
        $unseenMessages = $user->latestShopAppeal()->getUnseenMessagesForPlayer();
        $shopAppealId = $user->latestShopAppeal()->id;
    }
    @endphp
    <div>
        <div class="col-lg-12">
            <div class="d-flex justify-content-between">
                <h3 class="orange-text">{{ __('page_profile')['history']['title'] }}</h3>
                @if (config('customs.shop_appeals.enabled'))
                    <a data-bs-toggle="modal"
                       data-bs-target="#profileShopAppealModal" @if ($unseenMessages > 0) wire:click="readAllMessages({{ $shopAppealId }})" @endif>
                        <button class="btn btn-primary btn-parent">
                            <i class="fa fa-fw fa-hands-helping"></i>&nbsp;{{ __('button')['request_a_refund'] }}
                            @if ($unseenMessages > 0)
                                <span class="badge badge-danger">{{ $unseenMessages }}</span>
                            @endif
                        </button>
                    </a>
                @endif

            </div>

            <h5 class="text-white mt-5">{{ __('page_profile')['history']['redeem_history']['title'] }}</h5>
            <table class="table table-striped light-borders table-hover">
                <thead>
                <tr>
                    <th>{{ __('page_profile')['history']['redeem_history']['table_headers']['id'] }}</th>
                    <th>{{ __('shop_history_page')['table_headers']['points'] }}</th>
                    <th>{{ __('shop_history_page')['table_headers']['actual_points'] }}</th>
                    <th>{{ __('shop_history_page')['table_headers']['new_points'] }}</th>
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
                        <td>{{ $singlePaymentHistory->system }}</td>
                        <td>{{ $singlePaymentHistory->reference }}</td>
                        <td>{{ date('H:i:s d/m/Y', strtotime($singlePaymentHistory->date)) }}</td>
                    </tr>
                @empty
                @endforelse
                </tbody>
            </table>

            <h5 class="text-white mt-5">{{ __('page_profile')['history']['shop_log']['title'] }}</h5>

            <div class="d-flex">
                @forelse(config('customs.realms') as $key => $realm)
                    @if ($realm['id'])
                        <div class="realm {{ $selectedRealm == $key ? 'active': '' }}" onclick="selectRealm(this)"
                             wire:click="setRealm('{{ $key }}')">{{ $realm['name'] }}</div>
                    @endif
                @empty
                @endforelse
            </div>
            <table class="table table-striped light-borders table-hover">
                <thead>
                <tr>
                    <th>{{ __('page_profile')['history']['shop_log']['table_headers']['id'] }}</th>
                    <th>{{ __('shop_history_page')['table_headers']['time'] }}</th>
                    <th>{{ __('shop_history_page')['table_headers']['guid'] }}</th>
                    <th>{{ __('shop_history_page')['table_headers']['item'] }}</th>
                    <th>{{ __('shop_history_page')['table_headers']['price'] }}</th>
                    {{--<th>{{ __('shop_history_page')['table_headers']['type'] }}</th>--}}
                    <th>{{ __('shop_history_page')['table_headers']['refunded'] }}</th>
                    {{--<th>{{ __('shop_history_page')['table_headers']['actions'] }}</th>--}}
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
                        {{--<td>1</td>--}}
                        <td>{{ $shopLog->refunded }}</td>
                        {{--<td><a>{{ __('button')['refund'] }}</a></td>--}}
                    </tr>
                @empty
                @endforelse
                </tbody>
            </table>

            {{--<h5 class="text-white mt-5">{{ __('shop_appeals_page')['shop_appeals'] }}</h5>

            <table class="table light-borders table-hover">
                <thead>
                <tr>
                    <th>{{ __('shop_appeals_page')['table_headers']['status'] }}</th>
                    <th>{{ __('shop_history_page')['table_headers']['date'] }}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>closed</td>
                    <td>2.2.2022.</td>
                    <td><a>{{ __('shop_appeals_page')['chat_history'] }}</a></td>
                </tr>
                </tbody>
            </table>--}}
        </div>
    </div>
</div>
