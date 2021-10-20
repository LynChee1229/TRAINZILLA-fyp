<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AdminController::class, 'loginPage']);
Route::get('/adminlogin', [AdminController::class, 'loginPage']);
Route::post('/admin-login', [AdminController::class, 'adminLogin']);
Route::get('/admin-logout', [AdminController::class, 'logout']);

Route::get('/adminlist', [AdminController::class, 'adminList']);
Route::post('/getAdminProfile', [AdminController::class, 'getAdminProfile']);
Route::post('/resetAdminPW', [AdminController::class, 'resetPassword']);
Route::get('/updateMyContact', [AdminController::class, 'updateMyContact']);

Route::get('/ticketlist', [AdminController::class, 'ticketList']);

Route::get('/userlist', [AdminController::class, 'userList']);

Route::get('/adminroute', [AdminController::class, 'adminRoute']);

Route::get('/adminannouncement', [AdminController::class, 'adminAnnouncement']);

Route::get('/adminrule', [AdminController::class, 'adminRule']);


