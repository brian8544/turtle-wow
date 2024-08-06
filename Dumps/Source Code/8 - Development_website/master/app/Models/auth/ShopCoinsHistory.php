<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopCoinsHistory extends Model
{
    use HasFactory;

    protected $table = 'shop_coins_history';
    protected $connection = 'mysql2';
    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'account_id',
        'points',
        'actual_points',
        'new_points',
        'type',
        'system',
        'date',
        'reference'
    ];
}
