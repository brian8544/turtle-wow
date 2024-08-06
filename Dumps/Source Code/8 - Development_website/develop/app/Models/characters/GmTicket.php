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
 *     schema="GmTicket",
 *     title="GmTicket",
 *     description="GmTicket model",
 *     @OA\Property(property="ticketId", type="integer", format="int32"),
 *     @OA\Property(property="guid", type="integer", format="int32"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="message", type="string"),
 *     @OA\Property(property="createTime", type="integer", format="int32"),
 *     @OA\Property(property="mapId", type="integer", format="int32"),
 *     @OA\Property(property="posX", type="number", format="float"),
 *     @OA\Property(property="posY", type="number", format="float"),
 *     @OA\Property(property="posZ", type="number", format="float"),
 *     @OA\Property(property="lastModifiedTime", type="integer", format="int32"),
 *     @OA\Property(property="closedBy", type="integer", format="int32"),
 *     @OA\Property(property="assignedTo", type="integer", format="int32"),
 *     @OA\Property(property="comment", type="string"),
 *     @OA\Property(property="response", type="string"),
 *     @OA\Property(property="completed", type="integer", format="int32"),
 *     @OA\Property(property="escalated", type="integer", format="int32"),
 *     @OA\Property(property="viewed", type="integer", format="int32"),
 *     @OA\Property(property="haveTicket", type="number", format="float"),
 *     @OA\Property(property="ticketType", type="integer", format="int32"),
 *     @OA\Property(property="securityNeeded", type="integer", format="int32"),
 * )
 */
class GmTicket extends Model
{
    use HasFactory;

    protected $connection = 'mysql3';
    protected $table = 'gm_tickets';
    protected $primaryKey = 'ticketId';

    const CREATED_AT = 'createTime';
    const UPDATED_AT = 'lastModifiedTime';

    protected $dates = [
        'lastModifiedTime',
        'createTime'
    ];

    protected $fillable = [
        'ticketId',
        'guid',
        'name',
        'message',
        'createTime',
        'mapId',
        'posX',
        'posY',
        'posZ',
        'lastModifiedTime',
        'closedBy',
        'assignedTo',
        'comment',
        'response',
        'completed',
        'escalated',
        'viewed',
        'haveTicket',
        'ticketType',
        'securityNeeded'
    ];


}
