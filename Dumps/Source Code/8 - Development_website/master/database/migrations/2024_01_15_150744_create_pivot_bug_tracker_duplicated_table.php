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
        Schema::create('pivot_bug_tracker_duplicated', function (Blueprint $table) {
            $table->unsignedBigInteger('bug_tracker_id');
            $table->unsignedBigInteger('duplicated_tracker_id');
            $table->foreign('bug_tracker_id')->references('id')->on('bug_tracker')->onDelete('cascade');
            $table->foreign('duplicated_tracker_id')->references('id')->on('bug_tracker')->onDelete('cascade');
            $table->primary(['bug_tracker_id', 'duplicated_tracker_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pivot_bug_tracker_duplicated');
    }
};
