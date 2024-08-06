<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerDuplicated extends Model
{
    use HasFactory;

    protected $table = 'pivot_bug_tracker_duplicated';

    public $timestamps = false;

    protected $fillable = [
        'bug_tracker_id',
        'duplicated_tracker_id'
    ];
}
