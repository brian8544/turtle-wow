<?php

namespace App\Livewire;

use App\Events\CacheBugReport;
use App\Models\auth\Realmlist;
use App\Models\BugTracker;
use App\Models\BugTrackerAssignedTo;
use App\Models\BugTrackerAuthor;
use App\Models\BugTrackerCategory;
use App\Models\BugTrackerImage;
use App\Models\BugTrackerMessageImage;
use App\Models\BugTrackerPriority;
use App\Models\BugTrackerStatus;
use App\Models\characters\Character;
use App\Models\pivot\BugTrackerRealm;
use App\Models\pivot\PivotBugTrackerAssignedTo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use Livewire\Attributes\On;
use Livewire\Component;
use Livewire\WithFileUploads;

class BugReport extends Component
{
    public $id;
    public $newMessage;
    public $statuses = [];
    public $priorities = [];
    public $realms = [];
    public $categories = [];
    public $assignedTos = [];
    public $priority;
    public $status;
    public $imageId;
    public $support = false;
    public $owner = false;
    public $needAuthorName = true;
    public $needToChangeAuthorName = false;
    public $authorName;
    public $charactersName = [];
    public $canPostMessage = false;
    public $selectedCharacterName;
    public $selectedRealmId;
    public $characterKey = "none";
    public $hasVoted = false;
    public $description;
    public $searchCategory = '';
    public $searchCategories = [];
    public $history;
    public $selectedItemIndex = 0;
    public $openSearch = false;
    public $commentImage = null;
    public $closedBy = null;
    public $banned = false;

    use WithFileUploads;


    public function renderSearchCategory()
    {
        $this->openSearch = true;
        $this->render();
    }

    public function resetSearch()
    {
        $this->openSearch = false;
        $this->clearSearch();
    }

    public function clearSearch()
    {
        $this->searchCategory = "";
    }


    public function renderAllCategories()
    {
        $this->searchCategory = "";
        $this->renderSearchCategory();
    }

    public function incrementSelectedItem()
    {
        $this->selectedItemIndex = ($this->selectedItemIndex + 1) % count($this->searchCategories);
    }

    public function decrementSelectedItem()
    {
        $this->selectedItemIndex = ($this->selectedItemIndex - 1 + count($this->searchCategories)) % count($this->searchCategories);
    }

    public function toggleSelection()
    {
        $key = array_keys($this->searchCategories)[$this->selectedItemIndex];
        $this->categories[$key]['selected'] = !$this->categories[$key]['selected'];
    }

    public function mount()
    {
        $this->id = request()->query('id');

        $bugTracker = BugTracker::find($this->id);

        if (!$bugTracker) {
            return redirect()->route('bug-tracker');
        } else {

            $this->hasVoted = $bugTracker->votes()->where('account_id', auth()->guard('account')->id())->first();

            $charactersName = [];

            $user = auth()->guard('account')->user();

            $this->description = $bugTracker->description;

            if ($user) {

                $this->banned = $user->latestBan()?->active == 1 ? true : false;

                $bugtrackerAuthor = BugTrackerAuthor::where('account_id', $user->id)->first();

                if ($bugtrackerAuthor) {
                    $this->authorName = $bugtrackerAuthor->name;
                }

                foreach (config('customs.realms') as $key => $realm) {
                    if ($realm['replication']) {
                        $characters = new Character;

                        $characters->setConnection($realm['replication']);

                        $characters->select('name')
                            ->where('account', $user->id)
                            ->where('deleteInfos_Name', null)
                            ->get()
                            ->each(function ($character) use (&$charactersName, $key) {
                                $charactersName[] = [
                                    'name' => $character->name,
                                    'realm_id' => $key,
                                    'selected' => false
                                ];
                            });
                    }
                }

                $this->charactersName = $charactersName;

                if ($this->authorName) {
                    if (!empty($charactersName)) {
                        $characterNames = array_column($charactersName, 'name');
                        if (in_array($this->authorName, $characterNames)) {
                            $this->needAuthorName = false;
                        } else {
                            $this->needToChangeAuthorName = true;
                        }
                    }
                }

                $this->canPostMessage = true;

                if ($user->rank >= 2) {
                    $this->support = true;
                    $this->history = $bugTracker->history;
                } else {
                    if ($user->id == $bugTracker->account_id) {
                        $this->owner = true;
                    }
                }
            }


            $bugTrackerClosedBy = BugTrackerAuthor::where('account_id', $bugTracker->closed_by)->first();

            if ($bugTrackerClosedBy) {
                $this->closedBy = $bugTrackerClosedBy->name;
            }

            $bugTrackerAssignedTos = BugTrackerAssignedTo::all();
            $bugTrackerCategories = BugTrackerCategory::all();
            $bugTrackerRealms = Realmlist::all();
            $bugTrackerPriorities = BugTrackerPriority::all();
            $bugTrackerStatuses = BugTrackerStatus::all();

            $this->statuses = [];
            $this->priorities = [];
            $this->realms = [];
            $this->categories = [];
            $this->searchCategories = [];
            $this->assignedTos = [];

            $statuses = $bugTracker->statuses;
            $priorities = $bugTracker->priorities;
            $realms = BugTrackerRealm::where('bug_tracker_id', $bugTracker->id)->pluck('realm_id');
            $categories = $bugTracker->categories;
            $assignedTos = PivotBugTrackerAssignedTo::where('bug_tracker_id', $bugTracker->id)->pluck('assigned_to_id');


            foreach ($bugTrackerAssignedTos as $assignedTo) {
                $this->assignedTos[$assignedTo->id] = [
                    'name' => $assignedTo->name_localized,
                    'color' => $assignedTo->color,
                    'selected' => false
                ];
            }

            foreach ($bugTrackerCategories as $category) {
                $this->categories[$category->id] = [
                    'name' => $category->name_localized,
                    'color' => $category->color,
                    'selected' => false
                ];

                $this->searchCategories[$category->id] = [
                    'name' => $category->name_localized,
                    'color' => $category->color,
                    'selected' => false
                ];
            }

            foreach ($bugTrackerRealms as $realm) {
                $this->realms[$realm->id] = [
                    'name' => $realm->name,
                    'selected' => false
                ];
            }

            foreach ($bugTrackerPriorities as $priority) {
                $this->priorities[$priority->id] = [
                    'name' => $priority->name_localized,
                    'color' => $priority->color,
                    'selected' => false
                ];
            }

            foreach ($bugTrackerStatuses as $status) {
                $this->statuses[$status->id] = [
                    'name' => $status->name_localized,
                    'color' => $status->color,
                    'selected' => false
                ];
            }

            if ($statuses) {
                $this->statuses[$statuses->id]['selected'] = true;
                $this->status = $statuses;
            }

            if ($priorities) {
                foreach ($priorities as $priority) {
                    $this->priorities[$priority->id]['selected'] = true;
                }
            }

            if ($realms) {
                foreach ($bugTrackerRealms as $realm) {
                    foreach ($realms as $selectedRealm) {
                        if ($selectedRealm == $realm->id) {
                            $this->realms[$realm->id]['selected'] = true;
                            $this->realms[$realm->id]['name'] = $realm->name;
                        }
                    }
                }
            }

            if ($categories) {
                foreach ($categories as $category) {
                    $this->categories[$category->id]['selected'] = true;
                    $this->searchCategories[$category->id]['selected'] = true;
                }
            }

            if ($assignedTos) {
                foreach ($bugTrackerAssignedTos as $assignedTo) {
                    foreach ($assignedTos as $selectedAssignedTo) {
                        if ($selectedAssignedTo == $assignedTo->id) {
                            $this->assignedTos[$assignedTo->id]['selected'] = true;
                        }
                    }
                }
            }
        }
    }

    public function submitNewAuthorName()
    {
        if ($this->banned) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        foreach ($this->charactersName as $key => $character) {
            if ($key == $this->characterKey) {
                $this->selectedCharacterName = $character['name'];
                $this->selectedRealmId = $character['realm_id'];
            }
        }

        $this->validate([
            'selectedCharacterName' => 'required|string',
            'selectedRealmId' => 'required|integer'
        ]);

        $bugTrackerAuthor = BugTrackerAuthor::where('account_id', auth()->guard('account')->id())->first();

        if ($bugTrackerAuthor) {
            $bugTrackerAuthor->update([
                'name' => $this->selectedCharacterName,
                'realm_id' => $this->selectedRealmId,
            ]);
        } else {
            $bugTrackerAuthor = BugTrackerAuthor::create([
                'account_id' => auth()->guard('account')->id(),
                'name' => $this->selectedCharacterName,
                'realm_id' => $this->selectedRealmId,
            ]);
        }

        if ($bugTrackerAuthor) {
            $this->authorName = $this->selectedCharacterName;
            $this->needAuthorName = false;
            $this->needToChangeAuthorName = false;
            $this->render();
        } else {
            $this->bug_tracker_responseMessage = 'Error while updating author name. Please try again.';
        }
    }

    public function submitNewMessage()
    {
        if ($this->banned) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        if (isset($this->commentImage)) {
            $this->validate([
                'newMessage' => 'required|string',
                'commentImage' => 'image|mimes:jpeg,webp,png,jpg,gif,svg|max:2048'
            ]);
        } else {
            $this->validate([
                'newMessage' => 'required|string'
            ]);
        }

        $bugTracker = BugTracker::find($this->id);

        $bugTrackerAuthor = BugTrackerAuthor::where('account_id', auth()->guard('account')->id())->first();

        $newMessage = $bugTracker->messages()->create([
            'account_id' => auth()->guard('account')->id(),
            'message' => $this->newMessage,
            'author' => $bugTrackerAuthor->name
        ]);

        if ($newMessage) {

            if (isset($this->commentImage)) {
                if (!File::exists(public_path('bug_tracker_images/1000x700'))) {
                    File::makeDirectory(public_path('bug_tracker_images/1000x700'), 0777, true, true);
                }

                if (!File::exists(public_path('bug_tracker_images/600x400'))) {
                    File::makeDirectory(public_path('bug_tracker_images/600x400'), 0777, true, true);
                }

                if (!File::exists(public_path('bug_tracker_images/150x150'))) {
                    File::makeDirectory(public_path('bug_tracker_images/150x150'), 0777, true, true);
                }

                $path1000x700 = 'bug_tracker_images/1000x700/' . $this->commentImage->hashName();
                $path600x400 = 'bug_tracker_images/600x400/' . $this->commentImage->hashName();
                $path150x150 = 'bug_tracker_images/150x150/' . $this->commentImage->hashName();

                $img = Image::make($this->commentImage)->encode('png');

                $img->resizeCanvas(1000, 700, 'center', true, 'rgba(0, 0, 0, 0)')->save(public_path($path1000x700));
                $img->resizeCanvas(600, 400)->save(public_path($path600x400));
                $img->resizeCanvas(150, 150)->save(public_path($path150x150));

                $bugTrackerImage = new BugTrackerMessageImage([
                    'large' => $path1000x700,
                    'medium' => $path600x400,
                    'thumbnail' => $path150x150,
                    'message_id' => $newMessage->id,
                ]);

                $bugTrackerImage->save();
            }
        }

        $this->newMessage = '';
        $this->commentImage = null;
    }

    public function modifyStatus()
    {
        if ($this->banned) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        $bugReport = BugTracker::find($this->id);
        $oldStatus = $bugReport->status_id;

        $oldStatusReport = "none";
        $newStatusReport = "none";

        if ($this->status != 0) {

            if ($oldStatus != null) {
                $this->statuses[$oldStatus]['selected'] = false;
            }

            $oldStatusReport = $this->statuses[$oldStatus]['name'];


            $changeStatus = $bugReport->update(['status_id' => $this->status]);

            $this->statuses[$this->status]['selected'] = true;

            if ($changeStatus) {
                $newStatusReport = $this->statuses[$this->status]['name'];

                $checkStatus = BugTrackerStatus::where('id', $this->status)->first();

                if ($checkStatus && $checkStatus->name_localized == "Closed") {
                    $bugReport->update(['closed_by' => auth()->guard('account')->id()]);
                }

                $this->updateHistory('modifyStatus', [
                    'oldStatus' => $oldStatusReport,
                    'newStatus' => $newStatusReport
                ]);
                //$this->dispatchBrowserEvent('showSuccessMessage', ['message' => __('bug_tracker_page')['bug_tracker']['success_messages']['status_changed']]);
            } else {
                //$this->dispatchBrowserEvent('showErrorMessage', ['message' => __('bug_tracker_page')['bug_tracker']['error_messages']['changing_status']]);
            }
        } else {
            if ($oldStatus != null) {
                $this->statuses[$oldStatus]['selected'] = false;
            }

            $changeStatus = $bugReport->update(['status_id' => null]);

            if ($changeStatus) {

                $bugReport->update(['closed_by' => null]);

                $this->updateHistory('modifyStatus', [
                    'oldStatus' => $oldStatusReport,
                    'newStatus' => $newStatusReport
                ]);
            }
        }
    }

    public function isClosed()
    {
        foreach ($this->statuses as $status) {
            if ($status['selected'] && $status['name'] === 'Closed') {
                return true;
            }
        }
        return false;
    }

    public function toggleStatus()
    {
        $bugReport = BugTracker::find($this->id);

        $openStatusId = BugTrackerStatus::where('name_en', 'Open')->first()->id;
        $closedStatusId = BugTrackerStatus::where('name_en', 'Closed')->first()->id;

        $oldStatusId = $this->status->id;
        $newStatusId = ($this->status->id == $closedStatusId) ? $openStatusId : $closedStatusId;

        $changeStatus = $bugReport->update(['status_id' => $newStatusId]);

        if ($changeStatus) {
            $this->status = BugTrackerStatus::find($newStatusId);
            $this->updateHistory('modifyStatus', [
                'oldStatus' => BugTrackerStatus::find($oldStatusId)->name_en,
                'newStatus' => BugTrackerStatus::find($newStatusId)->name_en
            ]);
        }
    }

    public function modifyCategory()
    {
        if ($this->banned) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        $bugReport = BugTracker::find($this->id);

        $selectedCategories = collect($this->categories)
            ->filter(function ($category) {
                return $category['selected'] === true;
            })
            ->keys();

        $changeCategory = $bugReport->categories()->sync($selectedCategories);

        if ($changeCategory) {
            $this->updateHistory('modifyCategory');
        }
    }

    public function modifyRealm()
    {
        if ($this->banned) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        $bugReport = BugTracker::find($this->id);

        $selectedRealms = collect($this->realms)
            ->filter(function ($realm) {
                return $realm['selected'] === true;
            })
            ->keys();

        BugTrackerRealm::where('bug_tracker_id', $bugReport->id)->delete();

        foreach ($selectedRealms as $selectedRealm) {
            BugTrackerRealm::create([
                'bug_tracker_id' => $bugReport->id,
                'realm_id' => $selectedRealm
            ]);
        }

        $this->updateHistory('modifyRealm');
    }

    public function modifyTeam()
    {
        if ($this->banned) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        $bugReport = BugTracker::find($this->id);

        $selectedTeams = collect($this->assignedTos)
            ->filter(function ($assignedTo) {
                return $assignedTo['selected'] === true;
            })
            ->keys();

        PivotBugTrackerAssignedTo::where('bug_tracker_id', $bugReport->id)->delete();

        foreach ($selectedTeams as $selectedTeam) {
            PivotBugTrackerAssignedTo::create([
                'bug_tracker_id' => $bugReport->id,
                'assigned_to_id' => $selectedTeam
            ]);
        }

        $this->updateHistory('modifyTeam');
    }

    public function hideComment($commentId)
    {
        $bugTracker = BugTracker::find($this->id);

        $hideComment = $bugTracker->messages()->where('id', $commentId)->update(['hidden' => true]);

        if ($hideComment) {
            $this->updateHistory('hideComment', [
                'author' => $bugTracker->messages()->where('id', $commentId)->first()->author
            ]);
        }
    }

    public function unHideComment($commentId)
    {
        $bugTracker = BugTracker::find($this->id);

        $unHideComment = $bugTracker->messages()->where('id', $commentId)->update(['hidden' => false]);

        if ($unHideComment) {
            $this->updateHistory('unHideComment', [
                'author' => $bugTracker->messages()->where('id', $commentId)->first()->author
            ]);
        }
    }

    public function deleteComment($commentId)
    {
        $bugTracker = BugTracker::find($this->id);

        $author = $bugTracker->messages()->where('id', $commentId)->first()->author;

        foreach ($bugTracker->messages()->where('id', $commentId)->get() as $message) {
            if ($message->image) {
                $image1000x700 = public_path($message->image->large);
                $image600x400 = public_path($message->image->medium);
                $image150x150 = public_path($message->image->thumbnail);

                if (File::exists($image1000x700)) {
                    File::delete($image1000x700);
                }
                if (File::exists($image600x400)) {
                    File::delete($image600x400);
                }
                if (File::exists($image150x150)) {
                    File::delete($image150x150);
                }

                $message->image()->delete();
            }
        }

        $bugTracker->messages()->where('id', $commentId)->delete();

        $this->updateHistory('deleteComment', [
            'author' => $author
        ]);
    }

    public function setImageId($imageId)
    {
        $this->imageId = $imageId;
    }

    public function deleteImage()
    {
        $image = BugTrackerImage::where('id', $this->imageId)->first();

        $image1000x700 = public_path($image->large);
        $image600x400 = public_path($image->medium);
        $image150x150 = public_path($image->thumbnail);

        if (File::exists($image1000x700)) {
            File::delete($image1000x700);
        }
        if (File::exists($image600x400)) {
            File::delete($image600x400);
        }
        if (File::exists($image150x150)) {
            File::delete($image150x150);
        }

        $image->delete();

        $this->updateHistory('deleteImage');
    }

    public function deleteReport()
    {
        $bugTracker = BugTracker::find($this->id);

        foreach ($bugTracker->messages as $message) {
            if ($message->image) {
                $image1000x700 = public_path($message->image->large);
                $image600x400 = public_path($message->image->medium);
                $image150x150 = public_path($message->image->thumbnail);

                if (File::exists($image1000x700)) {
                    File::delete($image1000x700);
                }
                if (File::exists($image600x400)) {
                    File::delete($image600x400);
                }
                if (File::exists($image150x150)) {
                    File::delete($image150x150);
                }

                $message->image()->delete();
            }
        }

        foreach ($bugTracker->images as $image) {
            $image1000x700 = public_path($image->large);
            $image600x400 = public_path($image->medium);
            $image150x150 = public_path($image->thumbnail);

            if (File::exists($image1000x700)) {
                File::delete($image1000x700);
            }
            if (File::exists($image600x400)) {
                File::delete($image600x400);
            }
            if (File::exists($image150x150)) {
                File::delete($image150x150);
            }
        }

        $bugTracker->images()->delete();

        event(new CacheBugReport($bugTracker));

        $bugTracker->delete();

        $this->redirect(route('bug-tracker'));
    }

    public function hideReport()
    {
        $bugTracker = BugTracker::find($this->id);

        $bugTracker->update(['hidden' => true]);
    }

    public function unHideReport()
    {
        $bugTracker = BugTracker::find($this->id);

        $bugTracker->update(['hidden' => false]);
    }

    public function vote()
    {
        $votedBugTracker = BugTracker::where('id', $this->id)->whereHas('votes', function ($query) {
            $query->where('account_id', Auth::guard('account')->user()->id);
        })->first();

        if ($votedBugTracker) {
            $this->hasVoted = true;
        } else {
            $votedBugTracker = BugTracker::find($this->id)->votes()->create([
                'account_id' => Auth::guard('account')->user()->id
            ]);

            if ($votedBugTracker) {
                $this->hasVoted = true;
            }
        }
    }

    public function unVote()
    {
        $unVotedBugTracker = BugTracker::find($this->id)->votes()->where('account_id', Auth::guard('account')->user()->id)->delete();

        if ($unVotedBugTracker) {
            $this->hasVoted = false;
        }
    }

    public function editReport()
    {
        if ($this->banned) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        $validation = [
            'description' => 'required|string',
        ];

        $this->validate($validation);

        $bugTracker = BugTracker::find($this->id)->update([
            'description' => $this->description
        ]);

        if ($bugTracker) {
            $this->updateHistory('editReport');
            $this->redirect(route('bug-report', ['id' => $this->id]));
        }
    }

    #[On('updateHistoryBugReport')]
    public function updateHistory($type, $data = [])
    {
        $history = $this->history;
        $modifiedBy = Auth::guard('account')->user()->username;
        switch ($type) {
            case "modifyStatus":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has changed the status from " . $data['oldStatus'] . " to " . $data['newStatus'] . "\n\n";
                break;
            case "modifyCategory":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has modified categories " . "\n\n";
                break;
            case "modifyRealm":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has modified realms" . "\n\n";
                break;
            case "modifyTeam":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has modified teams" . "\n\n";
                break;
            case "hideComment":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has hidden a comment by " . $data['author'] . "\n\n";
                break;
            case "unHideComment":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has unhidden a comment by " . $data['author'] . "\n\n";
                break;
            case "deleteComment":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has deleted a comment by " . $data['author'] . "\n\n";
                break;
            case "deleteImage":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has deleted an image" . "\n\n";
                break;
            case "editReport":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has edited the report " . "\n\n";
                break;
            case "editComment":
                $history .= date('d.m.Y H:i') . ' ' . $modifiedBy . " has edited a comment" . "\n\n";
                break;
        }


        $bugTracker = BugTracker::find($this->id)->forceFill([
            'history' => $history
        ])->save();

        if ($bugTracker) {
            $this->history = $history;
        }
    }

    #[On('updateBugReport')]
    public function render()
    {
        $bugTracker = BugTracker::find($this->id);

        $this->updatedSearchCategory($this->searchCategory);
        return view('livewire.bug-report', compact('bugTracker'));
    }

    public function updatedCategories()
    {
        $this->modifyCategory();
    }

    public function updatedSearchCategory($value)
    {
        if ($value != '') {
            $this->searchCategories = collect($this->categories)
                ->filter(function ($category) use ($value) {
                    return str_contains(strtolower($category['name']), strtolower($value));
                })
                ->toArray();
        } else {
            $this->searchCategories = $this->categories;
        }
    }
}
