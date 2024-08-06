<?php

namespace App\Livewire;

use App\Models\BanAppeal;
use Livewire\Attributes\On;
use Livewire\Component;

class ProfileBanAppeal extends Component
{
    public $user;
    public $newMessage;
    public $notifyDiscord = false;
    public $banAppealId;
    public $responseMessage;

    public function mount()
    {
        $this->user = \Auth::guard('account')->user();
    }

    public function getListeners()
    {
        return [
            "echo-private:" . config('database.redis.options.prefix') . "ban-appeal-profile-message.{$this->user->id},NewMessage" => 'notifyNewMessage'
        ];
    }

    public function submitMessage()
    {
        $this->validate([
            'newMessage' => 'required|string'
        ]);

        if ($this->user->latestBan()?->latestBanAppeal()) {
            if ($this->user->latestBan()->latestBanAppeal()->status == "pending") {
                $banAppealMessage = $this->user->latestBan()->latestBanAppeal()->messages()->create([
                    'message' => $this->newMessage,
                    'account_id' => $this->user->id
                ]);
            } else {
                $banAppeal = BanAppeal::create([
                    'account_id' => $this->user->id,
                    'ban_id' => $this->user->latestBan()->banid
                ]);


                if ($banAppeal) {
                    $this->banAppealId = $banAppeal->id;
                    $banAppealMessage = $banAppeal->messages()->create([
                        'account_id' => $this->user->id,
                        'message' => $this->newMessage
                    ]);

                    $this->notifyDiscord = true;
                } else {
                    $banAppealMessage = false;
                }
            }

            if ($banAppealMessage) {
                $this->reset('newMessage');
                $this->mount();
                $this->dispatch('messageSent');

            } else {
                $this->responseMessage = "error added commit";
            }
        } else {
            $banAppeal = BanAppeal::create([
                'account_id' => $this->user->id,
                'ban_id' => $this->user->latestBan()->banid
            ]);

            if ($banAppeal) {
                $this->banAppealId = $banAppeal->id;
                $banAppealMessage = $banAppeal->messages()->create([
                    'account_id' => $this->user->id,
                    'message' => $this->newMessage
                ]);

                $this->notifyDiscord = true;

                if ($banAppealMessage) {
                    $this->reset('newMessage');
                    $this->mount();
                    $this->dispatch('messageSent');
                } else {
                    $this->responseMessage = "error added commit";
                }
            } else {
                $this->responseMessage = "error added commit";
            }
        }

        if ($banAppealMessage) {
            $this->render();
        }

        if ($this->notifyDiscord) {
            /*$discordBanAppeal = BanAppeal::find($this->banAppealId);

            if ($discordBanAppeal) {
                //event(new ProcessDiscordNotifyBanAppeal($discordBanAppeal));
            }*/
        }
    }

    public function notifyNewMessage()
    {
        $this->render();
        $this->dispatch('messageSent');
    }

    #[On('setMessageZero')]
    public function readAllMessages()
    {
        $this->user->latestBan()->latestBanAppeal()->setSeenMessagesForPlayer();
    }

    public function render()
    {
        return view('livewire.profile-ban-appeal');
    }
}
