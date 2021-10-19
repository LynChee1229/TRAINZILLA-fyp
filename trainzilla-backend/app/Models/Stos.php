<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stos extends Model
{
    use HasFactory;

    public $timestamps = false;
	protected $table = "stoss";

	protected $fillable = [
        'stosID', 'stationA', 'stationB', 'stationDistance', 'stationTimeTaken',
	];
}
