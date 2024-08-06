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
 *     schema="AccountAccess",
 *     title="AccountAccess",
 *     description="AccountAccess model",
 *     @OA\Property(property="id", type="integer", format="int32"),
 *     @OA\Property(property="gmlevel", type="integer", format="int32"),
 *     @OA\Property(property="RealmID", type="integer", format="int32"),
 *     @OA\Property(property="name", type="string")
 * )
 */
class AccountAccess extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';
    protected $table = 'account_access';
    protected $primaryKey = 'id';

    protected $fillable = [
        'gmlevel',
        'RealmID'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class, 'id', 'id');
    }
}
