<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    public $timestamps = false;
	protected $table = "announcements";

	protected $fillable = [
        'reportID', 'reportTitle', 'reportDetails', 'reportDate', 'reportStatus'
	];
}
