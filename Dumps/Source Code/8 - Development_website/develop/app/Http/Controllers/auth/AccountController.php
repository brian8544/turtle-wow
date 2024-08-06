<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function logout()
    {
        Auth::guard('account')->logout();

        return redirect()->route('home');
    }

    public function profile()
    {
        if (Auth::guard('account')->check()) {
            $user = Auth::guard('account')->user();

            return view('profile', compact('user'));
        } else {
            return redirect()->route('home');
        }
    }
}
