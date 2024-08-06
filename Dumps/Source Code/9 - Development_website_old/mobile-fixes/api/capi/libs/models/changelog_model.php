<?php

class changelog_model extends model
{

    public function get()
    {

        $changelog = [];

        $changelog[] = [
            'date' => 'January 4 2022',
            'changes' => [
                [
                    'text' => 'Added missing Ancient Treasure in Uldaman.',
                    'bullets' => []
                ],
                [
                    'text' => 'Fixed flags for NPC Naxiar. Quest can be complete now.',
                    'bullets' => []
                ],
                [
                    'text' => 'Increased spell damage for Magister Salorn.',
                    'bullets' => []
                ],
                [
                    'text' => 'Quest The Bloodsail Compound III now can be completed.',
                    'bullets' => []
                ],
                [
                    'text' => 'Item Winterhoof Cleansing Totem is now available for all races.',
                    'bullets' => []
                ],
                [
                    'text' => 'Restored correct Life Tap coefficients.',
                    'bullets' => []
                ],
                [
                    'text' => 'Rare boss Tarangos is now immunte to stunning & slowing effects.',
                    'bullets' => []
                ],
                [
                    'text' => 'Item Hazzuri Primalist Defender now has correct sheath animation.',
                    'bullets' => []
                ],
                [
                    'text' => 'Quest The First Settlement grants reputation with the correct faction now.',
                    'bullets' => []
                ],
                [
                    'text' => 'Caverns of Time: misc. fixes for Bronze Disk situation.',
                    'bullets' => []
                ],
                [
                    'text' => 'Misc. grammar & minor fixes reported via bug tracker.',
                    'bullets' => []
                ],
//                2 => [
//                    'text' => 'Change With Bullets',
//                    'bullets' => [
//                        0 => 'Bullet1',
//                        1 => 'Bullet2',
//                        2 => 'Bullet3',
//                    ]
//                ],
            ]

        ];


        return $changelog;

    }

}
