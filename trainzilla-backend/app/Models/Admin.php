<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    public $timestamps = false;
	protected $table = "admins";

	protected $fillable = [
        'adminUniqueCode', 'adminID', 'adminName', 'adminEmail', 'adminPassword', 'adminContact', 'adminStatus'
	];
}
