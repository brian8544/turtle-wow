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
        Schema::table('bug_tracker_images', function (Blueprint $table) {
            $table->dropForeign(['bug_tracker_id']);
            $table->foreign('bug_tracker_id')->references('id')->on('bug_tracker');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bug_tracker_images', function (Blueprint $table) {
            $table->dropForeign(['bug_tracker_id']);
            $table->foreign('bug_tracker_id')->references('id')->on('bug_tracker')->onDelete('cascade');
        });
    }
};
