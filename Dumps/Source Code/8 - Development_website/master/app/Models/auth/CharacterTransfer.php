<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharacterTransfer extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';
    protected $table = 'character_transfers';

    protected $fillable = [
        'name',
        'source_realm_id',
        'source_account_id',
        'source_character_guid',
        'data',
        'target_realm_id',
        'target_account_id',
        'status',
    ];
}
