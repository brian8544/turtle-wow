<?php

namespace App\Livewire;

use App\Http\Controllers\VideoController;
use Livewire\Component;

class VideoThumb extends Component
{
    public $height;
    public $id;
    public $thumb;
    public $title;
    public $duration;
    public $views = 0;
    public $comments = 0;
    public $ago;
    public $url;
    public $vertical = false;

    public function render()
    {
        return view('livewire.video-thumb');
    }
}
