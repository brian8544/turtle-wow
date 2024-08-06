<?php

namespace App\Models\pivot;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class BugTrackerAssignedToAccount extends Pivot
{
    use HasFactory;

    protected $table = 'pivot_bug_tracker_assigned_to_accounts';

    public $timestamps = false;

    protected $fillable = [
        'assigned_to_id',
        'account_id'
    ];
}
