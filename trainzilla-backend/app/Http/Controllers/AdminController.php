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
            return redirect('/adminlogin')->with('failed', "Password does not match. Please try again.");
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
        $list = Admin::orderBy('adminID', 'asc')->get();
        return view('adminlist', compact('tab', 'list'));
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
                    return redirect('/adminlist')->with('failed', "Old Password does not match. Please try again.");
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

    function newAdmin()
    {
        $failed = "Failed to add new admin. Please try again.";
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', request('aUC'))->first();
            if(isset($admin)) {
                if(!Hash::check(request('myPW1'), $admin->adminPassword)) {
                    $failed = "Your Password does not match. Please try again.";
                } else {
                    $existingEmail = Admin::where('adminEmail', request('newEmail'))->first();
                    if($existingEmail){
                        $failed = "The email address already exists. Please try again.";
                    } 
                    else {
                        $new = new Admin;
                        $id = Admin::max("adminID") ? (Admin::max("adminID") + 1) : 1;
                        $new->adminUniqueCode = "admin".$id.uniqid().$id;
                        $new->adminID = $id;
                        $new->adminName = request('newName');
                        $new->adminEmail = request('newEmail');
                        $new->adminContact = request('newContact');
                        $new->adminPassword = Hash::make("abcd1234");
                        $new->save();
                        return redirect('/adminlist')->with('success', "New admin has been added.");
                    }
                }
            }
        }
        return redirect('/adminlist')->with('failed', $failed);
    }

    function changeAdminStatus(Request $req) 
    {
        $failed = "Failed to add new admin. Please try again.";
        if($req->aUC) {
            $admin = Admin::where('adminUniqueCode', $req->aUC)->first();
            if(isset($admin)) {
                if(!Hash::check($req->myPW, $admin->adminPassword)) {
                    $failed = "Your Password does not match. Please try again.";
                } else {
                    $data = Admin::where('adminUniqueCode', $req->statusAUC)->first();
                    if($req->status=="deac" && $data->adminStatus=="1"){
                        Admin::where('adminUniqueCode', $data->adminUniqueCode)->update(['adminStatus' => '0' ]);
                        return redirect('/adminlist')->with('success', $data->adminName."'s account has been deactivated.");
                    } 
                    else if($req->status=="act" && $data->adminStatus=="0") {
                        Admin::where('adminUniqueCode', $data->adminUniqueCode)->update(['adminStatus' => '1' ]);
                        return redirect('/adminlist')->with('success', $data->adminName."'s account has been activated.");
                    }
                }
            }
        }
        return redirect('/adminlist')->with('failed', $failed);
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
