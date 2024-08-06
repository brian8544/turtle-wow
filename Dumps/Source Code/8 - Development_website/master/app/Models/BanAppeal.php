<?php

namespace App\Models;

use App\Models\auth\Account;
use App\Models\auth\AccountBanned;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BanAppeal extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'ban_id',
        'status',
        'edited_by',
        'gms_comment'
    ];

    public function messages()
    {
        return $this->setConnection('mysql')->hasMany(BanAppealMessage::class, 'ban_appeal_id', 'id');
    }

    public function lastMessage()
    {
        return $this->messages()->whereNot('account_id', $this->ban->id)->orderBy('id', 'DESC')->first();
    }

    public function ban()
    {
        return $this->setConnection('mysql2')->belongsTo(AccountBanned::class, 'ban_id', 'banid');
    }

    public function account()
    {
        return $this->setConnection('mysql2')->belongsTo(Account::class, 'account_id', 'id');
    }

    public function editedBy()
    {
        return $this->belongsTo(Account::class, 'edited_by', 'id');
    }

    public function lastMessageFromBannedUser()
    {
        return $this->messages()->orderBy('id', 'DESC')->first();
    }

    public function getUnseenMessagesForGm()
    {
        return $this->messages()->where('seen', false)->where('support', false)->count();
    }

    public function getUnseenMessagesForPlayer()
    {
        return $this->messages()->where('seen', false)->where('support', true)->count();
    }

    public function setSeenMessagesForGm()
    {
        return $this->messages()->where('seen', false)->where('support', false)->update(['seen' => true]);
    }

    public function setSeenMessagesForPlayer()
    {
        return $this->messages()->where('seen', false)->where('support', true)->update(['seen' => true]);
    }

    public function getMoreInfo()
    {
        return $this->setConnection('mysql2')->hasMany(AccountBanned::class, 'id', 'account_id')
            ->where(function ($query) {
                $query->where('banreason', 'LIKE', 'NOTE:%')
                    ->orWhere('banreason', 'LIKE', 'WARN:%');
            })
            ->orderByRaw("CASE
                    WHEN banreason LIKE 'NOTE:%' THEN 1
                    WHEN banreason LIKE 'WARN:%' THEN 2
                    ELSE 3
                END")
            ->orderBy('bandate', 'DESC');
    }
}
