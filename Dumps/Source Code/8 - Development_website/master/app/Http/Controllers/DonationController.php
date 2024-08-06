<?php

namespace App\Http\Controllers;

use App\Models\BtcPayWebhook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DonationController extends Controller
{
    public function invoiceSettled()
    {
        $btcPayWebhook = new BtcPayWebhook();
        $btcPayWebhook->processWebhook();
    }
}
