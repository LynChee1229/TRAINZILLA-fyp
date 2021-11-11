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


    function getRouteSuggestion(Request $item)
    {
        $data = $suggestion = $departID = $arriveID = $distance = $timeTaken = [];
        $data['status'] = False;
        $ticketPrice = 0;
        $fullRoute = Route::join('routes_stations', function ($join) {
            $join->on('routes.routeID', '=', 'routes_stations.routeID')
            ->where('routes.routeStatus', '=', 1);
        })->orderBy('route_station_sequence' , 'asc')->get();

        if(isset($item->departStation) && isset($item->arriveStation)) 
        {
            $depart = Station::where('stationName', $item->departStation)->first();
            $arrive = Station::where('stationName', $item->arriveStation)->first();

            if(isset($depart) && isset($arrive)) {
                $departLine = RouteStation::where('stationID', $depart->stationID)->get();
                $arriveLine = RouteStation::where('stationID', $arrive->stationID)->get();
            }

            foreach($departLine as $d) {
                $departID[] = $d->routeID;
            }
            foreach($arriveLine as $a) {
                $arriveID[] = $a->routeID;
            }

            if( (count($departLine) == 1) && (count($arriveLine) == 1) && ($departID == $arriveID) )
            {
                $temp = $fullRoute->whereIn('routeID', $departID);
                $tempSuggest = [];
                foreach($temp as $t) {
                    if($departLine[0]->route_station_sequence < $arriveLine[0]->route_station_sequence) {
                        if( ($t->route_station_sequence >= $departLine[0]->route_station_sequence) 
                            && ($t->route_station_sequence <= $arriveLine[0]->route_station_sequence) ) {
                            $tempSuggest[] = $t;
                        }
                    }
                    if($departLine[0]->route_station_sequence > $arriveLine[0]->route_station_sequence) {
                        if( ($t->route_station_sequence >= $arriveLine[0]->route_station_sequence) 
                            && ($t->route_station_sequence <= $departLine[0]->route_station_sequence) ) {
                            $tempSuggest[] = $t;
                        }
                    } 
                }
                $suggestion[0] = $tempSuggest;
            }
            
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
                    $ticketPrice = $longDist * 0.30;
                } else {
                    $ticketPrice = (30*0.30) + (($longDist-30)*0.20);
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

                // draft vvv
                'num' => count($suggestion) , 
                'dID' => $departID,
                'aID' => $arriveID,
            ];
        }
        return $data;
    }
}
