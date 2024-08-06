<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountTwofactorAllowed extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';
    protected $table = 'account_twofactor_allowed';
    protected $primaryKey = 'id';
}
