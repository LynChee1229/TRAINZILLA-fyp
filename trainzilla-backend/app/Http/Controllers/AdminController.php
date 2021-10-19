<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /*** 
     * Login , Logout 
    ***/
    function loginPage()
    {
        return view('/adminlogin');
    }

    function adminLogin(Request $req)
    {
        $admin = Admin::where('adminEmail', $req->email)->first();
        // if(!$admin || !Hash::check($req->password, $admin->adminPassword)) {
        if(!$admin ) {
            return redirect('/adminlogin')->with('failed', "Record is not matched. Please try again.");
        }
        else if($admin->adminStatus == 0) {
            return redirect('/adminlogin')->with('failed', "Your account is inactive.");
        }

        return redirect('/adminlist')->with('adminUC', $admin->adminUniqueCode);
    }

    function logout()
    {
        return redirect('/adminlogin');
    }


    /*** 
     * Admin List
    ***/
    function adminList()
    {
        $tab = "admin";
        return view('adminlist', compact('tab'));
    }


    /*** 
     * Ticket List
    ***/
    function ticketList()
    {
        $tab = "ticket";
        return view('ticketlist', compact('tab'));
    }


    /*** 
     * User List
    ***/
    function userList()
    {
        $tab = "user";
        return view('userlist', compact('tab'));
    }


    /*** 
     * Route List
    ***/
    function adminRoute()
    {
        $tab = "route";
        return view('adminroute', compact('tab'));
    }


    /*** 
     * Announcement List
    ***/
    function adminAnnouncement()
    {
        $tab = "announcement";
        return view('adminannouncement', compact('tab'));
    }


    /*** 
     * Rule and Regulations List
    ***/
    function adminRule()
    {
        $tab = "rule";
        return view('adminrule', compact('tab'));
    }
}
