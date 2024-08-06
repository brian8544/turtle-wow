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
        Schema::table('bug_tracker_message_status', function(Blueprint $table) {
            $table->renameColumn('bug_tracker_message_id', 'message_id');
            $table->foreign('message_id')->references('id')->on('bug_tracker_messages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bug_tracker_message_status', function(Blueprint $table) {
            $table->dropForeign(['message_id']);
            $table->renameColumn('message_id', 'bug_tracker_message_id');
            $table->foreign('bug_tracker_message_id')->references('id')->on('bug_tracker_messages')->onDelete('cascade');
        });
    }
};
