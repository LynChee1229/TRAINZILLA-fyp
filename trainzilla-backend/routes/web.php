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

Route::get('/adminlist', function () {
    return view('adminlist');
});

Route::get('/ticketlist', function () {
    return view('ticketlist');
});

Route::get('/userlist', function () {
    return view('userlist');
});

Route::get('/adminroute', function () {
    return view('adminroute');
});

Route::get('/adminannouncement', function () {
    return view('adminannouncement');
});

Route::get('/adminrule', function () {
    return view('adminrule');
});



// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
