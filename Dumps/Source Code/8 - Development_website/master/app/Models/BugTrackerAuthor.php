<?php

namespace App\Models;

use App\Models\auth\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerAuthor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'account_id',
        'realm_id'
    ];

    public function account()
    {
        return $this->setConnection('mysql2')->belongsTo(Account::class, 'account_id', 'id');
    }
}
