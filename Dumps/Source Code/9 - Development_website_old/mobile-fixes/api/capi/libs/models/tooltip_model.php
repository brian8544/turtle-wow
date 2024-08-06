<?php

class tooltip_model extends model
{

    public function get()
    {

        $data = file_get_contents("https://armory.turtle-wow.org/api/index.php?url=customitems/get/i/" . $this->params->a);

        $data = str_replace("<img src='https:\/\/forum.turtle-wow.org\/styles\/pbwow3\/theme\/images\/theme\/logo.png' style='width:45%;'>", "", $data);

        echo $data;

        die;
    }

}
