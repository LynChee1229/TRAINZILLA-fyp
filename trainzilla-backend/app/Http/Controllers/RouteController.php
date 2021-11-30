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
use Illuminate\Support\Collection;
use DateTime;

class RouteController extends Controller
{

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
            $routeStation = RouteStation::where('routeID', $d->routeID)
                            ->orderBy('route_station_sequence', 'asc')->get();
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


    function tracingRoute($departLine, $arrive, $depart, $trace)
    {
        $totalCond = count(Route::all()); //Total Routes, return int.
        $suggestion = [];

        if(count($trace) < $totalCond) {
            foreach($departLine as $dLine) {
                $rid_temp = $dLine->routeID;

                if(!in_array($rid_temp, $trace)) {
                    // track smaller sequence
                    $temp = Route::join('routes_stations', function ($join) use ($rid_temp) {
                        $join->on('routes.routeID', '=', 'routes_stations.routeID')
                        ->where('routes.routeStatus', '=', 1)
                        ->where('routes.routeID', $rid_temp);
                    })->orderBy('routes.routeID', 'asc')
                    ->orderBy('route_station_sequence' , 'desc')->get();

                    $prev = null;
                    $prevTime = null;
                    foreach($temp as $rs) {
                        $station = Station::where('stationID', $rs->stationID)->first();
                        if($station) {
                            $rs->stationName = $station->stationName;
                            $tempTime = new DateTime($station->stationDeparture);

                            if($prev != null) {
                                $prevSta = Station::where('stationID', $prev)->first();
        
                                $rsTemp = Stos::where([
                                    ['stationA', '=', $station->stationName],
                                    ['stationB', '=', $prevSta->stationName],
                                ])->orWhere([
                                    ['stationA', '=', $prevSta->stationName],
                                    ['stationB', '=', $station->stationName],
                                ])->first();
        
                                if($rsTemp) {
                                    $rs->timeTaken += $rsTemp->stationTimeTaken;
                                }
                                $cal = ceil($rs->timeTaken / 60);
                                $t = new DateTime($prevTime);
                                $tempTime = $t->modify("+ ".$cal." minutes");
                            }

                            $rs->stationDeparture = $tempTime->format("H:i");
                            $departTime = [$tempTime->format("H:i")];
                            for($i=2; $i<=60; $i++) {
                                array_push($departTime, $tempTime->modify("+ 15 minutes")->format("H:i"));
                            }
                            $rs->departTime = $departTime;

                            $prev = $rs->stationID;
                            $prevTime = $rs->stationDeparture;
                        }
                    }

                    $found = false;
                    $tempSuggest = [];
                    foreach($temp as $t) {
                        if( $t->route_station_sequence <= $dLine->route_station_sequence ) {
                            $tempSuggest[] = $t;
                            $tempSuggest = new Collection($tempSuggest);
                            $tempSuggest = $tempSuggest->unique('stationID')->values();
                            
                            if( $t->stationID == $arrive->stationID ) {
                                $found = true;
                                break;
                            }

                            if($t->stationID != $depart->stationID) {
                                $interChange = RouteStation::where('stationID', $t->stationID)->get();
                                if(count($interChange) > 1) {
                                    $tempTrace = $trace;
                                    array_push($tempTrace, $rid_temp);
                                    $tempInter = $this->tracingRoute($interChange, $arrive, $depart, $tempTrace);
                                    $tempInter = new Collection($tempInter);
                                    if(count($tempInter) > 0) {
                                        foreach($tempInter as $ti) {
                                            if(!empty($suggestion)) {
                                                foreach($suggestion as $sug) {
                                                    $tempTemp = $tempSuggest->merge($ti);
                                                    $tempTemp = $tempTemp->unique('stationID')->values();
    
                                                    $diff = $sug->diff($tempTemp);
                                                    if($diff->count() > 0) {
                                                        $suggestion[] = $tempTemp;
                                                    }
                                                }
                                            } else {
                                                $tempTemp = $tempSuggest->merge($ti);
                                                $tempTemp = $tempTemp->unique('stationID')->values();
                                                $suggestion[] = $tempTemp;
                                            }
                                        }
                                        // $found = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if($found) {
                        $suggestion[] = $tempSuggest;
                    }


                    // track larger sequence
                    $temp = Route::join('routes_stations', function ($join) use ($rid_temp) {
                        $join->on('routes.routeID', '=', 'routes_stations.routeID')
                        ->where('routes.routeStatus', '=', 1)
                        ->where('routes.routeID', $rid_temp);
                    })->orderBy('routes.routeID', 'asc')
                    ->orderBy('route_station_sequence' , 'asc')->get();

                    $prev = null;
                    $prevTime = null;
                    foreach($temp as $rs) {
                        $station = Station::where('stationID', $rs->stationID)->first();
                        if($station) {
                            $rs->stationName = $station->stationName;
                            $tempTime = new DateTime($station->stationDeparture);

                            if($prev != null) {
                                $prevSta = Station::where('stationID', $prev)->first();
        
                                $rsTemp = Stos::where([
                                    ['stationA', '=', $station->stationName],
                                    ['stationB', '=', $prevSta->stationName],
                                ])->orWhere([
                                    ['stationA', '=', $prevSta->stationName],
                                    ['stationB', '=', $station->stationName],
                                ])->first();
        
                                if($rsTemp) {
                                    $rs->timeTaken += $rsTemp->stationTimeTaken;
                                }
                                $cal = ceil($rs->timeTaken / 60);
                                $t = new DateTime($prevTime);
                                $tempTime = $t->modify("+ ".$cal." minutes");
                            }

                            $rs->stationDeparture = $tempTime->format("H:i");
                            $departTime = [$tempTime->format("H:i")];
                            for($i=2; $i<=60; $i++) {
                                array_push($departTime, $tempTime->modify("+ 15 minutes")->format("H:i"));
                            }
                            $rs->departTime = $departTime;

                            $prev = $rs->stationID;
                            $prevTime = $rs->stationDeparture;
                        }
                    }

                    $found = false;
                    $tempSuggest = [];
                    foreach($temp as $t) {
                        if( $t->route_station_sequence >= $dLine->route_station_sequence ) {
                            $tempSuggest[] = $t;
                            $tempSuggest = new Collection($tempSuggest);
                            $tempSuggest = $tempSuggest->unique('stationID')->values();

                            if( $t->stationID == $arrive->stationID ) {
                                $found = true;
                                break;
                            }

                            if($t->stationID != $depart->stationID) {
                                $interChange = RouteStation::where('stationID', $t->stationID)->get();
                                if(count($interChange) > 1) {
                                    $tempTrace = $trace;
                                    array_push($tempTrace, $rid_temp);
                                    $tempInter = $this->tracingRoute($interChange, $arrive, $depart, $tempTrace);
                                    $tempInter = new Collection($tempInter);
                                    if(count($tempInter) > 0) {
                                        foreach($tempInter as $ti) {
                                            if(!empty($suggestion)) {
                                                foreach($suggestion as $sug) {
                                                    $tempTemp = $tempSuggest->merge($ti);
                                                    $tempTemp = $tempTemp->unique('stationID')->values();
    
                                                    $diff = $sug->diff($tempTemp);
                                                    if($diff->count() > 0) {
                                                        $suggestion[] = $tempTemp;
                                                    }
                                                }
                                            } else {
                                                $tempTemp = $tempSuggest->merge($ti);
                                                $tempTemp = $tempTemp->unique('stationID')->values();
                                                $suggestion[] = $tempTemp;
                                            }
                                        }
                                        // $found = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if($found) {
                        $suggestion[] = $tempSuggest;
                    }

                    $trace[] = array_push($trace, $rid_temp);
                }

            }
            return $suggestion;
        }
        return null;
    }


    function getRouteSuggestion(Request $item)
    {
        $data = $suggestion = $distance = $timeTaken = $suggestedTime = [];
        $data['status'] = False;
        $ticketPrice = 0;

        if(isset($item->departStation) && isset($item->arriveStation))
        {
            $depart = Station::where('stationName', $item->departStation)->first();
            $arrive = Station::where('stationName', $item->arriveStation)->first();

            if(isset($depart) && isset($arrive)) {
                $departLine = RouteStation::where('stationID', $depart->stationID)->get();
            }


            $departID = [];
            foreach($departLine as $d) {
                $departID[] = $d->routeID;
            }
            $trace[] = $departID[0];
            $suggestion = $this->tracingRoute($departLine, $arrive, $depart, []);


            $currTime = new DateTime();
            foreach($suggestion as $index => $sug) {
                $prev = null;
                $disTemp = $timeTemp = 0;
                $temp_suggestedTime = [];
                foreach($sug as $curr) {
                    if($prev != null) {
                        $A = Station::where('stationID', $prev)->first();
                        $B = Station::where('stationID', $curr->stationID)->first();

                        $rsTemp = Stos::where([
                            ['stationA', '=', $A->stationName],
                            ['stationB', '=', $B->stationName],
                        ])->orWhere([
                            ['stationA', '=', $B->stationName],
                            ['stationB', '=', $A->stationName],
                        ])->first();

                        if($rsTemp) {
                            $disTemp += $rsTemp->stationDistance;
                            $timeTemp += $rsTemp->stationTimeTaken;
                        }
                        else {
                            unset($suggestion[$index]);
                            $disTemp = NULL;
                            $timeTemp = NULL;
                            $temp_suggestedTime = NULL;
                            break;
                        }
                    }
                    $prev = $curr->stationID;
                    foreach($curr->departTime as $dtime) {
                        $lastTime = end($temp_suggestedTime);
                        if( ($dtime > $currTime->format("H:i")) && ($dtime > $lastTime) ) {
                            $temp_suggestedTime[] = $dtime;
                            break;
                        }
                    }
                }
                if($disTemp != NULL) {
                    $distance[] = $disTemp;
                }
                if($timeTemp != NULL) {
                    $timeTaken[] = $timeTemp;
                }
                if($temp_suggestedTime != NULL) {
                    $suggestedTime[] = $temp_suggestedTime;
                }
            }

            if(!empty($distance)) {
                $longDist = max($distance);
                if($longDist <= 30) {
                    $ticketPrice = round(($longDist * 30/100), 2);
                } else {
                    $ticketPrice = round((30*30/100) + (($longDist-30)*20/100), 2);
                }
            }

            $suggestion = new Collection($suggestion);
            $suggestion = $suggestion->values();

            $data = [
                'status' => True ,
                'ticketPrice' => $ticketPrice ,
                'departStation' => $depart ,
                'arriveStation' => $arrive ,
                'routeSuggestion' => $suggestion ,
                'routeDistance' => $distance ,
                'routeTimeTaken' => $timeTaken ,
                'suggestedTime' => $suggestedTime ,
                'num' => count($suggestion) ,
            ];
        }
        return $data;
    }
}
