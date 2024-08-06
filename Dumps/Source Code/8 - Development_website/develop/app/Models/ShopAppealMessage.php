<?php

namespace App\Models;

use App\Models\auth\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopAppealMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_appeal_id',
        'account_id',
        'message',
        'seen',
        'support'
    ];

    public function account()
    {
        return $this->setConnection('mysql2')->belongsTo(Account::class, 'account_id', 'id');
    }

    public function shopAppeal()
    {
        return $this->belongsTo(ShopAppeal::class, 'id', 'shop_appeal_id');
    }
}
