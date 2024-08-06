<?php

namespace App\Models\admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Cache;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'page',
        'section',
        'description',
        'en',
        'zh_cn'
    ];

    public static function getSectionsForPage($page)
    {
        $cacheKey = "dynamicContent." . $page;

        return Cache::rememberForever($cacheKey, function () use ($page){
            $sections = self::where('page', $page)->where('active', true)->get();


            foreach ($sections as $key => $section) {
                $section->en = Blade::render($section->en);
                $section->zh_cn = Blade::render($section->zh_cn);
            }

            return $sections->keyBy('section');
        });
    }
}
