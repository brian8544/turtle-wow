<?php

error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', 1);
ini_set('serialize_precision', 4);

require_once 'includes/FirePHPCore/fb.php';
require_once 'configs/config.php';
require_once 'includes/db.php';
require_once 'includes/smarty.php';

// List of available languages
global $languages;
$languages = array(
    0 => 'enus',
);

function str_normalize($str) {
    return str_replace("'", "\'", $str);
}

/**
 *
 * @param string $str
 * @param string $a
 * @param string $b
 * @return string 
 */
function point_delim(&$str, &$a, &$b, &$c = null, &$d = null) {
    if (isset($d) && isset($c))
        @list($a, $b, $c, $d) = explode('.', $str, 4);
    if (isset($c))
        @list($a, $b, $c) = explode('.', $str, 3);
    else
        @list($a, $b) = explode('.', $str, 2);
    return;
}

/**
 * Verify the user password
 * 
 * @param string $username
 * @param string $shapass
 * @return mixed $result (-1) if user does not exist, (0) if passwords do not match, (>0) user id if passwords match
 */
function CheckPwd($username, $shapass) {
    require_once 'includes/DbSimple/Generic.php';
    global $rDB;
    global $UDWBaseconf;
    $user_row = $rDB->selectRow('SELECT id, sha_pass_hash, gmlevel FROM ' . REALMD . '.account WHERE username=? LIMIT 1', $username);
    if ($user_row) {
        if ($shapass == $user_row['sha_pass_hash']) {
            $user = array();
            $user['id'] = $user_row['id'];
            $user['name'] = $username;
            $user['roles'] = ($user_row['gmlevel'] > 0) ? 2 : 0;
            $user['perms'] = 1;
            return $user;
        } else {
            return 0;
        }
    } else {
        // User does not exist
        return -1;
    }
}

/**
 * Create a hash based on username/password.
 * 
 * @param string $user
 * @param string $pass
 * @return string 
 */
function create_usersend_pass($user, $pass) {
    return sha1(strtoupper($user) . ':' . strtoupper($pass));
}

/**
 * Remove the user cookie.
 */
function del_user_cookie() {
    setcookie('remember_me', '', time() - 3600);
    return;
}
