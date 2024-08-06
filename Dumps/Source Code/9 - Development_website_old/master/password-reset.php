<!--<!doctype html>-->
<?php

// page disabled, i think the reset is done in login.php
exit();

ini_set('session.gc_maxlifetime', 24*60*60);
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 1);

$sessionCookieExpireTime = 24 * 60 * 60;
session_set_cookie_params($sessionCookieExpireTime);

@session_start();

if (isset($_SESSION['account']) && isset($_SESSION['user'])) {

    // already logged in
//    header('Location: ../');
    echo"header";
    exit;
}

require "admin/api/capi/config/config.php";

function check($w, $data)
{

    $data = strtoupper($data);


    include_once 'api/capi/libs/database/mysql.php';
    $db = new MYSQL_Database(DB_TYPE, DB_HOST_LAN, GAME_DB_NAME, GAME_DB_USER, GAME_DB_PASS);
    $db->exec("set names utf8");

    if ($w == 'username') {

        $account = $db->select("SELECT * FROM " . GAME_DB_ACCOUNT . " where username = :u", [
            'u' => $data
        ]);

        if (count($account) <= 0 || count($account) > 1)
            return -1;

        $account = $account[0];

        $_SESSION['login_username'] = $data;
        $_SESSION['login_id'] = $account['id'];
        $_SESSION['login_tv_admin'] = $account['rank'] >= 3;
        $_SESSION['login_sha_pass_hash'] = strtoupper($account['sha_pass_hash']);

        return 0;

    }

}

function get_ip()
{
    //Just get the headers if we can or else use the SERVER global.
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
    } else {
        $headers = $_SERVER;
    }

    //Get the forwarded IP if it exists.
    if (array_key_exists('X-Forwarded-For', $headers) && filter_var($headers['X-Forwarded-For'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
        $the_ip = $headers['X-Forwarded-For'];
    } elseif (array_key_exists('HTTP_X_FORWARDED_FOR', $headers) && filter_var($headers['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
        $the_ip = $headers['HTTP_X_FORWARDED_FOR'];
    } else {
        $the_ip = filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
    }

    // Might be useful
    $regex_ip = "^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}.([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";

    // Ensure we got a valid IP, else simply set 1.1.1.1
    if (!filter_var($the_ip, FILTER_VALIDATE_IP)) {
        $the_ip = "1.1.1.1";
    }

    return $the_ip;
}

$ip = get_ip();
$message = '';
$step = 1;
$err = 0;

if (isset($_SESSION[$ip . '_attempts'])) {

    $data = json_decode($_SESSION[$ip . '_attempts'], 1);
    if ($data['locked']) {

        $diff = ($data['end'] - strtotime('now')) / 60;

        if ($diff <= 0) {
            // unlock
            unset($_SESSION[$ip . '_attempts']);
            $data = [];
            $data['first_attempt'] = date('Y-m-d H:i:s');
            $data['attempts'] = 1;
            $data['locked'] = false;
            $_SESSION[$ip . '_attempts'] = json_encode($data);
        } else {
            $step = 0; // locked
            $message = "Too many attempts. Please try again in " . ceil($diff) . " minute(s).";
        }
    } else {
        $data = json_decode($_SESSION[$ip . '_attempts'], 1);
        $data['attempts']++;
        $data['last_attempt'] = date('Y-m-d H:i:s');

        if ($data['attempts'] >= MAX_LOGIN_ATTEMPTS) {

            if (round((strtotime('now') - strtotime($data['first_attempt'])) / 60, 2) <= MAX_MINUTES_ATTEMPTS) {
                $data['locked'] = true;
                $data['end'] = strtotime('+' . MAX_MINUTES_ATTEMPTS . ' minutes', strtotime('now'));
                $_SESSION[$ip . '_attempts'] = json_encode($data);
                $step = 0;
                $message = "Too many attempts. Please try again in " . TIMEOUT_MINUTES . " minutes.";
            } else {
                $data['first_attempt'] = date('Y-m-d H:i:s');
                $data['attempts'] = 1;
            }
        }
        $_SESSION[$ip . '_attempts'] = json_encode($data);
    }
} else {
    $data = [];
    $data['first_attempt'] = date('Y-m-d H:i:s');
    $data['attempts'] = 1;
    $data['locked'] = false;
    $_SESSION[$ip . '_attempts'] = json_encode($data);
}

if ($step !== 0) {

    if (isset($_REQUEST['username'])) {
        if (isset($_SESSION[$_REQUEST['username'] . '_attempts'])) {

            $data = json_decode($_SESSION[$_REQUEST['username'] . '_attempts'], 1);
            if ($data['locked']) {

                $diff = ($data['end'] - strtotime('now')) / 60;

                if ($diff <= 0) {
                    unset($_SESSION[$_REQUEST['username'] . '_attempts']);
                } else {
                    $step = 0; // locked
                    $message = "Too many attempts. Please try again in " . ceil($diff) . " minute(s).";
                }
            } else {
                $data = json_decode($_SESSION[$_REQUEST['username'] . '_attempts'], 1);
                $data['attempts']++;
                $data['last_attempt'] = date('Y-m-d H:i:s');

                if ($data['attempts'] >= MAX_LOGIN_ATTEMPTS) {

                    if (round((strtotime('now') - strtotime($data['first_attempt'])) / 60, 2) <= MAX_MINUTES_ATTEMPTS) {
                        $data['locked'] = true;
                        $data['end'] = strtotime('+' . MAX_MINUTES_ATTEMPTS . ' minutes', strtotime('now'));
                        $_SESSION[$_REQUEST['username'] . '_attempts'] = json_encode($data);
                        $step = 0;
                        $message = "Too many attempts. Please try again in " . TIMEOUT_MINUTES . " minutes.";
                    } else {
                        $data['first_attempt'] = date('Y-m-d H:i:s');
                        $data['attempts'] = 1;
                    }
                }
            }
        } else {
            $data = [];
            $data['first_attempt'] = date('Y-m-d H:i:s');
            $data['attempts'] = 1;
            $data['locked'] = false;
        }
        $_SESSION[$_REQUEST['username'] . '_attempts'] = json_encode($data);
    }

}

if ($step !== 0) {

    if (isset($_REQUEST['username'])) {
        $err = check('username', $_REQUEST['username']);

        if ($err == 0) {
            $step = 2;
        }
    }

    if (isset($_REQUEST['password'])) {
        $step = 2;
        if ($_SESSION['login_sha_pass_hash'] ==
            strtoupper(sha1(strtoupper($_SESSION['login_username']) . ":" . strtoupper($_REQUEST['password'])))) {
            // password correct

            $_SESSION['user'] = $_SESSION['login_username'];
            $_SESSION['account'] = $_SESSION['login_id'];
            // for deleting tw watch comments
            $_SESSION['tv_administrator'] = $_SESSION['login_tv_admin'];

            unset($_SESSION['login_username']);
            unset($_SESSION['login_id']);
            unset($_SESSION['login_tv_admin']);
            unset($_SESSION['login_sha_pass_hash']);

            unset($_SESSION[$ip . '_attempts']);
            unset($_SESSION[$_SESSION['user'] . '_attempts']);

            // redirect to index
            if (isset($_REQUEST['redirect']))
                header('Location: ../#' . $_REQUEST['redirect']);
            else
                header('Location: ../');
            die();
        } else {
            $err = -1;
        }
    }

}

$settings = [
    'site_title' => 'Turtle WoW — Password Reset',
    'site_description' => 'Turtle WoW — Mysteries of Azeroth',
    'site_keywords' => 'World of Warcraft, WoW, WoW Classic, WoW Vanilla, Vanilla+, Vanilla Plus, 1.16.0, 1.16.1, 1.16.2, 1.16.3, 1.16.4,  Mysteries of Azeroth, Custom WoW Expansion, Turtle WoW, Custom Vanilla, Extended Vanilla, Continued Vanilla, High Elves, Goblins, Vanilla Expanded, New Raids, New Bosses, Mirage Raceway, Survival, New Items, New Skills, New Quests, Private WoW Server, Play WoW Free'
];

?>

<html lang="en">

<head>

    <meta charset="utf-8"/>
    <title><?= $settings['site_title'] ?></title>
    <meta name="description" content="<?= $settings['site_description'] ?>"/>
    <meta name="keywords" content="<?= $settings['site_keywords'] ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>

    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <meta property="og:title" content="<?= $settings['site_title'] ?>"/>
    <meta property="og:description" content="<?= $settings['site_description'] ?>"/>

    <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css"/>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>

    <link rel="stylesheet" href="css/vendor/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/style.css?ver=<?= rand() ?>"/>

    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125328091-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'UA-125328091-1');
    </script>

    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">

    <style>

        @font-face {
            font-family: 'Fontin-Sans';
            src: url('fonts/Fontin-Sans-CR-SC.ttf.woff') format('woff'),
            url('fonts/Fontin-Sans-CR-SC.ttf.svg#Fontin-Sans-CR-SC') format('svg'),
            url('fonts/Fontin-Sans-CR-SC.ttf.eot'),
            url('fonts/Fontin-Sans-CR-SC.eot?#iefix') format('embedded-opentype');
            font-weight: normal;
            font-style: normal;
        }

        body {
            background-image: url("images/bg2.png");
            background-size: cover;
        }

        h5, p, a {
            font-family: Fontin-Sans;
        }

        .login-box {
            margin-top: 200px !important;
            border-radius: 0;
            border: 1px solid rgba(158, 151, 131, .1);
            background-color: var(--dark-gray);
            opacity: 0.98;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

        }

        .btn-success {
            border: 1px solid #3f5f22;
            background: rgb(71 105 49);
            background: radial-gradient(circle, rgb(71 105 49) 0%, rgb(41 70 33) 100%);
            border-radius: 1px;
            font-family: Fontin-Sans;
            color: #9cbc5c;
            font-size: 20px;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
        }

        .btn-success:hover {
            border: 1px solid #527e2d;
            background: rgb(71 105 49);
            background: radial-gradient(circle, rgb(127, 183, 85) 0%, rgb(41 70 33) 100%);
            color: #bee375;
        }

        a {
            color: #3f5f22;
        }

        a:hover {
            color: #3f5f22 !important;
            text-decoration: underline;
        }
    </style>

</head>

<body>

<div class="container">
    <div class="row">
        <div class="col-lg-4 m-auto login-box p-5">
            <h5 class="text-white text-center mb-5">password reset</h5>

            <?php

            if ($step == 2) {
                echo '<p class="text-muted">Welcome ' . $_SESSION['login_username'] . ', please enter your password.</p>';
            }

            ?>


            <form method="POST" accept-charset="password-reset.php">

                <?php

                if ($step == 0) {
                    echo "<span class='orange-text'>" . $message . "</span>";
                    echo "<br><a href='../'>Back to website</a>";
                }

                ?>

                <?php
                if ($step == 1) {
                    echo '<input type="text" class="form-control" placeholder="E-mail" name="email" required>';
                    if ($err == -1) {
                        echo '<small class="text-danger">No valid account found.</small>';
                    }
                }
                ?>

                <?php
                if ($step == 2) {
                    echo '<input type="password" class="form-control" placeholder="Password" name="password" required>';
                    if ($err == -1) {
                        echo '<small class="text-danger">Invalid password.</small>';
                    }
                }
                ?>

                <?php

                if ($step == 1) {
                    echo '<button class="btn btn-success mt-3" type="submit">Next</button>';
                } elseif ($step == 2) {
                    echo '<button class="btn btn-success mt-3" type="submit">Login</button>';
                }

                ?>

                <?php
                if ($step == 2) {
                    echo '<BR><BR><a class="small mt-3" href="">Not ' . $_SESSION['login_username'] . '? Change username.</a>';
                }
                ?>


            </form>

            <?php if ($step != 0) {
                echo '<a href="/">Back to website.</a>';
            } ?>

        </div>
    </div>

</div>


<script src="js/vendor/jquery-3.5.1.min.js"></script>
<script src="js/vendor/bootstrap.bundle.min.js"></script>

<!-- Meta Pixel Code -->
<script>
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '356731841933760');
    fbq('track', 'PageView');
</script>
<noscript>
    <img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=356731841933760&ev=PageView&noscript=1"/>
</noscript>
<!-- End Meta Pixel Code -->

</body>

</html>