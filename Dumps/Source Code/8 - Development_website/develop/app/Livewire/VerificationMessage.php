<?php

namespace App\Livewire;

use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class VerificationMessage extends Component
{
    public $buttonDisable = false;

    public function resendVerification()
    {
        if (!$this->buttonDisable) {
            $this->js("alert('".__('header')['verification_email_resent']."')");
            $user = Auth::guard('account')->user();

            if ($user) {
                $user->sendEmailVerificationNotification(false);

                $this->buttonDisable = true;
            }
        }
    }
    public function render()
    {
        return view('livewire.verification-message');
    }
}
