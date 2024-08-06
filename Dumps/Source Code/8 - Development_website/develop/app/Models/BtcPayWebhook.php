<?php

namespace App\Models;

use App\Models\auth\ShopCoin;
use App\Models\auth\ShopCoinsHistory;
use BTCPayServer\Client\Invoice;
use BTCPayServer\Client\Webhook;

class BtcPayWebhook
{
    public $apiKey;
    public $host;
    public $storeId;
    public $secret;

    public function __construct()
    {
        $this->apiKey = config('customs.donation.btcPay.apiKey');
        $this->host = config('customs.donation.btcPay.hostApi');
        $this->storeId = config('customs.donation.btcPay.storeId');
        $this->secret = config('customs.donation.btcPay.secret');
    }

    public function processWebhook()
    {
        $btcPayLogPath = storage_path('logs/BTCPay.log');
        $btcPayLog = fopen($btcPayLogPath, 'ab');
        $raw_post_data = file_get_contents('php://input');

        $date = date('m/d/Y h:i:s a');

        if (false === $raw_post_data) {
            fwrite(
                $btcPayLog,
                $date . " : Error. Could not read from the php://input stream or invalid BTCPayServer payload received.\n"
            );
            fclose($btcPayLog);
            throw new \RuntimeException(
                'Could not read from the php://input stream or invalid BTCPayServer payload received.'
            );
        }

        $payload = json_decode($raw_post_data, false, 512, JSON_THROW_ON_ERROR);

        if (empty($payload)) {
            fwrite(
                $btcPayLog,
                $date . " : Error. Could not decode the JSON payload from BTCPay.\n"
            );
            fclose($btcPayLog);
            throw new \RuntimeException('Could not decode the JSON payload from BTCPay.');
        }

        $headers = getallheaders();
        foreach ($headers as $key => $value) {
            if (strtolower($key) === 'btcpay-sig') {
                $sig = $value;
            }
        }

        $webhookClient = new Webhook($this->host, $this->apiKey);

        if (!$webhookClient->isIncomingWebhookRequestValid($raw_post_data, $sig, $this->secret)) {
            fwrite(
                $btcPayLog,
                $date . " : Error. Invalid Signature detected! \n was: " . $sig . " should be: " . hash_hmac(
                    'sha256',
                    $raw_post_data,
                    $this->secret
                ) . "\n"
            );
            fclose($btcPayLog);
            throw new \RuntimeException(
                'Invalid BTCPayServer payment notification message received - signature did not match.'
            );
        }

        if (true === empty($payload->invoiceId)) {
            fwrite(
                $btcPayLog,
                $date . " : Error. Invalid BTCPayServer payment notification message received - did not receive invoice ID.\n"
            );
            fclose($btcPayLog);
            throw new \RuntimeException(
                'Invalid BTCPayServer payment notification message received - did not receive invoice ID.'
            );
        }

        try {
            $client = new Invoice($this->host, $this->apiKey);
            $invoice = $client->getInvoice($this->storeId, $payload->invoiceId);
        } catch (\Throwable $e) {
            fwrite($btcPayLog, "Error: " . $e->getMessage());
            throw $e;
        }

        if ($payload->type !== "InvoiceSettled") {
            throw new \RuntimeException(
                'Invalid payload message type. Only InvoiceSettled is supported, check the configuration of the webhook.'
            );
        }

        $invoicePrice = $invoice->getData()['amount'];
        $buyerEmail = $invoice->getData()['metadata']['buyerEmail'];
        $userId = $invoice->getData()['metadata']['userId'];
        $tokensAmount = $invoice->getData()['metadata']['tokensAmount'];
        $transactionId = $invoice->getData()['id'];

        fwrite(
            $btcPayLog,
            $date . " : Payload received for BtcPay invoice " . $payload->invoiceId . " Type: " . $payload->type . " Price: " . $invoicePrice . " E-Mail: " . $buyerEmail . "\n"
        );
        fwrite($btcPayLog, "Raw payload: " . $raw_post_data . "\n");

        if (config('customs.donation.btcPay.enabled') === true) {

            $shopCoinsHistory = ShopCoinsHistory::where('reference', $transactionId)->first();

            if (!$shopCoinsHistory) {
                $shopCoin = ShopCoin::find($userId);

                if ($shopCoin) {
                    $oldBalance = $shopCoin->coins;
                    $newCoins = $shopCoin->coins + $tokensAmount;
                    $addCoins = $shopCoin->update(['coins' => $newCoins]);
                } else {
                    $addCoins = ShopCoin::create([
                        'id' => $userId,
                        'coins' => $tokensAmount
                    ]);

                    $oldBalance = 0;
                }

                if ($addCoins) {
                    $addCoins = ShopCoin::find($userId);
                    $addHistoryCoins = ShopCoinsHistory::create([
                        'account_id' => $userId,
                        'points' => $tokensAmount,
                        'actual_points' => $oldBalance,
                        'new_points' => $addCoins->coins,
                        'type' => 'crypto',
                        'system' => 'btcPay',
                        'reference' => $transactionId,
                        'date' => date('Y-m-d H:i:s')
                    ]);
                }
            }
        }

        echo 'OK';
    }

}
