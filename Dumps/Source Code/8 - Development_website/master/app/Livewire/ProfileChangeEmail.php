<?php

namespace App\Livewire;

use App\Rules\CheckEmail;
use App\Rules\CurrentEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Livewire\Component;

class ProfileChangeEmail extends Component
{
    public $currentEmail;
    public $newEmail;
    public $message = '';
    public $success = false;

    public function update()
    {
        $this->validate([
            'currentEmail' => ['required', 'email:rfc,dns', new CurrentEmail],
            'newEmail' => ['required', 'email:rfc,dns', Rule::unique('mysql2.account', 'email')->whereNot('email', request('currentEmail')), 'different:currentEmail', new CheckEmail],
        ]);

        $user = Auth::guard('account')->user();

        if ($user) {
            $user->sendEmailChangeNotification($this->newEmail);

            $this->reset();

            $this->success = true;

            $this->message = __('change_email_modal')['message']['success'];
        }
    }

    public function close()
    {
        $this->reset();
    }

    public function render()
    {
        return view('livewire.profile-change-email');
    }
}
