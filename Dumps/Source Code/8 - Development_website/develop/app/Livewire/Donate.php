<?php

namespace App\Livewire;

use App\Models\auth\GpHistory;
use App\Models\auth\ShopCoin;
use App\Models\auth\ShopCoinsHistory;
use App\Rules\NotTurPrefix;
use App\Rules\UsedGamepointsCode;
use BTCPayServer\Client\Invoice;
use BTCPayServer\Util\PreciseNumber;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class Donate extends Component
{
    public $showPw = false;
    public $showBoosty = false;
    public $showPaypal = false;
    public $showSberBank = false;
    public $showEnot = false;
    public $showBtcPay = false;
    public $showGp = false;
    public $gpCode;
    public $messageGamePoints = '';
    public $message = '';
    public $pwUrl;
    public $enotPoints = 10;
    public $btcPayPoints = 10;
    public $enotPriceUpdated = 80;
    public $btcPayPriceUpdated = 80;
    public $btcPayBonusPercent = 1;
    public $btcPayPointsWithBonus = 10;
    public $enotPrice = 1;
    public $btcPayPrice = 1;
    public $enotSign;
    public $enotUserIdEnotPoints;

    public $discounts = [
        [30, 7.5],
        [40, 10],
        [50, 12.5],
        [60, 15],
        [70, 17.5],
        [80, 20],
        [90, 22.5],
        [100, 25],
        [200, 40],
        [300, 40]
    ];

    public function mount()
    {
        $pwInfo = $this->pwsign();
        if (config('app.web_env') == "CN") {
            $this->pwUrl = "https://api.paymentwall.com/api/ps/?" . $pwInfo['params'] . "sign=" . $pwInfo['signature'];
        } else {
            $this->pwUrl = "https://api.paymentwall.com/api/ps/?" . $pwInfo['params'];
        }
        $this->enotSign = md5(config('customs.donation.enot.merchant_id') . ':' . $this->enotPriceUpdated . ':' . config('customs.donation.enot.secret') . ':' . time());
        $this->enotUserIdEnotPoints = Auth::guard('account')->user()->id . '_' . $this->enotPoints;
        $this->btcPayBonusPercent = config('customs.donation.btcPay.bonusPercent');
        $this->btcPayPointsWithBonus = ceil($this->btcPayPoints * $this->btcPayBonusPercent);
    }

    public function enotSign()
    {
        $this->enotSign = md5(config('customs.donation.enot.merchant_id') . ':' . $this->enotPriceUpdated . ':' . config('customs.donation.enot.secret') . ':' . time());
    }

    public function updated($name, $value)
    {
        if ($name == 'enotPrice') {
            if ($value == 0 || $value == '') {
                $this->enotPrice = 1;
            }
            $this->enotPrice = floatval($this->enotPrice);
            $this->enotUpdatePoints();
        }

        if ($name == 'btcPayPrice') {
            if ($value == 0 || $value == '') {
                $this->btcPayPrice = 1;
            }
            $this->btcPayPrice = floatval($this->btcPayPrice);
            $this->btcPayUpdatePoints();
        }
    }

    public function enotUpdatePoints()
    {
        $this->enotPriceUpdated = $this->enotPrice * 80;
        $this->enotSign();

        if ($this->enotPrice < 30) {
            $this->enotPoints = ceil($this->enotPrice * 10);
        } else {
            $bonus = $this->enotPrice * 10;

            for ($i = 0; $i < count($this->discounts) - 1; $i++) {
                if ($bonus >= $this->discounts[$i][0] * 10 && $this->enotPrice < $this->discounts[$i + 1][0] * 10) {
                    $this->enotPoints = $bonus + ceil ($bonus * $this->discounts[$i][1] / 100);
                }
            }

            if ($bonus >= $this->discounts[count($this->discounts) - 1][0] * 10) {
                $this->enotPoints = $bonus + ceil($bonus * $this->discounts[count($this->discounts) - 1][1] / 100);
            }
        }

        $this->enotUserIdEnotPoints = Auth::guard('account')->user()->id . '_' . $this->enotPoints;
    }

    public function btcPayUpdatePoints()
    {
        $this->btcPayPriceUpdated = $this->btcPayPrice * 80;

        if ($this->btcPayPrice < 30) {
            $this->btcPayPoints = ceil($this->btcPayPrice * 10);
            $this->btcPayPointsWithBonus = ceil($this->btcPayPoints * $this->btcPayBonusPercent);
        } else {
            $bonus = $this->btcPayPrice * 10;

            for ($i = 0; $i < count($this->discounts) - 1; $i++) {
                if ($bonus >= $this->discounts[$i][0] * 10 && $this->btcPayPrice < $this->discounts[$i + 1][0] * 10) {
                    $this->btcPayPoints = $bonus + ceil ($bonus * $this->discounts[$i][1] / 100);
                    $this->btcPayPointsWithBonus = ceil($this->btcPayPoints * $this->btcPayBonusPercent);
                }
            }

            if ($bonus >= $this->discounts[count($this->discounts) - 1][0] * 10) {
                $this->btcPayPoints = $bonus + ceil($bonus * $this->discounts[count($this->discounts) - 1][1] / 100);
                $this->btcPayPointsWithBonus = ceil($this->btcPayPoints * $this->btcPayBonusPercent);
            }
        }
    }


    public function togglePw()
    {
        $this->showPw = !$this->showPw;

        if ($this->showPw) {
            $this->showBoosty = false;
            $this->showPaypal = false;
            $this->showSberBank = false;
            $this->showEnot = false;
            $this->showGp = false;
            $this->showBtcPay = false;
        }
    }

    public function toggleBoosty()
    {
        $this->showBoosty = !$this->showBoosty;

        if ($this->showBoosty) {
            $this->showPw = false;
            $this->showPaypal = false;
            $this->showSberBank = false;
            $this->showEnot = false;
            $this->showGp = false;
            $this->showBtcPay = false;
        }
    }

    public function togglePaypal()
    {
        $this->showPaypal = !$this->showPaypal;

        if ($this->showPaypal) {
            $this->showPw = false;
            $this->showBoosty = false;
            $this->showSberBank = false;
            $this->showEnot = false;
            $this->showGp = false;
            $this->showBtcPay = false;
        }
    }

    public function toggleSberBank()
    {
        $this->showSberBank = !$this->showSberBank;

        if ($this->showSberBank) {
            $this->showPw = false;
            $this->showBoosty = false;
            $this->showPaypal = false;
            $this->showEnot = false;
            $this->showGp = false;
            $this->showBtcPay = false;
        }
    }

    public function toggleEnot()
    {
        $this->showEnot = !$this->showEnot;

        if ($this->showEnot) {
            $this->showPw = false;
            $this->showBoosty = false;
            $this->showPaypal = false;
            $this->showSberBank = false;
            $this->showGp = false;
            $this->showBtcPay = false;
        }
    }

    public function toggleGp()
    {
        $this->showGp = !$this->showGp;

        if ($this->showGp) {
            $this->showPw = false;
            $this->showBoosty = false;
            $this->showPaypal = false;
            $this->showSberBank = false;
            $this->showEnot = false;
            $this->showBtcPay = false;
        }
    }

    public function toggleBtcPay()
    {
        $this->showBtcPay = !$this->showBtcPay;

        if ($this->showBtcPay) {
            $this->showPw = false;
            $this->showBoosty = false;
            $this->showPaypal = false;
            $this->showSberBank = false;
            $this->showEnot = false;
            $this->showGp = false;
        }
    }

    private function _addCoins($amount, $type, $system, $code)
    {
        $user = Auth::guard('account')->user();

        if ($user) {
            return;
        }

        $shopCoin = ShopCoin::find($user->id);

        if ($shopCoin) {
            $newCoins = $shopCoin->coins + $amount;
            $addCoins = $shopCoin->update(['coins' => $newCoins]);
        } else {
            $addCoins = ShopCoin::create([
                'id' => $user->id,
                'coins' => $amount
            ]);
        }

        if ($addCoins) {
            $addCoins = ShopCoin::find($user->id);
            $addHistoryCoins = ShopCoinsHistory::create([
                'account_id' => $user->id,
                'points' => $amount,
                'actual_points' => $addCoins->coins,
                'new_points' => 0,
                'type' => $type,
                'system' => $system,
                'reference' => $code,
                'date' => date('Y-m-d H:i:s')
            ]);

            if ($system == "gamepoints") {
                $addHistory = GpHistory::create([
                    'account_id' => $user->id,
                    'code' => $code
                ]);
            }
        }

        if ($addCoins && $addHistoryCoins) {
            $this->gpCode = '';
            $this->message = __('custom.donate_modal.thank_you');
        } else {
            $this->messageGamePoints = __('donate_page')['exception']['error'];
        }
    }

    public function useGamePoints()
    {
        $rules = [
            'gpCode' => ['required', new NotTurPrefix(), new UsedGamepointsCode()]
        ];

        $this->validate($rules);

        $data     = array('code' => $this->gpCode);
        $options   = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'PUT',
                'content' => http_build_query($data)
            )
        );

        $context  = stream_context_create($options);
        $resultGP = json_decode(file_get_contents(config('customs.donation.gamepoints.url'), false, $context), true);

        if ($resultGP === false || !isset($resultGP['code']))
        {
            $this->messageGamePoints = __('page_donate')['exception']['cant_reach_gamepoints_server'];
        }
        else if ($resultGP['code'] != 0)
        {
            $this->messageGamePoints = $resultGP['message'];
        }
        else
        {
            $user = Auth::guard('account')->user();
            $amount = $resultGP['amount'];

            $shopCoin = ShopCoin::find($user->id);

            if ($shopCoin) {
                $newCoins = $shopCoin->coins + $amount;
                $addCoins = $shopCoin->update(['coins' => $newCoins]);
            } else {
                $addCoins = ShopCoin::create([
                    'id' => $user->id,
                    'coins' => $amount
                ]);
            }

            if ($addCoins) {
                $addCoins = ShopCoin::find($user->id);
                $addHistoryCoins = ShopCoinsHistory::create([
                    'account_id' => $user->id,
                    'points' => $amount,
                    'actual_points' => $addCoins->coins,
                    'new_points' => 0,
                    'type' => 'payment',
                    'system' => 'gamepoints',
                    'reference' => $this->gpCode,
                    'date' => date('Y-m-d H:i:s')
                ]);

                $addHistory = GpHistory::create([
                    'account_id' => $user->id,
                    'code' => $this->gpCode
                ]);

                if ($addHistoryCoins && $addHistory) {
                    $this->gpCode = '';
                    $this->message = __('custom.donate_modal.thank_you');
                } else {
                    $this->messageGamePoints = __('donate_page')['exception']['error'];
                }
            } else {
                $this->messageGamePoints = __('donate_page')['exception']['error'];
            }
        }

    }

    private function _pwParamsStr($data, $forHash = true)
    {
        if (!is_array($data))
            return "";

        ksort($data);
        $paramsStr = "";
        foreach($data as $key => $param)
            $paramsStr .= $key . '=' . $param . ($forHash ? '' : '&');

        return $paramsStr;
    }

    private function _pwSignature($params)
    {
        if (!is_array($params))
            return "";

        $paramsStr = $this->_pwParamsStr($params);
        return hash('sha256', $paramsStr . config('customs.donation.paymentwall.secret'));
    }

    public function pwsign()
    {
        $user = Auth::guard('account')->user();

        if (!$user) {
            return;
        }

        $data = ['key' => config('customs.donation.paymentwall.key'), 'widget' => config('customs.donation.paymentwall.widget'), 'sign_version' => config('customs.donation.paymentwall.sign_version'), 'uid' => $user->id, 'email' => $user->email];
        return ['result' => 0, 'signature' => $this->_pwSignature($data), 'params' => $this->_pwParamsStr($data, false)];
    }

    public function generateBtcPayRedirect()
    {
        $user = Auth::guard('account')->user();
        $apiKey = config('customs.donation.btcPay.apiKey');
        $host = config('customs.donation.btcPay.hostApi');
        $storeId = config('customs.donation.btcPay.storeId');
        $amount = $this->btcPayPrice;
        $currency = 'USD';
        $orderId = "#" . mt_rand(0, 1000);
        $buyerEmail = $user->email;

        try {
            $client = new Invoice($host, $apiKey);

            $metaData = [
                'userId' => $user->id,
                'tokensAmount' => $this->btcPayPointsWithBonus,
                'bonusPercent' => $this->btcPayBonusPercent,
            ];

            $response = $client->createInvoice(
                $storeId,
                $currency,
                PreciseNumber::parseString($amount),
                $orderId,
                $buyerEmail,
                $metaData
            );

            $url = $response->getCheckoutLink();

            $url = str_replace(config('customs.donation.btcPay.hostApi'), config('customs.donation.btcPay.hostPublic'), $url);

            return redirect($url);
        } catch (\Throwable $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function render()
    {
        $user = Auth::guard('account')->user();
        return view('livewire.donate', ['user' => $user]);
    }
}
