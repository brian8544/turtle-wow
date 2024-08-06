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
        Schema::create('video_comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent')->nullable();
            $table->unsignedBigInteger('account_id');
            $table->string('character', 64);
            $table->unsignedBigInteger('class');
            $table->string('video_id', 64);
            $table->text('comment');
            $table->unsignedBigInteger('edited')->default(0);
            $table->unsignedBigInteger('moderated')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_comments');
    }
};
