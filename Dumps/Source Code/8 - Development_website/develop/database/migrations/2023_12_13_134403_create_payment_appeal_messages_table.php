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
        Schema::create('payment_appeal_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('payment_appeal_id');
            $table->unsignedBigInteger('account_id');
            $table->text('message');
            $table->boolean("seen")->default(false);
            $table->boolean('support')->default(false);
            $table->timestamps();

            $table->foreign('payment_appeal_id')->references('id')->on('payment_appeals')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_appeal_messages');
    }
};
