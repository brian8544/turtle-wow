<?php

namespace App\Models\auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uptime extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';

    protected $table = 'uptime';

    public function getUptime()
    {
        $days = floor($this->uptime / (60 * 60 * 24));
        $hours = floor(($this->uptime % (60 * 60 * 24)) / (60 * 60));
        $minutes = floor(($this->uptime % (60 * 60)) / 60);
        $seconds = $this->uptime % 60;

        return array(
            'days' => $days,
            'hours' => $hours,
            'minutes' => $minutes,
            'seconds' => $seconds
        );
    }
}
