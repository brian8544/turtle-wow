<?php

include_once '../../www_main/admin/api/capi/config/config.php';
define('APPROVE_TEST', true);

$userId       = isset($_GET['uid']) ? $_GET['uid'] : null;
$credits      = isset($_GET['currency']) ? $_GET['currency'] : null;
$type         = isset($_GET['type']) ? $_GET['type'] : null;
$refId        = isset($_GET['ref']) ? $_GET['ref'] : null;
$signature    = isset($_GET['sig']) ? $_GET['sig'] : null;
$sign_version = isset($_GET['sign_version']) ? $_GET['sign_version'] : null;
$is_test      = isset($_GET['is_test']) ? $_GET['is_test'] : null;

if (empty($userId) || empty($credits) || !isset($type) || empty($refId) || empty($signature) || empty($sign_version))
{
    echo "NOT OK";
    return;
}

$dns      = DB_HOST_LAN; // host, where the mysql is located, like 127.0.0.1 if on local network
$port     = 3306; // 3306 commonly, depend on your mysql install
$dbName   = DONATIONS_DB_NAME; // the DB name on the mysql, where shop_coins & other needed tables are located
$username = DONATIONS_DB_USER; // user for mysql, need access to shop_coins, shop_coins_history tables
$password = DONATIONS_DB_PASS; // password of the user

try
{
    $_DB = new PDO('mysql:host=' . $dns . ';port=' . $port . ';dbname=' . $dbName, $username, $password, array
        (
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
            PDO::ATTR_PERSISTENT => false
        )
    );
    $_DB->setAttribute(PDO::ATTR_TIMEOUT, 1);
}
catch (Exception $e)
{
    die;
}

$signatureParams = [
    'uid'          => $userId,
    'currency'     => $credits,
    'type'         => $type,
    'ref'          => $refId,
    'sign_version' => $sign_version
];

if ($type == 2)
    $signatureParams['reason'] = $_GET['reason'];
if ($is_test != null && APPROVE_TEST)
    $signatureParams['is_test'] = $is_test;

ksort($signatureParams);
$signatureV2 = _calculatePingbackSignatureV2($signatureParams, PW_SECRET);
$signatureV3 = _calculatePingbackSignatureV3($signatureParams, PW_SECRET);

/// Add coins + history
if ($signature == $signatureV2 || $signature == $signatureV3)
{
    /// Calculate the real amount of points to add
    $credits = abs(intval($credits));
    $bonus   = _calculateBonus(floatval($credits) / 10);
    $credits = ceil(intval($credits) * $bonus);

    /// Check if ref already exist
    if ($type == 0)
    {
        $queryRefExist = $_DB->prepare('SELECT * FROM shop_coins_history WHERE `reference` = :ref');
        $queryRefExist->bindParam(':ref', $refId, PDO::PARAM_STR);
        $queryRefExist->execute();

        $resultRefExist = $queryRefExist->fetchAll(PDO::FETCH_OBJ);
        if (count($resultRefExist) > 0)
        {
            echo "NOT OK";
            return;
        }
    }
    else
        $credits = $credits * -1;

    $actual_points = 0;
    $new_points    = 0;
    $isChargeback  = $type == 2;

    $rowExistQuery = $_DB->prepare('SELECT * FROM shop_coins WHERE id = :user');
    $rowExistQuery->bindParam(':user', $userId, PDO::PARAM_INT);
    $rowExistQuery->execute();

    $rowExist = $rowExistQuery->fetchAll(PDO::FETCH_OBJ);
    /// Add
    if (count($rowExist) > 0)
    {
        $rowExist      = $rowExist[0];
        $actual_points = $rowExist->coins;
        $new_points    = intval($rowExist->coins) + $credits;

        $updateCoinsQuery = $_DB->prepare('UPDATE shop_coins SET coins = :new_value WHERE id = :account');
        $updateCoinsQuery->bindParam(':new_value', $new_points, PDO::PARAM_INT);
        $updateCoinsQuery->bindParam(':account', $userId, PDO::PARAM_INT);
        $updateCoinsQuery->execute();
    }
    else
    {
        $new_points       = $credits;
        $insertCoinsQuery = $_DB->prepare('INSERT INTO shop_coins(`id`, `coins`) VALUES(:account, :new_value)');
        $insertCoinsQuery->bindParam(':account', $userId, PDO::PARAM_INT);
        $insertCoinsQuery->bindParam(':new_value', $new_points, PDO::PARAM_INT);
        $insertCoinsQuery->execute();
    }

    $typeToSave    = $isChargeback ? 'chargeback' : 'payment';
    $sysToSave     = 'paymentwall';
    $dateToSave    = date("Y-m-d H:i:s");

    /// HISTORY
    $historyQuery = $_DB->prepare('INSERT INTO shop_coins_history(`account_id`, `points`, `actual_points`, `new_points`, `type`, `system`, `reference`, `date`) VALUES(:account, :points, :actual, :new, :ty, :sys, :ref, :date)');
    $historyQuery->bindParam(':account', $userId, PDO::PARAM_INT);
    $historyQuery->bindParam(':points', $credits, PDO::PARAM_INT);
    $historyQuery->bindParam(':actual', $actual_points, PDO::PARAM_INT);
    $historyQuery->bindParam(':new', $new_points, PDO::PARAM_INT);
    $historyQuery->bindParam(':ty', $typeToSave, PDO::PARAM_STR);
    $historyQuery->bindParam(':sys', $sysToSave, PDO::PARAM_STR);
    $historyQuery->bindParam(':ref', $refId, PDO::PARAM_STR);
    $historyQuery->bindParam(':date', $dateToSave, PDO::PARAM_STR);
    $historyQuery->execute();

    echo "OK";
    return;
}
echo "NOT OK";

function _calculatePingbackSignatureV2($params, $secret)
{
    $str = '';
    foreach ($params as $k => $v)
    {
        $str .= "$k=$v";
    }
    $str .= $secret;

    return md5($str);
}

function _calculatePingbackSignatureV3($params, $secret)
{
    $str = '';
    foreach ($params as $k => $v)
    {
        $str .= "$k=$v";
    }
    $str .= $secret;

    return hash('sha256', $str);
}

function _calculateBonus($price)
{
    $bonus = 1;
    if ($price < 30)
        return $bonus;

    $bonus = 1 + (($price - 10) / 10 * 5 / 100);
    $bonus = $bonus > 2 ? 2 : $bonus;
    return $bonus;
}