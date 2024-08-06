<?php

echo "<html><body>";

// Check if we got the email ID
if (isset($_GET['email']))
{
    $email = $_GET['email'];
} else {
    errorHandler("No email received, contact a moderator on Discord.");
}

if (isset($_GET['id']))
{
    $accid = $_GET['id'];
} else {
    errorHandler("No account id received, possibly an outdated email link.");
}

$ip;
if (getenv("HTTP_CLIENT_IP"))
    $ip = getenv("HTTP_CLIENT_IP");
else if(getenv("HTTP_X_FORWARDED_FOR"))
    $ip = getenv("HTTP_X_FORWARDED_FOR");
else if(getenv("REMOTE_ADDR"))
    $ip = getenv("REMOTE_ADDR");
else
    $ip = "UNKNOWN";

if(!filter_var($email, FILTER_VALIDATE_EMAIL))
{
    // invalid email
    errorHandler("Invalid email address detected.");
    die("Invalid unsub email!");
}

// ensure that account id contains only numbers
$accid = preg_replace("/[^0-9]/", '', $accid);

// Connects to Our Database
$con = mysqli_connect("host", "user", "password", "database");

// Check connection
if (mysqli_connect_errno())
{
    //echo "<span>Failed to connect to MySQL: </span>" . mysqli_connect_error();
    error_log ("Unsub.php failed to connect to MySQL");
}

$iquery  = "UPDATE account SET email_sub = 0 WHERE email = '$email' AND id = '$accid' LIMIT 1;";

// Execute query
if (mysqli_query($con,$iquery)) {

    echo '<span>Done. You\'ll no longer hear what these turtles have to say! We\'ll be missing you greatly &#128034;</span>';
    error_log("E-Mail $email with IP $ip unsubscribed from the newsletter.");

} else {

    echo '<span>We have technical difficulties, please try again later or request manual removal in Discord &#128034;</span>';
    error_log("E-Mail $email with IP $ip COULD NOT BE unsubscribed from the newsletter.");

}


function errorHandler($error) {
    echo "<p>$error</p>";
    exit;
}

echo "</body></html>";

?>
