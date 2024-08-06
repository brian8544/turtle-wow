<?php

namespace App\Livewire;

use App\Http\Controllers\VideoController;
use Livewire\Component;

class WatchTv extends Component
{
    public $view = 'all';
    public $channels = [];

    public function mount()
    {
        $videoController = new VideoController();
        $this->channels = $videoController->getVideos()['data'];
        $this->view = $videoController->getVideos()['view'];
    }
    public function render()
    {
        return view('livewire.watch-tv');
    }
}
