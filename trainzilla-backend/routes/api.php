<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RouteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::post('updateProfile', [UserController::class, 'updateProfile']);
Route::post('resetPassword', [UserController::class, 'resetPassword']);
Route::post('forgetPassword', [UserController::class, 'forgetPassword']);
Route::post('deleteUserAccount', [UserController::class, 'deleteUserAccount']);

Route::get('announcementList', [UserController::class, 'announcementList']);
Route::get('ruleList', [UserController::class, 'ruleList']);
Route::get('announcementBar', [UserController::class, 'announcementBar']);

Route::post('bookingDetails', [UserController::class, 'bookingDetails']);
Route::post('proceedToPayment', [UserController::class, 'proceedToPayment']);

Route::get('getAvailableStation', [RouteController::class, 'getAvailableStation']);
Route::get('getRouteData', [RouteController::class, 'getRouteData']);
Route::post('getRouteSuggestion', [RouteController::class, 'getRouteSuggestion']);
