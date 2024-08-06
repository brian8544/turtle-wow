<?php

try
{
    include_once '../../www_main/admin/api/capi/config/config.php';

    $merchant    = isset($_REQUEST['merchant']) ? $_REQUEST['merchant'] : null;
    $amount      = isset($_REQUEST['amount']) ? $_REQUEST['amount'] : null;
    $merchant_id = isset($_REQUEST['merchant_id']) ? $_REQUEST['merchant_id'] : null;

    if (empty($merchant) || empty($amount) || empty($merchant_id))
    {
        echo "NOT OK P";
        return;
    }

    $dns      = DB_HOST_LAN; // host, where the mysql is located, like 127.0.0.1 if on local network
    $port     = 3306; // 3306 commonly, depend on your mysql install
    $dbName   = DONATIONS_DB_NAME; // the DB name on the mysql, where shop_coins & other needed tables are located
    $username = DONATIONS_DB_USER; // user for mysql, need access to shop_coins, shop_coins_history tables
    $password = GAME_DB_PASS; // password of the user
    $enot_key = ENOT_KEY; // enot secret key (or additional key, can't remember how they call it)

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

    $sign = md5($merchant . ':' . $amount . ':' . $enot_key . ':' . $merchant_id);
    if ($sign == $_POST['sign_2'])
    {
        $donationDatas = explode('_', $_REQUEST['custom_field']);
        $user_id       = $donationDatas[0];
        $points        = $donationDatas[1];

        $actual_points = 0;
        $new_points    = 0;

        $rowExistQuery = $_DB->prepare('SELECT * FROM shop_coins WHERE id = :user');
        $rowExistQuery->bindParam(':user', $user_id, PDO::PARAM_INT);
        $rowExistQuery->execute();
        $rowExist = $rowExistQuery->fetchAll(PDO::FETCH_OBJ);

        /// Add
        if (count($rowExist) > 0)
        {
            $rowExist      = $rowExist[0];
            $actual_points = $rowExist->coins;
            $new_points    = $rowExist->coins + $points;

            $updateCoinsQuery = $_DB->prepare('UPDATE shop_coins SET coins = :new_value WHERE id = :account');
            $updateCoinsQuery->bindParam(':new_value', $new_points, PDO::PARAM_INT);
            $updateCoinsQuery->bindParam(':account', $user_id, PDO::PARAM_INT);
            $updateCoinsQuery->execute();
        }
        else
        {
            $new_points       = $points;
            $insertCoinsQuery = $_DB->prepare('INSERT INTO shop_coins(`id`, `coins`) VALUES(:account, :new_value)');
            $insertCoinsQuery->bindParam(':account', $user_id, PDO::PARAM_INT);
            $insertCoinsQuery->bindParam(':new_value', $new_points, PDO::PARAM_INT);
            $insertCoinsQuery->execute();
        }

        $typeToSave    = 'payment';
        $creditsToSave = $points;
        $sysToSave     = 'enot';
        $dateToSave    = date("Y-m-d H:i:s");

        /// HISTORY
        $historyType = "enot";
        $historyQuery = $_DB->prepare('INSERT INTO shop_coins_history(`account_id`, `points`, `actual_points`, `new_points`, `type`, `system`, `reference`, `date`) VALUES(:account, :new_value, :actual, :new, :ty, :sys, :ref, :date)');
        $historyQuery->bindParam(':account', $user_id, PDO::PARAM_INT);
        $historyQuery->bindParam(':new_value', $new_points, PDO::PARAM_INT);
        $historyQuery->bindParam(':actual', $actual_points, PDO::PARAM_INT);
        $historyQuery->bindParam(':new', $new_points, PDO::PARAM_INT);
        $historyQuery->bindParam(':ty', $typeToSave, PDO::PARAM_STR);
        $historyQuery->bindParam(':sys', $sysToSave, PDO::PARAM_STR);
        $historyQuery->bindParam(':ref', $historyType, PDO::PARAM_STR);
        $historyQuery->bindParam(':date', $dateToSave, PDO::PARAM_STR);
        $historyQuery->execute();

        echo "OK";
        return;
    }
    echo "NOT OK S";
}
catch(Exception $e)
{
    echo $e->getMessage();
}