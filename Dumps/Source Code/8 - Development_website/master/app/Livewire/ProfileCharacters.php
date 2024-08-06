<?php

namespace App\Livewire;

use App\Models\characters\Character;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class ProfileCharacters extends Component
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

    public function restore($name, $connection)
    {
        $user = Auth::guard('account')->user();

        $deletedCharacter = $user->deletedCharacters($connection)->where('deleteInfos_Name', $name)->first();

        if ($deletedCharacter) {
            $deletedCharacter->account = $deletedCharacter->deleteInfos_Account;
            $deletedCharacter->deleteInfos_Account = null;
            $deletedCharacter->name = $deletedCharacter->deleteInfos_Name;
            $deletedCharacter->deleteInfos_Name = null;
            $deletedCharacter->deleteDate = null;

            $restoreCharacter = $deletedCharacter->save();

            If ($restoreCharacter) {
                $this->message = __('page_profile')['characters']['message']['success'];
            } else {
                $this->message = __('page_profile')['characters']['message']['error'];
            }
        } else {
            $this->message = __('page_profile')['characters']['exception']['unknown_character'];
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
                    'race', 'mortality_status', 'name', 'level', 'gender'
                )
                    ->where('account', Auth::guard('account')->user()->id)
                    ->orderBy('level', 'desc')
                    ->get();

                foreach ($data as $charData) {
                    $charData->glyphs = $charData->glyphs($realm['id'])->get();
                }

                $this->characters = $data;
            }
        }

        return view('livewire.profile-characters');
    }
}
