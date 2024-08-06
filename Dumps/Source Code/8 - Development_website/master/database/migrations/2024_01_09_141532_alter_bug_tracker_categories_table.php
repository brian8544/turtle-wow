<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bug_tracker_categories', function(Blueprint $table) {
            $table->text('description_en')->nullable()->after('name_zh_cn');
            $table->text('description_zh_cn')->nullable()->after('description_en');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bug_tracker_categories', function (Blueprint $table) {
            $table->dropColumn('description_en');
            $table->dropColumn('description_zh_cn');
        });
    }
};
