<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopCoin extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';

    protected $table = 'shop_coins';

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'coins'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class, 'id', 'id');
    }
}
