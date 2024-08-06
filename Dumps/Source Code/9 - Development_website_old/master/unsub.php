<!DOCTYPE html>
<?php require_once('./header.php'); ?>
<div class="turtle-main"><div class="turtle-block">
<div class="turtle-input-list" style="display:flex; flex-wrap: no-wrap; width: 100%;">

<?php

// Check if we got the email ID
if (isset($_GET['email']))
{
        $email = $_GET['email'];
} else {
        errorHandler("Invalid email received.");
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

// Connects to Our Database
$con = mysqli_connect("localhost", "tw_unsub", "UnSuBMeNoW1PL0x1", "tw_logon");

// Check connection
if (mysqli_connect_errno())
{
    echo "<span>Failed to connect to MySQL: </span>" . mysqli_connect_error();
}

$iquery  = "UPDATE account SET email_sub = 0 WHERE email = '$email';";

// Execute query
if (mysqli_query($con,$iquery)) {

echo '<span>Done. You\'ll no longer hear what these turtles have to say! We\'ll be missing you greatly.</span>';

} else {

echo '<span>We have technical difficulties, please try again later or request manual removal in Discord.</span>';

}


function errorHandler($error) {
        echo "<p>$error</p>";
        exit;
}
?>

</div></div>
<?php require_once ('./footer.php') ?>
</body></html>



