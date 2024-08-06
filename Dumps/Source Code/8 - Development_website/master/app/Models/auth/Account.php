<?php

namespace App\Models\auth;

use App\Models\BugTracker;
use App\Models\BugTrackerMessage;
use App\Models\BugTrackerMessageStatus;
use App\Models\BugTrackerVote;
use App\Models\characters\Character;
use App\Models\ShopAppeal;
use App\Models\Subscribe;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Operations related to Auth database"
 * )
 */
/**
 * @OA\Schema(
 *     schema="Account",
 *     title="Account",
 *     description="Account model",
 *     @OA\Property(property="id", type="integer", format="int32"),
 *     @OA\Property(property="username", type="string"),
 *     @OA\Property(property="sha_pass_hash", type="string"),
 *     @OA\Property(property="rank", type="integer", format="int32"),
 *     @OA\Property(property="sessionkey", type="string"),
 *     @OA\Property(property="v", type="string"),
 *     @OA\Property(property="s", type="string"),
 *     @OA\Property(property="email", type="string"),
 *     @OA\Property(property="joindate", type="string", format="date-time"),
 *     @OA\Property(property="tfa_verif", type="string"),
 *     @OA\Property(property="last_ip", type="string"),
 *     @OA\Property(property="last_local_ip", type="string"),
 *     @OA\Property(property="failed_logins", type="integer", format="int32"),
 *     @OA\Property(property="locked", type="integer", format="int32"),
 *     @OA\Property(property="last_login", type="string", format="date-time"),
 *     @OA\Property(property="online", type="integer", format="int32"),
 *     @OA\Property(property="expansion", type="integer", format="int32"),
 *     @OA\Property(property="mutetime", type="integer", format="int64"),
 *     @OA\Property(property="mutereason", type="string"),
 *     @OA\Property(property="muteby", type="string"),
 *     @OA\Property(property="locale", type="integer", format="int32"),
 *     @OA\Property(property="os", type="string"),
 *     @OA\Property(property="platform", type="string"),
 *     @OA\Property(property="current_realm", type="integer", format="int32"),
 *     @OA\Property(property="banned", type="integer", format="int32"),
 *     @OA\Property(property="flags", type="integer", format="int32"),
 *     @OA\Property(property="security", type="string"),
 *     @OA\Property(property="pass_verif", type="string"),
 *     @OA\Property(property="email_verif", type="integer", format="int32"),
 *     @OA\Property(property="forum_username", type="string"),
 *     @OA\Property(property="token_key", type="string"),
 *     @OA\Property(property="email_keyword", type="string"),
 *     @OA\Property(property="email_status", type="integer", format="int32"),
 *     @OA\Property(property="email_sub", type="integer", format="int32"),
 *     @OA\Property(property="comments", type="string"),
 *     @OA\Property(property="geolock_pin", type="integer", format="int32")
 * )
 */
class Account extends Authenticatable implements MustVerifyEmail, CanResetPassword, JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $connection = 'mysql2';
    protected $table = 'account';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'username',
        'sha_pass_hash',
        'rank',
        'sessionkey',
        'v',
        's',
        'email',
        'joindate',
        'tfa_verif',
        'last_ip',
        'last_local_ip',
        'failed_logins',
        'locked',
        'last_login',
        'online',
        'expansion',
        'mutetime',
        'mutereason',
        'muteby',
        'locale',
        'os',
        'platform',
        'current_realm',
        'banned',
        'flags',
        'security',
        'pass_verif',
        'email_verif',
        'forum_username',
        'token_key',
        'email_keyword',
        'email_status',
        'email_sub',
        'comments',
        'geolock_pin',
        'active',
        'recovery_code'
    ];

    protected $casts = [
        'joindate' => 'datetime',
        'last_login' => 'datetime'
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function hasVerifiedEmail()
    {
        return $this->email_verif == 1;
    }

    public function markEmailAsVerified()
    {
        return $this->forceFill(['email_verif' => 1])->save();
    }

    public function hasSubscribed()
    {
        return Subscribe::whereEmail($this->email)->first() || $this->email_sub == 1;
    }

    public function attemptLogin($password)
    {
        $username = strtoupper($this->username);
        $password = strtoupper($password);
        $passwordHash = sha1("$username:$password");

        return strcasecmp($this->sha_pass_hash, $passwordHash) === 0;
    }

    public function sendPasswordResetNotification($token)
    {
        $resetPasswordUrl = url(route('password.reset')) . "?token=" . $token;

        $data['type'] = 'EmailResetPassword';
        $data['url'] = url('/');
        $data['email'] = $this->email;
        $data['username'] = $this->name;
        $data['resetPasswordUrl'] = $resetPasswordUrl;

        $data['subscribe'] = $this->hasSubscribed();

        $data['body'] = view('email.reset-password')->with(['data' => $data])->render();

        dispatch(new \App\Jobs\Email($data));
    }

    public function sendEmailVerificationNotification($newAccount = false)
    {
        if ($newAccount) {
            $data['type'] = 'NewAccount';
        } else {
            $data['type'] = 'EmailVerify';
        }

        $data['email'] = $this->email;
        $data['username'] = $this->username;
        $data['joinDate'] = $this->joindate;
        $data['keyword'] = $this->email_keyword;

        $data['subscribe'] = $this->hasSubscribed();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id' => $this->getKey(),
                'hash' => sha1($this->getEmailForVerification())
            ]
        );

        $data['verificationUrl'] = $verificationUrl;
        $data['body'] = view('email.verify')->with(['data' => $data])->render();

        dispatch(new \App\Jobs\Email($data));
    }

    public function sendEmailChangeNotification($newEmail)
    {
        $token = JWTAuth::customClaims([
            'newEmail' => $newEmail
        ])->fromUser($this);

        $changeEmailUrl = URL::temporarySignedRoute(
            'verification.change.email',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'token' => $token
            ]
        );

        $data['type'] = 'EmailChange';
        $data['email'] = $newEmail;
        $data['username'] = $this->username;
        $data['changeEmailUrl'] = $changeEmailUrl;

        $data['subscribe'] = $this->hasSubscribed();

        $data['body'] = view('email.change-email')->with(['data' => $data])->render();

        dispatch(new \App\Jobs\Email($data));
    }

    public function hiddenEmail()
    {
        return preg_replace_callback('/(?<=^.).*(?=@)/', function($match) {
           return str_repeat('*', strlen($match[0]));
        }, $this->email);
    }

    public function changeEmail($newEmail)
    {
        if ($this->email == $newEmail) {
            return "ALREADY_CHANGED";
        }

        if (Account::where('email', '=', $newEmail)->first()) {
            return "ALREADY_TOOK";
        }

        if ($this->forceFill(['email' => $newEmail])->save()) {
            return "DONE";
        }

        return "FAILED";
    }

    public function ban()
    {
        return $this->hasMany(AccountBanned::class, 'id', 'id');
    }

    public function latestBan()
    {
        return $this->ban()->orderBy('bandate', 'DESC')->first();
    }

    public function shopCoins()
    {
        return $this->hasOne(ShopCoin::class, 'id', 'id');
    }

    public function characters($database)
    {
        return $this->setConnection($database)->hasMany(Character::class, 'account', 'id');
    }

    public function deletedCharacters($database)
    {
        return $this->setConnection($database)->hasMany(Character::class, 'deleteInfos_Account', 'id');
    }

    public function enable2fa($secretKey, $recoveryCode)
    {
        return $this->forceFill([
            'security' => $secretKey,
            'locked' => 2,
            'recovery_code' => $recoveryCode
        ])->save();
    }

    public function disable2fa()
    {
        return $this->forceFill([
            'security' => '',
            'locked' => 0,
            'recovery_code' => null
        ])->save();
    }

    public function twoFactorAllowed()
    {
        return $this->hasOne(AccountTwofactorAllowed::class, 'account_id', 'id');
    }

    public function shopCoinsHistory()
    {
        return $this->hasMany(ShopCoinsHistory::class, 'account_id', 'id');
    }

    public function shopLog()
    {
        return $this->hasMany(ShopLog::class, 'account', 'id');
    }

    public function getLastUnseenBugTrackerMessage()
    {
        $lastUnseenMessage = BugTrackerMessageStatus::where('account_id', $this->id)
            ->where('seen', false)
            ->orderBy('created_at', 'desc')
            ->first();

        if ($lastUnseenMessage) {
            return BugTrackerMessage::find($lastUnseenMessage->bug_tracker_message_id);
        }

        return null;
    }

    public function getAllUnseenBugTrackerMessages()
    {
        $unseenMessages = BugTrackerMessageStatus::where('account_id', $this->id)
            ->where('seen', false)
            ->get();

        $messageIds = $unseenMessages->pluck('bug_tracker_message_id');

        return BugTrackerMessage::whereIn('id', $messageIds)->get();
    }

    public function markBugTrackerMessageAsSeen($messageId)
    {
        BugTrackerMessageStatus::updateOrCreate(
            ['account_id' => $this->id, 'bug_tracker_message_id' => $messageId],
            ['seen' => true]
        );
    }

    public function markBugTrackerMessageAsUnseen($messageId)
    {
        BugTrackerMessageStatus::updateOrCreate(
            ['account_id' => $this->id, 'bug_tracker_message_id' => $messageId],
            ['seen' => false]
        );
    }

    public function getCoinsAttribute()
    {
        $shopCoin = $this->hasOne(ShopCoin::class, 'id', 'id')->first();

        return $shopCoin ? $shopCoin->coins : 0;
    }

    public function latestShopAppeal()
    {
        return $this->setConnection('mysql')->hasOne(ShopAppeal::class, 'account_id', 'id')->orderBy('id', 'DESC')->first();
    }

    public function votes()
    {
        return $this->setConnection('mysql')->hasMany(BugTrackerVote::class, 'account_id', 'id');
    }

    public function bugReports()
    {
        return $this->setConnection('mysql')->hasMany(BugTracker::class, 'account_id', 'id');
    }

    public function canInitTransfer()
    {
        $targetDate = Carbon::createFromFormat('Y-m-d H:i:s', '2023-10-01 00:00:00');

        return $this->joindate < $targetDate;
    }
}
