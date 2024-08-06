<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Models\forum\PhpBBUser;
use App\Models\forum\PhpBBUserGroup;
use App\Models\Subscribe;
use App\Rules\CheckEmail;
use App\Rules\CheckForumUsername;
use App\Rules\ReservedNames;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Livewire\Component;

class RegisterModal extends Component
{
    public $email;
    public $username;
    public $password;
    public $resetEmail;
    public $confirmPassword;
    public $cloudflareToken;
    public $forumUsername;
    public $collapseRegister = true;
    public $collapseForgotPassword = false;
    public $message = '';
    public $showSendButton = true;

    protected $rules = [
        'password' => 'required|min:8|max:15',
        'confirmPassword' => 'required|same:password'
    ];

    public function generateName()
    {
        $names = array(
            'Gat',
            'Rok',
            'Tak',
            'Kel',
            'Bog',
            'Itr',
            'Des',
            'Umi',
            'Uda',
            'Gla',
            'Zul',
            'Mav',
            'Fid',
            'Gri',
            'Ruz',
            'Ald',
            'Dro',
            'Vin',
            'Sis',
            'Zas',
            'Blo',
            'Nam',
            'Lur',
            'Ala',
            'Tho',
            'Apo',
            'Hal',
            'Sha',
            'Cer',
            'Syl',
            'Ges',
            'Zen'
        );

        $surnames = array(
            'ard',
            'olf',
            'pon',
            'kon',
            'elf',
            'mat',
            'das',
            'raa',
            'iss',
            'uss',
            'taa',
            'koh',
            'moh',
            'dat',
            'ull',
            'rat',
            'hat'
        );

        $randomName = $names[mt_rand(0, sizeof($names) - 1)];

        $randomSurname = $surnames[mt_rand(0, sizeof($surnames) - 1)];

        return $randomName . $randomSurname;
    }

    public function register(Request $request)
    {
        $needRules = [
            'username' => $this->username,
            'password' => $this->password,
            'confirmPassword' => $this->confirmPassword,
            'email' => $this->email
        ];
        $combinedRules = array_merge($this->rules, [
            'username' => ['required', 'alpha_dash', 'min:2', 'unique:mysql2.account', 'max:15'],
            'email' => ['required', 'email:rfc,dns', 'unique:mysql2.account', new CheckEmail()],
        ]);

        if (config('app.web_env') == "EN") {
            $combinedRules = array_merge($combinedRules, [
                'forumUsername' => ['required', 'regex:/^[\dA-Za-z]{2,15}$/' , 'different:username', 'different:email', 'not_regex:/@/', new CheckForumUsername()]
            ]);

            $needRules = array_merge($needRules, [
                'forumUsername' => $this->forumUsername
            ]);
        }

        $validation1 = Validator::make($needRules, $combinedRules);

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

        $username = strtoupper($this->username);
        $password = strtoupper($this->password);
        $passwordHash = sha1("$username:$password");

        $keywordName = $this->generateName();
        $keywordRand = intval("0" . rand(1, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9));
        $keyword = $keywordName . $keywordRand;

        if (config('app.web_env') == "EN") {
            $account_forum_clean = strtolower($this->forumUsername);
            $account_forum = ucfirst($account_forum_clean);
            $account = Account::create([
                'username' => $username,
                'sha_pass_hash' => $passwordHash,
                'email' => $this->email,
                'reg_email' => $this->email,
                'last_ip' => $request->ip(),
                'email_keyword' => $keyword,
                'email_sub' => 1,
                'forum_username' => $account_forum,
            ]);

            if ($account) {
                $passwd_forum = password_hash("$password", PASSWORD_DEFAULT);
                $forumAccount = PhpBBUser::create([
                    'user_regdate' => time(),
                    'username' => $account_forum,
                    'username_clean' => $account_forum_clean,
                    'user_permissions' => '',
                    'user_sig' => '',
                    'user_password' => $passwd_forum,
                    'user_email' => $this->email,
                    'user_lang' => 'en',
                    'user_style' => 1
                ]);

                if ($forumAccount) {
                    $forumGroup = PhpBBUserGroup::create([
                        'group_id' => 2,
                        'user_id' => $forumAccount->user_id,
                        'user_pending' => 0,
                    ]);
                }
            }
        } else {
            $account = Account::create([
                'username' => $this->username,
                'sha_pass_hash' => $passwordHash,
                'email' => $this->email,
                'reg_email' => $this->email,
                'last_ip' => $request->ip(),
                'email_keyword' => $keyword,
                'email_sub' => 1
            ]);
        }

        if ($account) {
            $this->dispatch('analytic-register-new-user', ['page' => url()->previous()]);

            if (!$account->hasSubscribed()) {
                Subscribe::create(['email' => $account->email]);
            }

            $account->sendEmailVerificationNotification($newAccount = true);

            $this->reset();

            $this->message = __('register_modal')['message']['success'];
        } else {
            $this->message = __('register_modal')['message']['success'];
        }
    }

    public function toggleForgotPassword()
    {
        $this->collapseForgotPassword = !$this->collapseForgotPassword;

        if ($this->collapseForgotPassword) {
            $this->collapseRegister = false;
        }
    }

    public function toggleRegister()
    {
        if (!$this->collapseRegister) {
            $this->collapseRegister = true;
            $this->collapseForgotPassword = false;
        }

        $this->reset();
    }

    public function resetPassword()
    {
        $this->message = '';
        $this->validate([
            'resetEmail' => 'required|email:rfc,dns'
        ]);

        Password::broker('accounts')->sendResetLink(array('email' => $this->resetEmail));

        $this->reset('resetEmail');

        $this->showSendButton = false;

        $this->message = __('register_modal')['message']['success_reset_password'];
    }

    public function render()
    {
        return view('livewire.register-modal');
    }
}
