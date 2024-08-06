<?php

class INTERBASE_Database extends PDO
{

    public function __construct($DB_TYPE, $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS)
    {

        parent::__construct($DB_TYPE . ':dbname=' . $DB_HOST . ':' . $DB_NAME, $DB_USER, $DB_PASS);

        parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }

    /**
     * select
     * @param string $sql An SQL string
     * @param array $array Paramters to bind
     * @param integer $fetchMode A PDO Fetch mode
     * @return mixed
     */
    public function select($sql, $array = array(), $fetchMode = PDO::FETCH_ASSOC)
    {

        $sth = $this->prepare($sql);
        foreach ($array as $key => $value) {
            $sth->bindValue("$key", $value);
        }

        try {
            $sth->execute();
            return $sth->fetchAll($fetchMode);
        } catch (Exception $e) {
            return array(
                'err' => 'DB select exception: ' . $e->getMessage(),
            );
        }


    }

    public function baum_q($sql)
    {

        $array = array();
        $fetchMode = PDO::FETCH_ASSOC;

        $DB = new PDO('firebird:dbname=' . BAUM_SERVER_IP . ':' . BAUM_SERVER_DB_ALIAS, BAUM_SERVER_USERNAME, BAUM_SERVER_PASSWORD);

        $sth = $DB->prepare($sql);
        foreach ($array as $key => $value) {
            $sth->bindValue("$key", $value);
        }

        try {
            $sth->execute();
            return json_decode(json_encode($sth->fetchAll($fetchMode)));
        } catch (Exception $e) {
            return array(
                'err' => 'DB select exception: ' . $e->getMessage()
            );
        }
    }


    public function baum_qq($q)
    {

        $results = [];

        $dbh = ibase_connect(BAUM_SERVER_IP . ':' . BAUM_SERVER_DB_ALIAS, BAUM_SERVER_USERNAME, BAUM_SERVER_PASSWORD);
        $stmt = $q;
        $sth = ibase_query($dbh, $stmt);
        while ($row = ibase_fetch_object($sth)) {
            $results[] = $row;
        }
        ibase_free_result($sth);
        ibase_close($dbh);

        return $results;
    }


}