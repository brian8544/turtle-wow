<?php

namespace App\Http\Controllers\characters;

use App\Http\Controllers\Controller;
use App\Models\characters\Character;

class HardcoreController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/characters/hardcore/stats",
     *     operationId="getCharacterHardcoreStats",
     *     tags={"Character"},
     *     summary="Get character hardcore stats",
     *     description="Retrieve character hardcore stats with filtering and pagination.",
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
     *     @OA\Parameter(
     *         name="mortality_status",
     *         in="query",
     *         description="Filter by character's hardcore status (1, 2, or 3)",
     *         required=false,
     *         @OA\Schema(
     *             type="array",
     *             @OA\Items(type="integer", enum={1, 2, 3})
     *         ),
     *         style="form",
     *         explode=true
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="current_page", type="integer", description="Current page number"),
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="name", type="string", description="Character's name"),
     *                     @OA\Property(property="race", type="string", enum={"Human", "Orc", "Dwarf", "Nightelf", "Undead", "Tauren", "Gnome", "Troll", "Goblin", "Highelf"}, description="Character's race"),
     *                     @OA\Property(property="class", type="string", enum={"Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Warlock", "Druid"}, description="Character's class"),
     *                     @OA\Property(property="gender", type="string", description="Character's gender"),
     *                     @OA\Property(property="mortality_status", type="integer", description="Character's hardcore status"),
     *                     @OA\Property(property="level", type="integer", description="Character's level"),
     *                     @OA\Property(property="percent", type="number", description="Character's level percent"),
     *                     @OA\Property(property="logout_time", type="string", description="Character's logout last time"),
     *                  ),
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
        $classes = [
            '',
            'Warrior',
            'Paladin',
            'Hunter',
            'Rogue',
            'Priest',
            '',
            'Shaman',
            'Mage',
            'Warlock',
            '',
            'Druid'
        ];
        $races = [
            '',
            'Human',
            'Orc',
            'Dwarf',
            'Nightelf',
            'Undead',
            'Tauren',
            'Gnome',
            'Troll',
            'Goblin',
            'Highelf'
        ];

        $mortalityStatuses = [1, 2, 3];

        $requestedMortalityStatuses = request()->input('mortality_status', $mortalityStatuses);

        if (!is_array($requestedMortalityStatuses)) {
            $requestedMortalityStatuses = explode(',', $requestedMortalityStatuses);
        }

        $filteredMortalityStatuses = array_intersect($mortalityStatuses, $requestedMortalityStatuses);

        $query = Character::select('name', 'race', 'class', 'gender', 'mortality_status', 'level',
            \DB::raw('ROUND(c.xp/pxl.xp_for_next_level * 100, 2) AS percent'), 'logout_time')
            ->leftJoin(env('DB_TURTLE_WORLD_DATABASE') . '.player_xp_for_level AS pxl', 'pxl.lvl', '=', 'characters.level')
            ->where('level', '>=', 10)
            ->where('name', '!=', '')
            ->whereIn('mortality_status', $filteredMortalityStatuses)
            ->orderBy('level', 'desc')
            ->orderBy('percent', 'desc');

        $perPage = request()->input('per_page', 15);
        $currentPage = request()->input('page', 1);
        $stats = $query->paginate($perPage, ['*'], 'page', $currentPage);

        return response()->json($stats);
    }
}
