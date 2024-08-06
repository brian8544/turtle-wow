<?php

namespace App\Models\world;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Tag(
 *     name="Characters",
 *     description="Operations related to Characters database"
 * )
 */
/**
 * @OA\Schema(
 *     schema="PlayerXpForLevel",
 *     title="PlayerXpForLevel",
 *     description="PlayerXpForLevel model",
 *     @OA\Property(property="lvl", type="integer", description="Character's level"),
 *     @OA\Property(property="xp_for_next_level", type="integer", description="Experience points required for the next level"),
 * )
 */
class PlayerXpForLevel extends Model
{
    use HasFactory;

    protected $connection = 'mysql4';
    protected $table = 'player_xp_for_level';
    protected $primaryKey = 'lvl';
    public $timestamps = false;

    protected $fillable = [
        'lvl',
        'xp_for_next_level',
    ];
}
