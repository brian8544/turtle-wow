<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerMessageImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'large',
        'medium',
        'thumbnail',
        'message_id'
    ];

    public function message()
    {
        return $this->belongsTo(BugTrackerMessage::class, 'message_id');
    }
}
