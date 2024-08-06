<?php

namespace App\Models\world;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemTemplate extends Model
{
    use HasFactory;

    protected $connection = 'mysql4';
    protected $table = 'item_template';
    protected $primaryKey = 'entry';
    public $timestamps = false;
}
