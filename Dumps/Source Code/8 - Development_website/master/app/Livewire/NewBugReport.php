<?php

namespace App\Livewire;

use App\Events\CacheBugReport;
use App\Models\auth\Realmlist;
use App\Models\BugTracker;
use App\Models\BugTrackerAuthor;
use App\Models\BugTrackerCategory;
use App\Models\BugTrackerImage;
use App\Models\BugTrackerStatus;
use App\Models\characters\Character;
use App\Models\pivot\BugTrackerRealm;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use Livewire\Component;
use Livewire\WithFileUploads;

class NewBugReport extends Component
{
    public $title;
    public $description;
    public $categories = [];
    public $realms = [];
    public $charactersName = [];
    public $characterKey = "none";
    public $images = [];
    public $bug_tracker_responseMessage;
    public $canPostReport = false;
    public $needAuthorName = true;
    public $needToChangeAuthorName = false;
    public $selectedCharacterName;
    public $selectedRealmId;
    public $statusId = null;
    public $bugTrackersPerHour = 2;

    public $authorName;
    public $banned = false;

    use WithFileUploads;

    public function mount()
    {
        $charactersName = [];
        $this->title = "";
        $this->images = [];

        if (auth()->guard('account')->check()) {
            $this->banned = auth()->guard('account')->user()->latestBan()?->active == 1 ? true : false;
            $bugTrackerAuthor = BugTrackerAuthor::where('account_id', auth()->guard('account')->id())->first();


            if ($bugTrackerAuthor) {
                $this->authorName = $bugTrackerAuthor->name;
            }
            $bugTrackerCategories = BugTrackerCategory::all();
            $bugTrackerRealms = Realmlist::all();
            $this->canPostReport = true;

            $lastBugReport = BugTracker::where('account_id', auth()->guard('account')->id())
                ->where('created_at', '>=', now()->subHour())
                ->count();

            if (($lastBugReport >= $this->bugTrackersPerHour) && (auth()->guard('account')->user()->rank < 3)) {
                $this->canPostReport = false;
                $this->bug_tracker_responseMessage = __('custom.too_many_reports', ['time' => now()->addHour()->diffForHumans()]);
            }

            foreach (config('customs.realms') as $key => $realm) {
                if ($realm['replication']) {
                    $characters = new Character;

                    $characters->setConnection($realm['replication']);

                    $characters->select('name')
                        ->where('account', auth()->guard('account')->id())
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

            foreach ($bugTrackerCategories as $category) {
                $this->categories[$category->id] = [
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

        }

        $this->description = nl2br(e(__('bug_tracker')['problem'] . PHP_EOL . __('bug_tracker')['how_to_reproduce'] . PHP_EOL . __('bug_tracker')['how_to_work'] . PHP_EOL . __('bug_tracker')['character']));
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

    public function submitNewBugReport()
    {
        if ($this->banned) {
            $this->bug_tracker_responseMessage = 'You are banned.';
            return;
        }

        $validation = [
            'title' => 'required|string',
            'description' => 'required|string',
            'categories' => 'required|array',
            'realms' => 'required|array'
        ];

        if (!empty($this->images)) {
            $validation['images.*'] = 'image|mimes:jpeg,png,webp,jpg,gif,svg|max:2048';
            $validation['images'] = 'max:2';
        }

        $this->validate($validation);

        $selectedCategories = collect($this->categories)
            ->filter(function ($category) {
                return $category['selected'] === true;
            })
            ->keys();

        $selectedRealms = collect($this->realms)
            ->filter(function ($realm) {
                return $realm['selected'] === true;
            })
            ->keys();

        $status = BugTrackerStatus::where('name_en', 'Open')->first();

        if ($status) {
            $this->statusId = $status->id;
        }

        $history = date('d.m.Y H:i') . ' ' . auth()->guard('account')->user()->username . " has created the report " . "\n\n";

        $bugTracker = BugTracker::create([
            'account_id' => auth()->guard('account')->id(),
            'priority' => null,
            'status' => null,
            'vote' => 0,
            'title' => $this->title,
            'description' => $this->description,
            'author' => $this->authorName,
            'status_id' => $this->statusId,
            'history' => $history,
        ]);


        if ($bugTracker) {

            if (config('customs.mattermost.bug_tracker.enabled')) {
                dispatch(new \App\Jobs\NewBugReportNotification([
                    'id' => $bugTracker->id,
                    'title' => $this->title,
                    'authorName' => $this->authorName,
                ]));
            }

            if (!File::exists(public_path('bug_tracker_images/1000x700'))) {
                File::makeDirectory(public_path('bug_tracker_images/1000x700'), 0777, true, true);
            }

            if (!File::exists(public_path('bug_tracker_images/600x400'))) {
                File::makeDirectory(public_path('bug_tracker_images/600x400'), 0777, true, true);
            }

            if (!File::exists(public_path('bug_tracker_images/150x150'))) {
                File::makeDirectory(public_path('bug_tracker_images/150x150'), 0777, true, true);
            }

            foreach ($this->images as $image) {
                $path1000x700 = 'bug_tracker_images/1000x700/' . $image->hashName();
                $path600x400 = 'bug_tracker_images/600x400/' . $image->hashName();
                $path150x150 = 'bug_tracker_images/150x150/' . $image->hashName();

                $img = Image::make($image)->encode('png');

                $img->resizeCanvas(1000, 700, 'center', true, 'rgba(0, 0, 0, 0)')->save(public_path($path1000x700));
                $img->resizeCanvas(600, 400)->save(public_path($path600x400));
                $img->resizeCanvas(150, 150)->save(public_path($path150x150));

                $bugTrackerImage = new BugTrackerImage([
                    'large' => $path1000x700,
                    'medium' => $path600x400,
                    'thumbnail' => $path150x150,
                    'bug_tracker_id' => $bugTracker->id,
                ]);

                $bugTrackerImage->save();
            }
            $bugTracker->categories()->sync($selectedCategories);

            foreach ($selectedRealms as $selectedRealm) {
                BugTrackerRealm::create([
                    'bug_tracker_id' => $bugTracker->id,
                    'realm_id' => $selectedRealm
                ]);
            }

            event(new CacheBugReport($bugTracker));

            $this->redirectRoute('bug-report', ['id' => $bugTracker->id]);
            $this->bug_tracker_responseMessage = __('bug_tracker')['success_messages']['added_new_bug_report'];
        } else {
            $this->bug_tracker_responseMessage = __('bug_tracker')['error_messages']['adding_new_bug_report'];
        }
    }

    public function render()
    {
        return view('livewire.new-bug-report');
    }
}
