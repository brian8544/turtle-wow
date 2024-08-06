<?php

namespace App\Models\characters;

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
 *     schema="HardcoreDeath",
 *     title="HardcoreDeath",
 *     description="HardcoreDeath model",
 *     @OA\Property(property="lowGuid", type="integer", description="Character's low GUID"),
 *     @OA\Property(property="race", type="integer", description="Character's race"),
 *     @OA\Property(property="class", type="integer", description="Character's class"),
 *     @OA\Property(property="level", type="integer", description="Character's level"),
 *     @OA\Property(property="attackerEntry", type="integer", description="Attacker's entry"),
 *     @OA\Property(property="position_x", type="number", format="float", description="Position X"),
 *     @OA\Property(property="position_y", type="number", format="float", description="Position Y"),
 *     @OA\Property(property="position_z", type="number", format="float", description="Position Z"),
 *     @OA\Property(property="mapId", type="integer", description="Map ID"),
 * )
 */
class HardcoreDeath extends Model
{
    use HasFactory;

    protected $connection = 'mysql3';
    protected $table = 'hardcore_deaths';
    protected $primaryKey = 'lowGuid';
    public $timestamps = false;

    protected $fillable = [
        'lowGuid',
        'race',
        'class',
        'level',
        'attackerEntry',
        'position_x',
        'position_y',
        'position_z',
        'mapId',
    ];
}
