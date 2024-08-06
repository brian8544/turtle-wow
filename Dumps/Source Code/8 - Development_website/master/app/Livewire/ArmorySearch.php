<?php

namespace App\Livewire;

use App\Models\characters\Character;
use Illuminate\Support\Facades\DB;
use Livewire\Component;

class ArmorySearch extends Component
{
    public $selectedRealm = 0;
    public $searchResults;
    public $lastSearch = '';
    public $databaseConnection = 'mysql';
    public $realmName = '';
    public $searchCharacter = '';
    public $lastRealm = 0;

    public $classes = [
        1 => [
            'name' => 'Warrior',
            'icon' => 'Warrior'
        ],
        2 => [
            'name' => 'Paladin',
            'icon' => 'Paladin'
        ],
        3 => [
            'name' => 'Hunter',
            'icon' => 'Hunter'
        ],
        4 => [
            'name' => 'Rogue',
            'icon' => 'Rogue'
        ],
        5 => [
            'name' => 'Priest',
            'icon' => 'Priest'
        ],
        7 => [
            'name' => 'Shaman',
            'icon' => 'Shaman'
        ],
        8 => [
            'name' => 'Mage',
            'icon' => 'Mage'
        ],
        9 => [
            'name' => 'Warlock',
            'icon' => 'Warlock'
        ],
        11 => [
            'name' => 'Druid',
            'icon' => 'Druid'
        ]
    ];

    public $races = [
        1 => [
            'name' => 'Human',
            'icon' => 'Human'
        ],
        2 => [
            'name' => 'Orc',
            'icon' => 'Rrc'
        ],
        3 => [
            'name' => 'Dwarf',
            'icon' => 'Dwarf'
        ],
        4 => [
            'name' => 'Night Elf',
            'icon' => 'Nightelf'
        ],
        5 => [
            'name' => 'Undead',
            'icon' => 'Undead'
        ],
        6 => [
            'name' => 'Tauren',
            'icon' => 'Tauren'
        ],
        7 => [
            'name' => 'Gnome',
            'icon' => 'Gnome'
        ],
        8 => [
            'name' => 'Troll',
            'icon' => 'Troll'
        ],
        9 => [
            'name' => 'Goblin',
            'icon' => 'Goblin'
        ],
        10 => [
            'name' => 'High Elf',
            'icon' => 'High Elf'
        ]
    ];

    public function mount()
    {
        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['replication']) {
                $this->selectedRealm = $key;
                $this->databaseConnection = $realm['replication'];
                $this->realmName = $realm['name'];
                break;
            }
        }
    }

    public function setRealm($realmId)
    {
        $this->selectedRealm = $realmId;
        $this->databaseConnection = config('customs.realms')[$realmId]['replication'];
        $this->realmName = config('customs.realms')[$realmId]['name'];
        $this->searchResults = null;
        $this->searchCharacter = '';
        $this->render();
    }

    public function updated($name, $value)
    {
        if ($name == 'searchCharacter') {
            if (!empty($value)) {
                if ($this->lastSearch == $value && $this->lastRealm == $this->selectedRealm) {
                    return;
                }

                $this->lastSearch = $value;
                $this->lastRealm = $this->selectedRealm;

                $character = new Character;
                $character->setConnection($this->databaseConnection);

                $this->searchResults = DB::connection($this->databaseConnection)->table('characters')
                    ->select(
                        'characters.name',
                        'characters.level',
                        DB::raw('
                            CASE
                                WHEN characters.class = 1 THEN "Warrior"
                                WHEN characters.class = 2 THEN "Paladin"
                                WHEN characters.class = 3 THEN "Hunter"
                                WHEN characters.class = 4 THEN "Rogue"
                                WHEN characters.class = 5 THEN "Priest"
                                WHEN characters.class = 7 THEN "Shaman"
                                WHEN characters.class = 8 THEN "Mage"
                                WHEN characters.class = 9 THEN "Warlock"
                                WHEN characters.class = 11 THEN "Druid"
                            END as className
                        '),
                        DB::raw('
                            CASE
                                WHEN characters.class = 1 THEN "Warrior"
                                WHEN characters.class = 2 THEN "Paladin"
                                WHEN characters.class = 3 THEN "Hunter"
                                WHEN characters.class = 4 THEN "Rogue"
                                WHEN characters.class = 5 THEN "Priest"
                                WHEN characters.class = 7 THEN "Shaman"
                                WHEN characters.class = 8 THEN "Mage"
                                WHEN characters.class = 9 THEN "Warlock"
                                WHEN characters.class = 11 THEN "Druid"
                            END as classIcon
                        '),
                        DB::raw('
                            CASE
                                WHEN characters.race = 1 THEN "Human"
                                WHEN characters.race = 2 THEN "Orc"
                                WHEN characters.race = 3 THEN "Dwarf"
                                WHEN characters.race = 4 THEN "Night Elf"
                                WHEN characters.race = 5 THEN "Undead"
                                WHEN characters.race = 6 THEN "Tauren"
                                WHEN characters.race = 7 THEN "Gnome"
                                WHEN characters.race = 8 THEN "Troll"
                                WHEN characters.race = 9 THEN "Goblin"
                                WHEN characters.race = 10 THEN "High Elf"
                            END as raceName
                        '),
                        DB::raw('
                            CASE
                                WHEN characters.race IN (2, 5, 6, 8, 9) THEN "horde"
                                ELSE "alliance"
                            END as faction
                        ')
                    )
                    ->where('characters.name', 'like', $value . '%')
                    ->where('characters.account', '!=', 0)
                    ->where('characters.level', '>', 1)
                    ->limit(10)
                    ->orderBy('characters.level', 'desc')
                    ->get();
            } else {
                $this->searchResults = [];
            }
        }
    }

    public function render()
    {
        return view('livewire.armory-search');
    }
}
