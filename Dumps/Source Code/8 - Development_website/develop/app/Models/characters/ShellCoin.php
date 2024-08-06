<?php

namespace App\Models\characters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShellCoin extends Model
{
    use HasFactory;

    protected $table = 'logs_shellcoin';
    public $timestamps = false;

    protected $fillable = [
        'time',
        'count',
        'price'
    ];
}
