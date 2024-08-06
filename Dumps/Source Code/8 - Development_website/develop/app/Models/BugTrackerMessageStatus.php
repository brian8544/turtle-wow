<?php

namespace App\Models;

use App\Models\auth\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerMessageStatus extends Model
{
    use HasFactory;

    protected $table = 'bug_tracker_message_status';

    protected $fillable = [
        'message_id',
        'account_id',
        'seen'
    ];

    public function account()
    {
        return $this->setConnection('mysql2')->belongsTo(Account::class, 'account_id', 'id');
    }

    public function message()
    {
        return $this->belongsTo(BugTrackerMessage::class, 'id', 'message_id');
    }
}
