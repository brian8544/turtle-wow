<?php
/**
 * Copyright (c) Cosmin POP 2019
 */

class Api
{

    private $_data = null;
    private $model = null;


    /**
     * Starts the Bootstrap
     * @return string json
     *      status : boolean
     *      result : array
     */
    public function init()
    {

        $this->load_models();

        $this->load_utils();

        // Sets the protected $_data
        $this->_getData();

        if (isset($this->_data[0])) {

            $model = $this->_data[0] . '_model';
            $this->model = new $model;

        } else {
            $this->model = new index_model();
        }

        try {
            $result = $this->model->{$this->_data[1]}();
        } catch (Error $e) {
            return '';
        }

        $status = is_array($result) || is_bool($result);

        return json_encode([
            'status' => $status,
            'result' => $result
        ]);

    }


    /**
     * Loads modes from libs/models
     */
    public function load_models()
    {

        //main api model
        require_once "model.php";

        //database model
        require_once "capi/libs/database/mysql.php";

        //libs models
        $models = $this->filter_models(scandir('capi/libs/models'));

        foreach ($models as $m) {
            require_once LIBS . 'models/' . $m;
        }
    }

    /**
     * Returneaza modelele php din path
     * @param $path array path catre models
     * @return array
     */
    public static function filter_models($path)
    {
        $rd = [];
        foreach ($path as $p) {
            if (stristr($p, '.php'))
                $rd[] = $p;
        }
        return $rd;
    }

    /**
     * Loads modes from libs/utils
     */
    public function load_utils()
    {
        $models = $this->filter_models(scandir('capi/libs/utils'));

        foreach ($models as $m) {
            require_once LIBS . 'utils/' . $m;
        }
    }

    /**
     * Fetches the $_data from 'request'
     */
    private function _getData()
    {

        if ($_GET['url'] !== 'index.php') {

            $data = explode('/', $_GET['url']);

            if (isset($data[0])) $this->_data[0] = $data[0];
            else exit(json_encode(['err' => 'no m']));
            if (isset($data[1])) $this->_data[1] = $data[1];
            else exit(json_encode(['err' => 'no w']));
//            if (isset($data[2])) $this->_data[2] = $data[2];
//            else exit(json_encode(['err' => 'no p']));

        } else {

            if (isset($_REQUEST['m'])) $this->_data[0] = $_REQUEST['m'];
            else exit(json_encode(['err' => 'no m']));
            if (isset($_REQUEST['w'])) $this->_data[1] = $_REQUEST['w'];
            else exit(json_encode(['err' => 'no w']));
            if (isset($_REQUEST['p'])) $this->_data[2] = $_REQUEST['p'];
            else exit(json_encode(['err' => 'no p']));
        }

        $this->_data[0] = htmlspecialchars(strip_tags($this->_data[0]));
        $this->_data[1] = htmlspecialchars(strip_tags($this->_data[1]));
//        $this->_data[2] = htmlspecialchars(strip_tags($this->_data[2]));
        $this->_data[2] = isset($_REQUEST['p']) ? htmlspecialchars(strip_tags($_REQUEST['p'])) : '';

        //nginx fix
        //$this->_url = array_splice($this->_url, 3);
    }

}
