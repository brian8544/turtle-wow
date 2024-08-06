<?php

namespace App\Models\characters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharacterInventory extends Model
{
    use HasFactory;

    protected $connection = 'mysql3';
    protected $table = 'character_inventory';
    protected $primaryKey = 'guid';
    public $timestamps = false;
}
