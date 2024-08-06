<?php

class matomo_model extends model
{
    public function getIp()
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
    private function _geoLocation($data)
    {
        /*$ipAddress = $data['ipAddress'];

        $databaseFile = 'DBIP-City.mmdb';

        require_once("../vendor/autoload.php");

        try {
            $reader = new \GeoIp2\Database\Reader($databaseFile);
            $record = $reader->city($data['ipAddress']);

            $country = $record->country->isoCode;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }*/


        return $_SERVER["HTTP_CF_IPCOUNTRY"];
    }

    public function getGeoLocation()
    {
        if (empty($this->params->idAddress)) {
            $ipAddress = $this->getIp();
        } else {
            $ipAddress = $this->params->ipAddress;
        }

        $data = [
            'ipAddress' => $ipAddress
        ];

        return ['result' => 0, 'response' => $this->_geoLocation($data)];
    }
}