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
use Illuminate\Support\Facades\Mail;

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
            $error["userName"] = "Username";
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

    function updateProfile(Request $req)
    {
        $res = [];
        if($req->infoType == "email") {
            $existing = User::where('userEmail', $req->infoValue)->first();
            if($existing) {
                $res["error"] = "Existing email address!";
                return $res;
            } else {
                User::where('userUniqueCode', $req->uUC)->update(['userEmail' => $req->infoValue]);
            }
        }

        if($req->infoType == "contact") {
            $existing = User::where('userContact', $req->infoValue)->first();
            if($existing) {
                $res["error"] = "Existing contact number!";
                return $res;
            }
            else {
                User::where('userUniqueCode', $req->uUC)->update(['userContact' => $req->infoValue]);
            }
        }

        if($req->infoType == "dob") {
            User::where('userUniqueCode', $req->uUC)->update(['userDOB' => $req->infoValue]);
        }
        
        return User::where('userUniqueCode', $req->uUC)->first();
    }

    function resetPassword(Request $req)
    {
        $data = [];
        if($req->uUC) {
            $user = User::where('userUniqueCode', $req->uUC)->first();
            if(isset($user)) {
                if(!Hash::check($req->oldPassword, $user->userPassword)) {
                    $data['fail'] = "Old password does not match! Please try again";
                    return $data;
                } else {
                    $new = Hash::make($req->newPassword);
                    User::where('userUniqueCode', $req->uUC)->update(['userPassword' => $new ]);
                    $data['success'] = "Password has been updated successfully.";
                    return $data;
                }
            }
            
        }
        $data['fail'] = "Failed to reset password. Please try again";
        return $data;
    }

    function forgetPassword(Request $req)
    {
        $result = [];
        if($req->userEmail) {
            $user = User::where('userEmail', $req->userEmail)->first();
            if(isset($user) && ($user->userStatus == 1)) {
                $newPassword = uniqid();
                User::where('userUniqueCode', "=", $user->userUniqueCode)->update(['userPassword'=>Hash::make($newPassword)]);

                $data = ['content'=>"Hi ".$user->userName.", \n\nYour account password has been reset to ".$newPassword.".\nPlease log in and reset your new password."];

                Mail::send(['text'=>'email'], $data, function($message) use ($req, $user) {
                    $message->to($req->userEmail, $user->userName)
                    ->subject('TRAINZILLA Account Reset Password')
                    ->from('trainzilla@helpdesk.com','TRAINZILLA DEVELOPMENT TEAM');
                });

                $result['success'] = "An email has been sent to you, please check your mailbox to reset your password.";
                return $result;
            } 
            else if(!$user) {
                $result['fail'] = "Record is not found.";
            } 
            else if($user->userStatus == 0) {
                $result['fail'] = "Your account is inactive. Please contact customerservice@trainzilla.com for help or register a new account.";
            }
        } else {
            $result['fail'] = "Failed to reset password. Please try again";
        }
        return $result;
    }

    function deleteUserAccount(Request $req)
    {
        $data = [];
        if($req->uUC) {
            $user = User::where('userUniqueCode', $req->uUC)->first();
            if(isset($user)) {
                if(!Hash::check($req->password, $user->userPassword)) {
                    $data['fail'] = "Password does not match!";
                    return $data;
                } else {
                    User::where('userUniqueCode', $req->uUC)->delete();
                    $data['success'] = "Success";
                    return $data;
                }
            }
            
        }
        $data['fail'] = "Failed to delete account. Please try again";
        return $data;
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

    function getRouteData()
    {
        $data = Route::where('routes.routeStatus', '=', 1)->get();

        foreach ($data as $d) {
            $routeStation = RouteStation::where('routeID', $d->routeID)->get();
            if($routeStation) {
                $d['station'] = $routeStation;
                foreach($routeStation as $rs) {
                    $station = Station::where('stationID', $rs->stationID)->first();
                    if($station) {
                        $rs->stationName = $station->stationName;
                        $rs->stationDeparture = $station->stationDeparture;
                    }
                }
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

    function announcementBar()
    {
        $today = date('Y-m-d');
        $list = Announcement::where([
            ['reportStatus', '=', '1'],
            ['reportDate', '=', $today]
        ])->get();

        if(count($list) < 5) {
            $list = Announcement::where('reportStatus', '=', '1')
            ->orderBy('reportDate', 'desc')
            ->take(5)
            ->get();
        }

        if($list) {
            return $list;
        }
        return null;
    }
}
