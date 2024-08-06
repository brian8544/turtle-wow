<?php

namespace App\Models\characters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharacterSpellCooldown extends Model
{
    use HasFactory;

    protected $table = 'character_spell_cooldown';

    protected $fillable = [
        'guid',
        'spell',
        'item',
        'time',
        'catTime'
    ];

    public function character()
    {
        return $this->belongsTo(Character::class, 'guid', 'guid');
    }
}
