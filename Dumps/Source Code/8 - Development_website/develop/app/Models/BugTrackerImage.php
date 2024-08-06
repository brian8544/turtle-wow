<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'large',
        'medium',
        'thumbnail',
        'bug_tracker_id'
    ];

    public function bugTracker()
    {
        return $this->belongsTo(BugTracker::class, 'bug_tracker_id');
    }
}
