<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ImportDynamicContent extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sections')->truncate();

        $sqlFilePath = database_path('dynamic_content/sections.sql');
        $sql = file_get_contents($sqlFilePath);

        DB::unprepared($sql);

        Cache::flush();

        $this->command->info('sections.sql import complete.');
    }
}
