<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendingCommand extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';
    protected $table = 'pending_commands';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'realm_id',
        'command',
        'run_at_time'
    ];
}
