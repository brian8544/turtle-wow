<?php

namespace App\Livewire;

use App\Models\characters\Character;
use App\Rules\CurrentEmail;
use App\Rules\CurrentPassword;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class ProfileDeleteAccountModal extends Component
{
    public $confirmationCheckbox = false;
    public $email;
    public $password;
    public $characters = 0;
    public $characterMessage = '';

    public function deleteAccount()
    {
        $this->characterMessage = '';
        $this->validate([
            'email' => ['required', 'email:rfc,dns', new CurrentEmail],
            'password' =>  ['required', new CurrentPassword],
        ]);

        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['replication']) {
                $characters = new Character;

                $characters->setConnection($realm['replication']);

                $this->characters += $characters->select('name')
                    ->where('account', Auth::guard('account')->user()->id)
                    ->where('deleteInfos_Name', null)
                    ->count();
            }
        }

        if ($this->characters > 0) {
            $this->characterMessage = __('page_profile')['overview']['message']['left_characters'];
        } else {
            $user = Auth::guard('account')->user()->update(['active' => 0]);

            if ($user) {
                Auth::guard('account')->logout();

                return redirect()->route('home');
            }
        }
    }

    public function render()
    {
        return view('livewire.profile-delete-account-modal');
    }
}
