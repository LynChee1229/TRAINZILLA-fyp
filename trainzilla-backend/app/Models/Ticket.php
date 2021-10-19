<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    public $timestamps = false;
	protected $table = "tickets";

	protected $fillable = [
        'ticketUniqueCode', 'ticketID', 'ticketPrice', 'ticketDeparture', 'ticketArrival', 'ticketPaymentMethod', 'ticketStatus', 'ticketPurchaseDate', 'ticketExpiryDate',
	];
}
