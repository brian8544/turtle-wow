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
        Schema::create('ban_appeal_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ban_appeal_id');
            $table->unsignedBigInteger('account_id');
            $table->text('message');
            $table->boolean("seen")->default(false);
            $table->timestamps();

            $table->foreign('ban_appeal_id')->references('id')->on('ban_appeals')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ban_appeal_messages');
    }
};
