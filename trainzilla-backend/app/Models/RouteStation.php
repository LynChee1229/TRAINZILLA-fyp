<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RouteStation extends Model
{
    use HasFactory;

    public $timestamps = false;
	protected $table = "routes_stations";

	protected $fillable = [
        'route_station_ID', 'route_station_sequence',
	];
}
