<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Models\auth\AccountBanned;
use Livewire\Component;

class ResetFaCodeForm extends Component
{
    public $email;
    public $message = '';
    public $recoveryCode;
    public $showButton = true;

    public function updateFaCode()
    {
        $this->validate([
            'email' => 'required|email:rfc,dns',
            'recoveryCode' => 'required',
        ]);

        $user = Account::Where('email', $this->email)->where('recovery_code', $this->recoveryCode)->first();

        if ($user) {
            $user->disable2fa();
        }

        $this->showButton = false;

        $this->message = __('reset_2_fa_code_form')['message'];

    }
    public function render()
    {
        return view('livewire.reset-fa-code-form');
    }
}
