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
        Schema::create('character_transfers', function (Blueprint $table) {
            $table->id();
            $table->integer('source_realm_id');
            $table->unsignedBigInteger('source_account_id');
            $table->unsignedBigInteger('source_character_guid');
            $table->longText('data')->nullable();
            $table->integer('target_realm_id');
            $table->unsignedBigInteger('target_account_id')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'transferred', 'failed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('character_transfers');
    }
};
