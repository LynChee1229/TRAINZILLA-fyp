<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Models\Admin;
use App\Models\Announcement;
use App\Models\Route;
use App\Models\RouteStation;
use App\Models\Rule;
use App\Models\Station;
use App\Models\Stos;
use App\Models\Ticket;
use App\Models\User;
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
            return redirect('/adminlogin')->with('failed', "No matching records found. Please try again.");
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
        return ['status' => false, 'failed' => "No matching records found."];
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
        return redirect('/adminlist')->with('failed', "No matching records found. Please try again.");
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
        return redirect('/adminlist')->with('failed', "No matching records found. Please try again.");
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
        $failed = "Failed to perform the action. Please try again.";
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
        $list = User::orderBy('userID', 'desc')->get();
        return view('userlist', compact('tab' , 'list'));
    }

    function changeUserStatus()
    {
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', request('aUC'))->first();
            if(isset($admin)) {
                $data = User::where('userUniqueCode', request('uid'))->first();
                if(request('sAction')=="deac" && $data->userStatus=="1"){
                    User::where('userUniqueCode', request('uid'))->update(['userStatus' => '0']);
                    return redirect('/userlist')->with('success', $data->userName."'s account has been deactivated.");
                } 
                else if(request('sAction')=="act" && $data->userStatus=="0") {
                    User::where('userUniqueCode', request('uid'))->update(['userStatus' => '1']);
                    return redirect('/userlist')->with('success', $data->userName."'s account has been activated.");
                }
            }
        }
        return redirect('/userlist')->with('failed', "Failed to perform the action. Please try again.");
    }


    /*** 
     * Route List (station, route_station, stos)
    ***/
    function adminRoute()
    {
        $tab = "route";
        $list = Route::orderBy('routeTitle', 'asc')->get();
        $station = [];
        foreach($list as $l) {
            $temp = RouteStation::where('routeID', '=', $l->routeID)->get();
            $max = count($temp);
            $first = $temp->where('route_station_sequence', '1')->first();
            $firstStation = Station::where('stationID', '=', $first->stationID)->first();
            $last = $temp->where('route_station_sequence', $max)->first();
            $lastStation = Station::where('stationID', '=', $last->stationID)->first();
            $station[] = [
                'firstStation' => $firstStation->stationName,
                'lastStation' => $lastStation->stationName,
                'stationNum' => $max,
            ];
        }
        return view('adminroute', compact('tab' , 'list', 'station'));
    }

    function createRoute()
    {
        $tab = "route";
        return view('adminroutecreate', compact('tab'));
    }

    function getRouteDetails()
    {
        try {
            if(request('adminUC')) {
                $data = Route::orderBy('routeTitle', 'asc')->get();
                if(isset($data)) {
                    return ['status' => true, 'data' => $data];
                }
            }
        } catch (\Exception $e) {
            \Log::error($e);
        }
        return ['status' => false, 'failed' => "No matching records found."];
    }

    function searchStation(Request $request)
    {
        $query = $request->get('term', '');

        $list = Station::where('stationName', 'LIKE', '%' . $query . '%')->get();

        $data = array();
        foreach ($list as $list) {
            $value = $list->stationName;
            $data[] = array('value' => $value);
        }

        if (count($data)) {
            return $data;
        } else {
            return ['value' => 'No Result Found'];
        }
    }

    function newRoute(Request $r)
    {
        if($r->adminUC) {
            // route
            if($r->rTitle && $r->rTrain) {
                $list = Route::where('routeTitle', '=', $r->rTitle)->first();
                if(!$list) {
                    $newR = new Route;
                    $newR->routeTitle = $r->rTitle;
                    $newR->routeTrainNum = $r->rTrain;
                    $newR->routeStatus = '1';
                    $newR->save();
                }
            }

            $num = count($r->stationName);
            foreach ($r->stationName as $index => $name) {

                // station
                $staTemp = Station::where('stationName', '=', $name)->first();
                if(!$staTemp) {
                    $newS = new Station;
                    $newS->stationName = $name;
                    if($index == 0) {
                        $newS->stationDeparture = $r->stationDeparture[0];
                    } 
                    else if($index == ($num-1)) {
                        $newS->stationDeparture = $r->stationDeparture[1];
                    }
                    $newS->save();
                }

                // station to station (stos)
                $sA = $name;
                if(($index+1) < count($r->stationName)) {
                    $sB = $r->stationName[$index+1];
                    $rsTemp = Stos::where([
                        ['stationA', '=', $sA],
                        ['stationB', '=', $sB],
                    ])
                    ->orWhere([
                        ['stationA', '=', $sB],
                        ['stationB', '=', $sA],
                    ])
                    ->first();
    
                    if(!$rsTemp) {
                        $newStos = new Stos;
                        $newStos->stationA = $sA;
                        $newStos->stationB = $sB;
                        $newStos->stationDistance = $r->stosDistance[$index];
                        $taken =  ($r->minutesTaken[$index] * 60) + $r->secondsTaken[$index];
                        $newStos->stationTimeTaken = $taken;
                        $newStos->save();
                    }
                }
                
                // route_station (sequence)
                $routeTemp = Route::where('routeTitle', '=', $r->rTitle)->first();
                foreach ($r->stationName as $index => $name) {
                    $stationTemp = Station::where('stationName', '=', $name)->first();
                    if($routeTemp && $stationTemp) {
                        $rs = RouteStation::where([
                            ['routeID', '=', $routeTemp->routeID],
                            ['stationID', '=', $stationTemp->stationID]
                        ])->first();
                        if(!$rs) {
                            $newRS = new RouteStation;
                            $newRS->route_station_sequence = $index + 1;
                            $newRS->routeID = $routeTemp->routeID;
                            $newRS->stationID = $stationTemp->stationID;
                            $newRS->save();
                        }
                    }
                }
            }
            return redirect('/adminroute')->with('success', "New route has been added.");
        }
        return redirect('/adminroute')->with('failed', "Failed to perform the action. Please try again.");
    }

    function getStationDeparture()
    {
        try {
            if(request('adminUC')) {
                $data = Station::where('stationName', request('sName'))->first();
                if(isset($data)) {
                    return ['status' => true, 'data' => $data];
                }
            }
        } catch (\Exception $e) {
            \Log::error($e);
        }
        return ['status' => false, 'data' => ''];
    }

    function changeRouteStatus()
    {
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', request('aUC'))->first();
            if(isset($admin)) {
                $data = Route::where('routeID', request('rid'))->first();
                if(request('sAction')=="deac" && $data->routeStatus=="1"){
                    Route::where('routeID', request('rid'))->update(['routeStatus' => '0']);
                    return redirect('/adminroute')->with('success', "The route has been deactivated.");
                } 
                else if(request('sAction')=="act" && $data->routeStatus=="0") {
                    Route::where('routeID', request('rid'))->update(['routeStatus' => '1']);
                    return redirect('/adminroute')->with('success', "The route has been activated.");
                }
            }
        }
        return redirect('/adminroute')->with('failed', "Failed to perform the action. Please try again.");
    }

    function editRoutePage()
    {
        $tab = "route";
        if(request('aUC')) {
            $route = Route::where('routeID', '=', request('rid'))->first();
            $station = RouteStation::where('routeID', '=', request('rid'))
            ->orderBy('route_station_sequence', 'asc')
            ->get();

            foreach($station as $s) {
                $temp = Station::where('stationID', '=', $s->stationID)->first();
                $s->stationName = $temp->stationName;
                $s->stationDeparture = $temp->stationDeparture;
            }

            $stos = [];
            foreach($station as $index => $t) {
                if( ($index+1) < count($station) ) {
                    $A = $t->stationName;
                    $B = $station[$index+1]->stationName;
                    $rsTemp = Stos::where([
                        ['stationA', '=', $A],
                        ['stationB', '=', $B],
                    ])
                    ->orWhere([
                        ['stationA', '=', $B],
                        ['stationB', '=', $A],
                    ])->first();
                    if($rsTemp) {
                        $min = (int)($rsTemp->stationTimeTaken / 60) ;
                        $sec = $rsTemp->stationTimeTaken % 60 ;

                        $stos[] = [
                            'stationA' => $rsTemp->stationA , 
                            'stationB' => $rsTemp->stationB ,
                            'distance' => $rsTemp->stationDistance ,
                            'minutesTaken' => $min ,
                            'secondsTaken' => $sec ,
                        ];
                    }
                }
            }
            return view('/adminrouteedit', compact('tab', 'route', 'station', 'stos'));
        }
        return redirect('/adminroute')->with('failed', "Failed to perform the action. Please try again.");
    }

    function updateRoute(Request $r)
    {
        if($r->adminUC) {
            // update route
            if($r->rTitle && $r->rTrain) {
                Route::where('routeID', '=', $r->rid)
                ->update([
                    'routeTitle' => $r->rTitle ,
                    'routeTrainNum' => $r->rTrain ,
                ]);
            }


            $num = count($r->stationName);
            foreach ($r->stationName as $index => $name) {

                // update station
                $staTemp = Station::where('stationName', '=', $name)->first();
                if($staTemp) {
                    if( ($index == 0) && ($r->stationDeparture[0]) ) {
                        Station::where('stationName', '=', $name)
                        ->update([
                            'stationDeparture' => $r->stationDeparture[0] ,
                        ]);
                    } 
                    else if( ($index == ($num-1)) && ($r->stationDeparture[1]) ) {
                        Station::where('stationName', '=', $name)
                        ->update([
                            'stationDeparture' => $r->stationDeparture[1] ,
                        ]);
                    }
                } 
                else {
                    $newS = new Station;
                    $newS->stationName = $name;
                    if($index == 0) {
                        $newS->stationDeparture = $r->stationDeparture[0];
                    } 
                    else if($index == ($num-1)) {
                        $newS->stationDeparture = $r->stationDeparture[1];
                    }
                    $newS->save();
                }

                // update station to station (stos)
                $sA = $name;
                if(($index+1) < count($r->stationName)) {
                    $sB = $r->stationName[$index+1];
                    $rsTemp = Stos::where([
                        ['stationA', '=', $sA],
                        ['stationB', '=', $sB],
                    ])
                    ->orWhere([
                        ['stationA', '=', $sB],
                        ['stationB', '=', $sA],
                    ])
                    ->first();
    
                    if($rsTemp) {
                        $taken =  ($r->minutesTaken[$index] * 60) + $r->secondsTaken[$index];
                        Stos::where([
                            ['stationA', '=', $sA],
                            ['stationB', '=', $sB],
                        ])->orWhere([
                            ['stationA', '=', $sB],
                            ['stationB', '=', $sA],
                        ])->update([
                            'stationDistance' => $r->stosDistance[$index] ,
                            'stationTimeTaken' => $taken ,
                        ]);
                    }
                    else if(!$rsTemp) {
                        $newStos = new Stos;
                        $newStos->stationA = $sA;
                        $newStos->stationB = $sB;
                        $newStos->stationDistance = $r->stosDistance[$index];
                        $taken =  ($r->minutesTaken[$index] * 60) + $r->secondsTaken[$index];
                        $newStos->stationTimeTaken = $taken;
                        $newStos->save();
                    }
                }
                
                // update route_station (sequence)
                $routeTemp = Route::where('routeTitle', '=', $r->rTitle)->first();
                RouteStation::where('routeID', '=', $routeTemp->routeID)->delete();

                foreach ($r->stationName as $index => $name) {
                    $stationTemp = Station::where('stationName', '=', $name)->first();
                    if($routeTemp && $stationTemp) {
                        $rs = RouteStation::where([
                            ['routeID', '=', $routeTemp->routeID],
                            ['stationID', '=', $stationTemp->stationID]
                        ])->first();
                        if(!$rs) {
                            $newRS = new RouteStation;
                            $newRS->route_station_sequence = $index + 1;
                            $newRS->routeID = $routeTemp->routeID;
                            $newRS->stationID = $stationTemp->stationID;
                            $newRS->save();
                        }
                    }
                }
            }
            return redirect('/adminroute')->with('success', "Route has been updated.");
        }
        return redirect('/adminroute')->with('failed', "Failed to perform the action. Please try again.");
    }


    /*** 
     * Announcement List
    ***/
    function adminAnnouncement()
    {
        $tab = "announcement";
        $list = Announcement::orderBy('reportID', 'desc')->get();
        foreach($list as $l) {
            $a = Admin::where('adminUniqueCode', $l->adminUniqueCode)->first();
            $l->adminName = $a->adminName;
        }
        return view('adminannouncement', compact('tab', 'list'));
    }

    function newAnnouncement()
    {
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', request('aUC'))->first();
            if(isset($admin)) {
                $new = new Announcement;
                $new->reportTitle = request('rTitle');
                $new->reportDetails = request('rDetails');
                $new->adminUniqueCode = $admin->adminUniqueCode;
                $new->reportDate = date('Y-m-d');
                $new->save();
                return redirect('/adminannouncement')->with('success', "New announcement has been added.");
            }
        }
        return redirect('/adminannouncement')->with('failed', "Failed to add new announcement. Please try again.");
    }

    function changeAnnouncementStatus()
    {
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', request('aUC'))->first();
            if(isset($admin)) {
                $data = Announcement::where('reportID', request('rid'))->first();
                if(request('sAction')=="deac" && $data->reportStatus=="1"){
                    Announcement::where('reportID', request('rid'))->update(['reportStatus' => '0' , 'adminUniqueCode' => $admin->adminUniqueCode , 'reportDate' => date('Y-m-d')]);
                    return redirect('/adminannouncement')->with('success', "The announcement has been deactivated.");
                } 
                else if(request('sAction')=="act" && $data->reportStatus=="0") {
                    Announcement::where('reportID', request('rid'))->update(['reportStatus' => '1' , 'adminUniqueCode' => $admin->adminUniqueCode , 'reportDate' => date('Y-m-d')]);
                    return redirect('/adminannouncement')->with('success', "The announcement has been activated.");
                }
            }
        }
        return redirect('/adminannouncement')->with('failed', "Failed to perform the action. Please try again.");
    }

    function getAnnouncementDetails()
    {
        try {
            if(request('rid')) {
                $data = Announcement::where('reportID', request('rid'))->first();
                if(isset($data)) {
                    return ['status' => true, 'data' => $data];
                }
            }
        } catch (\Exception $e) {
            \Log::error($e);
        }
        return ['status' => false, 'failed' => "No matching records found."];
    }

    function editAnnouncement(Request $r)
    {
        if($r->aUC && $r->rid) {
            $admin = Admin::where('adminUniqueCode', $r->aUC)->first();
            $data = Announcement::where('reportID', $r->rid)->first();
            if(isset($data) && isset($admin)) {
                Announcement::where('reportID', $r->rid)
                ->update([
                    'reportTitle' => $r->rTitle , 
                    'reportDetails' => $r->rDetails , 
                    'reportDate' => date('Y-m-d') ,
                    'reportStatus' => '1' , 
                    'adminUniqueCode' => $admin->adminUniqueCode , 
                ]);
                return redirect('/adminannouncement')->with('success', "The announcement has been updated.");
            }
        }
        return redirect('/adminannouncement')->with('failed', "Failed to perform the action. Please try again.");
    }

    function dltAnnouncement()
    {
        if(request('rid')) {
            $data = Announcement::where('reportID', request('rid'))->first();
            if(isset($data)) {
                Announcement::where('reportID', request('rid'))->delete();
                return redirect('/adminannouncement')->with('success', "The announcement has been removed.");
            }
        }
        return redirect('/adminannouncement')->with('failed', "Failed to perform the action. Please try again.");
    }


    /*** 
     * Rule and Regulations List
    ***/
    function adminRule()
    {
        $tab = "rule";
        $list = Rule::orderBy('ruleID', 'asc')->get();
        foreach($list as $l) {
            $a = Admin::where('adminUniqueCode', $l->adminUniqueCode)->first();
            $l->adminName = $a->adminName;
        }
        return view('adminrule', compact('tab' , 'list'));
    }

    function newRule()
    {
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', request('aUC'))->first();
            if(isset($admin)) {
                $new = new Rule;
                $new->ruleTitle = request('rTitle');
                $new->ruleDetails = request('rDetails');
                $new->adminUniqueCode = $admin->adminUniqueCode;
                $new->ruleDate = date('Y-m-d');
                $new->save();
                return redirect('/adminrule')->with('success', "New rules and regulations has been added.");
            }
        }
        return redirect('/adminrule')->with('failed', "Failed to add new rules and regulations. Please try again.");
    }

    function changeRuleStatus()
    {
        if(request('aUC')) {
            $admin = Admin::where('adminUniqueCode', request('aUC'))->first();
            if(isset($admin)) {
                $data = Rule::where('ruleID', request('rid'))->first();
                if(request('sAction')=="deac" && $data->ruleStatus=="1"){
                    Rule::where('ruleID', request('rid'))->update(['ruleStatus' => '0' , 'adminUniqueCode' => $admin->adminUniqueCode , 'ruleDate' => date('Y-m-d')]);
                    return redirect('/adminrule')->with('success', "The rules and regulations has been deactivated.");
                } 
                else if(request('sAction')=="act" && $data->ruleStatus=="0") {
                    Rule::where('ruleID', request('rid'))->update(['ruleStatus' => '1' , 'adminUniqueCode' => $admin->adminUniqueCode , 'ruleDate' => date('Y-m-d')]);
                    return redirect('/adminrule')->with('success', "The rules and regulations has been activated.");
                }
            }
        }
        return redirect('/adminrule')->with('failed', "Failed to perform the action. Please try again.");
    }

    function getRuleDetails()
    {
        try {
            if(request('rid')) {
                $data = Rule::where('ruleID', request('rid'))->first();
                if(isset($data)) {
                    return ['status' => true, 'data' => $data];
                }
            }
        } catch (\Exception $e) {
            \Log::error($e);
        }
        return ['status' => false, 'failed' => "No matching records found."];
    }

    function editRule(Request $r)
    {
        if($r->aUC && $r->rid) {
            $admin = Admin::where('adminUniqueCode', $r->aUC)->first();
            $data = Rule::where('ruleID', $r->rid)->first();
            if(isset($data) && isset($admin)) {
                Rule::where('ruleID', $r->rid)
                ->update([
                    'ruleTitle' => $r->rTitle , 
                    'ruleDetails' => $r->rDetails , 
                    'ruleDate' => date('Y-m-d') ,
                    'ruleStatus' => '1' , 
                    'adminUniqueCode' => $admin->adminUniqueCode , 
                ]);
                return redirect('/adminrule')->with('success', "The rules and regulations has been updated.");
            }
        }
        return redirect('/adminrule')->with('failed', "Failed to perform the action. Please try again.");
    }

    function dltRule()
    {
        if(request('rid')) {
            $data = Rule::where('ruleID', request('rid'))->first();
            if(isset($data)) {
                Rule::where('ruleID', request('rid'))->delete();
                return redirect('/adminrule')->with('success', "The rules and regulations has been removed.");
            }
        }
        return redirect('/adminrule')->with('failed', "Failed to perform the action. Please try again.");
    }
}
