<?php

namespace App\Jobs;

use App\Models\characters\Character;
use App\Models\world\PlayerXpForLevel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;

class RefreshHardcorePage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        ini_set('memory_limit', '2048M');
        $playerXpForLevels = PlayerXpForLevel::all()->keyBy('lvl');


        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['replication'] && $realm['hardcore']) {
                $cacheKey1 = 'realm.' . $key . '.hardcore.1';
                $cacheKey2 = 'realm.' . $key . '.hardcore.3';
                $cacheKey3 = 'realm.' . $key . '.hardcore.2';
                $cacheKeyCount1 = 'realm.' . $key . '.hardcore.1.count';
                $cacheKeyCount2 = 'realm.' . $key . '.hardcore.3.count';
                $cacheKeyCount3 = 'realm.' . $key . '.hardcore.2.count';
                $topHighScore = new Character;
                $topHighScore->setConnection($realm['replication']);

                Cache::rememberForever($cacheKey1, function () use ($topHighScore, $playerXpForLevels) {
                    $data = $topHighScore->select(
                        'name', 'race', 'class', 'mortality_status', 'level', 'xp', 'logout_time'
                    )
                        ->whereIn('mortality_status', [1])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->orderBy('level', 'desc')
                        ->orderBy('xp', 'desc')
                        ->get();

                    foreach ($data as $key => $value) {
                        $data[$key]->percent = round($value->xp / $playerXpForLevels[$value->level]->xp_for_next_level * 100, 2);
                    }

                    return $data;
                });


                Cache::rememberForever($cacheKey2, function () use ($topHighScore, $playerXpForLevels) {
                    $data = $topHighScore->select(
                        'name', 'race', 'class', 'mortality_status', 'level', 'xp', 'logout_time'
                    )
                        ->whereIn('mortality_status', [3])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->orderBy('level', 'desc')
                        ->orderBy('xp', 'desc')
                        ->get();

                    foreach ($data as $key => $value) {
                        $data[$key]->percent = round($value->xp / $playerXpForLevels[$value->level]->xp_for_next_level * 100, 2);
                    }

                    return $data;
                });

                Cache::rememberForever($cacheKey3, function () use ($topHighScore, $playerXpForLevels) {
                    $data = $topHighScore->select(
                        'name', 'race', 'class', 'mortality_status', 'level', 'xp', 'logout_time'
                    )
                        ->whereIn('mortality_status', [2])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->orderBy('level', 'desc')
                        ->orderBy('xp', 'desc')
                        ->get();

                    foreach ($data as $key => $value) {
                        $data[$key]->percent = round($value->xp / $playerXpForLevels[$value->level]->xp_for_next_level * 100, 2);
                    }

                    return $data;
                });

                Cache::rememberForever($cacheKeyCount1, function () use ($topHighScore) {
                    return $topHighScore->select(
                        'name', 'mortality_status', 'level'
                    )
                        ->whereIn('mortality_status', [1])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->get()->count();
                });
                Cache::rememberForever($cacheKeyCount2, function () use ($topHighScore) {
                    return $topHighScore->select(
                        'name', 'mortality_status', 'level'
                    )
                        ->whereIn('mortality_status', [3])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->get()->count();
                });
                Cache::rememberForever($cacheKeyCount3, function () use ($topHighScore) {
                    return $topHighScore->select(
                        'name', 'mortality_status', 'level'
                    )
                        ->whereIn('mortality_status', [2])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->get()->count();
                });
            }
        }
    }
}
