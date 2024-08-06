<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Models\characters\Character;
use App\Models\world\PlayerXpForLevel;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Livewire\WithPagination;

class HardcoreModal extends Component
{
    use WithPagination;

    public $paginationNumber = 100;
    public $charactersCount = 0;
    public $mortalityStatus = 1;
    public $realm = 1;
    public $title;

    protected $listeners = [
        'openModal'
    ];

    protected $paginationTheme = 'bootstrap';

    public function mount()
    {
        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['replication'] && $realm['hardcore']) {
                $this->realm = $key;
                break;
            }
        }

        $this->render();
    }

    public function openModal($mortalityStatus, $realm)
    {
        $this->mortalityStatus = $mortalityStatus;
        $this->realm = $realm;
        $this->render();
    }

    public function render()
    {
        ini_set('memory_limit', '2048M');
        $dbPlayerXpForLevel = new PlayerXpForLevel;
        $dbPlayerXpForLevel = $dbPlayerXpForLevel->getConnection()->getDatabaseName();

        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['replication'] && $key == $this->realm && $realm['hardcore']) {
                $cacheKey = 'realm.' . $key . '.hardcore.' .$this->mortalityStatus;
                $cacheKeyCount = 'realm.' . $key . '.hardcore.' .$this->mortalityStatus . '.count';

                $topHighScore = new Character;
                $topHighScore->setConnection($realm['replication']);
                $dbCharacters = $topHighScore->getConnection()->getDatabaseName();

                $mortalityStatus = $this->mortalityStatus;

                $characters = Cache::rememberForever($cacheKey, function () use ($topHighScore, $dbCharacters, $dbPlayerXpForLevel, $mortalityStatus) {
                    return $topHighScore->select(
                        'name', 'race', 'class', 'mortality_status', 'level',
                        DB::raw('ROUND(' . $dbCharacters . '.characters.xp/' . $dbPlayerXpForLevel . '.player_xp_for_level.xp_for_next_level * 100, 2) AS percent'),
                        'logout_time'
                    )
                        ->leftJoin($dbPlayerXpForLevel . '.player_xp_for_level', function($join) use ($dbPlayerXpForLevel, $dbCharacters) {
                            $join->on($dbPlayerXpForLevel . '.player_xp_for_level.lvl', '=', $dbCharacters . '.characters.level');
                        })
                        ->whereIn('mortality_status', [$mortalityStatus])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->orderBy('level', 'desc')
                        ->orderBy('percent', 'desc')
                        ->get();
                });

                $characters = collect($characters)->forPage($this->getPage(), $this->paginationNumber)->values();

                $this->charactersCount = Cache::rememberForever($cacheKeyCount, function () use ($topHighScore, $mortalityStatus) {
                    return $topHighScore->select(
                        'name', 'mortality_status', 'level'
                    )
                        ->whereIn('mortality_status', [$mortalityStatus])
                        ->where('level', '>=', 10)
                        ->where('level', '<=', 60)
                        ->where('name', '!=', '')
                        ->get()->count();
                });

                $charactersPaginate = new LengthAwarePaginator(
                    $characters,
                    $this->charactersCount,
                    $this->paginationNumber,
                    $this->getPage()
                );


            }
        }

        switch ($this->mortalityStatus) {
            case 1:
                $this->title = __('hardcore')['still_standing'] . " " . __('custom.hc_table_label', ['current' => $this->paginationNumber, 'total' => $this->charactersCount]);
                break;
            case 2:
                $this->title = __('hardcore')['immortals'] . " " . __('custom.hc_table_label', ['current' => $this->paginationNumber, 'total' => $this->charactersCount]);
                break;
            case 3:
                $this->title = __('hardcore')['fallen_heroes'] . " " . __('custom.hc_table_label', ['current' => $this->paginationNumber, 'total' => $this->charactersCount]);
                break;
        }
        return view('livewire.hardcore-modal', compact('characters', 'charactersPaginate'));
    }
}
