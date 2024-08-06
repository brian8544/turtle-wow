<?php

namespace App\Livewire;

use App\Models\auth\ShopCoinsHistory;
use App\Models\auth\ShopLog;
use App\Models\ShopAppeal;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class ProfilePaymentHistory extends Component
{
    public $selectedRealm = 0;
    public $balance = 0;
    public $accountId;
    public $user;

    public function mount()
    {
        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['id']) {
                $this->selectedRealm = $key;
                break;
            }
        }

        $this->user = Auth::guard('account')->user();

        $this->accountId = $this->user->id;
    }

    public function setRealm($realmId)
    {
        $this->selectedRealm = $realmId;
        $this->render();
    }

    public function readAllMessages($shopAppealId)
    {
        ShopAppeal::find($shopAppealId)->setSeenMessagesForPlayer();
    }

    public function render()
    {
        $shopLogs = [];
        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['id'] && $key == $this->selectedRealm) {
                $shopLogs = ShopLog::where('account', $this->accountId)->where('realm_id', $key)->orderBy('time', 'desc')->get();
            }
        }
        $paymentHistory = ShopCoinsHistory::where('account_id', $this->accountId)->orderBy('id', 'desc')->get();
        return view('livewire.profile-payment-history', compact('paymentHistory', 'shopLogs'));
    }
}
