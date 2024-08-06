<?php

$accounts_per_email = 5;
$mysql_host = 'localhost';
$mysql_username = 'tw_passreset';
$mysql_passwd = '6QETc4glseP3k1Rq';
$mysql_database = 'tw_logon';
$mysql_port = 3306;

function create_database_connection() {
    global $mysql_host;
    global $mysql_username;
    global $mysql_passwd;
    global $mysql_database;
    global $my_port;
    $mysqli = new mysqli(
        $mysql_host,
        $mysql_username,
        $mysql_passwd,
        $mysql_database,
        $my_port
    );

    if ($mysqli->connect_errno) {
        die("Failed to connect to MySQL. Error Code: $mysqli->connect_errno, Error Message: $mysqli->connect_error");
    }

    return $mysqli;
}

function fail(string $error)
{
    header("Location: /password.php?ErrorMessage=$error");
}

function success(string $msg)
{
    header("Location: /password.php?SuccessMessage=$msg");
}

function confirmed(string $msg)
{
    header("Location: /password_success.php?ConfirmedMessage=$msg");
}

if (isset($_GET['token_key'])){

	$token_key = trim($_GET['token_key']);
	$password = trim($_GET['pass']);

	if (isset($token_key)) {

		global $mysql_database;

		$context = create_database_connection();

	
		$statement = $context->prepare("select email, username from $mysql_database.account where token_key = ?");
		$statement->bind_param('s', $token_key);
	
		$statement->execute();
		$result = $statement->get_result();
		$statement->close();

		while ($row = $result->fetch_assoc()) {
		    $check_username = $row;
		}


		// $secret_key = sha1(strtoupper($check_username["username"]) . ':' . strtoupper($password));
                $normalised_username = strtoupper($check_username["username"]);
                $normalised_password = strtoupper($password);
                $secret_key = sha1("$normalised_username:$normalised_password");

		$token_key = null;

		$statementNew = $context->prepare("update $mysql_database.account set token_key = ?, sha_pass_hash = ?, v = '', s = '', sessionkey = '' where username = ? and email = ?");
		$statementNew->bind_param('ssss', $token_key, $secret_key, $check_username['username'], $check_username['email']);


		$statementNew->execute();
		$resultNew = $statementNew->get_result();
		$statementNew->close();

		confirmed('Confirmed.');	

	}

}

if (isset($_POST["Username"]) && isset($_POST["EmailAddress"])) {

   $account_name  = trim(filter_input(INPUT_POST, 'Username', FILTER_SANITIZE_STRING));
   $email_address = trim($_POST["EmailAddress"]);


	global $mysql_database;

	$context = create_database_connection();


	if ($email_address) {
		$statement = $context->prepare("select email, username from $mysql_database.account where email = ?");
		$statement->bind_param('s', $email_address);
	} else {
		$statement = $context->prepare("select email, username from $mysql_database.account where username = ?");
		$statement->bind_param('s', $account_name);
	}

	$statement->execute();
	$result = $statement->get_result();
	$statement->close();

	while ($row = $result->fetch_assoc()) {
	    $check_username = $row;
	}


	$password = bin2hex(random_bytes(4));
	$token_key = md5($password);


	$contextNew = create_database_connection();


	$statementNew = $contextNew->prepare("update $mysql_database.account set token_key = ? where username = ? and email = ?");
	$statementNew->bind_param('sss', $token_key, $check_username['username'], $check_username['email']);

	$statementNew->execute();
	$resultNew = $statementNew->get_result();
	$statementNew->close();

	$to = $check_username['email'];

        // Send mail via Sendgrid API - START
        include_once('../sendgrid-php/apikey.inc.php');
        require("../sendgrid-php/vendor/autoload.php"); // Composer version of Sendgrid API

        $email = new \SendGrid\Mail\Mail();
        $email->setFrom("mail@turtle-wow.org", "Turtle WoW");
        $email->setSubject("Account recovery on Turtle WoW");
        $email->addTo($email_address, $account_name); // 2nd field is the receiver name
        $email->addHeader("X-Mailer", "SendGrid-API");

        // HTML text
        $email->addContent("text/html", '
        Greetings! '.$check_username["username"].' <br />
        Someone used your e-mail to reset Turtle WoW password.<br />
        If you haven\'t done this, ignore this letter.<br />
        <hr>
        Your account: <br />
        Username : <b>'.$check_username["username"].'</b><br />
        Password : <b>'.$password.'</b><br />

        To confirm password reset, <a href="https://turtle-wow.org/password_reset.php?token_key='.$token_key.'&pass='.$password.'" target="_blank">click here</a>.
        ');


        $sendgrid = new SendGrid($sgapikey);
        //try {
            $response = $sendgrid->send($email);
            error_log ('Sendgrid status code: '.$response->statusCode().' to address '.$email_address.'');
            //print_r($response->headers());
            //print $response->body() . "\n";
        //} catch (Exception $e) {
            //error_log ('Caught Sendgrid exception: '.$e->getMessage().' ');
        //}

        $logmailNew = create_database_connection();

        $statemente = $logmailNew->prepare("update $mysql_database.account set email_status = ? WHERE username=? AND email=?");
        $statemente->bind_param('iss', $response->statusCode(), $account_name, $email_address);
        $statemente->execute();
        $affected_rowse = $statemente->affected_rows;
        $statemente->close();

        if ($response->statusCode() !== 202) {
            error_log ('Saving status code of '.$account.' with email '.$email_address.' failed!');
            fail('Error. Please, enter valid login and username.');
        }
        else
            success('We\'ve sent you a letter. Please check your mailbox!');

        // Send mail via Sendgrid API - END

	/*if (mail($to, $subject, $message, $headers))
	    success('We\'ve sent you a letter. Please check your mailbox!');
	else
	    fail('Error. Please, enter valid login and username.');*/
}

?>
