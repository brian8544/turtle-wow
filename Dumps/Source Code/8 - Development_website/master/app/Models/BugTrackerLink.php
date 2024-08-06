<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerLink extends Model
{
    use HasFactory;

    protected $table = 'bug_tracker_links';

    protected $fillable = [
        'bug_tracker_id',
        'linked_bug_tracker_id',
        'type',
    ];

    public function bugTracker()
    {
        return $this->belongsTo(BugTracker::class, 'bug_tracker_id', 'id');
    }
}
