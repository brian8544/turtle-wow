<?php

namespace App\Models;

use App\Models\auth\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopAppeal extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_id',
        'status',
        'support_comment',
        'edited_by'
    ];

    public function messages()
    {
        return $this->setConnection('mysql')->hasMany(ShopAppealMessage::class, 'shop_appeal_id', 'id');
    }

    public function lastMessage()
    {
        return $this->messages()->whereNot('account_id', $this->ban->id)->orderBy('id', 'DESC')->first();
    }

    public function account()
    {
        return $this->setConnection('mysql2')->belongsTo(Account::class, 'account_id', 'id');
    }

    public function editedBy()
    {
        return $this->belongsTo(Account::class, 'edited_by', 'id');
    }

    public function getUnseenMessagesForSupport()
    {
        return $this->messages()->where('seen', false)->where('support', false)->count();
    }

    public function getUnseenMessagesForPlayer()
    {
        return $this->messages()->where('seen', false)->where('support', true)->count();
    }

    public function setSeenMessagesForSupport()
    {
        return $this->messages()->where('seen', false)->where('support', false)->update(['seen' => true]);
    }

    public function setSeenMessagesForPlayer()
    {
        return $this->messages()->where('seen', false)->where('support', true)->update(['seen' => true]);
    }
}
