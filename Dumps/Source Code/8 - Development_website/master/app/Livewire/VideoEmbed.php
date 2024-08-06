<?php

namespace App\Livewire;

use App\Http\Controllers\VideoController;
use Livewire\Component;

class VideoEmbed extends Component
{
    public $height;
    public $id;
    public $thumb;
    public $urlSCE;

    public function mount()
    {
        $video = VideoController::getVideo($this->id);

        $this->urlSCE = url('/') . '/' . $video['url'];
        $this->thumb = url('/') . '/' . $video['thumb'];
    }


    public function render()
    {
        return view('livewire.video-embed');
    }
}
