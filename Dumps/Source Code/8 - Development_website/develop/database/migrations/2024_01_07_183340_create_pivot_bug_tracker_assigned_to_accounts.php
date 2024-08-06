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
        Schema::create('pivot_bug_tracker_assigned_to_accounts', function (Blueprint $table) {
            $table->unsignedBigInteger('assigned_to_id');
            $table->unsignedBigInteger('account_id');
            $table->foreign('assigned_to_id')->references('id')->on('bug_tracker_assigned_to')->onDelete('cascade');
            $table->primary(['assigned_to_id', 'account_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pivot_bug_tracker_assigned_to_accounts');
    }
};
