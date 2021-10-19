<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;

    public $timestamps = false;
	protected $table = "routes";

	protected $fillable = [
        'routeID', 'routeTitle', 'routeStatus', 'routeTrainNum'
	];
}
