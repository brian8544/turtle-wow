<?php

class images_model extends model
{

    public function get()
    {

        $section = $this->params->section;

        if ($section == 'preise')
        {
            $texts1 = $this->db->select("SELECT * FROM bekleidung_images");
            $texts2 = $this->db->select("SELECT * FROM heimtextilien_images");
            $texts3 = $this->db->select("SELECT * FROM waescherei_images");
            return [
                'images' => 'prices',
                'images1' => $texts1,
                'images2' => $texts2,
                'images3' => $texts3,
            ];
        }

        $texts = $this->db->select("SELECT * FROM " . $section . "_images");

        return [
            'images' => $texts
        ];

    }

}
