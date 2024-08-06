<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Models\ShopAppeal;
use Livewire\Attributes\On;
use Livewire\Component;
use Livewire\WithPagination;

class ShopAppealsTable extends Component
{
    use WithPagination;
    public $paginationNumber = 10;
    public $message;
    public $search = '';
    public $collapsedId = null;
    public $filter = 'all';
    public $playerSearch;
    protected $paginationTheme = 'bootstrap';

    public function readAllMessages($shopAppealId)
    {
        ShopAppeal::find($shopAppealId)->setSeenMessagesForGm();

        $this->collapsedId = $shopAppealId;
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

    public function goToPlayerHistory()
    {
        if (is_numeric($this->playerSearch)) {
            $user = Account::where('id', $this->playerSearch)->first();
        } else {
            $user = Account::where('username', $this->playerSearch)->first();
        }

        if ($user) {
            return redirect()->route('shop-history', ['accountId' => $user->id]);
        }
    }

    #[On('updateShopAppealTable')]
    public function render()
    {
        $query = ShopAppeal::query();

        if ($this->search != '') {
            $query->with(['account' => function ($q) {
                $q->where('username', 'LIKE', '%' . $this->search . '%');
            }]);
        }

        if ($this->filter !== 'all') {
            switch ($this->filter) {
                case "unread":
                    $query->where('status', 'pending')->whereHas('messages', function ($q) {
                        $q->where('seen', false)->where('support', false);
                    });
                    break;
                case "delivered":
                    $query->where('status', 'pending')->whereHas('messages', function ($q) {
                        $q->where('seen', false)->where('support', true);
                    });
                    break;
                default:
                    $query->where('status', $this->filter);
            }
        }

        $query->orderByRaw("CASE
            WHEN status = 'pending' THEN 1
            WHEN status = 'approved' THEN 2
            WHEN status = 'closed' THEN 3
            ELSE 4
        END")
            ->orderBy('updated_at', 'DESC');

        $shopAppeals = $query->paginate($this->paginationNumber)->withQueryString();
        $allShopAppeals = count(ShopAppeal::all());
        $allApprovedShopAppeals = count(ShopAppeal::where('status', 'approved')->get());
        $allClosedShopAppeals = count(ShopAppeal::where('status', 'closed')->get());
        $allUnreadMessages = ShopAppeal::where('status', 'pending')->get()->sum(function ($shopAppeal) {
            return $shopAppeal->getUnseenMessagesForSupport();
        });
        $allRespondedMessages = ShopAppeal::where('status', 'pending')->get()->sum(function ($shopAppeal) {
            return $shopAppeal->getUnseenMessagesForPlayer();
        });

        return view('livewire.shop-appeals-table', compact('shopAppeals', 'allShopAppeals', 'allApprovedShopAppeals', 'allClosedShopAppeals', 'allUnreadMessages', 'allRespondedMessages'));
    }
}
