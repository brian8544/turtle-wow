<?php

namespace App\Http\Controllers\characters;

use App\Http\Controllers\Controller;
use App\Models\auth\AccountAccess;
use App\Models\characters\Character;

class CharacterController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/characters/online",
     *     operationId="getOnlineCharacters",
     *     tags={"Character"},
     *     summary="Get online characters",
     *     description="Returns a list of online characters excluding GM accounts",
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Number of results per page",
     *         required=false,
     *         @OA\Schema(type="integer", default=15)
     *     ),
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="current_page", type="integer", description="Current page number"),
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="guid", type="integer", description="Character's GUID"),
     *                     @OA\Property(property="name", type="string", description="Character's name"),
     *                     @OA\Property(property="race", type="integer", description="Character's race"),
     *                     @OA\Property(property="class", type="integer", description="Character's class"),
     *                     @OA\Property(property="gender", type="integer", description="Character's gender"),
     *                     @OA\Property(property="level", type="integer", description="Character's level"),
     *                     @OA\Property(property="map", type="integer", description="Character's map"),
     *                     @OA\Property(property="zone", type="integer", description="Character's zone"),
     *                     @OA\Property(property="guildId", type="integer", description="Character's guild ID"),
     *                     @OA\Property(property="guildName", type="string", description="Character's guild name"),
     *                 ),
     *             ),
     *             @OA\Property(property="first_page_url", type="string", description="URL of the first page"),
     *             @OA\Property(property="from", type="integer", description="Index of the first item in the current page"),
     *             @OA\Property(property="last_page", type="integer", description="Last page number"),
     *             @OA\Property(property="last_page_url", type="string", description="URL of the last page"),
     *             @OA\Property(property="links", type="array", description="Pagination links",
     *                 @OA\Items(
     *                     @OA\Property(property="url", type="string", description="URL of the page"),
     *                     @OA\Property(property="label", type="string", description="Label of the link"),
     *                     @OA\Property(property="active", type="boolean", description="Is the link active"),
     *                 )
     *             ),
     *             @OA\Property(property="next_page_url", type="string", description="URL of the next page"),
     *             @OA\Property(property="path", type="string", description="URL path of the current page"),
     *             @OA\Property(property="per_page", type="integer", description="Number of results per page"),
     *             @OA\Property(property="prev_page_url", type="string", description="URL of the previous page"),
     *             @OA\Property(property="to", type="integer", description="Index of the last item in the current page"),
     *             @OA\Property(property="total", type="integer", description="Total number of results"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *     ),
     * )
     */

    public function online()
    {
        $accountGMs = AccountAccess::where('gmlevel', '>', 0)->pluck('id')->toArray();

        $query = Character::query()
            ->leftJoin('guild_member as gm', 'gm.guid', '=', 'characters.guid')
            ->leftJoin('guild as g', 'g.guildid', '=', 'gm.guildid')
            ->where('online', 1)
            ->whereNotIn('account', $accountGMs)
            ->select([
                'characters.guid as guid',
                'characters.name as name',
                'characters.race as race',
                'characters.class as class',
                'characters.gender as gender',
                'characters.level as level',
                'characters.map as map',
                'characters.zone as zone',
                'gm.guildid as guildId',
                'g.name as guildName',
            ]);

        $perPage = request()->input('per_page', 15);

        $currentPage = request()->input('page', 1);

        $characters = $query->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json($characters);
    }

    /**
     * @OA\Get(
     *     path="/api/characters/stats",
     *     operationId="getStats",
     *     tags={"Character"},
     *     summary="Get character statistics",
     *     description="Returns statistics for characters",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="current_page", type="integer", description="Current page number"),
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="race", type="integer", description="Character's race"),
     *                     @OA\Property(property="class", type="integer", description="Character's class"),
     *                     @OA\Property(property="level", type="integer", description="Character's level"),
     *                 ),
     *             ),
     *             @OA\Property(property="first_page_url", type="string", description="URL of the first page"),
     *             @OA\Property(property="from", type="integer", description="Index of the first item in the current page"),
     *             @OA\Property(property="last_page", type="integer", description="Last page number"),
     *             @OA\Property(property="last_page_url", type="string", description="URL of the last page"),
     *             @OA\Property(property="links", type="array", description="Pagination links",
     *                 @OA\Items(
     *                     @OA\Property(property="url", type="string", description="URL of the page"),
     *                     @OA\Property(property="label", type="string", description="Label of the link"),
     *                     @OA\Property(property="active", type="boolean", description="Is the link active"),
     *                 )
     *             ),
     *             @OA\Property(property="next_page_url", type="string", description="URL of the next page"),
     *             @OA\Property(property="path", type="string", description="URL path of the current page"),
     *             @OA\Property(property="per_page", type="integer", description="Number of results per page"),
     *             @OA\Property(property="prev_page_url", type="string", description="URL of the previous page"),
     *             @OA\Property(property="to", type="integer", description="Index of the last item in the current page"),
     *             @OA\Property(property="total", type="integer", description="Total number of results"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *     ),
     * )
     */
    public function stats()
    {
        $query = Character::select('race', 'class', 'level');

        $perPage = request()->input('per_page', 15);

        $currentPage = request()->input('page', 1);

        $stats = $query->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json($stats);
    }
}
