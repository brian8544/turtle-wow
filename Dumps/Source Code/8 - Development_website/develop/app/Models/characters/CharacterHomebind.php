<?php

namespace App\Models\characters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharacterHomebind extends Model
{
    use HasFactory;

    protected $table = 'character_homebind';

    protected $fillable = [
        'guid',
        'map',
        'zone',
        'position_x',
        'position_y',
        'position_z'
    ];

    public function character()
    {
        return $this->belongsTo(Character::class, 'guid', 'guid');
    }
}
