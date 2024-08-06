<?php

namespace App\Http\Controllers\armory;

use App\Http\Controllers\Controller;
use App\Models\characters\Character;
use App\Models\characters\CharacterInventory;
use App\Models\world\ItemTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use SplFileObject;

class CharacterController extends Controller
{
    public function search()
    {
        $search = request('search');
        $realmId = request('realm_id');

        $characters = new Character;
        $characters->setConnection($realmId);

        $results = $characters->selectRaw("
        '' as name1, name, race, class, level, 'character' as type, 0 as entry, '' as spellIconId ")
            ->where('name', 'like', $search . "%")
            ->where('account', '!=', 0)
            ->where('level', '>=', 1)
            ->orderBy('name')
            ->take(10)
            ->get();

        return $results;

    }

    public function getCharacter()
    {
        ini_set('memory_limit', '512M');
        $name = request('name');
        $realmName = request('realmName');
        $foundRealmName = false;

        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['name'] == $realmName) {
                $realmId = $realm['replication'];
                $foundRealmName = true;
                break;
            }
        }

        if (!$foundRealmName) {
            return [];
        }

        $character = DB::connection($realmId)->table('characters')
            ->selectRaw("characters.guid, characters.name, characters.race, characters.class, characters.gender, characters.level, characters.honorRankPoints, characters.honorHighestRank, characters.playerBytes, characters.playerBytes2, characters.online, guild.name as `guild_name`, 0 as `ignore_titles`, 0 as `city_protector`, '' as `rank`, characters.ammoId")
            ->leftJoin('guild_member', 'characters.guid', '=', 'guild_member.guid')
            ->leftJoin('guild', 'guild_member.guildid', '=', 'guild.guildid')
            ->where('characters.name', $name)->first();

        if (!$character) {
            return [];
        }

        $guid = $character->guid;

        $skills = DB::connection($realmId)->table('character_skills')
            ->selectRaw("skill, value")
            ->where('guid', $guid)
            ->get();

        $reputation = DB::connection($realmId)->table('character_reputation')
            ->selectRaw("faction, standing")
            ->where('guid', $guid)
            ->orderBy('faction')
            ->get();

        foreach ($skills as $skill) {
            switch ($skill->skill) {
                case 129:
                    $skill->image = 'First Aid';
                    break;
                case 164:
                    $skill->image = 'Blacksmithing';
                    break;
                case 165:
                    $skill->image = 'Leatherworking';
                    break;
                case 171:
                    $skill->image = 'Alchemy';
                    break;
                case 182:
                    $skill->image = 'Herbalism';
                    break;
                case 185:
                    $skill->image = 'Cooking';
                    break;
                case 186:
                    $skill->image = 'Mining';
                    break;
                case 197:
                    $skill->image = 'Tailoring';
                    break;
                case 202:
                    $skill->image = 'Engineering';
                    break;
                case 333:
                    $skill->image = 'Enchanting';
                    break;
                case 356:
                    $skill->image = 'Fishing';
                    break;
                case 393:
                    $skill->image = 'Skinning';
                    break;
                case 142:
                    $skill->image = 'Survival';
                    break;
            }
        }

        $finalItems = $this->getItems();

        /*$faction = $this->getFactions();

        foreach ($reputation as $rep) {
            $rep->name = $faction[$rep->faction]['name_enUS'];
        }*/

        $characterItems = DB::connection($realmId)->table('character_inventory')
            ->selectRaw("itemEntry, slot, bag, item_instance.enchantments, item_instance.randomPropertyId, item_instance.durability ")
            ->leftJoin('characters', 'characters.guid', '=', 'character_inventory.guid')
            ->leftJoin('item_instance', function ($join) use ($guid) {
                $join->on('item_instance.itemEntry', '=', 'character_inventory.item_template')
                    ->where('item_instance.owner_guid', '=', $guid);
            })
            ->where('characters.guid', $guid)
            ->whereBetween('slot', [0, 18])
            ->where('bag', 0)
            ->orderBy('slot')
            ->get();

        $itemsBySlot = [];

        foreach ($characterItems as $characterItem) {
            $characterItem->displayId = $finalItems[$characterItem->itemEntry]['display_id'];
            $characterItem->classId = $finalItems[$characterItem->itemEntry]['class'];
            $characterItem->subclass = $finalItems[$characterItem->itemEntry]['subclass'];
            $characterItem->gems = [];
            $characterItem->name = $finalItems[$characterItem->itemEntry]['name'];
            $characterItem->inventory_type = $finalItems[$characterItem->itemEntry]['inventory_type'];
            $characterItem->enchantments = intval(explode(" ", $characterItem->enchantments)[0]);
            $characterItem->icon = $finalItems[$characterItem->itemEntry]['icon'];
            $characterItem->quality = $finalItems[$characterItem->itemEntry]['quality'];
            $characterItem->item_level = $finalItems[$characterItem->itemEntry]['item_level'];
            $characterItem->max_durability = $finalItems[$characterItem->itemEntry]['max_durability'];
            $characterItem->required_level = $finalItems[$characterItem->itemEntry]['required_level'];
            $characterItem->sell_price = $this->formatMoney($finalItems[$characterItem->itemEntry]['sell_price']);

            switch ($characterItem->quality) {
                case 0:
                    $characterItem->color = '9d9d9d';
                    $characterItem->qualityColor = 'Poor';
                    break;
                case 1:
                    $characterItem->color = 'ffffff';
                    $characterItem->qualityColor = 'Common';
                    break;
                case 2:
                    $characterItem->color = '1eff00';
                    $characterItem->qualityColor = 'Uncommon';
                    break;
                case 3:
                    $characterItem->color = '0070dd';
                    $characterItem->qualityColor = 'Rare';
                    break;
                case 4:
                    $characterItem->color = 'a335ee';
                    $characterItem->qualityColor = 'Epic';
                    break;
                case 5:
                    $characterItem->color = 'ff8000';
                    $characterItem->qualityColor = 'Legendary';
                    break;
                case 6:
                    $characterItem->color = 'e6cc80';
                    $characterItem->qualityColor = 'Artifact';
                    break;
            }

            $itemsBySlot[$characterItem->slot] = $characterItem;
        }

        if ($character->ammoId != 0) {

            $ammoItem = new \stdClass();
            $ammoItem->itemEntry = $character->ammoId;

            $ammoItem->displayId = $finalItems[$character->ammoId]['display_id'];
            $ammoItem->classId = $finalItems[$character->ammoId]['class'];
            $ammoItem->subclass = $finalItems[$character->ammoId]['subclass'];
            $ammoItem->gems = [];
            $ammoItem->name = $finalItems[$character->ammoId]['name'];
            $ammoItem->inventory_type = $finalItems[$character->ammoId]['inventory_type'];
            //$ammoItem->enchantments = intval(explode(" ", $ammoItem->enchantments)[0]);
            $ammoItem->icon = $finalItems[$character->ammoId]['icon'];
            $ammoItem->quality = $finalItems[$character->ammoId]['quality'];
            $ammoItem->item_level = $finalItems[$character->ammoId]['item_level'];
            $ammoItem->max_durability = $finalItems[$character->ammoId]['max_durability'];
            $ammoItem->required_level = $finalItems[$character->ammoId]['required_level'];
            $ammoItem->sell_price = $this->formatMoney($finalItems[$character->ammoId]['sell_price']);

            switch ($ammoItem->quality) {
                case 0:
                    $ammoItem->color = '9d9d9d';
                    $ammoItem->qualityColor = 'Poor';
                    break;
                case 1:
                    $ammoItem->color = 'ffffff';
                    $ammoItem->qualityColor = 'Common';
                    break;
                case 2:
                    $ammoItem->color = '1eff00';
                    $ammoItem->qualityColor = 'Uncommon';
                    break;
                case 3:
                    $ammoItem->color = '0070dd';
                    $ammoItem->qualityColor = 'Rare';
                    break;
                case 4:
                    $ammoItem->color = 'a335ee';
                    $ammoItem->qualityColor = 'Epic';
                    break;
                case 5:
                    $ammoItem->color = 'ff8000';
                    $ammoItem->qualityColor = 'Legendary';
                    break;
                case 6:
                    $ammoItem->color = 'e6cc80';
                    $ammoItem->qualityColor = 'Artifact';
                    break;
            }

            $itemsBySlot[19] = $ammoItem;
        }

        $ranks = [
            "0" => ["from" => -20000, "to" => -1, "Title_A" => "Dishonored", "Title_H" => "Dishonored"],
            "1" => ["from" => 0, "to" => 1999, "Title_A" => "Private", "Title_H" => "Scout"],
            "2" => ["from" => 2000, "to" => 4999, "Title_A" => "Corporal", "Title_H" => "Grunt"],
            "3" => ["from" => 5000, "to" => 9999, "Title_A" => "Sergeant", "Title_H" => "Sergeant"],
            "4" => ["from" => 10000, "to" => 14999, "Title_A" => "Master Sergeant", "Title_H" => "Senior Sergeant"],
            "5" => ["from" => 15000, "to" => 19999, "Title_A" => "Sergeant Major", "Title_H" => "First Sergeant"],
            "6" => ["from" => 20000, "to" => 24999, "Title_A" => "Knight", "Title_H" => "Stone Guard"],
            "7" => ["from" => 25000, "to" => 29999, "Title_A" => "Knight-Lieutenant", "Title_H" => "Blood Guard"],
            "8" => ["from" => 30000, "to" => 34999, "Title_A" => "Knight-Captain", "Title_H" => "Legionnaire"],
            "9" => ["from" => 35000, "to" => 39999, "Title_A" => "Knight-Champion", "Title_H" => "Centurion"],
            "10" => ["from" => 40000, "to" => 44999, "Title_A" => "Lieutenant Commander", "Title_H" => "Champion"],
            "11" => ["from" => 45000, "to" => 49999, "Title_A" => "Commander", "Title_H" => "Lieutenant General"],
            "12" => ["from" => 50000, "to" => 54999, "Title_A" => "Marshal", "Title_H" => "General"],
            "13" => ["from" => 55000, "to" => 59999, "Title_A" => "Field Marshal", "Title_H" => "Warlord"],
            "14" => ["from" => 60000, "to" => 60000, "Title_A" => "Grand Marshal", "Title_H" => "High Warlord"],
        ];

        $city_protector = ["",
            "Protector of Stormwind",
            "Overlord of Orgrimmar",
            "Thane of Ironforge",
            "High Sentinel of Darnassus",
            "Deathlord of the Undercity",
            "Chieftain of Thunderbluff",
            "Avenger of Gnomeregan",
            "Voodoo Boss of Sen'jin"
        ];

        $character = (array) $character;

        $character['skin'] = (intval($character['playerBytes'])) % 256;
        $character['face'] = (intval($character['playerBytes']) >> 8) % 256;
        $character['hairStyle'] = (intval($character['playerBytes']) >> 16) % 256;
        $character['hairColor'] = (intval($character['playerBytes']) >> 24) % 256;

        $character['facialStyle'] = (intval($character['playerBytes2'])) % 256;
        $character['pb']['fc'] = (intval($character['playerBytes2']) >> 8) % 256;
        $character['pb']['ep'] = (intval($character['playerBytes2']) >> 16) % 256;
        $character['pb']['ho'] = (intval($character['playerBytes2']) >> 24) % 256;
        $character['pb']['ta'] = (intval($character['playerBytes2']) >> 32) % 256;

        foreach ($ranks as $key => $rank) {

            if (intval($character['honorRankPoints']) >= $rank['from'] and intval($character['honorRankPoints']) <= $rank['to']) {
                if (in_array(intval($character['race']), [2, 5, 6, 8, 9])) {
                    $character['rank'] = $rank['Title_H'];
                } else {
                    $character['rank'] = $rank['Title_A'];
                }

                $character['rank_number'] = intval($key) < 9 ? '0' . $key : $key;
            }

        }

        if (intval($character['city_protector']) === 1 && intval($character['ignore_titles']) === 0) {
            $character['name'] = $character['name'] . ', ' . $city_protector[intval($character['race'])];
        }


        if (intval($character['ignore_titles']) === 1) {
            $character['rank'] = '';
            $character['rank_number'] = '0';
        }

        $character['equipment'] = $itemsBySlot;
        $character['talents'] = $this->getTalents($character['class']);
        $character['skills'] = $skills;

        switch ($character['race']) {
            case 1:
                $race = 'Human';
                break;
            case 2:
                $race = 'Orc';
                break;
            case 3:
                $race = 'Dwarf';
                break;
            case 4:
                $race = 'Night Elf';
                break;
            case 5:
                $race = 'Undead';
                break;
            case 6:
                $race = 'Tauren';
                break;
            case 7:
                $race = 'Gnome';
                break;
            case 8:
                $race = 'Troll';
                break;
            case 9:
                $race = 'Goblin';
                break;
            case 10:
                $race = 'High Elf';
                break;
        }

        switch ($character['class']) {
            case 1:
                $class = 'Warrior';
                break;
            case 2:
                $class = 'Paladin';
                break;
            case 3:
                $class = 'Hunter';
                break;
            case 4:
                $class = 'Rogue';
                break;
            case 5:
                $class = 'Priest';
                break;
            case 7:
                $class = 'Shaman';
                break;
            case 8:
                $class = 'Mage';
                break;
            case 9:
                $class = 'Warlock';
                break;
            case 11:
                $class = 'Druid';
                break;
        }

        $character['avatar'] = $class . '-' . str_replace(' ', '', strtolower($race)) . '-' . ($character['gender'] == 0 ? 'm-' : 'f-') . ($character['level'] == 60 ? '60' : '1');

        $character['reputation'] = $reputation;

        return $character;
    }

    public function getItems()
    {
        //Cache::forget('armoryItems');
        return Cache::remember('armoryItems', 60, function () {
            $itemDisplayInfo = storage_path('ItemDisplayInfo.csv');
            $dataArray = [];

            if (($handle = fopen($itemDisplayInfo, 'r')) !== false) {
                if (($keys = fgetcsv($handle, 1000, ",")) !== false) {
                    while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                        $dataArray[$data[0]] = array_combine($keys, $data);
                    }
                }
                fclose($handle);
            }

            $items = ItemTemplate::select(['entry', 'class', 'subclass', 'quality', 'display_id', 'name', 'inventory_type', 'item_level', 'max_durability', 'required_level', 'sell_price'])->get();
            $finalItems = [];

            foreach ($items as $item) {
                if (!empty($dataArray[$item->display_id])) {
                    $finalItems[$item->entry] = $item->toArray();
                    $finalItems[$item->entry]['icon'] = asset('storage/armory/images/icons/medium/' . strtolower($dataArray[$item->display_id]['inventoryIcon']) . '.png');
                }
            }

            return $finalItems;
        });
    }

    public function formatMoney(int $qty) : string
    {
        $money = '';

        if ($qty >= 10000)
        {
            $g = floor($qty / 10000);
            $money .= '<span class="moneygold">'.$g.'</span> ';
            $qty -= $g * 10000;
        }

        if ($qty >= 100)
        {
            $s = floor($qty / 100);
            $money .= '<span class="moneysilver">'.$s.'</span> ';
            $qty -= $s * 100;
        }

        if ($qty > 0)
            $money .= '<span class="moneycopper">'.$qty.'</span>';

        return $money;
    }

    public function getTalents($classId)
    {
        return Cache::remember("armoryTalents", 60, function () {
            $classesConst = [
                1 => ['class_id' => 1, 'name' => 'Warrior'],
                2 => ['class_id' => 2, 'name' => 'Paladin'],
                4 => ['class_id' => 3, 'name' => 'Hunter'],
                8 => ['class_id' => 4, 'name' => 'Rogue'],
                16 => ['class_id' => 5, 'name' => 'Priest'],
                64 => ['class_id' => 7, 'name' => 'Shaman'],
                128 => ['class_id' => 8, 'name' => 'Mage'],
                256 => ['class_id' => 9, 'name' => 'Warlock'],
                1024 => ['class_id' => 11, 'name' => 'Druid']
            ];

            $classes = [];

            $talentTabs = storage_path('TalentTab.csv');

            $talentTabsArray = [];

            if (($handle = fopen($talentTabs, 'r')) !== false) {
                if (($keys = fgetcsv($handle, 1000, ",")) !== false) {
                    while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                        $talentTabsArray[$data[0]] = array_combine($keys, $data);
                    }
                }
                fclose($handle);
            }

            $talents = storage_path('Talent.csv');

            $dataArray = [];

            if (($handle = fopen($talents, 'r')) !== false) {
                if (($keys = fgetcsv($handle, 1000, ",")) !== false) {
                    while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                        $dataArray[$data[1]][] = array_combine($keys, $data);
                    }
                }
                fclose($handle);
            }

            $finalArray = [];

            foreach ($talentTabsArray as $key => $value) {
                $finalArray[$key] = $value;
                $finalArray[$key]['t'] = $dataArray[$key];
            }

            foreach ($finalArray as $key1 => $value) {
                foreach ($value['t'] as $key2 => $talent) {
                    $spellRanks = [];

                    for ($i = 1; $i < 9; $i++) {
                        if ($talent['spellRank_' . $i] != 0) {
                            $spellRanks[] = $talent['spellRank_' . $i];
                        }
                    }
                    $value['t'][$key2]['s'] = $spellRanks;
                    $value['t'][$key2]['m'] = count($spellRanks);
                }
                $classes[$classesConst[$value['classMask']]['class_id']][] = $value;
            }

            return $classes;
        })[$classId];
    }

    public function getFactions()
    {
        return Cache::remember('armoryFactions', 60, function () {
            $faction = storage_path('Faction.csv');
            $dataArray = [];

            if (($handle = fopen($faction, 'r')) !== false) {
                if (($keys = fgetcsv($handle, 1000, ",")) !== false) {
                    while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                        $dataArray[$data[0]] = array_combine($keys, $data);
                    }
                }
                fclose($handle);
            }

            return $dataArray;
        });
    }

    public function getItemDisplayId($item)
    {

    }
}
