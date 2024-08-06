<?php

namespace App\Models;

use App\Models\auth\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'bug_tracker_id',
        'account_id',
        'author',
        'message',
        'hidden',
        'created_at',
        'updated_at',
    ];

    public function account()
    {
        return $this->setConnection('mysql2')->belongsTo(Account::class, 'account_id', 'id');
    }

    public function bugTracker()
    {
        return $this->belongsTo(BugTracker::class, 'id', 'bug_tracker_id');
    }

    public function status()
    {
        return $this->hasMany(BugTrackerMessageStatus::class, 'id', 'message_id');
    }

    public function markAsSeen()
    {
        $this->status()
            ->updateOrCreate(
                ['account_id' => auth()->id()],
                ['seen' => true]
            );
    }

    public function markAsUnseen()
    {
        $this->status()
            ->updateOrCreate(
                ['account_id' => auth()->id()],
                ['seen' => false]
            );
    }

    public function image()
    {
        return $this->setConnection('mysql')->hasOne(BugTrackerMessageImage::class, 'message_id', 'id');
    }
}
