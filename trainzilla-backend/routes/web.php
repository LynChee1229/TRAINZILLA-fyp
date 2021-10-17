<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('adminlogin');
});

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
