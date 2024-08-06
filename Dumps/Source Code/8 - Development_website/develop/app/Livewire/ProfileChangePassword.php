<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Rules\CurrentPassword;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelLow;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use PragmaRX\Google2FA\Google2FA;

class ProfileChangePassword extends Component
{
    public $currentPassword;
    public $newPassword;
    public $newPasswordRepeat;
    public $message = '';
    public $qrCode2fa = false;
    public $secret2fa;
    public $qrCode2faDataUri;
    public $oneTimeCode;
    public $collapseForm = false;
    public $emailKeyword;
    public $security;
    public $setSuccess2fa;
    public $setSuccess2faDisable = false;
    public $recoveryCode;
    public $oneTimeCodeChangePassword;

    public function mount()
    {
        $user = Auth::guard('account')->user();

        $this->security = $user->security;
    }

    public function update()
    {
        $user = Auth::guard('account')->user();
        $rules = [
            'currentPassword' => ['required', new CurrentPassword],
            'newPassword' => 'required|min:8|max:15',
            'newPasswordRepeat' => 'required|same:newPassword',
        ];

        if ($user->security) {
            $rules['oneTimeCodeChangePassword'] = 'required';
        }

        $this->validate($rules);


        if ($user) {

            if ($user->security) {
                $google2fa = new Google2FA();

                if (!$google2fa->verifyKey($user->security, $this->oneTimeCodeChangePassword)) {
                    $this->addError('oneTimeCodeChangePassword', __('change_password_modal')['exception']['wrong_one_time_code']);
                    return;
                }
            }

            $username = strtoupper($user->username);
            $password = strtoupper($this->newPassword);
            $passwordHash = sha1("$username:$password");

            $user->forceFill([
                'sha_pass_hash' => $passwordHash,
                'email_verif' => 1,
                'sessionkey' => null,
                'v' => null,
                's' => null
            ])->update();

            if ($user) {
                event(new PasswordReset($user));
                $this->reset();
                $this->mount();
                $this->message = __('change_password_modal')['message']['success'];
            }
        } else {
            $this->reset();
            $this->message = __('change_password_modal')['message']['error'];
        }
    }

    public function collapseFormButton()
    {
        $this->collapseForm = true;
    }

    public function generate2fa()
    {
        $google2fa = new Google2FA();

        $user = Auth::guard('account')->user();

        $this->secret2fa = $google2fa->generateSecretKey();

        $this->emailKeyword = $user->email_keyword;

        $this->qrCode2fa = $google2fa->getQRCodeUrl('turtle-wow', $user->email, $this->secret2fa);

        $writer = new PngWriter();

        $qrCode = QrCode::create($this->qrCode2fa)
            ->setEncoding(new Encoding('UTF-8'))
            ->setErrorCorrectionLevel(new ErrorCorrectionLevelLow())
            ->setSize(300)
            ->setMargin(10)
            ->setRoundBlockSizeMode(new RoundBlockSizeModeMargin())
            ->setForegroundColor(new Color(0, 0, 0))
            ->setBackgroundColor(new Color(255, 255, 255));

        $logo = Logo::create(public_path('web_logo.png'))
            ->setResizeToWidth(60)
            ->setPunchoutBackground(true);

        /*$label = Label::create('secret:' . $this->secret2fa)
            ->setTextColor(new Color(255, 0, 0));*/

        $result = $writer->write($qrCode, $logo, null);

        $this->qrCode2fa = true;

        $this->qrCode2faDataUri = $result->getDataUri();

        $this->collapseForm = true;
    }

    public function set2fa()
    {
        $this->resetErrorBag(['oneTimeCode']);
        $this->validate([
            'oneTimeCode' => 'required'
        ]);

        $user = Auth::guard('account')->user();

        $google2fa = new Google2FA();
        if ($google2fa->verifyKey($this->secret2fa, $this->oneTimeCode)) {
            $recoveryCode = password_hash(bin2hex(random_bytes(25)), PASSWORD_DEFAULT);
            if ($user->enable2fa($this->secret2fa, $recoveryCode)) {
                $this->security = $this->secret2fa;
                $this->collapseForm = false;
                $this->setSuccess2fa = true;
                $this->recoveryCode = $recoveryCode;
            } else {
                $this->addError('oneTimeCode',  __('change_password_modal')['exception']['wrong_one_time_code']);
            }
        } else {
            $this->addError('oneTimeCode',  __('change_password_modal')['exception']['wrong_one_time_code']);
        }
    }

    public function disable2fa()
    {
        $this->resetErrorBag(['oneTimeCode']);
        $this->validate([
            'oneTimeCode' => 'required'
        ]);

        $user = Auth::guard('account')->user();

        $google2fa = new Google2FA();
        if ($google2fa->verifyKey($this->security, $this->oneTimeCode)) {
            if ($user->disable2fa()) {
                if ($user->twoFactorAllowed) {
                    $user->twoFactorAllowed->delete();
                    $user->save();
                }
                $this->security = '';
                $this->qrCode2fa = false;
                $this->collapseForm = false;
                $this->setSuccess2faDisable = true;
            } else {
                $this->addError('oneTimeCode',  __('change_password_modal')['exception']['wrong_one_time_code']);
            }
        } else {
            $this->addError('oneTimeCode',  __('change_password_modal')['exception']['wrong_one_time_code']);
        }
    }

    public function render()
    {
        return view('livewire.profile-change-password');
    }
}
