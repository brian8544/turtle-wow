<?php

namespace App\Http\Controllers;

use App\Models\auth\Account;
use App\Models\Subscribe;
use Illuminate\Http\Request;

class SubscribeController extends Controller
{
    public function subscribe(Request $request)
    {
        $rules = [
            'email' => 'required|email|unique:subscribes'
        ];

        $request->validate($rules);

        $subscribe = Subscribe::create([
            'email' => $request->email
        ]);

        $user = Account::where(['email' => $request->email])->first();

        if ($user) {
            $user->email_sub = 1;
            $user->save();
        }

        if ($subscribe) {
            return redirect()->back();
        } else {
            return redirect()->back();
        }
    }

    public function unsubscribe(Request $request)
    {
        $rules = [
            'email' => 'required|email:rfc,dns'
        ];

        $request->validate($rules);

        $subscribe = Subscribe::where(['email' => $request->email])->first();

        $user = Account::where(['email' => $request->email])->first();

        if ($user) {
            $user->email_sub = 0;
            $user->save();
        }

        if ($subscribe) {
            $subscribe->delete();
            return redirect()->back();
        } else {
            return redirect()->back();
        }
    }

    public function unsubscribeOld(Request $request)
    {
        $rules = [
            'email' => 'required|email:rfc,dns',
            'id' => 'required|integer|exists:mysql2.account'
        ];

        $request->validate($rules);

        $subscribe = Subscribe::where(['email' => $request->email])->first();

        $user = Account::where(['id' => $request->id, 'email' => $request->email])->first();

        $user->email_sub = 0;

        $user->save();

        if ($subscribe) {
            $subscribe->delete();
            return redirect()->back();
        } else {
            return redirect()->back();
        }
    }
}
