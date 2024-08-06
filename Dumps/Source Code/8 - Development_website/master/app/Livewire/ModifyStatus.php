<?php

namespace App\Livewire;

use App\Models\BugTrackerStatus;
use Livewire\Component;

class ModifyStatus extends Component
{
    public $statuses;
    public $status_en;
    public $status_zh_cn;
    public $status_description_en;
    public $status_description_zh_cn;
    public $status_color;
    public $status_icon;
    public $status_responseMessage;
    public $status_id = null;

    public function mount()
    {
        $this->statuses = BugTrackerStatus::all();
        $this->status_id = null;
        $this->reset(['status_en', 'status_zh_cn', 'status_color', 'status_icon', 'status_description_en', 'status_description_zh_cn']);
    }

    public function refreshComponent()
    {
        $this->reset(['status_id', 'status_en', 'status_zh_cn', 'status_color', 'status_icon', 'status_description_en', 'status_description_zh_cn']);
    }

    public function editStatus($id)
    {
        $status = BugTrackerStatus::find($id);

        if ($status) {
            $this->status_id = $status->id;
            $this->status_en = $status->name_en;
            $this->status_zh_cn = $status->name_zh_cn;
            $this->status_color = $status->color;
            $this->status_icon = $status->icon;
            $this->status_description_en = $status->description_en;
            $this->status_description_zh_cn = $status->description_zh_cn;
        }
    }

    public function submitStatus()
    {
        if ($this->status_id == null) {
            $this->validate([
                'status_en' => 'required|string',
                'status_zh_cn' => 'required|string',
                'status_description_en' => 'required|string',
                'status_description_zh_cn' => 'required|string'
            ]);

            $status = BugTrackerStatus::create([
                'name_en' => $this->status_en,
                'name_zh_cn' => $this->status_zh_cn,
                'description_en' => $this->status_description_en,
                'description_zh_cn' => $this->status_description_zh_cn,
                'color' => $this->status_color
            ]);
        } else {
            $this->validate([
                'status_id' => 'required|exists:bug_tracker_statuses,id',
                'status_en' => 'required|string',
                'status_zh_cn' => 'required|string',
                'status_description_en' => 'required|string',
                'status_description_zh_cn' => 'required|string'
            ]);

            $status = BugTrackerStatus::find($this->status_id)->update([
                'name_en' => $this->status_en,
                'name_zh_cn' => $this->status_zh_cn,
                'description_en' => $this->status_description_en,
                'description_zh_cn' => $this->status_description_zh_cn,
                'color' => $this->status_color
            ]);
        }

        if ($status) {
            $this->status_responseMessage = $this->status_id ? __('bug_tracker')['success_messages']['edited_status'] : __('bug_tracker')['success_messages']['added_status'];
            $this->mount();
        } else {
            $this->status_responseMessage = $this->status_id ? __('bug_tracker')['error_messages']['editing_status'] : __('bug_tracker')['error_messages']['adding_status'];
        }
    }

    public function deleteStatus($id)
    {
        $category = BugTrackerStatus::find($id)->delete();

        if ($category) {
            $this->status_responseMessage = __('bug_tracker')['success_messages']['deleted_status'];
            $this->mount();
        } else {
            $this->status_responseMessage = __('bug_tracker')['error_messages']['deleting_status'];
        }
    }

    public function render()
    {
        return view('livewire.modify-status');
    }
}
