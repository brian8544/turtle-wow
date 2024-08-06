<?php

namespace App\Livewire;

use App\Models\BugTracker;
use Illuminate\Support\Facades\Cache;
use Livewire\Component;

class LinkIssueForm extends Component
{
    public $forms = [];
    public $bugTrackerId;
    public $bugTracker;
    public $searchResults = [];
    public $openSearch = false;
    public $lastSearch = '';
    public $successMessage = '';



    public function mount()
    {
        if (!Cache::has('bug_reports')) {
            $bugReports = BugTracker::all()
                ->map(function ($bugTracker) {
                    return [
                        'id' => $bugTracker->id,
                        'title' => $bugTracker->title,
                        'status' => $bugTracker->statuses ? $bugTracker->statuses->name_en : null,
                        'color' => $bugTracker->statuses ? $bugTracker->statuses->color : null
                    ];
                })
                ->sortBy('status', SORT_REGULAR, true)
                ->values()
                ->toArray();

            Cache::forever('bug_reports', $bugReports);
        }

        $this->bugTracker = BugTracker::find($this->bugTrackerId);

        foreach ($this->bugTracker->linkedBugs as $linkedBug) {
            if ($linkedBug->linked_bug_tracker_id != $this->bugTrackerId) {
                $this->forms[] = ['type' => $linkedBug->pivot->type, 'search' => '#' . $linkedBug->id . ' ' . $linkedBug->title, 'bugTrackerId' => $linkedBug->id];
            }
        }

        if (empty($this->forms)) {
            $this->forms[] = ['type' => 'duplicated', 'search' => '', 'bugTrackerId' => ''];
        }
    }

    public function resetSearch()
    {
        $this->successMessage = '';
        $this->openSearch = false;
    }

    public function addForm()
    {
        $this->successMessage = '';
        $this->forms[] = ['type' => 'duplicated', 'search' => '', 'bugTrackerId' => ''];
    }

    public function searchBugReports($index)
    {
        foreach ($this->searchResults as $key => $value) {
            if ($key != $index) {
                $this->searchResults[$key] = [];
            }
        }

        $searchTerm = $this->forms[$index]['search'];

        if ($searchTerm == "") {
            return;
        }

        if ($searchTerm == $this->lastSearch) {
            $this->openSearch = true;
            return;
        }

        if (empty($searchTerm)) {
            $this->searchResults[$index] = [];
            $this->openSearch = false;

            return;
        }

        $this->lastSearch = $searchTerm;

        preg_match('/#(\d+)/', $searchTerm, $matches);
        $bugId = $matches[1] ?? null;

        if (Cache::has('bug_reports')) {
            $bugReports = Cache::get('bug_reports');

            if ($bugId) {
                $this->searchResults[$index] = collect($bugReports)
                    ->where('id', $bugId)
                    ->where('id', '!=', $this->bugTrackerId)
                    ->where('title', '!=', $this->bugTracker->title)
                    ->sortBy('status', SORT_REGULAR, true)
                    ->values();

                if (empty($this->searchResults[$index])) {
                    $this->openSearch = false;
                } else {
                    $this->openSearch = true;
                }

                return;
            }

            $this->searchResults[$index] = collect($bugReports)
                ->filter(function ($bugReport) use ($searchTerm) {
                    return str_contains(strtolower($bugReport['title']), strtolower($searchTerm));
                })
                ->where('id', '!=', $this->bugTrackerId)
                ->where('title', '!=', $this->bugTracker->title)
                ->sortBy('status', SORT_REGULAR, true)
                ->values();

            if (empty($this->searchResults[$index])) {
                $this->openSearch = false;
            } else {
                $this->openSearch = true;
            }
        } else {
            if ($bugId) {
                $this->searchResults[$index] = BugTracker::where('id', $bugId)
                    ->where('id', '!=', $this->bugTrackerId)
                    ->where('title', '!=', $this->bugTracker->title)
                    ->with('statuses')
                    ->get()
                    ->map(function ($bugTracker) {
                        return [
                            'id' => $bugTracker->id,
                            'title' => $bugTracker->title,
                            'status' => $bugTracker->statuses ? $bugTracker->statuses->name_en : null,
                            'color' => $bugTracker->statuses ? $bugTracker->statuses->color : '#929391'
                        ];
                    })
                    ->sortBy('status', SORT_REGULAR, true)
                    ->values()
                    ->toArray();

                if (empty($this->searchResults[$index])) {
                    $this->openSearch = false;
                } else {
                    $this->openSearch = true;
                }

                return;
            }

            $this->searchResults[$index] = BugTracker::where('title', 'like', '%' . $searchTerm . '%')
                ->where('id', '!=', $this->bugTrackerId)
                ->where('title', '!=', $this->bugTracker->title)
                ->orWhere('id', $searchTerm)
                ->with('statuses')
                ->get()
                ->map(function ($bugTracker) {
                    return [
                        'id' => $bugTracker->id,
                        'title' => $bugTracker->title,
                        'status' => $bugTracker->statuses ? $bugTracker->statuses->name_en : null,
                        'color' => $bugTracker->statuses ? $bugTracker->statuses->color : '#929391'
                    ];
                })
                ->sortBy('status', SORT_REGULAR, true)
                ->values()
                ->toArray();

            if (empty($this->searchResults[$index])) {
                $this->openSearch = false;
            } else {
                $this->openSearch = true;
            }
        }
    }

    public function selectBugReport($index, $bugTrackerId)
    {
        $this->openSearch = false;
        $selectedBug = BugTracker::find($bugTrackerId);
        $this->forms[$index]['bugTrackerId'] = $bugTrackerId;
        $this->forms[$index]['search'] = '#' . $selectedBug->id . ' ' . $selectedBug->title;
        $this->searchResults[$index] = [];
    }

    public function removeForm($index)
    {
        $this->successMessage = '';

        unset($this->forms[$index]);
        $this->forms = array_values($this->forms);
    }

    public function saveLinkedBugs()
    {
        $reportBugsToSync = [];

        foreach ($this->forms as $form) {
            if ($form['bugTrackerId'] != '' && $form['type'] != '') {
                if ($this->bugTracker->linkedBugs->contains($form['bugTrackerId'])) {
                    $reportBugsToSync[$form['bugTrackerId']] = ['type' => strtolower($form['type']), 'updated_at' => now()];
                } else {
                    $reportBugsToSync[$form['bugTrackerId']] = ['type' => strtolower($form['type']), 'created_at' => now(), 'updated_at' => now()];
                }
            }
        }

        $this->bugTracker->linkedBugs()->sync($reportBugsToSync);

        $this->successMessage = __('bug_tracker')['successfully_saved'];


        $this->dispatch('updateBugReport');
    }

    public function render()
    {
        return view('livewire.link-issue-form');
    }
}
