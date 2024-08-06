<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Models\characters\Character;
use App\Models\world\PlayerXpForLevel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Livewire\WithPagination;

class Hardcore extends Component
{
    use WithPagination;

    public $selectedRealm = 0;
    public $paginationNumber = 50;

    public function mount()
    {
        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['id'] && $realm['hardcore']) {
                $this->selectedRealm = $key;
                break;
            }
        }

        $this->render();
    }

    public function setRealm($realmId)
    {
        $this->selectedRealm = $realmId;
        $this->render();
    }

    public function render()
    {
        ini_set('memory_limit', '2048M');
        $playerXpForLevels = PlayerXpForLevel::all()->keyBy('lvl');


        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['replication'] && $realm['hardcore'] && $key == $this->selectedRealm) {
                $cacheKey1 = 'realm.' . $key . '.hardcore.1';
                $cacheKey2 = 'realm.' . $key . '.hardcore.3';
                $cacheKey3 = 'realm.' . $key . '.hardcore.2';
                $cacheKeyCount1 = 'realm.' . $key . '.hardcore.1.count';
                $cacheKeyCount2 = 'realm.' . $key . '.hardcore.3.count';
                $cacheKeyCount3 = 'realm.' . $key . '.hardcore.2.count';
                $topHighScore = new Character;
                $topHighScore->setConnection($realm['replication']);

                $alive = Cache::rememberForever($cacheKey1, function () use ($topHighScore, $playerXpForLevels) {
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

                $alive = collect($alive)->forPage($this->getPage(), $this->paginationNumber)->values();

                $dead = Cache::rememberForever($cacheKey2, function () use ($topHighScore, $playerXpForLevels) {
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

                $dead = collect($dead)->forPage($this->getPage(), $this->paginationNumber)->values();

                $immortals = Cache::rememberForever($cacheKey3, function () use ($topHighScore, $playerXpForLevels) {
                    $data =  $topHighScore->select(
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

                $immortals = collect($immortals)->forPage($this->getPage(), $this->paginationNumber)->values();

                $stillStanding = $alive;
                $fallen = $dead;

                $stillStandingCount = Cache::rememberForever($cacheKeyCount1, function () use ($topHighScore) {
                    return $topHighScore->select(
                        'name', 'mortality_status', 'level'
                    )
                        ->whereIn('mortality_status', [1])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->get()->count();
                });
                $fallenCount = Cache::rememberForever($cacheKeyCount2, function () use ($topHighScore) {
                    return $topHighScore->select(
                        'name', 'mortality_status', 'level'
                    )
                        ->whereIn('mortality_status', [3])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->get()->count();
                });
                $immortalsCount = Cache::rememberForever($cacheKeyCount3, function () use ($topHighScore) {
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

        return view('livewire.hardcore', compact('stillStanding', 'stillStandingCount', 'fallen', 'fallenCount', 'immortals', 'immortalsCount'));
    }
}
