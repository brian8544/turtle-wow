<?php

namespace App\Models\pivot;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PivotBugTrackerAssignedTo extends Pivot
{
    use HasFactory;

    protected $table = 'pivot_bug_tracker_assigned_to';

    public $timestamps = false;

    protected $fillable = [
        'bug_tracker_id',
        'assigned_to_id'
    ];
}
