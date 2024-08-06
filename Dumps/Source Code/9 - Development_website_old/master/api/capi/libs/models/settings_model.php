<?php

class settings_model extends model
{

    public function get()
    {
        return  $this->db->select("SELECT * FROM settings");
    }



}
