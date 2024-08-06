<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountTransferName extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';

    protected $table = 'account_transfer_names';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'names'
    ];
}
