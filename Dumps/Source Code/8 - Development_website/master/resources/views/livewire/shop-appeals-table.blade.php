<div class="container ucp" style="padding: 0; width: 100%">
    <h3 class="m-3 text-white">
        {{ __('shop_appeals_page')['title'] }}
    </h3>

    <div class="text-gray" style="font-size: 1.3rem">
        <a class="small m-3" wire:click="setFilter('all')"> <i class="fa fa-fw fa-list" style='color: #1ce598'></i>
            {{ __('shop_appeals_page')['filter_labels']['all'] }}: {{ $allShopAppeals }}</a>
        <a class="small m-3" wire:click="setFilter('approved')"> <i class="fa fa-fw text-green fa-check-circle"></i>
            {{ __('shop_appeals_page')['filter_labels']['approved'] }}: {{ $allApprovedShopAppeals }}</a>
        <a class="small m-3" wire:click="setFilter('closed')"> <i class="fa fa-fw fa-times" style="color: #e52d1c;"></i>
            {{ __('shop_appeals_page')['filter_labels']['closed'] }}: {{ $allClosedShopAppeals }}</a>
        <a class="small m-3" wire:click="setFilter('unread')"> <i class="fa fa-fw fa-envelope"
                                                                  style='color: #1ca9e5'></i>
            {{ __('shop_appeals_page')['filter_labels']['unread'] }}: {{ $allUnreadMessages }}</a>
        <a class="small m-3" wire:click="setFilter('delivered')"> <i class="fa fa-fw fa-check-square"
                                                                     style='color: #e5b51c'></i>
            {{ __('shop_appeals_page')['filter_labels']['delivered'] }}: {{ $allRespondedMessages }}</a>
    </div>

    <div class="fa-pull-right">
        <a class="small m-3" href=""> <i
                class="fa fa-fw fa-refresh text-green mb-3"></i> {{ __('shop_appeals_page')['refresh'] }}</a>
    </div>
    <div class="player-search-container mt-4">
        <h5 class="mb-3 mt-3 text-white">{{ __('shop_appeals_page')['go_to_players_shop_history'] }}</h5>
        <div class="input-group mb-3">
            <input type="text" class="form-control" wire:model="playerSearch" name="playerSearch"
                   placeholder="{{ __('shop_appeals_page')['enter_id_or_username'] }}" aria-label="Player Search"
                   aria-describedby="player-search-addon">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" wire:click="goToPlayerHistory"><i class="fa fa-user"></i>
                    {{ __('shop_appeals_page')['go'] }}
                </button>
            </div>
        </div>
    </div>
    <div class="input-group mb-3 mt-3">
        <input type="text" class="form-control" wire:model="search" name="search"
               placeholder="{{ __('shop_appeals_page')['search'] }}" aria-label="Search"
               aria-describedby="basic-addon2">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" wire:click="renderSearch"><i
                    class="fa fa-search"></i></button>
        </div>
    </div>

    <table class="table-responsive text-white">
        <thead>
        <tr>
            <th>#</th>
            <th>{{ __('shop_appeals_page')['table_headers']['account'] }}</th>
            <th>{{ __('shop_appeals_page')['table_headers']['message'] }}</th>
            <th>{{ __('shop_appeals_page')['table_headers']['date'] }}</th>
            <th>{{ __('shop_appeals_page')['table_headers']['status'] }}</th>
            <th>{{ __('shop_appeals_page')['table_headers']['actions'] }}</th>
        </tr>
        </thead>
        <tbody>
        @forelse ($shopAppeals as $shopAppeal)
            @if ($shopAppeal->account)
                @php
                    $unseenMessages = $shopAppeal->getUnseenMessagesForSupport();
                    $playerUnseenMessages = $shopAppeal->getUnseenMessagesForPlayer();
                @endphp
                <tr>
                    <td class="text-muted small">{{ $shopAppeal->id }}</td>
                    <td>{{ optional($shopAppeal->account)->username }}</td>
                    @forelse ($shopAppeal->messages->take(-1) as $message)
                        <td>
                            <small class="text-gray">{{ $message->created_at->format('H:i:s d/m/Y') }}</small>
                            <br>
                            <span
                                class="{{ $message->support ?  'text-green' : 'text-white' }}">{{ $message->message }}</span>
                        </td>
                    @empty
                    @endforelse
                    <td>{{ $shopAppeal->created_at->format('H:i:s d/m/Y') }}</td>
                    <td>
                        @if ($shopAppeal)
                            @switch ($shopAppeal->status)
                                @case('pending')
                                    @if ($unseenMessages > 0)
                                        <span style="color: #1ca9e5">
                                            {{ __('custom.shop_appeal_unseen_messages', ['count' => $unseenMessages]) }}
                                        </span>
                                    @elseif ($playerUnseenMessages > 0)
                                        <span style="color: #e5b51c">
                                            {{ __('custom.shop_appeal_delivered_messages', ['count' => $playerUnseenMessages]) }}
                                        </span>
                                    @elseif ($shopAppeal->editedBy)
                                        <span
                                            style="color: #e5b51c">{{ __('shop_appeals_page')['responded_by'] }} {{ $shopAppeal->editedBy->username }}</span>
                                    @else
                                        <span style="color: #1ca9e5">{{ __('shop_appeals_page')['pending'] }}</span>
                                    @endif
                                    @break
                                @case('closed')
                                    <span style="color: #e52d1c">{{ __('shop_appeals_page')['closed'] }}</span>
                                    @break
                                @case('approved')
                                    <span class="text-green">{{ __('shop_appeals_page')['refunded'] }}</span>
                                    @break
                            @endswitch
                        @endif
                    </td>
                    <td>
                        <a class="green-btn" data-bs-toggle="modal"
                           data-bs-target="#shopAppealRespondModal" style="background: grey"
                           wire:click="$dispatchTo('shop-appeals-modal', 'openModal', { shopAppealId: {{ $shopAppeal->id }} })">
                            <span>{{ __('shop_appeals_page')['respond'] }}</span>
                        </a>
                    </td>
                </tr>
            @endif
        @empty
        @endforelse
        </tbody>
    </table>
    <div class="my-custom-pagination mt-2">
        {{ $shopAppeals->links() }}
    </div>
</div>
