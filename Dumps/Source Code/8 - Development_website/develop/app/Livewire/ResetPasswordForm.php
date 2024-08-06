<?php

namespace App\Livewire;

use App\Models\auth\Account;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Livewire\Component;
use PragmaRX\Google2FA\Google2FA;

class ResetPasswordForm extends Component
{
    public $token;
    public $email;
    public $password;
    public $oneTimeCode;
    public $need2fa = false;
    public $password_confirmation;
    public $showButton = true;
    public $message = '';

    protected $rules = [
        'token' => 'required',
        'email' => 'required|email:rfc,dns|exists:mysql2.account',
        'password' => 'required|min:8|max:15|confirmed',
        'password_confirmation' => 'required',
    ];

    public function updatePassword()
    {
        $this->message = '';

        if ($this->need2fa) {
            $this->rules['oneTimeCode'] = 'required';
        }

        $this->validate();

        $faUser = Account::where('email', $this->email)->first();

        if ($faUser) {
            if ($faUser->security) {
                $this->need2fa = true;

                if (!isset($this->oneTimeCode)) {
                    $this->message = __('page_reset_password')['message']['missing_one_time_code'];
                    return;
                }


                $google2fa = new Google2FA();

                if (!$google2fa->verifyKey($faUser->security, $this->oneTimeCode)) {
                    $this->addError('oneTimeCode', __('page_reset_password')['message']['wrong_one_time_code']);
                    return;
                }
            }
        }

        $status = Password::broker('accounts')->reset(
            array('email' => $this->email, 'password' => $this->password, 'password_confirmation' => $this->password_confirmation, 'token' => $this->token),
            function ($user, $password) {
                $username = strtoupper($user->username);
                $password = strtoupper($password);
                $passwordHash = sha1("$username:$password");

                $user->forceFill([
                    'sha_pass_hash' => $passwordHash,
                    'email_verif' => 1,
                    'sessionkey' => null,
                    'v' => null,
                    's' => null
                ]);

                $user->save();

                event(new PasswordReset($user));
            });

        if ($status === Password::PASSWORD_RESET) {
            DB::table('password_reset_tokens')->where('email', $this->email)->delete();

            $this->reset();

            $this->showButton = false;

            $this->message = __('page_reset_password')['message']['success'];
        } else {
            $this->reset();
            $this->message = __('page_reset_password')['message']['invalid_token'];
        }
    }

    public function render()
    {
        return view('livewire.reset-password-form');
    }
}
