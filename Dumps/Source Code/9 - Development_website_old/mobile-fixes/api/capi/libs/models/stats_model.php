<?php

class stats_model extends model
{


    public function get_population_graph()
    {

        return $this->gameDB->select("SELECT CONCAT(YEAR(FROM_UNIXTIME(date)), '/', WEEK(FROM_UNIXTIME(date))) AS week_name, 
        YEAR(FROM_UNIXTIME(date)) as year, WEEK(FROM_UNIXTIME(date)) as week, max(online_alli) as m_a, max(online_horde) as m_h,
        DATE_FORMAT(FROM_UNIXTIME(date), '%d/%m/%Y') as date_nice
        FROM statistics_online
        GROUP BY week_name
        ORDER BY YEAR(FROM_UNIXTIME(date)) ASC, WEEK(FROM_UNIXTIME(date)) ASC");
    }

}