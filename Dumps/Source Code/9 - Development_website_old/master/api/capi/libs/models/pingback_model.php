<?php

class pingback_model extends model
{
    public function paymentwall()
    {
        $userId    = isset($_GET['uid']) ? $_GET['uid'] : null;
        $credits   = isset($_GET['currency']) ? $_GET['currency'] : null;
        $type      = isset($_GET['type']) ? $_GET['type'] : null;
        $refId     = isset($_GET['ref']) ? $_GET['ref'] : null;
        $signature = isset($_GET['sig']) ? $_GET['sig'] : null;

        if (empty($userId) || empty($credits) || !isset($type) || empty($refId) || empty($signature))
            return;

        $signatureParams = array
        (
            'uid'      => $userId,
            'currency' => $credits,
            'type'     => $type,
            'ref'      => $refId
        );

        $signatureV2 = $this->_calculatePingbackSignatureV2($signatureParams, PW_SECRET);
        $signatureV3 = $this->_calculatePingbackSignatureV3($signatureParams, PW_SECRET);

        /// Add coins + history
        if ($signature == $signatureV2 || $signature == $signatureV3)
        {
            $this->_addCoins($userId, $credits, $refId, $type);
            echo "OK";
        }
    }

    private function _calculatePingbackSignatureV2($params, $secret)
    {
        $str = '';
        foreach ($params as $k => $v)
        {
            $str .= "$k=$v";
        }
        $str .= $secret;

        return md5($str);
    }

    private function _calculatePingbackSignatureV3($params, $secret)
    {
        $str = '';
        foreach ($params as $k => $v)
        {
            $str .= "$k=$v";
        }
        $str .= $secret;

        return hash('sha256', $str);
    }

    public function gamepoints()
    {
        $account = $this->params->account;
        $code    = $this->params->code;

        if (empty($code) || substr($code, 0, 3) != "TUR")
        {
            /// NOT A VALID GP CODE
            return ['result' => 1, "error" => "Code invalid"];
        }

        $codeUsed = $this->donationsDB->select('SELECT * FROM gp_history WHERE code = :code', ['code' => $code]);
        if (count($codeUsed) > 0)
        {
            /// CODE ALREADY USED
            return ['result' => 1, 'error' => "Code already used"];
        }

        $datas     = array('code' => $code);
        $options   = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'PUT',
                'content' => http_build_query($datas)
            )
        );

        $context  = stream_context_create($options);
        $resultGP = json_decode(file_get_contents(GP_URL, false, $context), true);

        if ($resultGP === false || !isset($resultGP['code']))
        {
            /// GP API FAIL
            return ['result' => 1, "error" => "Error trying to contact Gamepoints server, please try again later or contact an admin"];
        }
        else if ($resultGP['code'] != 0)
        {
            /// GP SPECIFIC ERROR
            return ['result' => 1, "error" => $resultGP['message']];
        }
        else
        {
            /// Add
            $this->_addCoins($account, $resultGP['amount'], $code);

            $this->donationsDB->insert("gp_history", [
                'account_id' => $account,
                'code'       => $code
            ]);
            return ['result' => 0];
        }
    }

    public function enot()
    {
        $merchant    = $_GET['merchant'];
        $amount      = $_GET['amount'];
        $merchant_id = $_GET['merchant_id'];

        $sign = md5($merchant . ':' . $amount . ':' . ENOT_KEY . ':' . $merchant_id);
        if ($sign == $_GET['sign_2'])
        {
            $donationDatas = explode('_', $datas['custom_field']);
            $user_id = $donationDatas[0];
            $points  = $donationDatas[1];

            $this->_addCoins($user_id, $points, 'ENOT');
            echo "OK";
        }
    }

    public function pwsign()
    {
        $datas = ['key' => $this->params->key, 'widget' => $this->params->widget, 'sign_version' => $this->params->sign_version, 'uid' => $this->params->uid, 'email' => $this->params->email];
        return ['result' => 0, 'signature' => $this->_pwSignature($datas), 'params' => $this->_pwParamsStr($datas, false)];
    }

    private function _pwParamsStr($datas, $forHash = true)
    {
        if (!is_array($datas))
            return "";

        /// Sort and make widget params
        ksort($datas);
        $paramsStr = "";
        foreach($datas as $key => $param)
            $paramsStr .= $key . '=' . $param . ($forHash ? '' : '&');

        return $paramsStr;
    }

    private function _pwSignature($params)
    {
        if (!is_array($params))
            return "";

        $paramsStr = $this->_pwParamsStr($params);
        return hash('sha256', $paramsStr . PW_SECRET);
    }

    private function _addCoins($userId, $credits, $ref, $type = 0)
    {
        $actual_points = 0;
        $new_points    = 0;
        $rowExist      = $this->gameDB->select("SELECT * FROM shop_coins WHERE id = :user", ['user' => $userId]);
        $isChargeback  = $type == 2;

        /// Add
        if (count($rowExist) > 0)
        {
            $rowExist = (object)$rowExist[0];

            $actual_points = $rowExist->coins;
            $new_points    = $rowExist->coins + ($isChargeback ? -$credits : $credits);

            $this->gameDB->update("shop_coins", ['coins' => $new_points], ['id' => $userId]);
        }
        else
        {
            $new_points = $isChargeback ? -$credits : $credits;
            $this->gameDB->insert("shop_coins", ['id' => $userId, 'coins' => $new_points]);
        }

        /// History
        $this->donationsDB->insert("shop_coins_history", [
            'account_id'    => $userId,
            'points'        => $isChargeback ? -$credits : $credits,
            'actual_points' => $actual_points,
            'new_points'    => $new_points,
            'type'          => $isChargeback ? 'chargeback' : 'payment',
            'system'        => 'gamepoints',
            'reference'     => $ref,
            'date'          => date('Y-m-d H:i:s')
        ]);
    }
}