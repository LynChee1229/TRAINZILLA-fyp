<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Models\Admin;
use App\Models\Route;
use App\Models\RouteStation;
use App\Models\Station;
use App\Models\Stos;
use DateTime;

class TimeTableController extends Controller
{
    /*** 
    * Static Time Table (Admin Side)
    ***/
    function timetable()
    {
        $tab = "route";
        if(request('id')) {
            $list = Route::where('routeID', request('id'))->first();
            if(isset($list)) {
                $routeStationAsc = RouteStation::where('routeID', $list->routeID)
                            ->orderBy('route_station_sequence', 'asc')->get();
                if($routeStationAsc) {
                    $list->FirstTable = $routeStationAsc;
                    $prev = null;
                    $prevTime = null;
                    foreach($routeStationAsc as $rs) {
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
                            for($i=2; $i<=$list->routeTrainNum; $i++) {
                                array_push($departTime, $tempTime->modify("+ 15 minutes")->format("H:i"));
                            }
                            $rs->departTime = $departTime;

                            $prev = $rs->stationID;
                            $prevTime = $rs->stationDeparture;
                        }
                    }
                }

                $routeStationDesc = RouteStation::where('routeID', $list->routeID)
                            ->orderBy('route_station_sequence', 'desc')->get();
                if($routeStationDesc) {
                    $list->SecondTable = $routeStationDesc;
                    $prev2 = null;
                    $prevTime2 = null;
                    foreach($routeStationDesc as $rs2) {
                        $station2 = Station::where('stationID', $rs2->stationID)->first();
                        if($station2) {
                            $rs2->stationName = $station2->stationName;
                            $tempTime2 = new DateTime($station2->stationDeparture);

                            if($prev2 != null) {
                                $prevSta2 = Station::where('stationID', $prev2)->first();
        
                                $rsTemp2 = Stos::where([
                                    ['stationA', '=', $station2->stationName],
                                    ['stationB', '=', $prevSta2->stationName],
                                ])->orWhere([
                                    ['stationA', '=', $prevSta2->stationName],
                                    ['stationB', '=', $station2->stationName],
                                ])->first();
        
                                if($rsTemp2) {
                                    $rs2->timeTaken += $rsTemp2->stationTimeTaken;
                                }
                                $cal2 = ceil($rs2->timeTaken / 60);
                                $t2 = new DateTime($prevTime2);
                                $tempTime2 = $t2->modify("+ ".$cal2." minutes");
                            }

                            $rs2->stationDeparture = $tempTime2->format("H:i");
                            $departTime2 = [$tempTime2->format("H:i")];
                            for($i=2; $i<=$list->routeTrainNum; $i++) {
                                array_push($departTime2, $tempTime2->modify("+ 15 minutes")->format("H:i"));
                            }
                            $rs2->departTime = $departTime2;

                            $prev2 = $rs2->stationID;
                            $prevTime2 = $rs2->stationDeparture;
                        }
                    }
                }
            }
            return view('statictimetable', compact('tab' , 'list'));
        }
    }


    /*** 
    * Static Time Table (User Side)
    ***/
    function TimeTableAPI()
    {
        if(request('id')) {
            $list = Route::where('routeID', request('id'))->first();
            if(isset($list)) {
                $routeStationAsc = RouteStation::where('routeID', $list->routeID)
                            ->orderBy('route_station_sequence', 'asc')->get();
                if($routeStationAsc) {
                    $list->FirstTable = $routeStationAsc;
                    $prev = null;
                    $prevTime = null;
                    foreach($routeStationAsc as $rs) {
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
                            for($i=2; $i<=$list->routeTrainNum; $i++) {
                                array_push($departTime, $tempTime->modify("+ 15 minutes")->format("H:i"));
                            }
                            $rs->departTime = $departTime;

                            $prev = $rs->stationID;
                            $prevTime = $rs->stationDeparture;
                        }
                    }
                }

                $routeStationDesc = RouteStation::where('routeID', $list->routeID)
                            ->orderBy('route_station_sequence', 'desc')->get();
                if($routeStationDesc) {
                    $list->SecondTable = $routeStationDesc;
                    $prev2 = null;
                    $prevTime2 = null;
                    foreach($routeStationDesc as $rs2) {
                        $station2 = Station::where('stationID', $rs2->stationID)->first();
                        if($station2) {
                            $rs2->stationName = $station2->stationName;
                            $tempTime2 = new DateTime($station2->stationDeparture);

                            if($prev2 != null) {
                                $prevSta2 = Station::where('stationID', $prev2)->first();
        
                                $rsTemp2 = Stos::where([
                                    ['stationA', '=', $station2->stationName],
                                    ['stationB', '=', $prevSta2->stationName],
                                ])->orWhere([
                                    ['stationA', '=', $prevSta2->stationName],
                                    ['stationB', '=', $station2->stationName],
                                ])->first();
        
                                if($rsTemp2) {
                                    $rs2->timeTaken += $rsTemp2->stationTimeTaken;
                                }
                                $cal2 = ceil($rs2->timeTaken / 60);
                                $t2 = new DateTime($prevTime2);
                                $tempTime2 = $t2->modify("+ ".$cal2." minutes");
                            }

                            $rs2->stationDeparture = $tempTime2->format("H:i");
                            $departTime2 = [$tempTime2->format("H:i")];
                            for($i=2; $i<=$list->routeTrainNum; $i++) {
                                array_push($departTime2, $tempTime2->modify("+ 15 minutes")->format("H:i"));
                            }
                            $rs2->departTime = $departTime2;

                            $prev2 = $rs2->stationID;
                            $prevTime2 = $rs2->stationDeparture;
                        }
                    }
                }
            }
            return $list;
        }
    }
}