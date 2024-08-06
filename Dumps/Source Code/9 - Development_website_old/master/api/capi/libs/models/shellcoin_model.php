<?php

class shellcoin_model extends model
{

    public function get()
    {

        $filename = "logs_shellcoin.json";

        $query = "SELECT *, FROM_UNIXTIME(time) as date_nice
        FROM tw_char.logs_shellcoin
        ORDER BY time";

        $reload_log_data = file_exists($filename) && ((date('U') - date ("U", filemtime($filename))) >= 60 * 5);

        $force = isset($this->params->force);

        if (!file_exists($filename) || $force || $reload_log_data) {

            $data = $this->gameDB->select($query);
            file_put_contents($filename, json_encode($data));
        }

        $data = json_decode(file_get_contents($filename));

        foreach ($data as $key => $d) {
            $data[$key]->date_nice = date('M j H:i', strtotime($d->date_nice));
        }

        return $data;
    }

    public function get7d()
    {

        $filename = "logs_shellcoin7d.json";

        $query = "SELECT *, FROM_UNIXTIME(time) as date_nice
        FROM tw_char.logs_shellcoin
        WHERE time >= (UNIX_TIMESTAMP() - 7 * 24 * 60 * 60)
        ORDER BY time";

        $reload_log_data = file_exists($filename) && ((date('U') - date ("U", filemtime($filename))) >= 60 * 5);

        $force = isset($_REQUEST['force']);

        if (!file_exists($filename) || $force || $reload_log_data) {

            $data = $this->gameDB->select($query);
            file_put_contents($filename, json_encode($data));
        }

        $data = json_decode(file_get_contents($filename));

        foreach ($data as $key => $d) {
            $data[$key]->date_nice = date('M j H:i', strtotime($d->date_nice));
        }

        return $data;
    }

}