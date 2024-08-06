<?php

namespace App\Models\auth;

use App\Models\BanAppeal;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountBanned extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';

    protected $table = 'account_banned';

    protected $primaryKey = 'banid';

    public $timestamps = false;

    protected $fillable = [
        'bandate',
        'unbandate',
        'bannedby',
        'banreason',
        'active',
        'id',
        'realm',
        'gmlevel'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class, 'id', 'id');
    }

    public function gm()
    {
        return $this->belongsTo(Account::class, 'bannedby', 'username');
    }

    public function banAppeal()
    {
        return $this->setConnection('mysql')->hasMany(BanAppeal::class, 'ban_id', 'banid');
    }

    public function latestBanAppeal()
    {
        return $this->banAppeal()->orderBy('id', 'DESC')->first();
    }
}
