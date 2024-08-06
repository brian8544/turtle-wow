<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExportDynamicContent extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = DB::table('sections')->select('title', 'page', 'section', 'description', 'en', 'zh_cn', 'active')->get();

        $sqlData = "";

        foreach ($data as $row) {
            $escapedTitle = addslashes($row->title);
            $escapedPage = addslashes($row->page);
            $escapedSection = addslashes($row->section);
            $escapedDescription = addslashes($row->description);
            $escapedEn = addslashes($row->en);
            $escapedCn = addslashes($row->zh_cn);
            $escapedActive = addslashes($row->active);

            $sqlData .= "INSERT INTO sections (title, page, section, description, en, zh_cn, active) VALUES (\"" . $escapedTitle . "\", \"" . $escapedPage . "\", \"" . $escapedSection . "\", \"" . $escapedDescription . "\", \"" . $escapedEn . "\", \"" . $escapedCn . "\", \"" . $escapedActive . "\");\n";
        }

        $filePath = database_path('dynamic_content/sections.sql');

        file_put_contents($filePath, $sqlData);

        $this->command->info('sections.sql export complete.');
    }
}
