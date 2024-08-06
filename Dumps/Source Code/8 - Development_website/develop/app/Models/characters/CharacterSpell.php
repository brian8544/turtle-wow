<?php

namespace App\Models\characters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharacterSpell extends Model
{
    use HasFactory;

    protected $table = 'character_spell';
    protected $primaryKey = 'guid';
    public $timestamps = false;
}
