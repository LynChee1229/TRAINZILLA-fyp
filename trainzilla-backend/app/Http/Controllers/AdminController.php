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
        if(!$admin) {
            return redirect('/adminlogin')->with('failed', "Record not found. Please try again.");
        }
        else if(!Hash::check($req->password, $admin->adminPassword)) {
            return redirect('/adminlogin')->with('failed', "Password is not matched. Please try again.");
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

    function getAdminProfile()
    {
        try {
            if(request('adminUC') != null) {
                $admin = Admin::where('adminUniqueCode', request('adminUC'))->first();
                if(isset($admin)) {
                    return ['status' => true, 'admin' => $admin];
                }
            }
        } catch (\Exception $e) {
            \Log::error($e);
        }
        return ['status' => false, 'failed' => "Record not found."];
    }

    function resetPassword()
    {
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', "=", request('aUC'))->first();
            if(isset($admin)) {
                if(!Hash::check(request('oldPW'), $admin->adminPassword)) {
                    return redirect('/adminlist')->with('failed', "Old Password is not matched. Please try again.");
                } else {
                    $newPassword= Hash::make(request('newPW'));
                    Admin::where('adminUniqueCode', "=", request('aUC'))->update(['adminPassword' => $newPassword ]);
                    return redirect('/adminlist')->with('success', "Password has been updated.");
                }
            }
        }
        return redirect('/adminlist')->with('failed', "Record not found. Please try again.");
    }

    function updateMyContact()
    {
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', request('aUC'))->first();
            if(isset($admin)) {
                Admin::where('adminUniqueCode', request('aUC'))->update(['adminContact' => request('newContact') ]);
                return redirect('/adminlist')->with('success', "Contact Number has been updated.");
            }
        }
        return redirect('/adminlist')->with('failed', "Record not found. Please try again.");
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
