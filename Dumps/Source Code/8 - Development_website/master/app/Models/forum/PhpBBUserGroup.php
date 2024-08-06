<?php

namespace App\Models\forum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhpBBUserGroup extends Model
{
    use HasFactory;

    protected $connection = 'mysql10';
    protected $table = 'phpbb_user_group';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'group_id',
        'user_pending'
    ];
}
