<?php

namespace App\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;
use TCG\Voyager\Database\Schema\SchemaManager;
use TCG\Voyager\Models\DataType;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $loader = AliasLoader::getInstance();
        $loader->alias(SchemaManager::class, \App\Voyager\SchemaManager::class);
        $loader->alias(DataType::class, \App\Voyager\Models\DataType::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        if (config('app.env') === 'production') {
            \URL::forceScheme('https');
        }

        Blade::directive('dynamicContent', function ($page) {
            return "<?php \$sections = \App\Models\admin\Section::getSectionsForPage($page); \$currentLocale = app()->getLocale(); ?>";
        });

        Blade::directive('sectionContent', function ($expression) {
            return "<?php if(isset(\$sections[$expression]->\$currentLocale)): ?>
                        {!! \$sections[$expression]->\$currentLocale !!}
                    <?php endif; ?>";
        });

        view()->composer('layout.header', function ($view) {
            $view->with('current_locale', app()->getLocale());
            $view->with('available_locales', config('app.available_locales'));
        });

        if (\Auth::guard('web')->check()) {
            \Debugbar::enable();
        }
    }
}
