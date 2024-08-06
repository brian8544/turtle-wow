<?php

namespace App\Livewire;

use App\Models\BugTrackerMessage;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class EditComment extends Component
{
    protected $listeners = [
        'openModal'
    ];

    public $commentId;
    public $commentText;


    public function openModal($commentId)
    {
        $this->commentId = $commentId;
        $comment = BugTrackerMessage::find($this->commentId);
        $this->commentText = $comment->message;
    }

    public function save()
    {
        $user = Auth::guard('account')->user();
        if ($user->latestBan()?->active == 1) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        $comment = BugTrackerMessage::find($this->commentId);

        if ($user->rank < 2 && $comment->account_id != $user->id) {
            return;
        }

        $comment->message = $this->commentText;
        $comment->save();

        $this->dispatch('updateHistoryBugReport', type: 'editComment');

        $this->redirect(route('bug-report', ['id' => $comment->bug_tracker_id]));
    }

    public function render()
    {
        return view('livewire.edit-comment');
    }
}
