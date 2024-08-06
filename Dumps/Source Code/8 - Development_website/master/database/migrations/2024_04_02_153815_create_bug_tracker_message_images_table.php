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
        Schema::create('bug_tracker_message_images', function (Blueprint $table) {
            $table->id();
            $table->string('large');
            $table->string('medium')->nullable();
            $table->string('thumbnail')->nullable();
            $table->foreignId('message_id')->constrained('bug_tracker_messages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bug_tracker_message_images');
    }
};
