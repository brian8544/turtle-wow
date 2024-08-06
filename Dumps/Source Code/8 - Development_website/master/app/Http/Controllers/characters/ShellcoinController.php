<?php

namespace App\Http\Controllers\characters;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ShellcoinController extends Controller
{
    public function get()
    {
        ini_set('memory_limit', '2048M');
        $data = [];

        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['id']) {

                $stats[$key] = Cache::remember('shellcoin.' . $key, 300, function () use ($realm) {
                    return DB::connection($realm['id'])
                        ->select("SELECT time, count, price, DATE_FORMAT(FROM_UNIXTIME(time), '%b %e %H:%i') as date_nice
                                  FROM logs_shellcoin
                                  ORDER BY time");
                });

                $data[$key] = [
                    'labels' => [],
                    'dataA' => []
                ];

                foreach ($stats[$key] as $row) {
                    $data[$key]['labels'][] = $row->date_nice;
                    $data[$key]['dataA'][] = $row->price;
                }
            }
        }

        return $data;
    }

    public function get7d()
    {
        ini_set('memory_limit', '2048M');
        $data = [];

        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['id']) {

                $stats[$key] = Cache::remember('shellcoin7d.' . $key, 300, function () use ($realm) {
                    return DB::connection($realm['id'])
                        ->select("SELECT time, count, price, DATE_FORMAT(FROM_UNIXTIME(time), '%b %e %H:%i') as date_nice
                                  FROM logs_shellcoin
                                  WHERE time >= (UNIX_TIMESTAMP() - 7 * 24 * 60 * 60)
                                  ORDER BY time");
                });

                $data[$key] = [
                    'labels' => [],
                    'data7d' => []
                ];


                foreach ($stats[$key] as $row) {
                    $data[$key]['labels'][] = $row->date_nice;
                    $data[$key]['data7d'][] = $row->price;
                }
            }
        }

        return $data;
    }
}
