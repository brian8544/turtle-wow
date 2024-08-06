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
        Schema::table('pivot_bug_tracker_categories', function(Blueprint $table) {
            $table->dropForeign(['bug_tracker_category_id']);
            $table->renameColumn('bug_tracker_category_id', 'category_id');
            $table->foreign('category_id')->references('id')->on('bug_tracker_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pivot_bug_tracker_categories', function(Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->renameColumn('category_id', 'bug_tracker_category_id');
            $table->foreign('bug_tracker_category_id')->references('id')->on('bug_tracker_categories')->onDelete('cascade');
        });
    }
};
