@include('layout.head')

@php
    $showBanAppealModel = false;
    $showBanAppealButton = false;
    $showPendingButton = false;
    $showClosedButton = false;
    $showApprovedButton = false;
    $showPermBan = false;
    $unbanDate = null;
    $showActive = false;
    $showRequestARefundButton = false;
    $showApprovedRefundButton = false;
    $showClosedRefundButton = false;
    if (config('customs.transfer.enabled')) {
        $accountOnline = \Auth::guard('account')->user()->online;
        $transferInProgress = \App\Models\auth\CharacterTransfer::where('source_account_id', \Auth::guard('account')->user()->id)->count() >= config('customs.transfer.account_level');
        $banned = \Auth::guard('account')->user()->latestBan()?->active == 1 ? true : false;
    }
@endphp

<body>


@include('layout.header')

<div class="section mb-5 ucp" id="pages">
    <div class="container-fluid pb-5">
        <div class="container-lg pt-5 pb-5">
            <div class="row p-5">
                <div class="col-lg-12">
                    <h2 class="orange-text mb-2 text-center">{{ __('page_profile')['title'] }}</h2>
                    @if (Session::has('success'))
                        <div class="text-center text-white">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="text-white text-center mt-4">

                        <img src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-3 mb-3 w-100">
                        <ul class="nav justify-content-center" id="tabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="text-white active" id="profile-overview" data-bs-toggle="tab"
                                   data-bs-target="#overview" type="button" role="tab" aria-controls="overview"
                                   aria-selected="true"><i
                                        class="fa fa-fw fa-search"></i>{{ __('page_profile')['overview']['title'] }}</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="text-white" id="profile-services" data-bs-toggle="tab"
                                   data-bs-target="#services" type="button" role="tab" aria-controls="services"
                                   aria-selected="false"><i
                                        class="fa fa-fw fa-server"></i>{{ __('page_profile')['services']['title'] }}</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="text-white" id="profile-characters" data-bs-toggle="tab"
                                   data-bs-target="#characters" type="button" role="tab" aria-controls="characters"
                                   aria-selected="false"><i
                                        class="fa fa-fw fa-user"></i>{{ __('page_profile')['characters']['title'] }}</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="text-white" id="profile-security" data-bs-toggle="tab"
                                   data-bs-target="#security" type="button" role="tab" aria-controls="security"
                                   aria-selected="false"><i
                                        class="fa fa-fw fa-key"></i>{{ __('page_profile')['security']['title'] }}</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="text-white" id="profile-history-shop" data-bs-toggle="tab"
                                   data-bs-target="#history" type="button" role="tab" aria-controls="history"
                                   aria-selected="false"><i
                                        class="fa fa-fw fa-coins"></i>{{ __('page_profile')['history']['title'] }}</a>
                            </li>
                            <img src="{{ Vite::asset('resources/images/footerline.png') }}" class="mt-3 mb-4 w-100">
                        </ul>
                        <div class="tab-content text-left" id="myTabContent">
                            <div class="tab-pane col-lg-7 mt-2 collapse show active" id="overview" role="tabpanel"
                                 aria-labelledby="profile-overview">
                                <h3 class="orange-text">{{ __('page_profile')['overview']['general_information'] }}</h3>
                                <table class="table">
                                    <tbody>
                                    <tr>
                                        <td class="col-lg-4 col-sm-6">
                                            <strong>{{ __('page_profile')['overview']['account_name'] }}</strong></td>
                                        <td class="col-lg-8 col-sm-6">{{ $user->username }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>{{ __('page_profile')['overview']['email'] }}</strong></td>
                                        <td>
                                            {{ $user->hiddenEmail() }}
                                            <BR>
                                            @if (Session::has('success'))
                                                <small class="text-green">{{ Session::get('success') }}</small>
                                            @endif
                                            @if (Session::has('error'))
                                                <small class="text-red">{{ Session::get('error') }}</small>
                                            @endif
                                            @if (!Session::has('success') && !Session::has('error') && config('customs.profile.change_email.enabled'))
                                                <a href="#" data-bs-toggle="modal" data-bs-target="#emailChange">
                                                    <span
                                                        class="hand mt-1 orange-text">{{ __('page_profile')['overview']['change_email'] }}</span>
                                                </a>
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>{{ __('page_profile')['overview']['account_status'] }}</strong></td>
                                        <td>
                                            @if ($user->latestShopAppeal())
                                                @switch($user->latestShopAppeal()->status)
                                                    @case ('pending')
                                                        @php
                                                            $showRequestARefundButton = true;
                                                        @endphp
                                                        @break
                                                    @case ('closed')
                                                        @php
                                                            $showClosedRefundButton = true;
                                                        @endphp
                                                        @break
                                                    @case ('approved')
                                                        @php
                                                            $showApprovedRefundButton = true;
                                                        @endphp
                                                        @break
                                                @endswitch
                                            @else
                                                @php
                                                    $showRequestARefundButton = true;
                                                @endphp
                                            @endif
                                            @if ($user->latestBan()?->latestBanAppeal())
                                                @php
                                                    $showBanAppealModel = true;
                                                @endphp
                                                @switch ($user->latestBan()->latestBanAppeal()->status)
                                                    @case ('pending')
                                                        @php
                                                            $showPendingButton = true;
                                                        @endphp
                                                        @break
                                                    @case ('closed')
                                                        @php
                                                            $showClosedButton = true;
                                                        @endphp
                                                        @break
                                                    @case ('approved')
                                                        @php
                                                            $showApprovedButton = true;
                                                            $showActive = true;
                                                        @endphp
                                                        @break
                                                @endswitch
                                            @endif
                                            @if ($user->latestBan())
                                                @php
                                                    $showBanAppealModel = true;
                                                @endphp
                                                @switch ($user->latestBan()->active)
                                                    @case (1)
                                                        @if ($user->latestBan()->unbandate == $user->latestBan()->bandate)
                                                            @php
                                                                $showPermBan = true;
                                                            @endphp
                                                        @else
                                                            @php
                                                                $unbanDate = Carbon\Carbon::createFromTimestamp($user->latestBan()->unbandate);
                                                            @endphp
                                                            @if (!$unbanDate || !$unbanDate->isFuture())
                                                                @php
                                                                    $showActive = true;
                                                                @endphp
                                                            @endif
                                                        @endif
                                                        @break
                                                    @case (0)
                                                        @php
                                                            $showActive = true;
                                                        @endphp
                                                        @break
                                                @endswitch
                                                @if (!$user->latestBan()->latestBanAppeal())
                                                    @php
                                                        $showBanAppealButton = true;
                                                    @endphp
                                                @endif
                                            @else
                                                @php
                                                    $showActive = true;
                                                @endphp
                                            @endif
                                            @if (!$showActive && ($showPermBan || ($unbanDate && $unbanDate->isFuture())))
                                                <span class="text-red hand">
                                                    @if ($showPermBan)
                                                        {{ __('page_profile')['overview']['permanent_ban'] }}
                                                    @else
                                                        {{ __('page_profile')['overview']['banned'] }} {{ $unbanDate->format('Y-m-d H:i') }}
                                                    @endif
                                                </span>
                                            @endif
                                            @php
                                                if ($showBanAppealModel && $user->latestBan()->latestBanAppeal()) {
                                                    $unSeenMessages = $user->latestBan()->latestBanAppeal()->getUnseenMessagesForPlayer();
                                                } else {
                                                    $unSeenMessages = 0;
                                                }
                                            @endphp
                                            @if ($showBanAppealModel)
                                                @livewire('profile-ban-appeal-action', ['button' => 'banAppeal',
                                                'unSeenMessages' => $unSeenMessages, 'showClosedButton' => $showClosedButton, 'showPendingButton' => $showPendingButton, 'showBanAppealButton' => $showBanAppealButton, 'showApprovedButton' => $showApprovedButton])
                                            @endif
                                            @if ($showApprovedButton || $showActive)
                                                <span
                                                    class="text-green">{{ __('page_profile')['overview']['active'] }}</span>
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>{{ __('page_profile')['overview']['creation_date'] }}</strong></td>
                                        <td>{{ $user->joindate->format('d/m/Y') }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>{{ __('page_profile')['overview']['last_login'] }}</strong></td>
                                        <td>{{ $user->last_login->format('d/m/Y @H:i:s') }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>{{ __('page_profile')['overview']['last_ip_address'] }}</strong>
                                        </td>
                                        <td>{{ $user->last_ip }}</td>
                                    </tr>
                                    @if ($user->forum_username)
                                        <tr>
                                            <td><strong>{{ __('page_profile')['overview']['forum_username'] }}</strong>
                                            </td>
                                            <td>
                                                {{ $user->forum_username }}
                                            </td>
                                        </tr>
                                    @endif
                                    <tr>
                                        <td><strong>{{ __('page_profile')['overview']['donation_tokens'] }}</strong>
                                        </td>
                                        <td>{{ $user->shopCoins?->coins }}
                                            <br>
                                            <a href="{{ route('donate') }}">
                                                <span class="mt-1 orange-text hand">
                                                {{ __('page_profile')['overview']['visit_donate_page'] }}
                                            </span>
                                            </a>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><strong>{{ __('page_profile')['overview']['newsletter'] }}</strong></td>
                                        <td>
                                            <label class="hand">
                                                @if ($user->hasSubscribed())
                                                    <a href="{{ route('unsubscribe', ['email' => $user->email]) }}"><i
                                                            class="fa fa-fw fa-check-square"></i></a>
                                                @else
                                                    <a href="{{ route('subscribe', ['email' => $user->email]) }}"><i
                                                            class="fa fa-fw fa-square"></i></a>
                                                @endif
                                            </label>
                                        </td>
                                    </tr>

                                   <tr>
                                        <td><strong>{{ __('page_profile')['overview']['delete_account'] }}</strong><br>
                                        </td>
                                        <td>
                                            @if (!$showActive && ($showPermBan || ($unbanDate && $unbanDate->isFuture())))
                                                <span
                                                    class="text-red hand">{{ __('page_profile')['overview']['cant_delete'] }}</span>
                                            @else
                                                <span class="text-warning">{{ __('page_profile')['overview']['action_is_permanent'] }}</span>
                                                <br>
                                                <a data-bs-toggle="modal"
                                                   data-bs-target="#deleteAccountModal">
                                                    <span class="hand mt-1 orange-text" >
                                                        {{ __('page_profile')['overview']['delete_account'] }}
                                                    </span>
                                                </a>
                                            @endif
                                        </td>
                                    </tr>

                                    @if (\Auth::guard('account')->user()->rank >= config('customs.transfer.account_level') && config('customs.transfer.enabled') && \Auth::guard('account')->user()->canInitTransfer())

                                        @if (!$accountOnline && !$transferInProgress)
                                            <tr>
                                                <td>
                                                    <strong>{{ __('transfer_account')['transfer_account'] }}</strong>
                                                    <br>
                                                </td>
                                                <td>
                                                    @if ($banned)
                                                        <span class="text-red hand">{{ __('transfer_account')['suspended'] }}</span>
                                                    @else
                                                        <small class="hand mt-1 orange-text" data-bs-target="#transferAccount" data-bs-toggle="modal">{{ __('transfer_account')['submit'] }}</small>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endif

                                        @if (!$accountOnline && $transferInProgress)
                                            <tr>
                                                <td>
                                                    <strong>{{ __('transfer_account')['transfer_account'] }}</strong>
                                                    <br>
                                                </td>
                                                <td>
                                                    @if ($banned)
                                                        <span class="text-red hand">{{ __('transfer_account')['suspended'] }}</span>
                                                    @else
                                                        <small class="hand mt-1 orange-text" data-bs-target="#transferAccount" data-bs-toggle="modal">{{ __('transfer_account')['check_progress'] }}</small>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endif

                                    @endif

                                    </tbody>
                                </table>

                            </div>
                            @livewire('profile-services')
                            @livewire('profile-characters')
                            @livewire('profile-change-password')
                            @livewire('profile-payment-history')

                        </div>
                    </div>
                </div>

            </div>


        </div>

    </div>
</div>

@if (config('customs.profile.change_email.enabled'))
    @livewire('profile-change-email')
@endif

@livewire('profile-ban-appeal')

@if (config('customs.shop_appeals.enabled'))
    @livewire('profile-shop-appeals-modal')
@endif

@if (\Auth::guard('account')->user()->rank >= config('customs.transfer.account_level') && config('customs.transfer.enabled'))
    @livewire('transfer-account-modal', ['userId' => Auth::guard('account')->user()->id, 'userOnline' => Auth::guard('account')->user()->online, 'userLatestBan' => Auth::guard('account')->user()->latestBan()?->active == 1, 'username' => Auth::guard('account')->user()->username])
@endif

@livewire('profile-delete-account-modal')

@include('layout.footer')

@include('layout.dependency')

@include('layout.script')

<script type="module">
    function switchToTabFromHash() {
        var hash = window.location.hash;
        if (hash) {
            var tabId = hash.substring(1);
            var tab = document.getElementById(tabId);
            if (tab) {
                tab.click();
            }
        }
    }

    window.addEventListener('load', switchToTabFromHash);
    Livewire.on('messageSent', () => {
        setTimeout(function () {
            scrollMessageHistoryToBottom();
        }, 100);
    });
    $(document).ready(function () {
        var maxCharacters = 1024;

        $('#newMessage, #newMessageShop').on('input', function () {
            var currentCharacters = $(this).val().length;
            var remainingCharacters = maxCharacters - currentCharacters;
            $(this).closest('form').find('.character-count').text(remainingCharacters);
        });
    });

    function scrollMessageHistoryToBottom() {
        var messageHistory = document.getElementById('messageHistory');
        var lastMessage = messageHistory.lastElementChild;

        if (lastMessage) {
            lastMessage.scrollIntoView();
        }
    }

    $('#banAppealModal').on('shown.bs.modal', function () {
        scrollMessageHistoryToBottom();
    });

    $('#profileShopAppealModal').on('shown.bs.modal', function () {
        scrollMessageHistoryToBottom();
    });
</script>

</body>

</html>
