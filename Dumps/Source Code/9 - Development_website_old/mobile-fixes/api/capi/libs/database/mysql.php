<?php
/**
 * Copyright (c) Cosmin POP 2019
 */

class MYSQL_Database extends PDO
{

    public function __construct($DB_TYPE, $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS)
    {
        parent::__construct($DB_TYPE . ':host=' . $DB_HOST . ';dbname=' . $DB_NAME, $DB_USER, $DB_PASS);

        parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        parent::setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        parent::exec("set names utf8");
    }

    public function simpleQuery($sql)
    {
        $sth = $this->prepare($sql);

        try {
            $sth->execute();
            $sth->closeCursor();

            $sth = null;
            return true;

        } catch (Exception $e) {

            exit(json_encode([
                'error' => true,
                'motiv' => $e->getMessage()
            ]));
        }
    }

    /**
     * select
     * @param string $sql An SQL string
     * @param array $array Parameters to bind
     * @param bool $debug
     * @param integer $fetchMode A PDO Fetch mode
     * @return mixed
     */
    public function select($sql, $array = array(), $debug = false, $fetchMode = PDO::FETCH_ASSOC)
    {

        $sth = $this->prepare($sql);

        $ints = ['limit', 'offset'];

        foreach ($array as $key => $value) {
            $sth->bindValue("$key", $value, in_array($key, $ints) ? PDO::PARAM_INT : PDO::PARAM_STR);
        }

        if ($debug) {
            var_dump($sth);
            var_dump($array);
        }

        try {
            $sth->execute();

            $returnData = $sth->fetchAll($fetchMode);

            if (false) { // cu showfields

                $tables = [];
                $main_table = explode(" ", $sql);
                foreach ($main_table as $key => $mt) {
                    if ($mt == 'FROM' || $mt == 'JOIN')
                        if (str_replace(array("\r", "\n"), '', strip_tags($main_table[$key + 1])) !== '(') {
                            $tables[] = str_replace(array("\r", "\n"), '', strip_tags($main_table[$key + 1]));
                        }
                }

                foreach ($tables as $key => $t) {

                    if ($t !== '') {

                        $types = $this->prepare("SHOW FIELDS FROM " . $t);
                        $types->execute();
                        $types = $types->fetchAll($fetchMode);
                        foreach ($returnData as $key2 => $rd) {

                            foreach ($rd as $krd => $r) {

                                foreach ($types as $key3 => $ty)
                                    if ($krd == $ty['Field']) {
//                            var_dump('set : ' . $returnData[$key2][$ty['Field']]);
                                        if (stristr($ty['Type'], 'int'))
                                            $returnData[$key2][$ty['Field']] = intval($returnData[$key2][$ty['Field']]);
                                        if (stristr($ty['Type'], 'float'))
                                            $returnData[$key2][$ty['Field']] = floatval($returnData[$key2][$ty['Field']]);
                                    }
                            }
                        }
                    }
                }

            }

            $sth->closeCursor();

            $sth = null;

            return $returnData;

        } catch (Exception $e) {

            exit(json_encode([
                'error' => true,
                'motiv' => $e->getMessage()
            ]));

        }


    }

    /**
     * insert
     * @param string $table A name of table to insert into
     * @param array $data An associative array
     * @param boolean $ignore if one found
     * @param bool $debug
     * @param bool $replace_on_duplicate
     * @return bool
     */
    public function insert($table, $data, $ignore = false, $debug = false, $replace_on_duplicate = false)
    {
        ksort($data);

        $fieldNames = implode('`, `', array_keys($data));
        $fieldValues = ':' . implode(', :', array_keys($data));

        if ($ignore) {
            $ignore = "IGNORE";
        } else {
            $ignore = " ";
        }

        if ($replace_on_duplicate) {

            $update_data = '';
            foreach ($data as $key => $value)
                $update_data .= '`' . $key . '` = :' . $key .'_replace, ';

            $update_data = rtrim($update_data, ', ');

            $query = "INSERT " . $ignore . " INTO $table (`$fieldNames`) VALUES ($fieldValues)" .
            " ON DUPLICATE KEY UPDATE " . $update_data;

        } else {
            $query = "INSERT " . $ignore . " INTO $table (`$fieldNames`) VALUES ($fieldValues)";
        }

        if ($debug) {
            var_dump($query);
            var_dump($data);
        }

        $sth = $this->prepare($query);

        foreach ($data as $key => $value) {
            $sth->bindValue(":$key", is_string($value) ? trim($value) : $value);
            if ($replace_on_duplicate)
                $sth->bindValue(":".$key."_replace", is_string($value) ? trim($value) : $value);
        }

        try {

            return $sth->execute();

        } catch (Exception $e) {

            exit(json_encode([
                'error' => true,
                'motiv' => $e->getMessage()
            ]));

        }
    }

    /**
     * update
     * @param string $table A name of table to insert into
     * @param array $data An associative array
     * @param array $where the WHERE query part
     * @param bool $bind bind params, pentru update cu pret_ron = pret_euro * val_euro
     * @param bool $replace
     * @return boolean update result
     */
    public function update($table, $data, $where, $bind = true, $replace = false)
    {


        ksort($data);
        ksort($where);

        $fieldDetails = NULL;
        foreach ($data as $key => $value) {
            if ($bind)
                $fieldDetails .= "`$key`=:$key,";
            else
                $fieldDetails .= "`$key`=$value,";
        }

        $whereDetails = NULL;
        foreach ($where as $key => $value) {
            if ($value === 'NOT_NULL') {
                $where[$key] = NULL;
                $whereDetails .= "`$key` IS NOT NULL AND ";
            } elseif ($value === 'NULL') {
                $where[$key] = NULL;
                $whereDetails .= "`$key` IS NULL AND ";
            } else
                $whereDetails .= "`$key`=:$key AND ";
        }

        $fieldDetails = rtrim($fieldDetails, ',');
        $whereDetails = rtrim($whereDetails, ' AND ');

        $sth = $this->prepare("UPDATE $table SET $fieldDetails WHERE $whereDetails");

        foreach ($data as $key => $value) {
            if ($bind)
                $sth->bindValue(":$key", is_string($value) ? trim($value) : $value);
        }

        foreach ($where as $key => $value) {
            if ($value !== NULL)
                $sth->bindValue(":$key", $value);
        }


        try {

            return $sth->execute();

        } catch (Exception $e) {

            exit(json_encode([
                'error' => true,
                'motiv' => $e->getMessage()
            ]));
        }

    }

    /**
     * delete
     *
     * @param string $table
     * @param array $where
     * @param integer $limit
     * @return integer Affected Rows
     */
    public function delete($table, $where, $limit = 1)
    {

        ksort($where);

        $whereDetails = NULL;
        foreach ($where as $key => $value) {
            if ($value === 'NULL') {
                $where[$key] = NULL;
                $whereDetails .= "`$key` IS NULL AND";
            } else {
                $whereDetails .= "`$key`=:$key AND ";
            }
        }
        $whereDetails = rtrim($whereDetails, ' AND ');

        if ($limit === false) {
            $sth = $this->prepare("DELETE FROM $table WHERE $whereDetails");
        } else {
            $sth = $this->prepare("DELETE FROM $table WHERE $whereDetails LIMIT $limit");
        }

        foreach ($where as $key => $value) {
            if ($value !== NULL)
                $sth->bindValue(":$key", $value);
        }

        try {
            return $sth->execute();
        } catch (Exception $e) {


            exit(json_encode([
                'error' => true,
                'motiv' => $e->getMessage()
            ]));

        }

    }

    public function lid()
    {
        return intval($this->lastInsertId());
    }

}
