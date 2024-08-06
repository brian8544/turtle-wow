<?php

namespace App\Livewire;

use App\Events\NewMessage;
use App\Models\BanAppeal;
use Livewire\Component;

class GmBanAppealModal extends Component

{
    protected $listeners = [
        'openModal'
    ];

    public $banAppeal;
    public $user;
    public $message;
    public $templateAnswer;
    public $responseMessage;
    public $gmComment;
    public $banReason;
    public $responseBanReasonMessage;
    public $responseGmCommentMessage;
    public $responseBanDurationMessage;
    public $changeBanDuration;

    public function mount()
    {
        $this->user = \Auth::guard('account')->user();
    }

    public function submit($action)
    {
        switch ($action) {
            case "submitComment":
                $this->submitComment();
                break;
            case "submitGmComment":
                $this->submitGmComment();
                break;
            case "unbanAccount":
                $this->unbanAccount();
                break;
            case "close":
                $this->closeBanAppeal(false);
                break;
            case "closeAndCommit":
                $this->closeBanAppeal(true);
                break;
            case "submitBanReason":
                $this->submitBanReason();
                break;
        }
    }

    public function submitComment()
    {
        $this->validate([
            'message' => 'required|string'
        ]);

        $banAppealMessage = BanAppeal::find($this->banAppeal->id)->messages()->create([
            'message' => $this->message,
            'account_id' => $this->user->id,
            'support' => true
        ]);

        if ($banAppealMessage) {
            $this->responseMessage =  __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['message_sent'];

            $this->collapsedId = $this->banAppeal->id;

            $this->reset('message');

            $this->readAllMessages();

            $this->render();

            $this->dispatch('updateBanAppealTable');

            broadcast(new NewMessage($this->banAppeal->account_id));
        } else {
            $this->responseMessage =  __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['sending_message'];
        }
    }

    public function submitGmComment()
    {
        $this->validate([
            'gmComment' => 'required|string'
        ]);

        $gmComment = BanAppeal::find($this->banAppeal->id)->update([
            'gms_comment' => $this->gmComment
        ]);

        if ($gmComment) {
            $this->responseGmCommentMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['comment_added'];

            $this->collapsedId = $this->banAppeal->id;

            $this->readAllMessages();

            $this->render();

            $this->dispatch('updateBanAppealTable');
        } else {
            $this->responseGmCommentMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['adding_gm_comment'];
        }
    }

    public function unbanAccount()
    {
        $this->validate([
            'message' => 'required|string'
        ]);

        $banAppeal = BanAppeal::find($this->banAppeal->id);

        $unbanAppeal = $banAppeal->update([
            'status' => 'approved',
            'edited_by' => $this->user->id
        ]);

        $unban = $banAppeal->ban->update([
            'active' => 0
        ]);

        $banAppealMessage = BanAppeal::find($this->banAppeal->id)->messages()->create([
            'message' => $this->message,
            'account_id' => $this->user->id,
            'support' => true
        ]);


        if ($unban && $unbanAppeal && $banAppealMessage) {
            $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['message_sent_and_unbanned_account'];

            $this->collapsedId = $this->banAppeal->id;

            $this->readAllMessages();

            $this->render();

            $this->dispatch('updateBanAppealTable');

            $banAppeal->setSeenMessagesForPlayer();
        } else {
            $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['sending_message_and_unban_account'];
        }
    }

    public function closeBanAppeal($message = false)
    {
        if ($message) {
            $this->validate([
                'message' => 'required|string'
            ]);

            $banAppealMessage = BanAppeal::find($this->banAppeal->id)->messages()->create([
                'message' => $this->message,
                'account_id' => $this->user->id,
                'support' => true
            ]);
        }
        $banAppeal = BanAppeal::find($this->banAppeal->id)->update([
            'status' => 'closed',
            'edited_by' => $this->user->id
        ]);

        if ($message) {
            if ($banAppeal && $banAppealMessage) {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['message_sent_and_closed_ban_appeal'];

                $this->collapsedId = $this->banAppeal->id;

                $this->readAllMessages();

                $this->render();

                $this->dispatch('updateBanAppealTable');

                broadcast(new NewMessage($this->banAppeal->account_id));
            } else {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['sending_message_and_closing_ban_appeal'];
            }
        } else {
            if ($banAppeal) {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['closed_ban_appeal'];

                $this->collapsedId = $this->banAppeal->id;

                $this->readAllMessages();

                $this->render();

                $this->dispatch('updateBanAppealTable');
            } else {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['closing_ban_appeal'];
            }
        }
    }

    public function reopenBanAppeal()
    {
        $banAppeal = BanAppeal::find($this->banAppeal->id)->update([
            'status' => 'pending',
            'edited_by' => \Auth::guard('account')->user()->id
        ]);

        if ($banAppeal) {
            $this->dispatchBrowserEvent('notify', ['message' => __('ban-appeal')['message']['success']['reopen'], 'type' => 'success', 'wait' => 5]);

            $this->collapsedId = $this->banAppeal->id;

            $this->readAllMessages();

            $this->render();

            $this->dispatch('updateBanAppealTable');
        } else {
            $this->dispatchBrowserEvent('notify', ['message' => __('ban-appeal')['message']['error']['reopen'], 'type' => 'error', 'wait' => 5]);
        }
    }

    public function submitBanReason()
    {
        $this->validate([
            'banReason' => 'required|string'
        ]);

        $banAppeal = BanAppeal::find($this->banAppeal->id);

        $banReason = $banAppeal->ban->update([
            'banreason' => $this->banReason
        ]);

        if ($banReason) {
            $this->responseBanReasonMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['edited_ban_reason'];

            $this->collapsedId = $this->banAppeal->id;

            $this->readAllMessages();

            $this->render();

            $this->dispatch('updateBanAppealTable');
        } else {
            $this->responseBanReasonMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['editing_ban_reason'];
        }
    }

    public function readAllMessages()
    {
        BanAppeal::find($this->banAppeal->id)->setSeenMessagesForGm();

        $this->collapsedId = $this->banAppeal->id;
    }

    public function changeAnswer()
    {
        $this->message = $this->templateAnswer;
    }

    public function openModal($banAppealId)
    {
        $this->banAppeal = BanAppeal::find($banAppealId);

        if (!$this->banAppeal->ban) {
            BanAppeal::find($this->banAppeal->id)->delete();
        }
        $this->gmComment = $this->banAppeal->gms_comment;
        $this->banReason = $this->banAppeal->ban ? $this->banAppeal->ban->banreason : '';
        $this->render();
    }

    public function modifyBanDuration()
    {
        $this->validate([
            'changeBanDuration' => 'required|numeric|not_in:0'
        ]);

        $now = date('U');
        $newDuration = $now + $this->changeBanDuration;

        $banAppeal = BanAppeal::find($this->banAppeal->id);

        $changeBanDuration = $banAppeal->ban->update([
            'unbandate' => $newDuration
        ]);

        if ($changeBanDuration) {
            $this->responseBanDurationMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['edited_ban_duration'];

            $this->collapsedId = $this->banAppeal->id;

            $this->readAllMessages();

            $this->render();

            $this->dispatch('updateBanAppealTable');
        } else {
            $this->responseBanDurationMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['editing_ban_duration'];
        }
    }

    public function render()
    {
        return view('livewire.gm-ban-appeal-modal');
    }
}
