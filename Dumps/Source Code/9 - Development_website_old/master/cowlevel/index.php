<!DOCTYPE html>
<html lang="en">
<head>
    <title>Turtle Coins and Stuff</title>
    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>

    <script>
        function updateInput() {

            var val = document.getElementById("tokens").value * 1;
            var endVal = 0;

            if (val < 300) endVal = val;
            else if (val >= 300 && val <= 400 - 1) endVal = val + val * 0.075;
            else if (val >= 400 && val <= 500 - 1) endVal = val + val * 0.10;
            else if (val >= 500 && val <= 600 - 1) endVal = val + val * 0.125;
            else if (val >= 600 && val <= 700 - 1) endVal = val + val * 0.15;
            else if (val >= 700 && val <= 800 - 1) endVal = val + val * 0.175;
            else if (val >= 800 && val <= 900 - 1) endVal = val + val * 0.20;
            else if (val >= 800 && val <= 1000 - 1) endVal = val + val * 0.225;
            else if (val >= 1000 && val <= 1100 - 1) endVal = val + val * 0.25;
            else endVal = val + val * 0.40;

            endVal = Math.round(endVal);

            document.getElementById("tokensTotal").value = endVal;

        }

    </script>

</head>
<body style="background-color: #333">

<!--<pre>DEBUG<br>-->
<?php
//   var_dump($_POST);
?>
<!--</pre>-->

<?php

$status_message = "";

//const COINS_MASTERKEY = 'a';
//const DB_HOST = 'localhost';
//const DB_USER = 'root';
//const DB_PASS = '';
//const DB_NAME = 'tw_logon';
//const DB_NAME_CHAR = 'tw_char';
//const DB_TABLE_CHARACTERS = 'characters';
//const DB_NAME_LOGON = 'tw_logon';
//const DB_TABLE_COINS = 'shop_coins';

if (isset($_POST['submitted'])) {

    if (($_POST['account'] !== '' || $_POST['character'] !== '') && ($_POST['tokens'] !== '') && ($_POST['masterkey'] !== '')) {

        include_once '../../config_coins.php';

        if ($_POST['masterkey'] === COINS_MASTERKEY) {

            $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            $char_mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME_CHAR);

            if ($mysqli->connect_errno) {
                echo "Failed to connect to MySQL: " . $mysqli->connect_error;
                exit();
            }

            $account = $char_mysqli->real_escape_string($_POST['account']);

            if ($_POST['character'] != '') {
                $character = $char_mysqli->real_escape_string($_POST['character']);
                $sql = "SELECT account from " . DB_NAME_CHAR . ".characters WHERE name = '" . $character . "'";
                $result = $char_mysqli->query($sql);
                $row = $result->fetch_assoc();
                if ($row == NULL) {
                    $status_message = "Character " . $character . " not found.";
                } else {
                    $account = $row['account']; // id

                    $sql = "SELECT username from " . DB_NAME_LOGON . ".account WHERE id = '" . $account . "'";
                    $result = $char_mysqli->query($sql);
                    $row = $result->fetch_assoc();
                    if ($row == NULL) {
                        // should not get here
                        $status_message = "Account not found for " . $character .".";
                    } else {
                        $account = $row['username'];
                    }
                }
            }

            $tokens = $mysqli->real_escape_string($_POST['tokensBonus']);
            $masterkey = $mysqli->real_escape_string($_POST['masterkey']);

            $sql = "SELECT " . DB_NAME_LOGON . "." . DB_TABLE_COINS . ".id, coins, account.username FROM `" . DB_TABLE_COINS . "` 
            INNER JOIN " . DB_NAME_LOGON . ".`account` ON account.id = " . DB_TABLE_COINS . ".id 
            WHERE account.username = '" . $account . "'";
            $result = $mysqli->query($sql);

            $row = $result->fetch_assoc();

            if ($row !== NULL) {

                $new_balance = intval($row['coins'] + intval($tokens));

                if ($new_balance < 0) {

                    $status_message = "Can't go below 0, the current balance is " . $row['coins'] . ".";

                } else {


                    $sql = "UPDATE " . DB_NAME_LOGON . ".shop_coins
                    SET shop_coins.coins = '" . $new_balance . "'
                    WHERE id = '" . $row['id'] . "'";

                    $result = $mysqli->query($sql);


                    // re-get coins
                    $sql = "SELECT " . DB_NAME_LOGON . "." . DB_TABLE_COINS . ".id, coins, account.username FROM `" . DB_TABLE_COINS . "` 
                    INNER JOIN " . DB_NAME_LOGON . ".`account` ON account.id = " . DB_TABLE_COINS . ".id 
                    WHERE account.username = '" . $account . "'";
                    $result = $mysqli->query($sql);

                    $row = $result->fetch_assoc();

                    $status_message = 'Account ' . $row['username'] . ' has ' . $row['coins'] . ' coins now.';

                }

            } else {

                $status_message = 'something went wrong, maybe account not found ?';

            }

            $mysqli->close();

        } else {
            $status_message = 'Wrong passkey.';
        }


    } else {

        $status_message = 'All fields are required.';

    }

}

?>

<div class="container">

    <div class="col-xs-12">

        <div class="text-center" style="color:#E1C492"><h3>Account Balance Update</h3></div>

        <form method="POST" style="color: white;">
            <input type="text" class="form-control" name="account" placeholder="Account"
                   value="<?= isset($_POST['account']) ? $_POST['account'] : '' ?>">
            or
            <input type="text" class="form-control" name="character" placeholder="Character Name"
                   value="<?= isset($_POST['character']) ? $_POST['character'] : '' ?>">
            <BR>
            <input type="number" class="form-control" name="tokens" value="" placeholder="Tokens" id="tokens"
                   onkeydown="updateInput()" onkeyup="updateInput()" onchange="updateInput()">
            <input type="number" class="form-control" name="tokensBonus" value="" placeholder="TokensTotal"
                   id="tokensTotal">
            <input type="password" class="form-control" name="masterkey" value="" placeholder="MasterKey">

            <input type="hidden" name="submitted" value="yes">

            <button type="submit" class="btn btn-success btn-block">ADD</button>

        </form>

        <Br>
        <p style="color:#E1C492">
            <?= $status_message ?>
        </p>

    </div>
</div>

</body>
</html>



