<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\auth\Account;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    public function reset(Request $request)
    {
        if (!isset($request->token)) {
            return redirect('/');
        }

        return view('reset-password', ['token' => $request->token]);
    }

    public function submit(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|min:8|confirmed',
            'password_confirmation' => 'required'
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $username = strtoupper($user->username);
                $password = strtoupper($password);
                $passwordHash = sha1("$username:$password");

                $user->forceFill([
                    'sha_pass_hash' => $passwordHash,
                    'email_verif' => 1
                ]);

                $user->save();

                event(new PasswordReset($user));
            });

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('index')->with('success', __('reset_password')['success_changed_password'])
            : back()->with('error', __('error'));
    }
}
