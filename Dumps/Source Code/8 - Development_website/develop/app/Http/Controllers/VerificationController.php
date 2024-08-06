<?php

namespace App\Http\Controllers;

use App\Models\auth\Account;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class VerificationController extends Controller
{
    public function verify(Request $request)
    {
        if (!$request->hasValidSignature()) {
            abort(401);
        }

        if (!Auth::guard('account')->check()) {
            $user = Account::find($request->route('id'));

            if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
                throw  new AuthorizationException();
            }

            Auth::guard('account')->loginUsingId($request->route('id'));
        }

        $user = Auth::guard('account')->user();

        if ($user->hasVerifiedEmail()) {
            return view('activate', ['message' => __('page_activate')['message']['already_activated']]);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
            return view('activate', ['message' => __('page_activate')['message']['success']]);
        } else {
            return view('activate', ['message' => __('page_activate')['message']['error']]);
        }
    }

    public function change(Request $request)
    {
        if (!$request->hasValidSignature()) {
            abort(401);
        }

        $token = $request->route('token');

        if (!$token || !JWTAuth::setToken($token)->check()) {
            return redirect()->route('profile')->with('error', __('page_profile')['overview']['message']['error']);
        }

        $newEmail = JWTAuth::getPayload()->get('newEmail');
        $userId = JWTAuth::getPayload()->get('sub');

        if (!Auth::guard('account')->check()) {
            $user = Account::find($userId);

            if (!$user) {
                throw  new AuthorizationException();
            }

            Auth::guard('account')->loginUsingId($userId);
        } else {
            $user = Auth::guard('account')->user();

            if ($user->id != $userId) {
                throw  new AuthorizationException();
            }
        }

        $status = $user->changeEmail($newEmail);

        switch ($status) {
            case "DONE":
                $messageType = 'success';
                $message = __('page_profile')['overview']['message']['success_changed_email'];
                break;
            case "ALREADY_CHANGED":
                $messageType = 'error';
                $message = __('page_profile')['overview']['message']['email_already_changed'];
                break;
            case "ALREADY_TOOK":
                $messageType = 'error';
                $message = __('page_profile')['overview']['message']['email_already_took'];
                break;
            case "FAILED":
                $messageType = 'error';
                $message = __('page_profile')['overview']['message']['error'];
                break;
            default:
                $messageType = '';
                $message = '';
        }

        return redirect()->route('profile')->with($messageType, $message);
    }
}
