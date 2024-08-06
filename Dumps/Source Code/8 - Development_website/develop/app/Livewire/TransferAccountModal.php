<?php

namespace App\Livewire;

use App\Models\auth\Account;
use App\Models\auth\AccountBanned;
use App\Models\auth\CharacterTransfer;
use App\Models\auth\GpHistory;
use App\Models\auth\ShopCoin;
use App\Models\auth\ShopCoinsHistory;
use App\Models\auth\ShopLog;
use App\Models\characters\Character;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Livewire\Component;

class TransferAccountModal extends Component
{
    public $userId;
    public $userOnline;
    public $userLatestBan;
    public $accountOnline;
    public $characterTransfer;
    public $transferInProgress;
    public $banned;
    public $transferComplete;
    public $transferStatus;
    public $targetAccountId = null;
    public $characterStatus = null;
    public $needNewAccount;
    public $needNewEmail;
    public $realm_id = 0;
    public $characters;
    public $realmLists;
    public $confirmationCheckbox = false;
    public $responseMessage;
    public $username;
    public $newUsername;
    public $newEmail;
    public $password;
    public $confirmPassword;
    public $checkedTransfer = false;

    public function mount()
    {
        $this->accountOnline = $this->userOnline == 1 ? true : false;
        $this->characterTransfer = CharacterTransfer::where('source_account_id', $this->userId)->get();
        $this->transferInProgress  = $this->characterTransfer->where('status', '!=', 'transferred')->count() > 0;
        $this->banned = $this->userLatestBan ? true : false;
        $this->transferComplete = $this->characterTransfer->count() > 0 && $this->characterTransfer->where('status', '!=', 'transferred')->count() == 0;
        $this->transferStatus = $this->characterTransfer->count();
        $this->characters = Character::where('account', $this->userId)->get();
        if (!$this->checkedTransfer) {
            $this->checkTransferStatus();
        }
        $this->realmLists = [
            '0' => [
                'realmName' => __('transfer_account')['choose_realm'],
                'id' => '0'
            ],
            /*'1' => [
                'realmName' => config('customs.transfer.realm_name_1'),
                'id' => config('customs.transfer.realm_id_1')
            ],*/
            '2' => [
                'realmName' => config('customs.transfer.realm_name_2'),
                'id' => config('customs.transfer.realm_id_2')
            ],
            '3' => [
                'realmName' => config('customs.transfer.realm_name_3'),
                'id' => config('customs.transfer.realm_id_3')
            ],
            /*'4' => [
                'realmName' => config('customs.transfer.realm_name_4'),
                'id' => config('customs.transfer.realm_id_4')
            ]*/
        ];
    }

    public function checkTransferStatus()
    {
        $this->responseMessage = '';
        $xApiKey = config('customs.transfer.api_key');
        $payload   = array('username' => $this->username, 'email' => Auth::guard('account')->user()->email);
        $options   = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n" .
                    "X-API-key: $xApiKey",
                'method' => 'POST',
                'content' => http_build_query($payload)
            )
        );

        $context  = stream_context_create($options);
        $resultLaravel = json_decode(file_get_contents(config('customs.transfer.api_url') . '/check/username', false, $context), true);

        if ($resultLaravel) {
            $this->checkedTransfer = true;
            if (isset($resultLaravel['error']) && $resultLaravel['error']) {
                $this->responseMessage = $resultLaravel['message'];
            }
            if (isset($resultLaravel['username_exists'])) {
                $this->needNewAccount = true;
            }
            if (isset($resultLaravel['email_exists'])) {
                $this->needNewEmail = true;
            }
        }

    }

    public function transferAccount()
    {
        $this->resetValidation();
        $this->responseMessage = '';
        if (!$this->checkedTransfer) {
            $this->responseMessage = __('transfer_account')['message']['check_transfer'];
            return false;
        }

        $lock = Cache::lock('lock_transfer_account_' . $this->userId, 5);

        if ($lock->get()) {
            try {

                $checkExportedCharacter = CharacterTransfer::where('source_account_id', $this->userId)->first();

                if ($checkExportedCharacter) {
                    $this->responseMessage = __('transfer_account')['message']['already_transferred_account'];
                    return false;
                }

                $xApiKey = config('customs.transfer.api_key');

                if ($this->transferStatus > 0) {
                    $this->targetAccountId = $this->characterTransfer->first()->target_account_id;
                }

                if ($this->targetAccountId == null) {
                    $newAccount = Account::where('username', $this->username)->where('id', $this->userId)->get()->toArray();

                    unset($newAccount[0]['id']);

                    if ($this->needNewAccount) {
                        $needRules = [
                            'newUsername' => $this->newUsername,
                            'password' => $this->password,
                            'confirmPassword' => $this->confirmPassword,
                            'realm_id' => $this->realm_id
                        ];
                        $combinedRules = [
                            'newUsername' => ['required', 'alpha_dash', 'min:3', 'unique:mysql2.account,username', 'max:15'],
                            'password' => 'required|min:8|max:15',
                            'confirmPassword' => 'required|same:password',
                            'realm_id' => ['required', 'numeric', 'not_in:0']
                        ];
                        if ($this->needNewEmail) {
                            $needRules = array_merge($needRules, [
                                'newEmail' => $this->newEmail
                            ]);
                            $combinedRules = array_merge($combinedRules, [
                                'newEmail' => ['required', 'email:rfc,dns'],
                            ]);
                        }

                        $validation = Validator::make($needRules, $combinedRules);

                        $validation->validate();

                        $username = strtoupper($this->newUsername);
                        $password = strtoupper($this->password);
                        $passwordHash = sha1("$username:$password");
                        $accountForum = ucfirst(strtolower($this->newUsername));

                        $newAccount[0]['username'] = $username;
                        $newAccount[0]['sha_pass_hash'] = $passwordHash;
                        $newAccount[0]['forum_username'] = $accountForum;

                        if ($this->needNewEmail) {
                            $newAccount[0]['email'] = $this->newEmail;
                            $newAccount[0]['email_verif'] = 0;
                        }
                    }

                    $newAccount[0]['v'] = null;
                    $newAccount[0]['s'] = null;
                    $newAccount[0]['sessionkey'] = null;
                }

                $gpHistory = GpHistory::where('account_id', $this->userId)->get();
                $shopCoins = ShopCoin::where('id', $this->userId)->get();
                $shopCoinsHistory = ShopCoinsHistory::where('account_id', $this->userId)->get();
                $shopLogs = ShopLog::where('account', $this->userId)->get();

                if ($this->characterStatus == null) {
                    $this->characters = Character::where('account', $this->userId)->get();
                    $characters = $this->characters->toArray();
                    if (count($characters) == 0) {
                        $this->responseMessage = __('transfer_account')['message']['missing_characters'];
                        return false;
                    }
                }

                $shopLogs = $shopLogs->toArray();

                if (isset($shopLogs) && count($shopLogs) > 0) {
                    foreach ($shopLogs as $key => $shopLog) {
                        $shopLogs[$key]['realm_id'] = $this->realm_id;
                    }
                }

                $payload = array(
                    'account' => $newAccount[0],
                    'gp_history' => $gpHistory->toArray(),
                    'shop_coins' => $shopCoins->toArray(),
                    'shop_coins_history' => $shopCoinsHistory->toArray(),
                    'shop_logs' => $shopLogs,
                    'source_account_id' => $this->userId,
                    'target_realm_id' => $this->realm_id,
                    'characters' => $characters
                );

                $options = array(
                    'http' => array(
                        'header' => "Content-type: application/x-www-form-urlencoded\r\n" .
                            "X-API-key: $xApiKey",
                        'method' => 'POST',
                        'content' => http_build_query($payload)
                    )
                );

                $context = stream_context_create($options);
                $resultLaravel = json_decode(file_get_contents(config('customs.transfer.api_url') . '/transfer/account', false, $context), true);

                if ($resultLaravel) {
                    if (isset($resultLaravel['error']) && $resultLaravel['error']) {
                        $this->render();

                        if (isset($resultLaravel['validation_errors']) && $resultLaravel['validation_errors'] !== null) {
                            foreach ($resultLaravel['validation_errors'] as $key => $errorMessage) {
                                if ($key === 'username') {
                                    $this->addError('newUsername', __($errorMessage[0], ['attribute' => __('login_modal')['placeholder']['username']]));
                                } elseif ($key === 'email') {
                                    $this->addError('newEmail', __($errorMessage[0], ['attribute' => __('login_modal')['placeholder']['email']]));
                                }
                            }
                        } else {
                            $this->responseMessage = $resultLaravel['message'];
                        }
                        return false;
                    }
                    foreach ($this->characters as $character) {
                        CharacterTransfer::create([
                            'name' => $character->name,
                            'source_realm_id' => 1,
                            'source_account_id' => $this->userId,
                            'source_character_guid' => $character->guid,
                            'target_realm_id' => $this->realm_id,
                            'target_account_id' => $resultLaravel['target_account_id'],
                            'status' => 'pending'
                        ]);
                        $characterDb = Character::where('guid', $character->guid)->first();
                        $characterDb->update([
                            'active' => 0
                        ]);
                    }
                    $this->mount();
                    $this->responseMessage = $resultLaravel['message'];
                }
            } finally {
                $lock?->release();
            }
        } else {
            $this->responseMessage = __('custom.locked_request', ['time' => 5]);
        }
    }

    public function beginTransferCharacter($guid)
    {
        if (!$this->checkedTransfer) {
            $this->responseMessage = __('transfer_account')['message']['check_transfer'];
            return false;
        }

        $lock = Cache::lock('lock_begin_transfer_character_' . $guid, 5);

        if ($lock->get()) {
            try {
                $this->responseMessage = '';
                $checkCharacter = Character::where('account', $this->userId)->where('guid', $guid)->first();

                if (!$checkCharacter) {
                    $this->responseMessage = __('transfer_account')['message']['need_character'];
                    return false;
                }

                $checkExportedCharacter = CharacterTransfer::where('source_account_id', $this->userId)->where('source_character_guid', $guid)->first();

                if ($checkExportedCharacter) {
                    switch ($checkExportedCharacter->status) {
                        case 'transferred':
                            $this->responseMessage = __('transfer_account')['message']['already_transferred'];
                            return false;
                        case 'failed':
                            $this->responseMessage = __('transfer_account')['message']['was_failed_to_transfer'];
                            return false;
                        case 'in_progress':
                            $this->responseMessage = __('transfer_account')['message']['already_exported'];
                            return false;
                    }
                } else {
                    $this->responseMessage = __('transfer_account')['message']['need_character'];
                    return false;
                }

                $xApiKey = config('customs.transfer.api_eu_key');
                $apiUrl = config('customs.transfer.api_eu_url');

                $payload = [
                    'lowGuid' => $guid
                ];
                $options = array(
                    'http' => array(
                        'header' => "Content-type: application/json\r\n" .
                            "Accept: application/json\r\n" .
                            "X-API-key: $xApiKey",
                        'method' => 'POST',
                        'content' => json_encode($payload),
                        'ignore_errors' => true,
                    ),
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    )
                );

                $context = stream_context_create($options);
                $result = json_decode(file_get_contents($apiUrl . '/initiate-transfer', false, $context), true);

                if ($result) {
                    if ($result['transferStatus']) {
                        $character = Character::where('account', $this->userId)->where('guid', $guid)->first();
                        $character->update([
                            'active' => 0
                        ]);
                        $characterTransfer = CharacterTransfer::where('source_account_id', $this->userId)->where('source_character_guid', $guid)->first();
                        $characterTransfer->update([
                            'source_realm_id' => $result['realmId'],
                            'data' => $result['data'],
                            'status' => 'in_progress'
                        ]);

                        if ($characterTransfer) {
                            $this->mount();
                            $this->responseMessage = __('transfer_account')['message']['success_exported'];
                        }
                    } else {
                        $this->mount();
                        $this->responseMessage = __('transfer_account')['message']['error_exporting'];
                    }
                }
            } finally {
                $lock?->release();
            }
        } else {
            $this->responseMessage = __('custom.locked_request', ['time' => 5]);
        }
    }

    public function completeTransferCharacter($guid)
    {
        if (!$this->checkedTransfer) {
            $this->responseMessage = __('transfer_account')['message']['check_transfer'];
            return false;
        }

        $lock = Cache::lock('lock_complete_transfer_character_' . $guid, 5);

        if ($lock->get()) {
            try {
                $this->responseMessage = '';
                $character = CharacterTransfer::where('source_account_id', $this->userId)->where('source_character_guid', $guid)->first();

                if ($character) {
                    switch ($character->status) {
                        case 'transferred':
                            $this->responseMessage = __('transfer_account')['message']['already_transferred'];
                            return false;
                        case 'failed':
                            $this->responseMessage = __('transfer_account')['message']['was_failed_to_transfer'];
                            return false;
                        case 'pending':
                            $this->responseMessage = __('transfer_account')['message']['need_export_first'];
                            return false;
                    }
                } else {
                    $this->responseMessage = __('transfer_account')['message']['need_character'];
                    return false;
                }

                switch ($character->target_realm_id) {
                    case 1:
                        $xApiKey = config('customs.transfer.realm_api_key_1');
                        $apiUrl = config('customs.transfer.realm_api_url_1');
                        break;
                    case 2:
                        $xApiKey = config('customs.transfer.realm_api_key_2');
                        $apiUrl = config('customs.transfer.realm_api_url_2');
                        break;
                    case 3:
                        $xApiKey = config('customs.transfer.realm_api_key_3');
                        $apiUrl = config('customs.transfer.realm_api_url_3');
                        break;
                    case 4:
                        $xApiKey = config('customs.transfer.realm_api_key_4');
                        $apiUrl = config('customs.transfer.realm_api_url_4');
                        break;
                }

                $payload = [
                    'targetAccountId' => $character->target_account_id,
                    'data' => $character->data,
                    'source_guid' => $guid
                ];
                $options = array(
                    'http' => array(
                        'header' => "Content-type: application/json\r\n" .
                            "Accept: application/json\r\n" .
                            "X-API-key: $xApiKey",
                        'method' => 'POST',
                        'content' => json_encode($payload),
                        'ignore_errors' => true,
                    ),
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    )
                );

                $context = stream_context_create($options);
                $resultLaravel = json_decode(file_get_contents($apiUrl . '/proceed-transfer', false, $context), true);


                if ($resultLaravel) {
                    if ($resultLaravel['transferResult'] != 0) {
                        $characterTransfer = CharacterTransfer::where('source_account_id', $this->userId)->where('source_character_guid', $guid)->first();
                        $characterTransfer->update([
                            'status' => 'failed'
                        ]);

                        if ($characterTransfer) {
                            $this->mount();
                            $this->responseMessage = __('transfer_account')['message']['error_importing'];
                            return false;
                        }
                    } else {
                        $characterTransfer = CharacterTransfer::where('source_account_id', $this->userId)->where('source_character_guid', $guid)->first();
                        $characterTransfer->update([
                            'status' => 'transferred'
                        ]);

                        if ($characterTransfer) {
                            $oldCharacters = Character::where('account', $this->userId)->get();

                            $successTransferredAllCharacters = CharacterTransfer::where('source_account_id', $this->userId)->where('status', 'transferred')->get();

                            if ($successTransferredAllCharacters->count() == $oldCharacters->count()) {
                                $this->mount();
                                $user = Account::find($this->userId);
                                $user->active = 0;
                                $user->save();
                                $this->responseMessage = __('transfer_account')['message']['success_exported_all_characters'];
                                $this->transferComplete = true;

                                Auth::guard('account')->logout();

                                return redirect()->route('home');
                            }
                            $this->mount();
                            $this->responseMessage = __('transfer_account')['message']['success_transferred'];
                        } else {
                            $this->mount();
                            $this->responseMessage = __('transfer_account')['message']['success_exported_all_characters'];
                        }
                    }
                }
            } finally {
                $lock?->release();
            }
        } else {
            $this->responseMessage = __('custom.locked_request', ['time' => 5]);
        }
    }

    public function retryTransferCharacter($guid)
    {
        if (!$this->checkedTransfer) {
            $this->responseMessage = __('transfer_account')['message']['check_transfer'];
            return false;
        }

        $lock = Cache::lock('lock_retry_transfer_character_' . $guid, 5);

        if ($lock->get()) {
            try {
                $this->responseMessage = '';
                $character = CharacterTransfer::where('source_account_id', $this->userId)->where('source_character_guid', $guid)->first();

                if ($character) {
                    switch ($character->status) {
                        case 'transferred':
                            $this->responseMessage = __('transfer_account')['message']['already_transferred'];
                            return false;
                        case 'pending':
                            $this->responseMessage = __('transfer_account')['message']['need_export_first'];
                            return false;
                    }
                } else {
                    $this->responseMessage = __('transfer_account')['message']['need_character'];
                    return false;
                }

                switch ($character->target_realm_id) {
                    case 1:
                        $xApiKey = config('customs.transfer.realm_api_key_1');
                        $apiUrl = config('customs.transfer.realm_api_url_1');
                        break;
                    case 2:
                        $xApiKey = config('customs.transfer.realm_api_key_2');
                        $apiUrl = config('customs.transfer.realm_api_url_2');
                        break;
                    case 3:
                        $xApiKey = config('customs.transfer.realm_api_key_3');
                        $apiUrl = config('customs.transfer.realm_api_url_3');
                        break;
                    case 4:
                        $xApiKey = config('customs.transfer.realm_api_key_4');
                        $apiUrl = config('customs.transfer.realm_api_url_4');
                        break;
                }

                $payload = [
                    'targetAccountId' => $character->target_account_id,
                    'data' => $character->data
                ];
                $options = array(
                    'http' => array(
                        'header' => "Content-type: application/json\r\n" .
                            "Accept: application/json\r\n" .
                            "X-API-key: $xApiKey",
                        'method' => 'POST',
                        'content' => json_encode($payload),
                        'ignore_errors' => true,
                    ),
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    )
                );

                $context = stream_context_create($options);
                $resultLaravel = json_decode(file_get_contents($apiUrl . '/proceed-transfer', false, $context), true);


                if ($resultLaravel) {
                    if ($resultLaravel['transferResult'] != 0) {
                        $characterTransfer = CharacterTransfer::where('source_account_id', $this->userId)->where('source_character_guid', $guid)->first();
                        $characterTransfer->update([
                            'status' => 'failed'
                        ]);

                        if ($characterTransfer) {
                            $this->mount();
                            $this->responseMessage = __('transfer_account')['message']['error_importing'];
                            return false;
                        }
                    } else {
                        $characterTransfer = CharacterTransfer::where('source_account_id', $this->userId)->where('source_character_guid', $guid)->first();
                        $characterTransfer->update([
                            'status' => 'transferred'
                        ]);

                        if ($characterTransfer) {
                            $oldCharacters = Character::where('account', $this->userId)->get();

                            $successTransferredAllCharacters = CharacterTransfer::where('source_account_id', $this->userId)->where('status', 'transferred')->get();

                            if ($successTransferredAllCharacters->count() == $oldCharacters->count()) {
                                $this->mount();
                                $user = Account::find($this->userId);
                                $user->active = 0;
                                $user->save();
                                $this->responseMessage = __('transfer_account')['message']['success_exported_all_characters'];
                                $this->transferComplete = true;

                                Auth::guard('account')->logout();

                                return redirect()->route('home');
                            }
                            $this->mount();
                            $this->responseMessage = __('transfer_account')['message']['success_transferred'];
                        } else {
                            $this->mount();
                            $this->responseMessage = __('transfer_account')['message']['success_imported'];
                        }
                    }
                }
            } finally {
                $lock?->release();
            }
        } else {
            $this->responseMessage = __('custom.locked_request', ['time' => 5]);
        }
    }

    public function render()
    {
        return view('livewire.transfer-account-modal');
    }
}


