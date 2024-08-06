<?php

class texts_model extends model
{

    public function get()
    {

        $section = $this->params->section;

        if ($section == 'preise')
        {
            $texts1 = $this->db->select("SELECT * FROM bekleidung_texts");
            $texts2 = $this->db->select("SELECT * FROM heimtextilien_texts");
            $texts3 = $this->db->select("SELECT * FROM waescherei_texts");
            return [
                'texts' => 'prices',
                'texts1' => $texts1,
                'texts2' => $texts2,
                'texts3' => $texts3,
            ];
        }

        if ($section == 'preise2')
            $section = 'heimtextilien';
        if ($section == 'preise3')
            $section = 'waescherei';

        $texts = $this->db->select("SELECT * FROM " . $section . "_texts");

        return [
            'texts' => $texts
        ];

    }

}
