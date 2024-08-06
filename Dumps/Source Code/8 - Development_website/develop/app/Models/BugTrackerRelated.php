<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerRelated extends Model
{
    use HasFactory;

    protected $table = 'pivot_bug_tracker_related';

    public $timestamps = false;

    protected $fillable = [
        'bug_tracker_id',
        'related_tracker_id'
    ];
}
