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
 *     schema="Guild",
 *     title="Guild",
 *     description="Guild model",
 *     @OA\Property(property="guildid", type="integer", format="int32"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="leaderguid", type="integer", format="int32"),
 *     @OA\Property(property="EmblemStyle", type="integer", format="int32"),
 *     @OA\Property(property="EmblemColor", type="integer", format="int32"),
 *     @OA\Property(property="BorderStyle", type="integer", format="int32"),
 *     @OA\Property(property="BorderColor", type="integer", format="int32"),
 *     @OA\Property(property="BackgroundColor", type="integer", format="int32"),
 *     @OA\Property(property="info", type="string"),
 *     @OA\Property(property="motd", type="string"),
 *     @OA\Property(property="createdate", type="integer", format="int64"),
 * )
 */
class Guild extends Model
{
    use HasFactory;

    protected $connection = 'mysql3';
    protected $table = 'guild';
    protected $primaryKey = 'guildid';

    protected $fillable = [];
}
