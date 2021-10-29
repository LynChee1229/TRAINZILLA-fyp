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
Route::get('/forgetPassword', [AdminController::class, 'forgetPassword']);
Route::post('/resetForgotPassword', [AdminController::class, 'resetForgotPassword']);

Route::get('/adminlist', [AdminController::class, 'adminList']);
Route::post('/getAdminProfile', [AdminController::class, 'getAdminProfile']);
Route::post('/resetAdminPW', [AdminController::class, 'resetPassword']);
Route::get('/updateMyContact', [AdminController::class, 'updateMyContact']);
Route::post('/newAdmin', [AdminController::class, 'newAdmin']);
Route::post('/changeAdminStatus', [AdminController::class, 'changeAdminStatus']);

Route::get('/ticketlist', [AdminController::class, 'ticketList']);

Route::get('/userlist', [AdminController::class, 'userList']);
Route::get('/changeUserStatus', [AdminController::class, 'changeUserStatus']);

Route::get('/adminroute', [AdminController::class, 'adminRoute']);
Route::get('/createroute', [AdminController::class, 'createRoute']);
Route::get('/getRouteDetails', [AdminController::class, 'getRouteDetails']);
Route::get('/newRoute', [AdminController::class, 'newRoute']);
Route::get('/changeRouteStatus', [AdminController::class, 'changeRouteStatus']);
Route::post('/editRoutePage', [AdminController::class, 'editRoutePage']);
Route::get('/updateRoute', [AdminController::class, 'updateRoute']);

Route::get('/searchStation', [AdminController::class, 'searchStation']);
Route::get('/getStationDeparture', [AdminController::class, 'getStationDeparture']);

Route::get('/adminannouncement', [AdminController::class, 'adminAnnouncement']);
Route::get('/newAnnouncement', [AdminController::class, 'newAnnouncement']);
Route::get('/changeAnnouncementStatus', [AdminController::class, 'changeAnnouncementStatus']);
Route::get('/getAnnouncementDetails', [AdminController::class, 'getAnnouncementDetails']);
Route::get('/editAnnouncement', [AdminController::class, 'editAnnouncement']);
Route::get('/dltAnnouncement', [AdminController::class, 'dltAnnouncement']);

Route::get('/adminrule', [AdminController::class, 'adminRule']);
Route::get('/newRule', [AdminController::class, 'newRule']);
Route::get('/changeRuleStatus', [AdminController::class, 'changeRuleStatus']);
Route::get('/getRuleDetails', [AdminController::class, 'getRuleDetails']);
Route::get('/editRule', [AdminController::class, 'editRule']);
Route::get('/dltRule', [AdminController::class, 'dltRule']);


