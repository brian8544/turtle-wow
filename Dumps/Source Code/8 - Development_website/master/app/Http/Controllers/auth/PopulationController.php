<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\auth\StatisticsOnline;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class PopulationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/characters/population",
     *     summary="Get population statistics",
     *     operationId="getPopulationStatistics",
     *     tags={"Character"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="week_name", type="string"),
     *                 @OA\Property(property="year", type="integer"),
     *                 @OA\Property(property="week", type="integer"),
     *                 @OA\Property(property="m_a", type="integer"),
     *                 @OA\Property(property="m_h", type="integer"),
     *                 @OA\Property(property="date_nice", type="string")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *     ),
     * )
     */
    public function stats()
    {
        $cacheKey = 'populationGraph';

        $stats = Cache::remember($cacheKey, 43200, function () {
            $today = now();

            $isSunday = $today->isSunday();

            if ($isSunday) {
                $startOfWeek = $today->startOfWeek()->timestamp;
            } else {
                $startOfWeek = 0;
            }

            return StatisticsOnline::query()
                ->selectRaw("CONCAT(YEAR(FROM_UNIXTIME(date)), '/', WEEK(FROM_UNIXTIME(date))) AS week_name,
                    YEAR(FROM_UNIXTIME(date)) as year, WEEK(FROM_UNIXTIME(date)) as week, max(total_alli) as m_a, max(total_horde) as m_h,
                    max(queue) as m_q, DATE_FORMAT(FROM_UNIXTIME(date), '%d/%m/%Y') as date_nice, realm")
                ->whereRaw('FROM_UNIXTIME(date) >= DATE_SUB(NOW(), INTERVAL 3 MONTH)')
                ->when($isSunday, function ($query) use ($startOfWeek) {
                    return $query->whereRaw('date < ?', [$startOfWeek]);
                })
                ->groupBy('week_name', 'realm')
                ->orderBy(DB::raw('YEAR(FROM_UNIXTIME(date))'), 'ASC')
                ->orderBy(DB::raw('WEEK(FROM_UNIXTIME(date))'), 'ASC')
                ->get();
        });

        $result = [];

        foreach ($stats as $row) {
            $realm = $row->realm;
            if (!array_key_exists($realm, $result)) {
                $result[$realm] = [
                    'labels' => [],
                    'dataA' => [],
                    'dataH' => [],
                    'dataQ' => [],
                    'dataT' => [],
                    'dataC' => [],
                ];
            }
            $result[$realm]['labels'][] = $row->date_nice;
            $result[$realm]['dataA'][] = $row->m_a;
            $result[$realm]['dataH'][] = $row->m_h;
            $result[$realm]['dataQ'][] = $row->m_q;
            $result[$realm]['dataT'][] = $row->m_a + $row->m_h;
            $result[$realm]['dataC'][] = $row->m_a + $row->m_h + $row->m_q;
        }

        return $result;
    }
}
