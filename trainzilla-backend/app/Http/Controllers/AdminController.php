<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    //
    function loginPage()
    {
        return view('/adminlogin');
    }

    function adminLogin(Request $req)
    {
        $admin = Admin::where('adminEmail', $req->email)->first();
        // if(!$admin || !Hash::check($req->password, $admin->adminPassword)) {
        if(!$admin ) {
            // $failed = "Record is not matched. Please try again.";
            return redirect('/adminlogin')->with('failed', "Record is not matched. Please try again.");
        }
        return redirect('/adminlist');
    }

    function logout()
    {
        return redirect('/adminlogin');
    }

}
