<?php

namespace App\Livewire;

use App\Events\NewShopAppealMessage;
use App\Models\ShopAppeal;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class ShopAppealsModal extends Component
{
    public $shopAppeal;
    public $user;
    public $message;
    public $templateAnswer;
    public $responseMessage;
    public $supportComment;
    public $responseSupportCommentMessage;
    public $collapsedId;
    public $status = 'pending';

    protected $listeners = [
        'openModal'
    ];

    public function mount()
    {
        $this->user = Auth::guard('account')->user();
    }

    public function submit($action)
    {
        switch ($action) {
            case "submitComment":
                $this->submitComment();
                break;
            case "submitSupportComment":
                $this->submitSupportComment();
                break;
            case "close":
                $this->closeShopAppeal();
                break;
            case "closeAndCommit":
                $this->closeShopAppeal(true);
                break;
            case "approveShopAppeal":
                $this->approveShopAppeal(true);
                break;
        }
    }

    public function submitComment()
    {
        $this->validate([
            'message' => 'required|string'
        ]);

        $shopAppealMessage = ShopAppeal::find($this->shopAppeal->id)->messages()->create([
            'message' => $this->message,
            'account_id' => $this->user->id,
            'support' => true
        ]);

        if ($shopAppealMessage) {
            $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['message_sent'];

            $this->collapsedId = $this->shopAppeal->id;
            $this->reset('message');

            $this->readAllMessages();

            $this->render();

            $this->dispatch('updateShopAppealTable');

            broadcast(new NewShopAppealMessage($this->shopAppeal->account_id));
        } else {
            $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['sending_message'];
        }
    }

    public function submitSupportComment()
    {
        $this->validate([
            'supportComment' => 'required|string'
        ]);

        $supportComment = ShopAppeal::find($this->shopAppeal->id)->update([
            'support_comment' => $this->supportComment
        ]);

        if ($supportComment) {
            $this->responseSupportCommentMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['comment_added'];

            $this->collapsedId = $this->shopAppeal->id;
            $this->reset('supportComment');

            $this->readAllMessages();

            $this->render();

            $this->dispatch('updateShopAppealTable');
        } else {
            $this->responseSupportCommentMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['adding_gm_comment'];
        }
    }

    public function closeShopAppeal($message = false)
    {
        if ($message) {
            $this->validate([
                'message' => 'required|string'
            ]);

            $shopAppealMessage = ShopAppeal::find($this->shopAppeal->id)->messages()->create([
                'message' => $this->message,
                'account_id' => $this->user->id,
                'support' => true
            ]);

        }

        $shopAppeal = ShopAppeal::find($this->shopAppeal->id)->update([
            'status' => 'closed',
            'edited_by' => $this->user->id
        ]);

        if ($message) {
            if ($shopAppeal && $shopAppealMessage) {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['message_sent_and_closed_ban_appeal'];

                $this->collapsedId = $this->shopAppeal->id;

                $this->readAllMessages();

                $this->status = 'closed';

                $this->render();

                $this->dispatch('updateShopAppealTable');

                broadcast(new NewShopAppealMessage($this->shopAppeal->account_id));
            } else {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['sending_message_and_closing_ban_appeal'];
            }
        } else {
            if ($shopAppeal) {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['closed_ban_appeal'];

                $this->collapsedId = $this->shopAppeal->id;

                $this->readAllMessages();

                $this->status = 'closed';

                $this->render();

                $this->dispatch('updateShopAppealTable');
            } else {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['closing_ban_appeal'];
            }
        }
    }

    public function approveShopAppeal($message = false)
    {
        if ($message) {
            $this->validate([
                'message' => 'required|string'
            ]);

            $shopAppealMessage = ShopAppeal::find($this->shopAppeal->id)->messages()->create([
                'message' => $this->message,
                'account_id' => $this->user->id,
                'support' => true
            ]);

        }

        $shopAppeal = ShopAppeal::find($this->shopAppeal->id)->update([
            'status' => 'approved',
            'edited_by' => $this->user->id
        ]);

        if ($message) {
            if ($shopAppeal && $shopAppealMessage) {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['message_sent_and_closed_ban_appeal'];

                $this->collapsedId = $this->shopAppeal->id;

                $this->readAllMessages();

                $this->status = 'approved';

                $this->render();

                $this->dispatch('updateShopAppealTable');

                broadcast(new NewShopAppealMessage($this->shopAppeal->account_id));
            } else {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['sending_message_and_closing_ban_appeal'];
            }
        } else {
            if ($shopAppeal) {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['success_messages']['closed_ban_appeal'];

                $this->collapsedId = $this->shopAppeal->id;

                $this->readAllMessages();

                $this->status = 'approved';

                $this->render();

                $this->dispatch('updateShopAppealTable');
            } else {
                $this->responseMessage = __('gm_ban_appeals_page')['gm_ban_appeals_modal']['error_messages']['closing_ban_appeal'];
            }
        }
    }

    public function openModal($shopAppealId)
    {
        $this->shopAppeal = ShopAppeal::find($shopAppealId);
        $this->supportComment = $this->shopAppeal->support_comment;
        $this->status = $this->shopAppeal->status;
        $this->collapsedId = $shopAppealId;
        $this->render();
    }

    public function readAllmessages()
    {
        ShopAppeal::find($this->shopAppeal->id)->setSeenMessagesForSupport();

        $this->collapsedId = $this->shopAppeal->id;
    }

    public function changeAnswer()
    {
        $this->message = $this->templateAnswer;
    }
    public function render()
    {
        return view('livewire.shop-appeals-modal');
    }
}
