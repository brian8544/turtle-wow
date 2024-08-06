<?php

namespace App\Livewire;

use App\Models\BugTracker;
use App\Models\BugTrackerCategory;
use App\Models\BugTrackerMessage;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\On;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

class BugTrackerTable extends Component
{
    use WithPagination;

    public $paginationNumber = 20;
    public $message;
    #[Url]
    public $search = '';
    #[Url]
    public $filter = 'open';
    public $categories = [];
    public $orderBy = 'updated_at';
    public $isMyReports = false;
    #[Url(as: 'category')]
    public $selectedCategories = [];
    public $isMyThreads = false;

    protected $queryString = [
        'search' => ['except' => ''],
        'filter' => ['except' => 'open'],
        'orderBy' => ['except' => 'updated_at'],
        'paginationNumber' => ['except' => 20],
        'selectedCategoryId' => ['except' => null]
    ];

    protected $paginationTheme = 'bootstrap';

    public function setFilterByCategory($categoryId)
    {
        if ($categoryId === '0') {
            $this->selectedCategories = [];
        } elseif ($categoryId === 'none') {
            $this->selectedCategories = ['none'];
        } else {
            if (in_array($categoryId, $this->selectedCategories)) {
                $this->selectedCategories = array_diff($this->selectedCategories, [$categoryId]);
            } else {
                $this->selectedCategories[] = $categoryId;
            }
        }
        $this->resetPage();

    }


    public function mount()
    {
        $this->categories = BugTrackerCategory::all();
    }

    public function renderSearch()
    {
        $this->render();
    }

    public function setPaginationNumber($number)
    {
        $this->paginationNumber = $number;
        $this->render();

    }

    public function setFilter($filter)
    {
        $this->filter = $filter;
        $this->resetPage();
    }

    public function setOrderBy($orderBy)
    {
        $this->orderBy = $orderBy;
        $this->render();
    }

    public function myReports()
    {
        $this->isMyReports = !$this->isMyReports;
        $this->isMyThreads = false;
        $this->render();
    }

    public function myThreads()
    {
        $this->isMyThreads = !$this->isMyThreads;
        $this->isMyReports = false;
        $this->render();
    }

    #[On('updateBugTrackerTable')]
    public function render()
    {
        $query = BugTracker::query();

        if ($this->isMyReports) {
            $query->where('account_id', Auth::guard('account')->user()->id);
        }

        if ($this->isMyThreads) {
            $query->whereHas('messages', function ($q) {
                $q->where('account_id', Auth::guard('account')->user()->id);
            });
        }

        if ($this->search != '') {
            $query->where('author', 'LIKE', '%' . $this->search . '%')
                ->orWhere('title', 'LIKE', '%' . $this->search . '%')
                ->orWhere('description', 'LIKE', '%' . $this->search . '%');
        }

        switch ($this->filter) {
            case "closed":
                $query->whereHas('statuses', function ($q) {
                    $q->where('name_en', 'Closed');
                });
                break;
            case "open":
                $query->whereHas('statuses', function ($q) {
                    $q->where('name_en', 'Open');
                });
                break;
            case "all":
                break;
            default:
                $query->whereHas('statuses', function ($q) {
                    $q->where('name_en', 'Open');
                });
        }

        if (in_array('none', $this->selectedCategories)) {
            $query->whereDoesntHave('categories');
        } elseif (!empty($this->selectedCategories)) {
            $query->whereHas('categories', function ($q) {
                $q->whereIn('category_id', $this->selectedCategories);
            });
        }

        switch ($this->orderBy) {
            case "comments":
                $query->withCount('messages');
                $query->orderBy('messages_count', 'desc');
                break;
            case "votes":
                $query->withCount('votes');
                $query->orderBy('votes_count', 'desc');
                break;
            case "last_reply":
                $query->addSelect(['last_reply_at' => BugTrackerMessage::select('created_at')
                    ->whereColumn('bug_tracker_id', 'bug_tracker.id')
                    ->orderBy('created_at', 'desc')
                    ->limit(1)
                ]);
                $query->orderBy('last_reply_at', 'desc');
                break;
            default:
                $query->orderBy($this->orderBy, 'desc');
        }

        $bugTrackers = $query->paginate($this->paginationNumber)->withQueryString();

        return view('livewire.bug-tracker-table', compact('bugTrackers'));
    }
}
