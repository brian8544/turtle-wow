<?php

namespace App\Livewire;

use App\Http\Controllers\characters\ShellcoinController;
use Livewire\Component;

class ShellCoin extends Component
{
    public $shellCoinData;
    public $shellCoinData7d;

    public function mount()
    {
        $shellCoin = new ShellcoinController();
        $this->shellCoinData = $shellCoin->get();
        $this->shellCoinData7d = $shellCoin->get7d();
    }

    public function render()
    {
        return view('livewire.shell-coin');
    }
}
