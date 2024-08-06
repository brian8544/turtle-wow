<?php

namespace App\Livewire;

use App\Models\BugTrackerCategory;
use Livewire\Component;

class ModifyCategory extends Component
{
    public $categories;
    public $category_en;
    public $category_zh_cn;
    public $category_color;
    public $category_description_en;
    public $category_description_zh_cn;
    public $category_icon;
    public $category_responseMessage;
    public $category_id = null;

    public function mount()
    {
        $this->categories = BugTrackerCategory::all();
        $this->category_id = null;
        $this->reset(['category_en', 'category_zh_cn', 'category_color', 'category_icon', 'category_description_en', 'category_description_zh_cn']);
    }

    public function refreshComponent()
    {
        $this->reset(['category_id', 'category_en', 'category_zh_cn', 'category_color', 'category_icon', 'category_description_en', 'category_description_zh_cn']);
    }
    public function editCategory($id)
    {
        $category = BugTrackerCategory::find($id);

        if ($category) {
            $this->category_id = $category->id;
            $this->category_en = $category->name_en;
            $this->category_zh_cn = $category->name_zh_cn;
            $this->category_color = $category->color;
            $this->category_icon = $category->icon;
            $this->category_description_en = $category->description_en;
            $this->category_description_zh_cn = $category->description_zh_cn;
        }
    }

    public function submitCategory()
    {
        if ($this->category_id == null) {
            $this->validate([
                'category_en' => 'required|string',
                'category_zh_cn' => 'required|string',
                'category_description_en' => 'required|string',
                'category_description_zh_cn' => 'required|string'
            ]);

            $category = BugTrackerCategory::create([
                'name_en' => $this->category_en,
                'name_zh_cn' => $this->category_zh_cn,
                'category_description_en' => $this->category_description_en,
                'category_description_zh_cn' => $this->category_description_zh_cn,
                'color' => $this->category_color
            ]);
        } else {
            $this->validate([
                'category_id' => 'required|exists:bug_tracker_categories,id',
                'category_en' => 'required|string',
                'category_zh_cn' => 'required|string',
                'category_description_en' => 'required|string',
                'category_description_zh_cn' => 'required|string'
            ]);

            $category = BugTrackerCategory::find($this->category_id)->update([
                'name_en' => $this->category_en,
                'name_zh_cn' => $this->category_zh_cn,
                'description_en' => $this->category_description_en,
                'description_zh_cn' => $this->category_description_zh_cn,
                'color' => $this->category_color
            ]);
        }

        if ($category) {
            $this->category_responseMessage = $this->category_id ? __('bug_tracker')['success_messages']['edited_category'] : __('bug_tracker')['success_messages']['added_category'];
            $this->mount();
        } else {
            $this->category_responseMessage = $this->category_id ? __('bug_tracker')['error_messages']['editing_category'] : __('bug_tracker')['error_messages']['adding_category'];
        }
    }

    public function deleteCategory($id)
    {
        $category = BugTrackerCategory::find($id)->delete();

        if ($category) {
            $this->category_responseMessage = __('bug_tracker')['success_messages']['deleted_category'];
            $this->mount();
        } else {
            $this->category_responseMessage = __('bug_tracker')['error_messages']['deleting_category'];
        }
    }

    public function render()
    {
        return view('livewire.modify-category');
    }
}
