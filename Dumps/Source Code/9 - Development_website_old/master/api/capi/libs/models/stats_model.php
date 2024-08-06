<?php

class stats_model extends model
{

    public function get_population_graph()
    {

        $filename = "pop_graph_cache.json";

        $where = '';
        if (date('w') == 0)
            $where = "WHERE date <= UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY))";

        $query = "SELECT CONCAT(YEAR(FROM_UNIXTIME(date)), '/', WEEK(FROM_UNIXTIME(date))) AS week_name,
        YEAR(FROM_UNIXTIME(date)) as year, WEEK(FROM_UNIXTIME(date)) as week, max(online_alli) as m_a, max(online_horde) as m_h,
        max(queue) as m_q, DATE_FORMAT(FROM_UNIXTIME(date), '%d/%m/%Y') as date_nice, realm
        FROM statistics_online
        " . $where . "
        GROUP BY week_name, realm
        ORDER BY YEAR(FROM_UNIXTIME(date)) ASC, WEEK(FROM_UNIXTIME(date)) ASC";

        $reload_graph_data = file_exists($filename) && ((date('U') - date("U", filemtime($filename))) >= 60 * 60 * 12);

        $force = isset($_REQUEST['force']);

        if (!file_exists($filename) || $force || $reload_graph_data) {

            $data = $this->gameDB->select($query);
            file_put_contents($filename, json_encode($data));
        }

        $decodedData = json_decode(file_get_contents($filename), true);

        $result = array();
        foreach ($decodedData as $row) {
            $realm = $row['realm'];
            if (!array_key_exists($realm, $result)) {
                $result[$realm] = array(
                    'labels' => array(),
                    'dataA' => array(),
                    'dataH' => array(),
                    'dataQ' => array(),
                    'dataT' => array(),
                    'dataC' => array(),
                );
            }
            $result[$realm]['labels'][] = $row['date_nice'];
            $result[$realm]['dataA'][] = $row['m_a'];
            $result[$realm]['dataH'][] = $row['m_h'];
            $result[$realm]['dataQ'][] = $row['m_q'];
            $result[$realm]['dataT'][] = $row['m_a'] + $row['m_h'];
            $result[$realm]['dataC'][] = $row['m_a'] + $row['m_h'] + $row['m_q'];
        }

        return $result;
    }

}