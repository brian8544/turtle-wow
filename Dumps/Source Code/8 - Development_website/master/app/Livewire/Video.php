<?php

namespace App\Livewire;

use App\Http\Controllers\VideoController;
use App\Models\VideoComment;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Owenoj\LaravelGetId3\GetId3;

class Video extends Component
{
    public $name;
    public $id;
    public $thumb;
    public $title;
    public $duration;
    public $stamp;
    public $ago;
    public $views;
    public $downloads;
    public $commentsCount;
    public $comments;
    public $otherVideos;
    public $likes;
    public $dislikes;
    public $liked;
    public $disliked;

    public function render()
    {
        return view('livewire.video');
    }
}
