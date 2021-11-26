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


    function tracingRoute($departLine, $arrive, $depart)
    {
        $suggestion = $scanned = [];
        $snum = Station::all();
        $sNUM = count($snum) - 2;
        while(count($scanned) != $sNUM) {
            foreach($departLine as $dLine) {
                $rid_temp = $dLine->routeID;
    
                // track smaller sequence
                $temp = Route::join('routes_stations', function ($join) use ($rid_temp) {
                    $join->on('routes.routeID', '=', 'routes_stations.routeID')
                    ->where('routes.routeStatus', '=', 1)
                    ->where('routes.routeID', $rid_temp);
                })->orderBy('routes.routeID', 'asc')
                ->orderBy('route_station_sequence' , 'desc')->get();
    
                $found = false;
                $tempSuggest = [];
                foreach($temp as $t) {
                    if( $t->route_station_sequence <= $dLine->route_station_sequence && 
                        !in_array($t->stationID , $scanned) ) {
    
                        $tempSuggest[] = $t;
                        $s = Station::where('stationID', $t->stationID)->first();
                        $t->stationName = $s->stationName;
                        if( $t->stationID == $arrive->stationID ) {
                            $found = true;
                            break;
                        }
    
                        $interChange = RouteStation::where('stationID', $t->stationID)->get();
                        if(count($interChange) > 1) {
                            $departLine = $interChange;
                        }

                        if( $t->stationID != $depart->stationID  &&  $t->stationID != $arrive->stationID  &&  count($interChange) == 1) {
                            $scanned[] = $t->stationID;
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
    
                $found = false;
                $tempSuggest = [];
                foreach($temp as $t) {
                    if( ($t->route_station_sequence >= $dLine->route_station_sequence) && 
                        !in_array($t->stationID , $scanned) ) {

                        $tempSuggest[] = $t;
                        $s = Station::where('stationID', $t->stationID)->first();
                        $t->stationName = $s->stationName;
                        if( $t->stationID == $arrive->stationID ) {
                            $found = true;
                            break;
                        }
    
                        $interChange = RouteStation::where('stationID', $t->stationID)->get();
                        if(count($interChange) > 1) {
                            $departLine = $interChange;
                        }

                        if( $t->stationID != $depart->stationID  &&  $t->stationID != $arrive->stationID  &&  count($interChange) == 1) {
                            $scanned[] = $t->stationID;
                        }
                    }
                }
                if($found) {
                    $suggestion[] = $tempSuggest;
                }
    
            }
            return $suggestion;
        }
    }


    function getRouteSuggestion(Request $item)
    {
        $data = $suggestion = $distance = $timeTaken = [];
        $data['status'] = False;
        $ticketPrice = 0;

        if(isset($item->departStation) && isset($item->arriveStation)) 
        {
            $depart = Station::where('stationName', $item->departStation)->first();
            $arrive = Station::where('stationName', $item->arriveStation)->first();

            if(isset($depart) && isset($arrive)) {
                $departLine = RouteStation::where('stationID', $depart->stationID)->get();
                $arriveLine = RouteStation::where('stationID', $arrive->stationID)->get();
            }


                    // useless -----------------
                    $departID = $arriveID = [];
                    foreach($departLine as $d) {
                        $departID[] = $d->routeID;
                    }
                    foreach($arriveLine as $a) {
                        $arriveID[] = $a->routeID;
                    }
                    // useless -----------------

            
            $suggestion = $this->tracingRoute($departLine, $arrive, $depart);
            


            

            foreach($suggestion as $sug) {
                $prev = null;
                $disTemp = $timeTemp = 0;
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
                    }
                    $prev = $curr->stationID;
                }
                $distance[] = $disTemp;
                $timeTaken[] = $timeTemp;
            }

            if(!empty($distance)) {
                $longDist = max($distance);
                if($longDist <= 30) {
                    $ticketPrice = $longDist * 30/100;
                } else {
                    $ticketPrice = (30*30/100) + (($longDist-30)*20/100);
                }
            }

            $data = [
                'status' => True ,
                'ticketPrice' => $ticketPrice ,
                'departStation' => $depart ,
                'arriveStation' => $arrive ,
                'routeSuggestion' => $suggestion ,
                'routeDistance' => $distance ,
                'routeTimeTaken' => $timeTaken ,

                // draft variables
                'num' => count($suggestion) , 
                'dID' => $departID,
                'aID' => $arriveID,
                // 'test' => $departLine , 
            ];
        }
        return $data;
    }
}
