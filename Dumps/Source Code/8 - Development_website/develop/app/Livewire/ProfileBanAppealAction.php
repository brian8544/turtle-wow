<?php

namespace App\Livewire;

use Livewire\Component;

class ProfileBanAppealAction extends Component
{
    public $user;
    public $button;
    public $unSeenMessages;
    public $showClosedButton = false;
    public $showPendingButton = false;
    public $showBanAppealButton = false;
    public $showApprovedButton = false;

    public function mount()
    {
        $this->user = \Auth::guard('account')->user();
    }

    public function readAllMessages()
    {
        $this->dispatch('setMessageZero');
        $this->seenMessages = 0;
        $this->render();
    }

    public function render()
    {
        return view('livewire.profile-ban-appeal-action');
    }
}
