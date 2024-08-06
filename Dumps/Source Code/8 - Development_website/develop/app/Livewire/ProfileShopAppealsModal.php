<?php

namespace App\Livewire;

use App\Models\ShopAppeal;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class ProfileShopAppealsModal extends Component
{
    public $user;
    public $newMessage;
    public $notifyDiscord = false;
    public $shopAppealId;
    public $responseMessage;

    public function mount()
    {
        $this->user = Auth::guard('account')->user();
    }

    public function getListeners()
    {
        return [
            "echo-private:" . config('database.redis.options.prefix') . "shop-appeal-profile-message.{$this->user->id},NewMessage" => 'notifyNewMessage'
        ];
    }

    public function submitMessage()
    {
        $this->validate([
            'newMessage' => 'required|string'
        ]);

        if ($this->user->latestShopAppeal()) {
            if ($this->user->latestShopAppeal()->status == "pending") {
                $shopAppealMessage = $this->user->latestShopAppeal()->messages()->create([
                    'message' => $this->newMessage,
                    'account_id' => $this->user->id
                ]);
            } else {
                $shopAppeal = ShopAppeal::create([
                    'account_id' => $this->user->id,
                ]);

                if ($shopAppeal) {
                    $this->shopAppealId = $shopAppeal->id;
                    $shopAppealMessage = $shopAppeal->messages()->create([
                        'account_id' => $this->user->id,
                        'message' => $this->newMessage
                    ]);

                    $this->notifyDiscord = true;
                } else {
                    $shopAppealMessage = false;
                }

                if ($shopAppealMessage) {
                    $this->reset('newMessage');
                    $this->mount();
                    $this->dispatch('messageSent');
                } else {
                    $this->responseMessage = "An error occurred while sending the message.";
                }
            }
        } else {
            $shopAppeal = ShopAppeal::create([
                'account_id' => $this->user->id,
            ]);

            if ($shopAppeal) {
                $this->shopAppealId = $shopAppeal->id;
                $shopAppealMessage = $shopAppeal->messages()->create([
                    'account_id' => $this->user->id,
                    'message' => $this->newMessage
                ]);

                $this->notifyDiscord = true;

                if ($shopAppealMessage) {
                    $this->reset('newMessage');
                    $this->mount();
                    $this->dispatch('messageSent');
                } else {
                    $this->responseMessage = "An error occurred while sending the message.";
                }
            } else {
                $this->responseMessage = "An error occurred while sending the message.";
            }
        }

        if ($shopAppealMessage) {
            $this->render();
        }

        if ($this->notifyDiscord) {
            /*$discordShopAppeal = ShopAppeal::find($this->shopAppealId);

            if ($discordShopAppeal) {
                //event(new ProcessDiscordNotifyShopAppeal($discordShopAppeal));
            }*/
        }
    }
    public function render()
    {
        return view('livewire.profile-shop-appeals-modal');
    }
}
