<?php

namespace App\Models\pivot;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BugTrackerRealm extends Pivot
{
    use HasFactory;

    protected $table = 'pivot_bug_tracker_realms';

    public $timestamps = false;

    protected $fillable = [
        'bug_tracker_id',
        'realm_id'
    ];
}
