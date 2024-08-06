<small class="hand mt-1">
    @switch (true)
        @case ($showClosedButton)
            @if ($unSeenMessages > 0)
                <span class="text-red hand">{{ __('page_profile')['overview']['denied_appeal'] }}</span>
                <br>
                <br>
                <span class="font-weight-bold">{{ __('custom.ban_appeal_unseen_messages', ['count' => $unSeenMessages]) }}</span>
                <br>
                <br>
                <a class="green-btn" data-bs-toggle="modal"
                   data-bs-target="#banAppealModal" style="background: grey" wire:click="readAllMessages">
                    <span class="orange-text">{{ __('page_profile')['overview']['check_message'] }}</span>
                </a>
            @else
                <br>
                <br>
                <a class="green-btn" data-bs-toggle="modal"
                   data-bs-target="#banAppealModal" style="background: grey">
                    <span class="orange-text">{{ __('page_profile')['overview']['check_ban_appeal'] }}</span>
                </a>
            @endif
            @break
        @case ($showPendingButton)
            @if ($unSeenMessages > 0)
                <br>
                <br>
                <span class="font-weight-bold">{{ __('custom.ban_appeal_unseen_messages', ['count' => $unSeenMessages]) }}</span>
                <br>
                <br>
                <a class="green-btn" data-bs-toggle="modal"
                   data-bs-target="#banAppealModal" style="background: grey" wire:click="readAllMessages">
                    <span class="orange-text">{{ __('page_profile')['overview']['check_message'] }}</span>
                </a>

            @else
                <br>
                <br>
                <a class="green-btn" data-bs-toggle="modal"
                   data-bs-target="#banAppealModal" style="background: grey">
                    <span class="orange-text">{{ __('page_profile')['overview']['check_ban_appeal'] }}</span>
                </a>
            @endif
            @break
        @case ($showBanAppealButton)
            <br>
            <span class="font-weight-bold"></span>
            <br>
            <a class="green-btn" data-bs-toggle="modal"
               data-bs-target="#banAppealModal" style="background: grey" @if ($unSeenMessages > 0) wire:click="readAllMessages" @endif>
                <span class="orange-text">{{ __('page_profile')['overview']['contact_support'] }}</span>
            </a>
            @break
        @case ($showApprovedButton)
            @if ($unSeenMessages > 0)
                <span class="text-green">{{ __('page_profile')['overview']['approved_appeal'] }}</span>
                <br>
                <br>
                <span class="font-weight-bold">{{ __('custom.ban_appeal_unseen_messages', ['count' => $unSeenMessages]) }}</span>
                <br>
                <br>
                <a class="green-btn" data-bs-toggle="modal"
                   data-bs-target="#banAppealModal" style="background: grey" wire:click="readAllMessages">
                    <span class="orange-text">{{ __('page_profile')['overview']['check_ban_appeal'] }}</span>
                </a>
                <br>
                <br>
            @endif
    @endswitch
</small>
