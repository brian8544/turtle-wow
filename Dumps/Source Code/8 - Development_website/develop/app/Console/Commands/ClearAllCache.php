<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClearAllCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:clear-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all Laravel caches (config, route, view, compiled classes, etc.)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('optimize');
        $this->call('optimize:clear');
        $this->call('cache:clear');
        $this->call('view:cache');
        $this->call('view:clear');
        $this->call('config:cache');
        $this->call('config:clear');
        $this->call('event:cache');
        $this->call('event:clear');
        $this->call('route:cache');
        $this->call('route:clear');
    }
}
