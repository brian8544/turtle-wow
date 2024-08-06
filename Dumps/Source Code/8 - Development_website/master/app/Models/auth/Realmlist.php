<?php

namespace App\Models\auth;

use App\Models\BugTracker;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Realmlist extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';
    protected $table = 'realmlist';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'address',
        'port',
        'icon',
        'realmflags',
        'timezone',
        'allowedSecurityLevel',
        'population',
        'realmbuilds'
    ];

    public function BugTrackers()
    {
        return $this->belongsToMany(BugTracker::class, 'pivot_bug_tracker_realmlists', 'realm_id', 'bug_tracker_id');
    }
}
