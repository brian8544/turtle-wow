<?php
/**
 * Copyright (c) Cosmin POP 2019
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (php_sapi_name() === 'cli' OR defined('STDIN')) {
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

ini_set('session.gc_probability', 0);

@session_start();

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



