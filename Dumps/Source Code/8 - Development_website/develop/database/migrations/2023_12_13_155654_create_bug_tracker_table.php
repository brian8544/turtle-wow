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
        Schema::create('bug_tracker', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('account_id');
            $table->text('title')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('realm_id')->nullable();
            $table->unsignedBigInteger('category')->nullable();
            $table->string('priority')->nullable();
            $table->unsignedBigInteger('vote')->nullable();
            $table->string('status')->nullable();
            $table->unsignedBigInteger('assigned_to')->nullable();
            $table->unsignedBigInteger('closed_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bug_tracker');
    }
};
