<div class="container ucp" style="padding: 0; width: 100%">
    <h3 class="m-3 text-white">
        {{ __('gm_ban_appeals_page')['ban_appeals'] }}
    </h3>

    <div class="text-gray" style="font-size: 1.3rem">
        <a class="small m-3" wire:click="setFilter('all')"> <i class="fa fa-fw fa-list" style='color: #1ce598'></i>
            {{ __('gm_ban_appeals_page')['filter_labels']['all'] }}: {{ $allBanAppeals }}</a>
        <a class="small m-3" wire:click="setFilter('approved')"> <i class="fa fa-fw text-green fa-check-circle"></i>
            {{ __('gm_ban_appeals_page')['filter_labels']['approved'] }}: {{ $allApprovedBanAppeals }}</a>
        <a class="small m-3" wire:click="setFilter('closed')"> <i class="fa fa-fw fa-times" style="color: #e52d1c;"></i>
            {{ __('gm_ban_appeals_page')['filter_labels']['closed'] }}: {{ $allClosedBanAppeals }}</a>
        <a class="small m-3" wire:click="setFilter('unread')"> <i class="fa fa-fw fa-envelope" style='color: #1ca9e5'></i>
            {{ __('gm_ban_appeals_page')['filter_labels']['unread'] }}: {{ $allUnreadMessages }}</a>
        <a class="small m-3" wire:click="setFilter('delivered')"> <i class="fa fa-fw fa-check-square" style='color: #e5b51c'></i>
            {{ __('gm_ban_appeals_page')['filter_labels']['delivered'] }}: {{ $allRespondedMessages }}</a>
    </div>

    <div class="fa-pull-right">
        <a class="small m-3" href=""> <i class="fa fa-fw fa-refresh text-green mb-3"></i> {{ __('gm_ban_appeals_page')['refresh'] }}</a>
    </div>

    <div class="input-group mb-3 mt-3">
        <input type="text" class="form-control" wire:model="search" name="search" placeholder="{{ __('gm_ban_appeals_page')['search'] }}" aria-label="Search" aria-describedby="basic-addon2">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" wire:click="renderSearch"><i class="fa fa-search"></i></button>
        </div>
    </div>

    <table class="table-responsive text-white">
        <thead>
        <tr>
            <th>#</th>
            <th>{{ __('gm_ban_appeals_page')['table_headers']['account'] }}</th>
            <th>{{ __('gm_ban_appeals_page')['table_headers']['message'] }}</th>
            <th>{{ __('gm_ban_appeals_page')['table_headers']['ban_date'] }}</th>
            <th>{{ __('gm_ban_appeals_page')['table_headers']['by_reason'] }}</th>
            <th>{{ __('gm_ban_appeals_page')['table_headers']['date'] }}</th>
            <th>{{ __('gm_ban_appeals_page')['table_headers']['status'] }}</th>
            <th>{{ __('gm_ban_appeals_page')['table_headers']['actions'] }}</th>
        </tr>
        </thead>
        <tbody>
        @forelse ($banAppeals as $banAppeal)
            @if ($banAppeal->account)
                @php
                    $unseenMessages = $banAppeal->getUnseenMessagesForGm();
                    $playerUnseenMessages = $banAppeal->getUnseenMessagesForPlayer();
                @endphp
                <tr wire:key="{{ $banAppeal->id }}">
                    <td class="text-muted small">{{ $banAppeal->id }}</td>
                    <td class="small">{{ optional($banAppeal->account)->username }}</td>
                    @forelse ($banAppeal->messages->take(-1) as $message)
                        <td>
                            <small class="text-gray">{{ $message->created_at->format('H:i:s d/m/Y') }}</small>
                            <br>
                            <span class="{{ $message->support ?  'text-green' : 'text-white' }}">{!! $message->message !!}</span>
                        </td>
                    @empty
                    @endforelse
                    @if ($banAppeal->ban)
                        <td class="small">{{ $banAppeal->ban->unbandate == $banAppeal->ban->bandate ? __('gm_ban_appeals_page')['permanent'] : date('H:i:s d/m/y') }}</td>
                        <td class="small">
                            {{ $banAppeal->ban->bannedby ? : 'server' }}
                            <br>
                            <span class="text-gray">
                                {{ $banAppeal->ban->banreason }}
                            </span>
                        </td>
                    @else
                        <td class="small">Unknown</td>
                        <td class="small">
                            Unknown
                            <br>
                            <span class="text-gray">
                            Unknown
                        </span>
                        </td>
                    @endif
                    <td class="small">{{ $banAppeal->created_at->format('H:i:s d/m/Y') }}</td>
                    <td>
                        @if ($banAppeal)
                            @switch ($banAppeal->status)
                                @case('pending')
                                        @if ($unseenMessages > 0)
                                            <span style="color: #1ca9e5">
                                                {{ __('gm_ban_appeals_page')['unseen'] }} {{ $unseenMessages }} {{ __('gm_ban_appeals_page')['messages'] }}
                                            </span>
                                        @elseif ($playerUnseenMessages > 0)
                                            <span style="color: #e5b51c">
                                                {{ __('gm_ban_appeals_page')['delivered'] }} {{ $playerUnseenMessages }} {{ __('gm_ban_appeals_page')['messages'] }}
                                            </span>
                                        @elseif ($banAppeal->editedBy)
                                            <span style="color: #e5b51c">{{ __('gm_ban_appeals_page')['responded_by'] }} {{ $banAppeal->editedBy->username }}</span>
                                        @else
                                            <span style="color: #1ca9e5">{{ __('gm_ban_appeals_page')['pending'] }}</span>
                                        @endif
                                    @break
                                @case('closed')
                                    <span style="color: #e52d1c">{{ __('gm_ban_appeals_page')['closed'] }}</span>
                                    @break
                                @case('approved')
                                    <span class="text-green">{{ __('gm_ban_appeals_page')['unbanned'] }}</span>
                                    @break
                            @endswitch
                        @else
                            <span class="text-green">{{ __('gm_ban_appeals_page')['unbanned'] }}</span>
                        @endif
                    </td>
                    <td><a data-bs-toggle="modal"
                           data-bs-target="#banAppealRespondModal" style="background: grey" wire:click="$dispatchTo('gm-ban-appeal-modal', 'openModal', { banAppealId: {{ $banAppeal->id }} })">
                            <span>{{ __('gm_ban_appeals_page')['respond'] }}</span>
                        </a></td>
                </tr>
            @endif
        @empty
        @endforelse
        </tbody>
    </table>
    <div class="my-custom-pagination mt-2">
        {{ $banAppeals->links() }}
    </div>
</div>
