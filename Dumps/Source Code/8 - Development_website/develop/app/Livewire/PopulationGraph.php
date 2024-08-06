<?php

namespace App\Livewire;

use App\Http\Controllers\auth\PopulationController;
use Livewire\Component;

class PopulationGraph extends Component
{
    public $populationGraph;

    public function mount()
    {
        $populationGraph = new PopulationController();
        $this->populationGraph = $populationGraph->stats();
    }

    public function render()
    {
        return view('livewire.population-graph');
    }
}
