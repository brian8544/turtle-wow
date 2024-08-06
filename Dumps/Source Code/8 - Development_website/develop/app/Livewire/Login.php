<?php

namespace App\Livewire;

use App\Models\auth\Account;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Livewire\Component;
use PragmaRX\Google2FA\Google2FA;

class Login extends Component
{
    public $username;
    public $password;
    public $cloudflareToken;
    public $resetEmail;
    public $collapseCheckUsername = true;
    public $collapseLogin = false;
    public $collapse2fa = false;
    public $collapseForgotPassword = false;
    public $collapseForgot2FaCode = false;
    public $showReset2FaCodeButton = true;
    public $message = '';
    public $showSendButton = true;
    public $oneTimeCode;
    public $rememberMe = false;
    public $previusUrl;
    public $recoveryCode;

    protected $rules = [
        'username' => 'required|min:2|exists:mysql2.account,username,active,1'
    ];

    public function mount()
    {
        if (url()->previous() !== url()->current()) {
            $this->previusUrl = url()->previous();
        } else {
            $this->previusUrl = route('home');
        }
    }

    public function toggleForgotPassword()
    {
        $this->collapseForgotPassword = !$this->collapseForgotPassword;

        if ($this->collapseForgotPassword) {
            $this->collapseCheckUsername = false;
            $this->collapseLogin = false;
            $this->collapse2fa = false;
            $this->collapseForgot2FaCode = false;
        }
    }

    public function toggleLogin()
    {
        $this->collapseLogin = !$this->collapseLogin;

        if ($this->collapseLogin) {
            $this->collapseCheckUsername = false;
            $this->collapseForgotPassword = false;
            $this->collapse2fa = false;
            $this->collapseForgot2FaCode = false;
        }
    }

    public function toggle2fa()
    {
        $this->collapse2fa = !$this->collapse2fa;

        if ($this->collapse2fa) {
            $this->collapseCheckUsername = false;
            $this->collapseForgotPassword = false;
            $this->collapseLogin = false;
            $this->collapseForgot2FaCode = false;
        }
    }

    public function toggleCheckUsername()
    {
        $this->collapseCheckUsername = !$this->collapseCheckUsername;

        if ($this->collapseCheckUsername) {
            $this->collapseLogin = false;
            $this->collapseForgotPassword = false;
            $this->collapse2fa = false;
            $this->collapseForgot2FaCode = false;
        }
    }

    public function toggleForgot2FaCode()
    {
        $this->collapseForgot2FaCode = !$this->collapseForgot2FaCode;

        if ($this->collapseForgot2FaCode) {
            $this->collapseCheckUsername = false;
            $this->collapseLogin = false;
            $this->collapse2fa = false;
            $this->collapseForgotPassword = false;
        }
    }

    public function updateFaCode()
    {
        $this->validate([
            'recoveryCode' => 'required',
        ]);

        $user = Account::Where('username', $this->username)->where('recovery_code', $this->recoveryCode)->first();

        if ($user) {
            $user->disable2fa();
        }

        $this->showReset2FaCodeButton = false;

        $this->message = __('reset_2_fa_code_form')['message_login'];
    }

    public function checkUsername()
    {
        $validation1 = Validator::make([
            'username' => $this->username,
        ], $this->rules);

        if ($validation1->fails()) {
            $this->dispatch('reset-turnstile');
        }

        $validation1->validate();

        $cloudflareRules = [
            'cloudflareToken' => ['required', Rule::turnstile()]
        ];

        $validation2 = Validator::make([
            'cloudflareToken' => $this->cloudflareToken
        ], $cloudflareRules);

        if ($validation2->fails()) {
            $this->dispatch('reset-turnstile');
        }

        $this->toggleLogin();
    }

    public function login()
    {
        $combinedRules = [
            'username' => ['required', 'min:2', 'exists:mysql2.account,username,active,1'],
            'password' => ['required']
        ];

        $this->validate($combinedRules);

        $account = Account::where('username', '=', $this->username)->first();

        if ($account) {
            if ($account->attemptLogin($this->password)) {
                if ($account->security) {
                    $this->toggle2fa();
                } else {
                    Auth::guard('account')->loginUsingId($account->id, $this->rememberMe);

                    return redirect()->to($this->previusUrl);
                }
            } else {
                $this->addError('password', __('auth.password'));
            }
        } else {
            $this->addError('username', __('validation.exists', ['attribute' => $this->username]));
        }
    }

    public function login2fa()
    {
        $this->validate([
            'username' => ['required', 'min:2', 'exists:mysql2.account,username,active,1'],
            'oneTimeCode' => 'required'
        ]);

        $account = Account::where('username', '=', $this->username)->first();

        if ($account) {
            $google2fa = new Google2FA();
            if ($google2fa->verifyKey($account->security, $this->oneTimeCode)) {
                Auth::guard('account')->loginUsingId($account->id, $this->rememberMe);

                return redirect()->to($this->previusUrl);
            } else {
                $this->addError('oneTimeCode', __('login_modal')['exception']['wrong_one_time_code']);
            }
        } else {
            $this->addError('username', __('validation.exists', ['attribute' => $this->username]));
        }
    }

    public function resetPassword()
    {
        $this->message = '';
        $this->validate([
            'resetEmail' => 'required|email:rfc,dns'
        ]);

        $account = Account::where('email', '=', $this->resetEmail)->where('active', 1)->first();

        if ($account) {
            Password::broker('accounts')->sendResetLink(array('email' => $this->resetEmail));
        }

        $this->reset('resetEmail');

        $this->showSendButton = false;

        $this->message = __('register_modal')['message']['success_reset_password'];
    }

    public function render()
    {
        return view('livewire.login');
    }
}
