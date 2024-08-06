<?php

namespace App\Livewire;

use App\Models\characters\Character;
use App\Models\characters\CharacterSpellCooldown;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Carbon\Carbon;

class ProfileServices extends Component
{
    public $message = '';
    public $character;
    public $selectedRealm = 0;
    public $databaseConnection = 'mysql';
    public $characters;

    public function mount()
    {
        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['id']) {
                $this->selectedRealm = $key;
                $this->databaseConnection = $realm['id'];
                break;
            }
        }

        $this->render();
    }

    public function unstuck()
    {
        $this->message = '';
        $character = new Character;
        $character->setConnection($this->databaseConnection);
        $character = $character->where('characters.guid', $this->character);

        $characterData = $character->select(
            'characters.guid', 'characters.name', 'characters.class', 'characters.race', 'characters.level', 'characters.online', 'character_spell_cooldown.spell', 'character_spell_cooldown.item', 'character_spell_cooldown.time', 'character_spell_cooldown.catTime', 'character_homebind.map', 'character_homebind.zone', 'character_homebind.position_x', 'character_homebind.position_y', 'character_homebind.position_z'
        )
            ->leftJoin('character_spell_cooldown', 'character_spell_cooldown.guid', '=', 'characters.guid')
            ->leftJoin('character_homebind', 'character_homebind.guid', '=', 'characters.guid')
            ->first();

        if ($characterData) {

            if ($characterData->online == 1) {
                $this->message = __('page_profile')['services']['exception']['character_online'];
                return;
            }

            if ($characterData->spell == 8690) {
                $this->message = __('custom.hearthstone_cd', ['cd' =>  Carbon::createFromTimestamp($characterData->time)->diffForHumans()]);
                return;
            }

            $colldown = Carbon::now()->addMinutes(60)->timestamp;

            $data = [
                [
                    'guid' => $characterData->guid,
                    'spell' => 8690,
                    'item' => 6948,
                    'time' => $colldown,
                    'catTime' => $colldown
                ]
            ];

            $existingCooldown = CharacterSpellCooldown::on($this->databaseConnection)
                ->where('guid', $characterData->guid)
                ->where('spell', 8690)
                ->first();

            $spellColldown = false;

            if (!$existingCooldown) {
                $spellColldown = CharacterSpellCooldown::on($this->databaseConnection)->insert($data);

                $updatedCharacter = Character::where('guid', $characterData->guid)->first();

                if ($updatedCharacter) {
                    $updatedCharacter->position_x = $characterData->position_x;
                    $updatedCharacter->position_y = $characterData->position_y;
                    $updatedCharacter->position_z = $characterData->position_z;
                    $updatedCharacter->map = $characterData->map;
                    $updatedCharacter->zone = $characterData->zone;
                    $updatedCharacter->save();
                }
            }

            if ($spellColldown) {
                $this->message = __('page_profile')['services']['message']['success'];
            } else {
                $this->message = __('page_profile')['services']['message']['error'];
            }
        } else {
            $this->message = __('page_profile')['services']['exception']['no_character_selected'];
        }
    }

    public function setRealm($realmId)
    {
        $this->selectedRealm = $realmId;
        $this->databaseConnection = config('customs.realms')[$realmId]['id'];
        $this->message = '';
        $this->render();
    }

    public function render()
    {
        foreach (config('customs.realms') as $key => $realm) {
            if ($realm['replication'] && $key == $this->selectedRealm) {
                $character = new Character;
                $character->setConnection($realm['replication']);

                $data = $character->select(
                    'characters.guid', 'characters.name', 'characters.class', 'characters.race', 'characters.level', 'characters.online', 'character_spell_cooldown.spell', 'character_spell_cooldown.item', 'character_spell_cooldown.time', 'character_spell_cooldown.catTime'
                )
                    ->leftJoin('character_spell_cooldown', 'character_spell_cooldown.guid', '=', 'characters.guid')
                    ->where('characters.account', Auth::guard('account')->user()->id)
                    ->orderBy('level', 'desc')
                    ->get();

                $this->characters = $data;
            }
        }
        return view('livewire.profile-services');
    }
}
