<?php

namespace App\Livewire;

use App\Models\BugTrackerPriority;
use Livewire\Component;

class ModifyPriority extends Component
{
    public $priorities;
    public $priority_en;
    public $priority_zh_cn;
    public $priority_description_en;
    public $priority_description_zh_cn;
    public $priority_color;
    public $priority_icon;
    public $priority_responseMessage;
    public $priority_id = null;

    public function mount()
    {
        $this->priorities = BugTrackerpriority::all();
        $this->priority_id = null;
        $this->reset(['priority_en', 'priority_zh_cn', 'priority_color', 'priority_icon', 'priority_description_en', 'priority_description_zh_cn']);
    }

    public function refreshComponent()
    {
        $this->reset(['priority_id','priority_en', 'priority_zh_cn', 'priority_color', 'priority_icon', 'priority_description_en', 'priority_description_zh_cn']);
    }

    public function editPriority($id)
    {
        $priority = BugTrackerPriority::find($id);

        if ($priority) {
            $this->priority_id = $priority->id;
            $this->priority_en = $priority->name_en;
            $this->priority_zh_cn = $priority->name_zh_cn;
            $this->priority_color = $priority->color;
            $this->priority_icon = $priority->icon;
            $this->priority_description_en = $priority->description_en;
            $this->priority_description_zh_cn = $priority->description_zh_cn;
        }
    }

    public function submitPriority()
    {
        if ($this->priority_id == null) {
            $this->validate([
                'priority_en' => 'required|string',
                'priority_zh_cn' => 'required|string',
                'priority_description_en' => 'required|string',
                'priority_description_zh_cn' => 'required|string'
            ]);

            $priority = BugTrackerPriority::create([
                'name_en' => $this->priority_en,
                'name_zh_cn' => $this->priority_zh_cn,
                'description_en' => $this->priority_description_en,
                'description_zh_cn' => $this->priority_description_zh_cn,
                'color' => $this->priority_color
            ]);
        } else {
            $this->validate([
                'priority_id' => 'required|exists:bug_tracker_priorities,id',
                'priority_en' => 'required|string',
                'priority_zh_cn' => 'required|string',
                'priority_description_en' => 'required|string',
                'priority_description_zh_cn' => 'required|string'
            ]);

            $priority = BugTrackerPriority::find($this->priority_id)->update([
                'name_en' => $this->priority_en,
                'name_zh_cn' => $this->priority_zh_cn,
                'description_en' => $this->priority_description_en,
                'description_zh_cn' => $this->priority_description_zh_cn,
                'color' => $this->priority_color
            ]);
        }

        if ($priority) {
            $this->priority_responseMessage = $this->priority_id ? __('bug_tracker')['success_messages']['edited_priority'] : __('bug_tracker')['success_messages']['added_priority'];
            $this->mount();
        } else {
            $this->priority_responseMessage = $this->priority_id ? __('bug_tracker')['error_messages']['editing_priority'] : __('bug_tracker')['error_messages']['adding_priority'];
        }
    }

    public function deletePriority($id)
    {
        $priority = BugTrackerPriority::find($id)->delete();

        if ($priority) {
            $this->priority_responseMessage = __('bug_tracker')['success_messages']['deleted_priority'];
            $this->mount();
        } else {
            $this->priority_responseMessage = __('bug_tracker')['error_messages']['deleting_priority'];
        }
    }
    public function render()
    {
        return view('livewire.modify-priority');
    }
}
