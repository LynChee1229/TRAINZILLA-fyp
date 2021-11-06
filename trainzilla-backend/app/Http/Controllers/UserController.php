<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

class UserController extends Controller
{
    function register(Request $req)
    {
        $user = new User;
        $uid = User::max("userID") ? (User::max("userID") + 1) : 1;
        $user->userUniqueCode = "user".$uid.uniqid().$uid;
        $user->userID = $uid;
        $user->userName = $req->userName;
        $user->userEmail = $req->userEmail;
        $user->userContact = $req->userContact;
        $user->userDOB = $req->userDOB;
        $user->userPassword = Hash::make($req->userPassword);

        $existingName = User::where('userName', $req->userName)->first();
        $existingEmail = User::where('userEmail', $req->userEmail)->first();
        $existingContact = User::where('userContact', $req->userContact)->first();

        $error = [];
        if($existingName) {
            $error["name"] = "Name";
        }

        if($existingEmail) {
            $error["email"] = "Email";
        }

        if($existingContact) {
            $error["contact"] = "Contact";
        }

        if($error) {
            return $error;
        }
        else {
            $user->save();
            return $user;
        }
    }

    function login(Request $req)
    {
        $user = User::where('userName', $req->key)
        ->orWhere('userEmail', $req->key)->first();

        if(!$user) {
            return ["error"=>"Record is not matched. Please try again or register for a new account."];
        }
        else if(!Hash::check($req->userPassword, $user->userPassword)) {
            return ["error"=>"Password does not match. Please try again."];
        }
        else if($user->userStatus == 0) {
            return ["error"=>"Your account is inactive. Please contact customerservice@trainzilla.com for help or register a new account."];
        }

        return $user;
    }

    function getAvailableStation()
    {
        $data = Route::join('routes_stations', function ($join) {
                                $join->on ('routes.routeID', '=', 'routes_stations.routeID')
                                    ->where ('routes.routeStatus', '=', 1);
                            })
                            ->get ();

        foreach ($data as $d) {
            $station = Station::where('stationID', $d->stationID)->first();
            if($station) {
                $d->stationName = $station->stationName;
            }
        }

        return $data;
    }

    function announcementList()
    {
        return Announcement::where('reportStatus', '1')->get();
    }

    function ruleList()
    {
        return Rule::where('ruleStatus', '1')->get();
    }
}
