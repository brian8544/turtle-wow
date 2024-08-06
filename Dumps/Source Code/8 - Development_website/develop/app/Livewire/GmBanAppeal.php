<?php

namespace App\Livewire;

use App\Models\auth\AccountBanned;
use App\Models\BanAppeal;
use Livewire\Attributes\On;
use Livewire\Component;
use Livewire\WithPagination;

class GmBanAppeal extends Component
{
    use WithPagination;

    public $paginationNumber = 10;

    public $message;
    public $gmComment;
    public $search = '';

    public $collapsedId = null;

    public $filter = 'all';

    protected $paginationTheme = 'bootstrap';

    public function readAllMessages($banAppealId)
    {
        BanAppeal::find($banAppealId)->setSeenMessagesForGm();

        $this->collapsedId = $banAppealId;
    }

    public function renderSearch()
    {
        $this->render();
    }

    public function setFilter($filter)
    {
        $this->filter = $filter;
        $this->resetPage();
    }

    #[On('updateBanAppealTable')]
    public function render()
    {
        /*$banAppealsToDelete = BanAppeal::all();
        foreach ($banAppealsToDelete as $banAppeal) {
            $banExists = AccountBanned::on('mysql2')->where('banid', $banAppeal->ban_id)->exists();
            if (!$banExists) {
                $banAppeal->delete();
            }
        }*/

        $query = BanAppeal::query();

        if ($this->search != '') {
            $query->with(['account' => function ($q) {
                $q->where('username', 'LIKE', '%' . $this->search . '%');
            }]);
        }

        $allUnreadMessages = $query->get()->sum(function ($banAppeal) {
            return $banAppeal->getUnseenMessagesForGm();
        });
        $allRespondedMessages = $query->get()->sum(function ($banAppeal) {
            return $banAppeal->getUnseenMessagesForPlayer();
        });

        if ($this->filter !== 'all') {
            switch ($this->filter) {
                case "unread":
                    $query->whereHas('messages', function ($q) {
                        $q->where('seen', false)->where('support', false);
                    });
                    break;
                case "delivered":
                    $query->whereHas('messages', function ($q) {
                        $q->where('seen', false)->where('support', true);
                    });
                    break;
                default:
                    $query->where('status', $this->filter);
            }
        }

        $query->orderBy('updated_at', 'DESC');

        $banAppeals = $query->paginate($this->paginationNumber)->withQueryString();
        $allBanAppeals = count(BanAppeal::all());
        $allApprovedBanAppeals = count(BanAppeal::where('status', 'approved')->get());
        $allClosedBanAppeals = count(BanAppeal::where('status', 'closed')->get());

        return view('livewire.gm-ban-appeal', compact('banAppeals', 'allBanAppeals', 'allApprovedBanAppeals', 'allClosedBanAppeals', 'allUnreadMessages', 'allRespondedMessages'));
    }
}
