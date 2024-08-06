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
        Schema::create('bug_tracker_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bug_tracker_id')->constrained('bug_tracker')->onDelete('cascade');
            $table->foreignId('linked_bug_tracker_id')->constrained('bug_tracker')->onDelete('cascade');
            $table->enum('type', ['related', 'duplicated']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bug_tracker_links');
    }
};
