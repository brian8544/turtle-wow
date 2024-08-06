<?php
/**
 * Copyright (c) Cosmin POP 2019
 */

class model
{

    public $siteDB = null;
    public $gameDB = null;
    public $forumDB = null;

    public $params = null;

    function __construct()
    {

//        $this->siteDB = new MYSQL_Database(DB_TYPE, DB_HOST, SITE_DB_NAME, SITE_DB_USER, SITE_DB_PASS);
//        $this->siteDB->exec("set names utf8");

        $this->gameDB = new MYSQL_Database(DB_TYPE, DB_HOST, GAME_DB_NAME, GAME_DB_USER, GAME_DB_PASS);
        $this->gameDB->exec("set names utf8");

        $this->forumDB = new MYSQL_Database(DB_TYPE, DB_HOST, FORUM_DB_NAME, GAME_DB_USER, GAME_DB_PASS);
        $this->forumDB->exec("set names utf8");

        $this->params = [];

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $this->params = isset($_REQUEST['p']) ? $_REQUEST['p'] : '0';

            if (!is_array($this->params)) {
                $this->params = json_decode($this->params);
            }

        } else { // GET

            $data = explode('/', $_GET['url']);

            $temp_params = [];

            for ($i = 2; $i <= 10; $i += 2) {

                if (isset($data[$i]) && isset($data[$i + 1])) {
                    $temp_params[$data[$i]] =
                        stristr($data[$i], 'id_') ?
                            intval($data[$i + 1]) :
                            $data[$i + 1];
                }

            }

            $this->params = json_decode(json_encode($temp_params));

        }

    }

    function __destruct()
    {
        $this->siteDB = null;
        $this->gameDB = null;
        $this->forumDB = null;
    }

    public function close()
    {
        $this->siteDB = null;
        $this->gameDB = null;
        $this->forumDB = null;
    }

    public function params()
    {

//        $url = isset($_GET['p']) ? $_GET['p'] : null;
//        $url = rtrim($url, '/');
//        $url = htmlspecialchars(strip_tags($url));
//        $params = explode('/', $url);
//        var_dump($params);
//        return isset($params[2]) ? $params[2] : false;
        return isset($_GET['p']) ? strip_tags($_GET['p']) : false;
    }
}
