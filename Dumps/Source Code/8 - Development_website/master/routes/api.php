<?php

use App\Http\Controllers\auth\PopulationController;
use App\Http\Controllers\characters\CharacterController;
use App\Http\Controllers\characters\HardcoreController;
use App\Http\Controllers\CharacterTransferController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/characters/online', [CharacterController::class, 'online']);
Route::get('/characters/stats', [CharacterController::class, 'stats']);
Route::get('/characters/hardcore/stats', [HardcoreController::class, 'stats']);
Route::get('/characters/population', [PopulationController::class, 'stats']);
Route::get('/turtle_tv/videos', [VideoController::class, 'getVideos']);
Route::middleware(['external:api'])->group(function () {
    Route::post('/check/username', [CharacterTransferController::class, 'checkUsername']);
    Route::post('/transfer/account', [CharacterTransferController::class, 'transferAccount']);
});
Route::post('/btcpay/invoiceSettled', [DonationController::class, 'invoiceSettled']);
