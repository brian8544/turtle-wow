<?php
/**
 * Copyright (c) Cosmin POP 2019
 */

ini_set('session.gc_maxlifetime', 24*60*60);
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 1);

$sessionCookieExpireTime = 24 * 60 * 60;
session_set_cookie_params($sessionCookieExpireTime);

@session_start();

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);


if (php_sapi_name() === 'cli' or defined('STDIN')) {
    foreach ($argv as $argument) {
        if ($argument == $argv[0]) continue;

        $pair = explode("=", $argument);
        $variableName = substr($pair[0], 2);
        $variableValue = $pair[1];

        if ($variableName === 'url') {
            $_GET[$variableName] = $variableValue;
            $_SERVER['REQUEST_METHOD'] = 'GET';

            $_SERVER['SERVER_NAME'] = 'localhost';
            $_SERVER['REQUEST_SCHEME'] = 'http';
            $_SERVER['REQUEST_URI'] = '/api/';
        }

    }

}

require 'capi/libs/api/api.php';
require "../admin/api/capi/config/config.php";

$api = new Api();

try {

    //init
    echo $api->init();

} catch (Exception $e) {
    die(json_encode([
        'status' => true,
        'result' => [
            'err' => 'api_init_failed : ' . $e->getMessage()
        ]
    ]));
}



