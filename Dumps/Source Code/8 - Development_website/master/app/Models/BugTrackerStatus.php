<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugTrackerStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name_en',
        'name_zh_cn',
        'description_en',
        'description_zh_cn',
        'color',
        'icon'
    ];

    public function __get($key)
    {
        if (strpos($key, 'name_localized') === 0) {
            $locale = app()->getLocale();

            $localizedKey = 'name_' . $locale;

            if (in_array($localizedKey, $this->fillable)) {
                return $this->$localizedKey;
            }
        }

        if (strpos($key, 'description_localized') === 0) {
            $locale = app()->getLocale();

            $localizedKey = 'description_' . $locale;

            if (in_array($localizedKey, $this->fillable)) {
                return $this->$localizedKey;
            }
        }

        return parent::__get($key);
    }
}
