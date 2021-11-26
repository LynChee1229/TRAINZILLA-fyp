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
                    Ticket::where('userUniqueCode', $req->uUC)->delete();
                    User::where('userUniqueCode', $req->uUC)->delete();
                    $data['success'] = "Success";
                    return $data;
                }
            }

        }
        $data['fail'] = "Failed to delete account. Please try again";
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

    function bookingDetails(Request $req)
    {
        if($req->uUC) {
            $data = User::select('userVoucher', 'userPoint')->where('userUniqueCode', $req->uUC)->first();
            if(isset($data)) {
                $payment = $req->ticketNum * $req->ticketPrice;
                $point = $payment * 100;

                if(intval($data->userVoucher) > 0) {
                    $total = round($req->ticketPrice * 0.90, 2);
                    $total = round($total * $req->ticketNum, 2);
                } else {
                    $total = $payment;
                }

                $data->payment = $payment;
                $data->point = $point;
                $data->total = $total;
                return $data;
            }
        }
        return NULL;
    }

    function proceedToPayment(Request $req)
    {
        $result['status'] = 'failed';
        $date = date('Y-m-d H:i:s');
        $ticketCode = $method = "";
        if($req->uUC) {
            $user = User::where('userUniqueCode', $req->uUC)->first();
            if($user) {
                for( $i=1; $i<=$req->ticketNum; $i++ ){
                    $ticket = new Ticket;
                    $id = Ticket::max("ticketID") ? (Ticket::max("ticketID") + 1) : 1;
                    $ticket->ticketUniqueCode = "ticket".$id.uniqid().$id;
                    $ticket->ticketID = $id;

                    $ticketCode .= "\n   ".$ticket->ticketUniqueCode;

                    if(intval($req->userVoucher) > 0) {
                        $ticket->ticketPrice = $req->total / $req->ticketNum;
                        User::where('userUniqueCode', $req->uUC)->update(['userVoucher' => ($user->userVoucher - 1)]);
                    } else {
                        $ticket->ticketPrice = $req->ticketPrice;
                    }

                    $depart = Station::where('stationName', $req->departStation)->first();
                    $arrive = Station::where('stationName', $req->arriveStation)->first();
                    $ticket->ticketDeparture = $depart->stationID;
                    $ticket->ticketArrival = $arrive->stationID;

                    if($req->paymentMethod == "banking") {
                        $method = "Online Banking";
                    } else if($req->paymentMethod == "tngo") {
                        $method = "Touch N' Go";
                    } else if($req->paymentMethod == "grab") {
                        $method = "Grab Pay";
                    } else if($req->paymentMethod == "card") {
                        $method = "Credit / Debit Card";
                    } else {
                        $method = "Others";
                    }

                    $ticket->ticketPaymentMethod = $method;
                    $ticket->ticketStatus = 1;
                    $ticket->ticketPurchaseDate = $date;
                    $ticket->ticketExpiryDate = date('Y-m-d H:i:s', strtotime($date. ' + 90 days'));
                    $ticket->userUniqueCode = $user->userUniqueCode;
                    $ticket->save();

                    User::where('userUniqueCode', $req->uUC)->update(['userPoint' => ($user->userPoint + $req->earnedPoint)]);
                }
                $temp = (intval($req->userVoucher) > 0) ? "1 voucher has been applied automatically" : "";

                $msg = ['content'=>"Dear ".$user->userName.", \n\n\t\t:: Trainzilla Ticket E-Receipt ::" ."\n\nDeparture Station: \t".$req->departStation ."\nArrival Station: \t".$req->arriveStation ."\nEach Ticket Fares: \tRM ".$req->ticketPrice ."\nNumber of Tickets: \t".$req->ticketNum ."\nPayment: \t\tRM ".$req->payment ."\nPayment Method: \t".$method ."\nEarned Points: \t\t".$req->earnedPoint ."\nTotal Reward Points: \t".$user->userPoint."\n\n".$temp ."Final Payment: \t\tRM ".$req->total ."\n\n\nTicket Code : ".$ticketCode."\n\n\nPlease feel free to contact us if you have any questions.\n\nWebsite: http://trainzilla.com.my\nEmail: customerservice@trainzilla.com" ];

                Mail::send(['text'=>'email'], $msg, function($message) use ($user) {
                    $message->to($user->userEmail, $user->userName)
                    ->subject('Your Ticket E-Receipt from Trainzilla')
                    ->from('receipt@trainzilla.com','TRAINZILLA');
                });
                $result['status'] = 'success';
            }
        }
        return $result;
    }


}
