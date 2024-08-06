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
        Schema::table('ban_appeal_messages', function(Blueprint $table) {
            $table->boolean('support')->default(false)->after('seen');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ban_appeal_messages', function(Blueprint $table) {
            $table->dropColumn('support');
        });
    }
};
