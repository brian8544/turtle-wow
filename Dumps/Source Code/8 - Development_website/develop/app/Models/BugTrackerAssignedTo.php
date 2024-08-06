<?php

namespace App\Models;

use App\Models\auth\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerAssignedTo extends Model
{
    use HasFactory;

    protected $table = 'bug_tracker_assigned_to';

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

    public function accounts()
    {
        $database = $this->getConnection()->getDatabaseName();
        return $this->belongsToMany(Account::class, $database . '.pivot_bug_tracker_assigned_to_accounts', 'assigned_to_id', 'account_id');
    }

    public function bugTrackers()
    {
        return $this->belongsToMany(BugTracker::class, 'pivot_bug_tracker_assigned_to', 'assigned_to_id', 'bug_tracker_id');
    }
}
