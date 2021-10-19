<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

        if(!$user || !Hash::check($req->userPassword, $user->userPassword)) {
            return ["error"=>"Record is not matched. Please try again or register for a new account."];
        }
        else if($user->userStatus == 0) {
            return ["error"=>"Your account is inactive. Please contact customerservice@trainzilla.com for help or register a new account."];
        }

        return $user;
    }
}
