<?php

namespace App\Models\forum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhpBBUser extends Model
{
    use HasFactory;

    protected $connection = 'mysql10';
    protected $table = 'phpbb_users';
    protected $primaryKey = 'user_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'user_regdate',
        'username',
        'username_clean',
        'user_permissions',
        'user_sig',
        'user_password',
        'user_email',
        'user_lang',
        'user_style'
    ];
}
