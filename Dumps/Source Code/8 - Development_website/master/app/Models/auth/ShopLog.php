<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopLog extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';

    protected $table = 'shop_logs';

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'time',
        'guid',
        'account',
        'item',
        'price',
        'refunded',
        'realm_id'
    ];
}
