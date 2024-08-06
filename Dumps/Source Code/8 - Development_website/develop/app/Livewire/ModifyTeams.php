<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Models\BugTrackerAssignedTo;
use App\Models\pivot\BugTrackerAssignedToAccount;
use Livewire\Component;

class ModifyTeams extends Component
{
    public $teams;
    public $team_en;
    public $team_zh_cn;
    public $team_description_en;
    public $team_description_zh_cn;
    public $team_color;
    public $team_icon;
    public $team_responseMessage;
    public $team_id = null;
    public $team_members = [];

    public function mount()
    {
        $this->teams = BugTrackerAssignedTo::all();
        $this->team_id = null;
        $this->reset(['team_en', 'team_zh_cn', 'team_color', 'team_icon', 'team_members', 'team_description_en', 'team_description_zh_cn']);

        $accounts = Account::where('rank', '>=', 2)->get();

        $this->team_members = [];

        foreach ($accounts as $account) {
            $this->team_members[$account->id] = [
                'username' => $account->username,
                'selected' => false
            ];
        }
    }

    public function refreshComponent()
    {
        $this->reset(['team_id','team_en', 'team_zh_cn', 'team_color', 'team_icon', 'team_description_en', 'team_description_zh_cn']);

        foreach ($this->team_members as $id => $member) {
            $this->team_members[$id]['selected'] = false;
        }

    }

    public function editTeam($id)
    {
        $team = BugTrackerAssignedTo::find($id);

        if ($team) {
            $this->team_id = $team->id;
            $this->team_en = $team->name_en;
            $this->team_zh_cn = $team->name_zh_cn;
            $this->team_color = $team->color;
            $this->team_icon = $team->icon;
            $this->team_description_en = $team->description_en;
            $this->team_description_zh_cn = $team->description_zh_cn;

            $accounts = BugTrackerAssignedToAccount::where('assigned_to_id', $team->id)->pluck('account_id');

            if (!$accounts->isEmpty()) {
                foreach ($this->team_members as $key => $value) {
                    $this->team_members[$key]['selected'] = false;
                }
                foreach ($accounts as $account) {
                    $this->team_members[$account]['selected'] = true;
                }
                $this->dispatch('updateDropMenu', [$this->team_members]);
            }
        }
    }

    public function submitTeam()
    {
        $selectedMembers = [];
        foreach ($this->team_members as $key => $value) {
            if (isset($value['selected']) && $value['selected']) {
                $selectedMembers[] = $key;
            }
        }
        if ($this->team_id == null) {

            dd('1');
            $this->validate([
                'team_en' => 'required|string',
                'team_zh_cn' => 'required|string',
                'team_description_en' => 'required|string',
                'team_description_zh_cn' => 'required|string'
            ]);

            $team = BugTrackerAssignedTo::create([
                'name_en' => $this->team_en,
                'name_zh_cn' => $this->team_zh_cn,
                'description_en' => $this->team_description_en,
                'description_zh_cn' => $this->team_description_zh_cn,
                'color' => $this->team_color
            ]);

            $deleteOldPivot = BugTrackerAssignedToAccount::where('assigned_to_id', $team->id)->delete();

            if ($deleteOldPivot) {
                foreach ($selectedMembers as $selectedMember) {
                    BugTrackerAssignedToAccount::create([
                        'assigned_to_id' => $team->id,
                        'account_id' => $selectedMember
                    ]);
                }
            }
        } else {
            $this->validate([
                'team_id' => 'required|exists:bug_tracker_assigned_to,id',
                'team_en' => 'required|string',
                'team_zh_cn' => 'required|string',
                'team_description_en' => 'required|string',
                'team_description_zh_cn' => 'required|string'
            ]);

            $team = BugTrackerAssignedTo::find($this->team_id);

            $team->update([
                'name_en' => $this->team_en,
                'name_zh_cn' => $this->team_zh_cn,
                'description_en' => $this->team_description_en,
                'description_zh_cn' => $this->team_description_zh_cn,
                'color' => $this->team_color
            ]);

            BugTrackerAssignedToAccount::where('assigned_to_id', $team->id)->delete();

            foreach ($selectedMembers as $selectedMember) {
                BugTrackerAssignedToAccount::create([
                    'assigned_to_id' => $team->id,
                    'account_id' => $selectedMember
                ]);
            }
        }

        if ($team) {
            $this->team_responseMessage = $this->team_id ? __('bug_tracker')['success_messages']['edited_team'] : __('bug_tracker')['success_messages']['added_team'];
            $this->mount();
        } else {
            $this->team_responseMessage = $this->team_id ? __('bug_tracker')['error_messages']['editing_team'] : __('bug_tracker')['error_messages']['adding_team'];
        }
    }

    public function deleteTeam($id)
    {
        $category = BugTrackerAssignedTo::find($id)->delete();

        if ($category) {
            $this->team_responseMessage = __('bug_tracker')['success_messages']['deleted_team'];
            $this->mount();
        } else {
            $this->team_responseMessage = __('bug_tracker')['error_messages']['deleting_team'];
        }
    }

    public function render()
    {
        return view('livewire.modify-teams');
    }
}
