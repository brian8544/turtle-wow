<?php

namespace App\Http\Controllers;

use App\Events\CharacterTransferRequest;
use App\Models\auth\Account;
use App\Models\auth\GpHistory;
use App\Models\auth\ShopCoin;
use App\Models\auth\ShopCoinsHistory;
use App\Models\auth\ShopLog;
use App\Models\CharacterTransfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CharacterTransferController extends Controller
{
    public function checkUsername(Request $request)
    {
        $rules = [
            'username' => ['required', 'string', 'alpha_dash']
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $message = "";
            foreach ($validator->errors()->all() as $error) {
                $message .= $error . "\n";
            }
            //Log::error('Validation failed while checking username(username="' . $request->get('username') . '")\n' . $message);
            return response()->json(['error' => true, 'message' => $message]);
        }

        $username = $request->get('username');

        $user = Account::where('username', $username)->first();

        if ($user) {
            $emailExists = Account::where('email', $request->get('email'))->first();
            return response()->json(['username_exists' => true, 'email_exists' => $emailExists], 200);
        } else {
            return response()->json(['username_exists' => false, 'email_exists' => false], 200);
        }
    }

    public function transferAccount(Request $request)
    {
        $validationErrors = null;
        $account = $request->get('account');

        try {
            DB::connection('mysql2')->beginTransaction();

            if ($account['mutereason'] == null) {
                $account['mutereason'] = '';
            }

            if ($account['muteby'] == null) {
                $account['muteby'] = '';
            }

            $rules = [
                'username' => ['required', 'alpha_dash', 'min:3', 'unique:mysql2.account', 'max:15'],
                'email' => ['required', 'email:rfc,dns', 'unique:mysql2.account']
            ];

            $validator = Validator::make($request->get('account'), $rules);

            if ($validator->fails()) {
                $validationErrors = $validator->errors();
                $message = "";
                foreach ($validator->errors()->all() as $error) {
                    $message .= $error . "\n";
                }
                throw new \Exception($message);
            }

            $newAccount = Account::create($account);

            $newAccountId = $newAccount->id;

            if ($newAccountId == 0) {
                throw new \Exception('Failed to create account.');
            }

            $gpHistory = $request->get('gp_history');

            if (isset($gpHistory) && count($gpHistory) > 0) {
                foreach ($gpHistory as $key => $gpItem) {
                    $gpHistory[$key]['account_id'] = $newAccountId;
                }

                GpHistory::insert($gpHistory);
            }

            $shopCoins = $request->get('shop_coins');
            if (isset($shopCoins) && count($shopCoins) > 0) {
                ShopCoin::create([
                    'id' => $newAccountId,
                    'coins' => $shopCoins[0]['coins']
                ]);
            }
            $shopCoinsHistory = $request->get('shop_coins_history');

            if (isset($shopCoinsHistory) && count($shopCoinsHistory) > 0) {
                foreach ($shopCoinsHistory as $key => $shopCoinsItem) {
                    $shopCoinsHistory[$key]['account_id'] = $newAccountId;
                    unset($shopCoinsHistory[$key]['id']);
                }

                ShopCoinsHistory::insert($shopCoinsHistory);
            }

            $shopLogs = $request->get('shop_logs');

            if (isset($shopLogs) && count($shopLogs) > 0) {
                $shopLogId = ShopLog::where('id' , '>=', config('customs.transfer.shop_logs_range_from'))->where('id' , '<=', config('customs.transfer.shop_logs_range_to'))->max('id') + 1;
                foreach ($shopLogs as $key => $logItem) {
                    $shopLogs[$key]['account'] = $newAccountId;
                    $shopLogs[$key]['id'] = $shopLogId;
                    $shopLogId++;
                }

                ShopLog::insert($shopLogs);
            }

            DB::connection('mysql2')->commit();

            return response()->json(['error' => false , 'target_account_id' => $newAccountId, 'message' => 'Successfully added account transfer in queue.']);

        } catch (\Exception $e) {
            DB::connection('mysql2')->rollBack();
            $responseMessage = $e->getMessage();
            if (is_string($responseMessage) && is_array(json_decode($responseMessage, true)) && (json_last_error() == JSON_ERROR_NONE)) {
                $responseMessage = json_decode($responseMessage, true);
                if (isset($responseMessage['message'])) {
                    $responseMessage = $responseMessage['message'];
                }
            }

            //Log::error('Validation failed while transferring account(username="' . $account['username'] . '")\n' . $responseMessage);

            return response()->json(['error' => true, 'message' => $responseMessage, 'validation_errors' => $validationErrors]);
        }
    }
}
