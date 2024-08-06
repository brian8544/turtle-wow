<?php

class rules_model extends model
{

    public function get()
    {

        $data['tab1'] = $this->siteDB->select("SELECT ord, title, description, tab
        FROM rules
        WHERE tab = 1
        ORDER BY ord");

        foreach ($data['tab1'] as $key => $r) {

            $data['tab1'][$key]['slug'] = misc_model::slugify($r['title']);
//            $data['tab1'][$key]['description'] = str_replace('--', '<br>', $r['description']);
        }

        $data['tab2'] = $this->siteDB->select("SELECT ord, title, description, tab
        FROM rules
        WHERE tab = 2
        ORDER BY ord");

        foreach ($data['tab2'] as $key => $r) {

            $data['tab2'][$key]['slug'] = misc_model::slugify($r['title']);
//            $data['tab2'][$key]['description'] = str_replace('--', '<br>', $r['description']);
        }

        return $data;

    }

}
