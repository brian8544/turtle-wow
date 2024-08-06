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
        Schema::table('bug_tracker', function(Blueprint $table) {
            $table->renameColumn('priority', 'priority_id');
            $table->renameColumn('status', 'status_id');
            $table->renameColumn('assigned_to', 'assigned_to_id');
            $table->foreign('priority_id')->references('id')->on('bug_tracker_priorities');
            $table->foreign('status_id')->references('id')->on('bug_tracker_statuses');
            $table->foreign('assigned_to_id')->references('id')->on('bug_tracker_assigned_to');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bug_tracker', function(Blueprint $table) {
            $table->dropForeign(['priority_id']);
            $table->dropForeign(['status_id']);
            $table->dropForeign(['assigned_to_id']);
            $table->renameColumn('priority_id', 'priority');
            $table->renameColumn('status_id', 'status');
            $table->renameColumn('assigned_to_id', 'assigned_to');

            $table->foreign('priority')->references('id')->on('bug_tracker_priorities');
            $table->foreign('status')->references('id')->on('bug_tracker_statuses');
        });
    }
};
