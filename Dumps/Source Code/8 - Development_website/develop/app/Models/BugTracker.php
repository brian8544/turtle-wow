<?php

namespace App\Models;

use App\Models\auth\Account;
use App\Models\auth\Realmlist;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTracker extends Model
{
    use HasFactory;

    protected $table = 'bug_tracker';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'account_id',
        'author',
        'title',
        'description',
        'priority_id',
        'vote',
        'status_id',
        'assigned_to_id',
        'closed_by',
        'hidden',
        'history',
        'updated_at',
        'created_at',
    ];

    public function messages()
    {
        return $this->setConnection('mysql')->hasMany(BugTrackerMessage::class, 'bug_tracker_id', 'id');
    }

    public function account()
    {
        return $this->setConnection('mysql2')->belongsTo(Account::class, 'account_id', 'id');
    }

    public function closedBy()
    {
        return $this->belongsTo(Account::class, 'closed_by', 'id');
    }

    public function getLastUnseenMessage()
    {
        return $this->messages()
            ->leftJoin('bug_tracker_message_status', function ($join) {
                $join->on('messages.id', '=', 'bug_tracker_message_status.bug_tracker_message_id')
                    ->where('bug_tracker_message_status.account_id', '=', auth()->id());
            })
            ->where('bug_tracker_message_status.seen', '=', false)
            ->orderBy('messages.created_at', 'desc')
            ->first();
    }

    public function getAllUnseenMessages()
    {
        return $this->messages()
            ->leftJoin('bug_tracker_message_status', function ($join) {
                $join->on('messages.id', '=', 'bug_tracker_message_status.bug_tracker_message_id')
                    ->where('bug_tracker_message_status.account_id', '=', auth()->id());
            })
            ->where('bug_tracker_message_status.seen', '=', false)
            ->get();
    }

    public function categories()
    {
        return $this->setConnection('mysql')->belongsToMany(BugTrackerCategory::class, 'pivot_bug_tracker_categories', 'bug_tracker_id', 'category_id');
    }

    public function statuses()
    {
        return $this->hasOne(BugTrackerStatus::class, 'id', 'status_id');
    }

    public function assignedTo()
    {
        $database = $this->getConnection()->getDatabaseName();
        return $this->belongsToMany(BugTrackerAssignedTo::class, $database . '.pivot_bug_tracker_assigned_to', 'bug_tracker_id', 'assigned_to_id');
    }

    public function realms()
    {
        $database = $this->getConnection()->getDatabaseName();
        return $this->belongsToMany(Realmlist::class, $database . '.pivot_bug_tracker_realms', 'bug_tracker_id', 'realm_id');
    }

    public function bugTrackerRelated()
    {
        return $this->belongsToMany(BugTrackerRelated::class, 'pivot_bug_tracker_related', 'id', 'bug_tracker_id');
    }

    public function bugTrackerDuplicated()
    {
        return $this->belongsToMany(BugTrackerRelated::class, 'pivot_bug_tracker_duplicated', 'id', 'bug_tracker_id');
    }

    public function images()
    {
        return $this->setConnection('mysql')->hasMany(BugTrackerImage::class, 'bug_tracker_id', 'id');
    }

    public function votes()
    {
        return $this->setConnection('mysql')->hasMany(BugTrackerVote::class, 'bug_tracker_id', 'id');
    }

    public function linkedBugs()
    {
        return $this->belongsToMany(BugTracker::class, 'bug_tracker_links', 'bug_tracker_id', 'linked_bug_tracker_id')->withPivot('type');
    }

    public function linkedBy()
    {
        return $this->belongsToMany(BugTracker::class, 'bug_tracker_links', 'linked_bug_tracker_id', 'bug_tracker_id')->withPivot('type');
    }

    public function relatedBugs()
    {
        return $this->linkedBugs()->wherePivot('type', 'related');
    }

    public function duplicatedBugs()
    {
        return $this->linkedBugs()->wherePivot('type', 'duplicated');
    }
}
