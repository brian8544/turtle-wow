<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Models\auth\ShopCoinsHistory;
use App\Models\auth\ShopLog;
use Livewire\Component;

class ShopHistoryTable extends Component
{
    public $accountId;
    public $username;
    public $selectedRealm = 0;
    public $balance = 0;
    public $foundUsername = false;
    public $foundAccountId = false;

    public function mount()
    {
        if ($this->accountId != null) {

            $this->foundAccountId = true;

            $account = Account::where('id', $this->accountId)->first();

            if (!$account) {
                return redirect()->route('home');
            }

            $this->username = $account->username;
            $this->balance = $account->coins;
        }

        if ($this->username != null)
        {
            $this->foundUsername = true;

            $account = Account::where('username', $this->username)->first();

            if (!$account) {
                return redirect()->route('home');
            }

            $this->accountId = $account->id;
            $this->balance = $account->coins;
        }

        if (!$this->username && !$this->accountId) {
            return redirect()->route('home');
        }

        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['id']) {
                $this->selectedRealm = $key;
                break;
            }
        }
    }

    public function setRealm($realmId)
    {
        $this->selectedRealm = $realmId;
        $this->render();
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
        return view('livewire.shop-history-table', compact('paymentHistory', 'shopLogs'));
    }
}
