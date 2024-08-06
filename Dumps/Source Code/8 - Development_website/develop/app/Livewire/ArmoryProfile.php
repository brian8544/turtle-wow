<?php

namespace App\Livewire;

use App\Http\Controllers\armory\CharacterController;
use Livewire\Component;

class ArmoryProfile extends Component
{
    public $character;
    public $ha = false;
    public $pvp = false;
    public $sc = false;
    public $other = false;

    public function mount()
    {
        $this->character = (new CharacterController())->getCharacter();
    }

    public function render()
    {
        return view('livewire.armory-profile');
    }
}
