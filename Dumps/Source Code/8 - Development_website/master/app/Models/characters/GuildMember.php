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
 *     schema="GuildMember",
 *     title="GuildMember",
 *     description="GuildMember model",
 *     @OA\Property(property="guildid", type="integer", format="int32"),
 *     @OA\Property(property="guid", type="integer", format="int32"),
 *     @OA\Property(property="rank", type="integer", format="int32"),
 *     @OA\Property(property="pnote", type="string"),
 *     @OA\Property(property="offnote", type="string"),
 * )
 */
class GuildMember extends Model
{
    use HasFactory;

    protected $connection = 'mysql3';
    protected $table = 'guild_member';
    protected $primaryKey = null;

    protected $fillable = [];

    public $incrementing = false;
}
