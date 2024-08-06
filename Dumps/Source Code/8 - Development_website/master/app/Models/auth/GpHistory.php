<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpHistory extends Model
{
    use HasFactory;

    protected $table = 'gp_history';

    protected $connection = 'mysql2';

    public $timestamps = false;

    protected $fillable = [
        'account_id',
        'code'
    ];
}
