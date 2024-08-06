<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerCategory extends Model
{
    use HasFactory;

    protected $connection = "mysql";

    protected $fillable = [
        'name_en',
        'name_zh_cn',
        'description_en',
        'description_zh_cn',
        'color',
        'icon'
    ];

    public function __get($key)
    {
        if (strpos($key, 'name_localized') === 0) {
            $locale = app()->getLocale();

            $localizedKey = 'name_' . $locale;

            if (in_array($localizedKey, $this->fillable)) {
                return $this->$localizedKey;
            }
        }

        if (strpos($key, 'description_localized') === 0) {
            $locale = app()->getLocale();

            $localizedKey = 'description_' . $locale;

            if (in_array($localizedKey, $this->fillable)) {
                return $this->$localizedKey;
            }
        }

        return parent::__get($key);
    }

    public function bugTrackers()
    {
        return $this->belongsToMany(BugTracker::class, 'pivot_bug_tracker_categories', 'category_id', 'bug_tracker_id');
    }
}
