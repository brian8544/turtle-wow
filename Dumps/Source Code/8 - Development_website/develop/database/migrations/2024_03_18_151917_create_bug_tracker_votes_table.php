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
        Schema::create('bug_tracker_votes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bug_tracker_id');
            $table->unsignedBigInteger('account_id');
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('bug_tracker_id')->references('id')->on('bug_tracker')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bug_tracker_votes');
    }
};
