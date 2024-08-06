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
        Schema::create('refund_appeal_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('refund_appeal_id');
            $table->unsignedBigInteger('account_id');
            $table->text('message');
            $table->boolean("seen")->default(false);
            $table->boolean('support')->default(false);
            $table->foreign('refund_appeal_id')->references('id')->on('refund_appeals')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refund_appeal_messages');
    }
};
