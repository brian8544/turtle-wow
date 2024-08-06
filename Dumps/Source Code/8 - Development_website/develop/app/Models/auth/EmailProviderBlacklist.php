<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailProviderBlacklist extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';
    protected $table = 'email_provider_blacklist';
    public $timestamps = false;

    protected $fillable = [
        'domain',
        'banned',
    ];
}
