<?php

namespace App\Models;

use App\Models\auth\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerVote extends Model
{
    use HasFactory;

    protected $table = 'bug_tracker_votes';

    public $timestamps = false;

    protected $fillable = [
        'bug_tracker_id',
        'account_id',
        'created_at'
    ];

    public function account()
    {
        return $this->setConnection('mysql2')->belongsTo(Account::class, 'account_id', 'id');
    }

    public function bugReport()
    {
        return $this->belongsTo(BugTracker::class, 'id', 'bug_tracker_id');
    }
}
