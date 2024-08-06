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
        Schema::create('bug__tracker_message_status', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bug_tracker_message_id');
            $table->unsignedBigInteger('account_id');
            $table->boolean('seen')->default(false);
            $table->timestamps();

            $table->foreign('bug_tracker_message_id')->references('id')->on('bug_tracker_messages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bug__tracker_message_status');
    }
};
