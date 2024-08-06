<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Operations related to Auth database"
 * )
 */
/**
 * @OA\Schema(
 *     schema="StatisticsOnline",
 *     title="StatisticsOnline",
 *     description="StatisticsOnline model",
 *     @OA\Property(property="guid", type="integer"),
 *     @OA\Property(property="online", type="integer"),
 *     @OA\Property(property="online_alli", type="integer"),
 *     @OA\Property(property="online_horde", type="integer"),
 *     @OA\Property(property="connections", type="integer"),
 *     @OA\Property(property="realm", type="integer"),
 *     @OA\Property(property="date", type="integer")
 * )
 */
class StatisticsOnline extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';
    protected $table = 'statistics_online';
    protected $primaryKey = 'guid';
    public $timestamps = false;

    protected $fillable = [
        'online',
        'online_alli',
        'online_horde',
        'connections',
        'queue',
        'realm',
        'date',
    ];
}
