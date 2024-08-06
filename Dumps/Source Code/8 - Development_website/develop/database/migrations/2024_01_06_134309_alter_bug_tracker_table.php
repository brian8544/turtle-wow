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
            $table->unsignedBigInteger('priority')->change();
            $table->unsignedBigInteger('status')->change();

            $table->foreign('priority')->references('id')->on('bug_tracker_priorities');
            $table->foreign('status')->references('id')->on('bug_tracker_statuses');
            $table->dropColumn('realm_id');
            $table->dropColumn('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bug_tracker', function(Blueprint $table) {
            $table->dropForeign(['priority']);
            $table->dropForeign(['status']);

            $table->string('realm_id')->nullable()->after('description');
            $table->string('category')->nullable()->after('realm_id');
        });
    }
};
