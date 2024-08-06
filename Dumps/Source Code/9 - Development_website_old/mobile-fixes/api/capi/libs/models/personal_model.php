<?php

class personal_model extends model
{

    public function get()
    {
        $data = $this->db->select("SELECT * FROM personal");

        foreach ($data as $key => $d) {
            $name = explode(" ", $d['name']);
            if (isset($name[1])) {
                $data[$key]['name1'] = $name[0];
                $name1 = explode($name[0], $d['name']);
                $data[$key]['name2'] = "";
                if (isset($name1[1]))
                    $data[$key]['name2'] = $name[1];
            } else {
                $data[$key]['name1'] = $d['name'];
                $data[$key]['name2'] = "";
            }
        }

        return $data;
    }


}
