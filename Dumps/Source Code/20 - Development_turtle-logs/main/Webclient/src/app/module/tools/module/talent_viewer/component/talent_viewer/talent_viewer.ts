import {Component} from "@angular/core";
import {Localized} from "../../../../../../domain_value/localized";
import {HeroClass} from "../../../../../../domain_value/hero_class";
import {DataService} from "../../../../../../service/data";
import {SelectOption} from "../../../../../../template/input/select_input/domain_value/select_option";
import {Talent} from "../../module/talent_tab/value_object/talent";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: "TalentViewer",
    templateUrl: "./talent_viewer.html",
    styleUrls: ["./talent_viewer.scss"]
})
export class TalentViewerComponent {

    expansions: Array<SelectOption> = [];
    hero_classes: Array<SelectOption> = [];

    private static talent_specs: Map<number, Map<number, Map<number, [string, Array<Array<Talent>>]>>> = new Map([
        // Vanilla
        [1, new Map([
            // Warrior
            [1, new Map([
                [1, ["Arms", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [12282, 12663, 12664],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16462, 16463, 16464, 16465, 16466],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12286, 12658, 12659],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_gouge",
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [12285, 12697],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_charge"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [12295, 12676, 12677, 12678, 12679],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor",
                        },
                        {is_filler: true, row_index: 1, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [12287, 12665, 12666],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_thunderclap"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12290, 12963],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_sword_05"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12296],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [12834, 12849, 12867],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_backstab",
                            parent: {row_index: 0, column_index: 2},
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [12163, 12711, 12712, 12713, 12714],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_axe_09"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16493, 16494],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_searingarrow",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [12700, 12781, 12783, 12784, 12785],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_axe_06"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12292],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_slicedice",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [12284, 12701, 12702, 12703, 12704],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_mace_01"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [12281, 12812, 12813, 12814, 12815],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_27"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [12165, 12830, 12831, 12832, 12833],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_halbard_01"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [12289, 12668, 23695],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_shockwave"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [12294],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_savageblow",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Fury", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [12321, 12835, 12836, 12837, 12838],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_purge"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12320, 12852, 12853, 12855, 12856],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_eviscerate"
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [12324, 12876, 12877, 12878, 12879],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_warcry"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [12322, 12999, 13000, 13001, 13002],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_stoneclawtotem"
                        },
                        {is_filler: true, row_index: 1, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12329, 12950, 20496],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_cleave"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12323],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_deathscream"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16487, 16489, 16492],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonimp"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [12318, 12857, 12858, 12860, 12861],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_battleshout"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [23584, 23585, 23586, 23587, 23588],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_dualwield"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20502, 20503],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_sword_48"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [12317, 13045, 13046, 13047, 13048],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unholyfrenzy",
                        },
                        {is_filler: true, row_index: 3, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [12862, 12330, 20497, 20498, 20499],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_decisivestrike"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12328],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_deathpact",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [20504, 20505],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_sprint"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [20500, 20501],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_ancestralguardian"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [12319, 12971, 12972, 12973, 12974],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_ghoulfrenzy",
                            parent: {row_index: 3, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [23881],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_bloodlust",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Protection", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [12298, 12724, 12725, 12726, 12727],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_shield_06",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12297, 12750, 12751, 12752, 12753],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage"
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [12301, 12818],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage",
                        },
                        {is_filler: true, row_index: 1, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [12299, 12761, 12762, 12763, 12764],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [12300, 12959, 12960, 12961, 12962],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_magearmor"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12975],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_ashestoashes",
                            parent: {row_index: 1, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12945, 12307, 12944],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_defend",
                            parent: {row_index: 0, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [12797, 12799, 12800],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_revenge"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [12303, 12788, 12789, 12791, 12792],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_innerrage"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [12308, 12810, 12811],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_sunder"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [12313, 12804, 12807],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_disarm"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [12302, 12765],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [12312, 12803],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_shieldwall"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12809],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_thunderbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [12311, 12958],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_shieldbash"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16538, 16539, 16540, 16541, 16542],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_20"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [23922],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_shield_05",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
            ])],
            // Paladin
            [2, new Map([
                [1, ["Holy", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [20262, 20263, 20264, 20265, 20266],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_golemthunderclap"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20257, 20258, 20259, 20260, 20261],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_sleep"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20205, 20206, 20207, 20209, 20208],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_arcane_blink"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [20224, 20225, 20330, 20331, 20332],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_thunderbolt"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [20237, 20238, 20239],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_holybolt"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [26573],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_innerfire"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20234, 20235],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_layonhands"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [9453, 25836],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_unyieldingfaith"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20210, 20212, 20213, 20214, 20215],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_greaterheal",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [20244, 20245],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_sealofwisdom"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20216],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_heal",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [20359, 20360, 20361],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_healingaura"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [5923, 5924, 5925, 5926, 25829],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_power"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20473],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_searinglight",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Protection", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [20138, 20139, 20140, 20141, 20142],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotionaura"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20127, 20130, 20135, 20136, 20137],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_defend",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [20189, 20192, 20193],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20174, 20175],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_sealofprotection"
                        },
                        {is_filler: true, row_index: 1, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [20143, 20144, 20145, 20146, 20147],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [20217],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_magic_magearmor"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [20468, 20469, 20470],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_sealoffury"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20148, 20149, 20150],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_shield_06",
                            parent: {row_index: 0, column_index: 2}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [20096, 20097, 20098, 20099, 20100],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20487, 20488, 20489],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_sealofmight"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [20254, 20255, 20256],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_mindsooth"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20911],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_lightningshield",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [20177, 20179, 20181, 20180, 20182],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstrength"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [20196, 20197, 20198, 20199, 20200],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_20"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20925],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_blessingofprotection",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Retribution", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [20042, 20045, 20046, 20047, 20048],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_fistofjustice"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20101, 20102, 20103, 20104, 20105],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [25956, 25957],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_righteousfury"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20335, 20336, 20337],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_holysmite"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [20060, 20061, 20062, 20063, 20064],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [9452, 26016, 26021],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_vindication"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [20117, 20118, 20119, 20120, 20121],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_retributionaura",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20375],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_innerrage"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [26022, 26023],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_persuitofjustice"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [9799, 25988],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_eyeforaneye"
                        },
                        {is_filler: true, row_index: 3, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [20091, 20092],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_auraoflight"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [20111, 20112, 20113],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_hammer_04"
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [20218],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_mindvision"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [20049, 20056, 20057, 20058, 20059],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_racial_avatar",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 2},
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20066],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_prayerofhealing"
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]]
            ])],
            // Hunter
            [3, new Map([
                [1, ["Beast Mastery", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [19552, 19553, 19554, 19555, 19556],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_ravenform"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19583, 19584, 19585, 19586, 19587],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [19557, 19558],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_eyeoftheowl"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19549, 19550, 19551, 24386, 24387],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_aspectofthemonkey"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19609, 19610, 19612],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_pelt_bear_03"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [24443, 19575],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_beastsoothe"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [19559, 19560],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mount_jungletiger"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19596],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_dash"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [19616, 19617, 19618, 19619, 19620],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_bullrush"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [19572, 19573],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_mendpet"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [19598, 19599, 19600, 19601, 19602],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_04",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [19578, 20895],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_demoralizingroar"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [19577],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_devour",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [19590, 19592],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [19621, 19622, 19623, 19624, 19625],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_03",
                            parent: {row_index: 3, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19574],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_ferociousbite",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Marksmanship", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [19407, 19412, 19413, 19414, 19415],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_stun"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19416, 19417, 19418, 19419, 19420],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19421, 19422, 19423, 19424, 19425],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_snipershot"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19426, 19427, 19429, 19430, 19431],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_searingarrow",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [19434],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_spear_07"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19454, 19455, 19456, 19457, 19458],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_impalingbolt"
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [19498, 19499, 19500],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_townwatch"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [19464, 19465, 19466, 19467, 19468],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_quickshot"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [19485, 19487, 19488, 19489, 19490],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_piercedamage",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [19503],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_golemstormbolt"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [19461, 19462, 24691],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_upgrademoonglaive",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [19491, 19493, 19494],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_criticalshot"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [19507, 19508, 19509, 19510, 19511],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_rifle_06"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19506],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_trueshot",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Survival", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [24293, 24294, 24295],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_head_dragon_black"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [19151, 19152, 19153],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_prayerofhealing"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19295, 19297, 19298, 19301, 19300],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [19184, 19387, 19388, 19389, 19390],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_stranglevines"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19159, 19160],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19228, 19232, 19233, 19234, 19235],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_trip"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [19239, 19245],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_timestop"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19255, 19256, 19257, 19258, 19259],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_twilight"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [19263],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_whirlwind",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [19376, 19377],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_ensnare"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [19290, 19294, 24283],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_kick"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [19286, 19287],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_feigndeath"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [19370, 19371, 19373],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [19306],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_challange",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [19168, 19180, 19181, 24296, 24297],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_invisibilty"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19386],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_spear_02",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
            ])],
            // Rogue
            [4, new Map([
                [1, ["Assassination", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [14162, 14163, 14164],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_eviscerate"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14144, 14148],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_fiegndead"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14138, 14139, 14140, 14141, 14142],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [14156, 14160, 14161],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_disembowel"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [14158, 14159],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_deathscream"
                        },
                        {is_filler: true, row_index: 1, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [14165, 14166, 14167],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_slicedice"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [14179],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_decisivestrike"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14168, 14169],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_riposte"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14128, 14132, 14135, 14136, 14137],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_criticalstrike",
                            parent: {row_index: 0, column_index: 2}
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16513, 16514, 16515, 16719, 16720],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_feigndeath"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14113, 14114, 14115, 14116, 14117],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_poisons"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [14177],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_ice_lament",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14174, 14175, 14176],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_kidneyshot"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [14186, 14190, 14193, 14194, 14195],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_chilltouch",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 2},
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [14983],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_earthbindtotem"
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Combat", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [13741, 13793, 13792],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_gouge"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [13732, 13863],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_ritualofsacrifice"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [13712, 13788, 13789, 13790, 13791],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_invisibilty"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [13733, 13865, 13866],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_backstab"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [13713, 13853, 13854, 13855, 13856],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [13705, 13832, 13843, 13844, 13845],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_marksmanship",
                            points_to: {row_index: 4, column_index: 2}
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [13742, 13872],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowward"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14251],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_challange",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [13743, 13875],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_sprint"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [13754, 13867],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_kick"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [13706, 13804, 13805, 13806, 13807],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_shortblade_05"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [13715, 13848, 13849, 13851, 13852],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_dualwield",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [13709, 13800, 13801, 13802, 13803],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_mace_01"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [13877],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_punishingblow",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [13960, 13961, 13962, 13963, 13964],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_27"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [13707, 13966, 13967, 13868, 13869],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_gauntlets_04"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [30919, 30920],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstrength",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [18427, 18428, 18429],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_racial_avatar"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [13750],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowworddominate"
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Subtlety", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [13958, 13970, 13971, 13972, 13973],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_charm"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14057, 14072, 14073, 14074, 14075],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_warcry"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [30892, 30893],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_feint"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [13981, 14066],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [13975, 14062, 14063, 14064, 14065],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [13976, 13979, 13980],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_fumble"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14278],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_curse"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14079, 14080, 14081],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_ambush"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [13983, 14070, 14071],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [14076, 14094, 14095],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_sap"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14171, 14172, 14173],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_sword_17",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [30894, 30895],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [14185],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_antishadow",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14082, 14083],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_summonsuccubus"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [16511],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain",
                            parent: {row_index: 3, column_index: 2}
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [30902, 30903, 30904, 30905, 30906],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [14183],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_possession",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
            ])],
            // Priest
            [5, new Map([
                [1, ["Discipline", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14522, 14788, 14789, 14790, 14791],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_magearmor"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14524, 14525, 14526, 14527, 14528],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_wand_01"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [14523, 14784, 14785, 14786, 14787],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_manaregentotem"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [14749, 14767],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_wordfortitude"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [14748, 14768, 14769],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_powerwordshield"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [14531, 14774],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_tranquility"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 2, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14751],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14521, 14776, 14777],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_sleep",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [14747, 14770, 14771],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_innerfire"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [14520, 14780, 14781, 14782, 14783],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hibernation"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [14750, 14772],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [18551, 18552, 18553, 18554, 18555],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14752],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_divinespirit",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [18544, 18547, 18548, 18549, 18550],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_slowingtotem"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [10060],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_powerinfusion",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Holy", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [14913, 15012],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_healingfocus"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14908, 15020, 17191],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_renew"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14889, 15008, 15009, 15010, 15011],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_sealofsalvation"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [27900, 27901, 27902, 27903, 27904],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_spellwarding"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18530, 18531, 18533, 18534, 18535],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_sealofwrath",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [15237],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_holynova",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [27811, 27815, 27816],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessedrecovery",
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14892, 15362, 15363],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_layonhands",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [27789, 27790],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_purify",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [14912, 15013, 15014],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_heal02",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14909, 15017],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_searinglightpriest",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [14911, 15018],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_prayerofhealing02",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20711],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_enchant_essenceeternallarge",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14901, 15028, 15029, 15030, 15031],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_spiritualguidence",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [14898, 15349, 15354, 15355, 15356],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [724],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_summonlightwell",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Shadow", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [15270, 15335, 15336, 15337, 15338],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_requiem",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [15268, 15323, 15324, 15325, 15326],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_gathershadows",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [15318, 15272, 15320],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_shadowward",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [15275, 15317],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowwordpain",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [15260, 15327, 15328, 15329, 15330],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_burningspirit",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [15392, 15448],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_psychicscream",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [15273, 15312, 15313, 15314, 15316],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unholyfrenzy",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [15407],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_siphonmana",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [15274, 15311],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [17322, 17323, 17325],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_chilltouch",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [15257, 15331, 15332, 15333, 15334],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_blackplague",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [15487],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_impphaseshift",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [15286],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_unsummonbuilding",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [27839, 27840],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_improvedvampiricembrace",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [15259, 15307, 15308, 15309, 15310],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_twilight",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [15473],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowform",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
            ])],
            // Shaman
            [7, new Map([
                [1, ["Elemental", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16039, 16109, 16110, 16111, 16112],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16035, 16105, 16106, 16107, 16108],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_fireball"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16043, 16130],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stoneclawtotem"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [28996, 28997, 28998],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_spiritarmor"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16038, 16160, 16161],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_immolation"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16164],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16040, 16113, 16114, 16115, 16116],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostward"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16041, 16117, 16118, 16119, 16120],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_callstorm"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16086, 16544],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_sealoffire"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [29062, 29064, 29065],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_eyeofthestorm"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [30160, 29179, 29180],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_elementaldevastation"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [28999, 28900],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stormreach"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [16089],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_volcano"
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16578, 16579, 16580, 16581, 16582],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_lightning_lightningbolt01",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [16166],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_wispheal",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Enhancement", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17485, 17486, 17487, 17488, 17489],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16253, 16298, 16299, 16300, 16301],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_shield_06",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16258, 16293],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stoneskintotem",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16255, 16302, 16303, 16304, 16305],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_thunderbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16262, 16287],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_spiritwolf",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [16261, 16290, 16291],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_lightningshield",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16259, 16295],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_earthbindtotem",
                        },
                        {is_filler: true, row_index: 2, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16269],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_axe_10",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [16254, 16271, 16272, 16273, 16274],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16256, 16281, 16282, 16283, 16284],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_ghoulfrenzy",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16252, 16306, 16307, 16308, 16309],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [29192, 29193],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_enchantweapon",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [16266, 29079, 29080],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_flametounge",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16268],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_parry",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [29082, 29084, 29086, 29087, 29088],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_swiftstrike",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [17364],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_sealofmight",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Restoration", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16182, 16226, 16227, 16228, 16229],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_magicimmunity",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16179, 16214, 16215, 16216, 16217],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_manarecharge",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16184, 16209],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16176, 16235, 16240],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_undyingstrength",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16173, 16222, 16223, 16224, 16225],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16180, 16196, 16198],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_stun",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16181, 16230, 16232, 16233, 16234],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_healingwavelesser",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16189],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_nullward",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [29187, 29189, 29191],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_healingtouch",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16187, 16205, 16206, 16207, 16208],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_manaregentotem",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16194, 16218, 16219, 16220, 16221],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_tranquility",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [29206, 29205, 29202],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_healingway",
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16188],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_ravenform",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16178, 16210, 16211, 16212, 16213],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [16190],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_summonwaterelemental",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
            ])],
            // Mage
            [8, new Map([
                [1, ["Arcane", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [11210, 12592],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_dispelmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [11222, 12839, 12840, 12841, 12842],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [11237, 12463, 12464, 16769, 16770],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_starfall"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [6057, 6085],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_wand_01"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [29441, 29444, 29445, 29446, 29447],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_astralrecalgroup"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [11213, 12574, 12575, 12576, 12577],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [11247, 12606],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [11242, 12467, 12469],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [28574],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_arcane_arcaneresilience"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [11252, 12605],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_detectlesserinvisibility"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11255, 12598],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_iceshock"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [18462, 18463, 18464],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_siphonmana"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12043],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [11232, 12500, 12501, 12502, 12503],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_charm",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [15058, 15059, 15060],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_teleport",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 2},
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [12042],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_lightning",
                            parent: {row_index: 5, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Fire", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [11069, 12338, 12339, 12340, 12341],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_flamebolt",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [11103, 12357, 12358, 12359, 12360],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_meteorstorm",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [11119, 11120, 12846, 12847, 12848],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_incinerate",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [11100, 12353],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_flare",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [11078, 11080, 12342],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_fireball",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18459, 18460],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_flameshock",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [11108, 12349, 12350],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_selfdestruct",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [11366],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_fireball02",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [11083, 12351],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_fire",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [11095, 12872, 12873],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_soulburn",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11094, 13043],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_firearmor",
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [29074, 29075, 29076],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_masterofelements",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [11115, 11367, 11368],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispheal",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [11113],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_excorcism_02",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [11124, 12378, 12398, 12399, 12400],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [11129],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_sealoffire",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Frost", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [11189, 28332],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_frostward",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [11070, 12473, 16763, 16765, 16766],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt02",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [29438, 29439, 29440],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_ice_magicdamage",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [11207, 12672, 15047, 15052, 15053],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_iceshard",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [11071, 12496, 12497],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frostarmor",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [11165, 12475],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_freezingbreath",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [11175, 12569, 12571],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_wisp",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [11151, 12952, 12953],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12472],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark",
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [11185, 12487, 12488],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_icestorm",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16757, 16758],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_darkritual",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11160, 12518, 12519],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_stun",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [11170, 12982, 12983, 12984, 12985],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostshock",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [11958],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_frost",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [11190, 12489, 12490],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_glacier",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [11180, 28592, 28593, 28594, 28595],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_chillingblast",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [11426],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_ice_lament",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
            ])],
            // Warlock
            [9, new Map([
                [1, ["Afflication", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [18174, 18175, 18176, 18177, 18178],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unsummonbuilding"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17810, 17811, 17812, 17813, 17814],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_abominationexplosion"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [18179, 18180, 18181],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_curseofmannoroth"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [18213, 18372],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_haunting"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18182, 18183],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_burningspirit"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [17804, 17805, 17806, 17807, 17808],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain02"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18827, 18829, 18830],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_curseofsargeras"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [17783, 17784, 17785, 17786, 17787],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_fingerofdeath"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [18288],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_contagion"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [18218, 18219],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_callofbone"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [18094, 18095],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_twilight"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [17864, 18393],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_siphonmana"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [18265],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_requiem"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [18223],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [18310, 18311, 18312, 18313],
                            max_points: 4,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                            parent: {row_index: 4, column_index: 2}
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [18271, 18272, 18273, 18274, 18275],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadetruesight",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 2},
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [18220],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_darkritual",
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Demonology", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [18692, 18693],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_stone_04",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [18694, 18695, 18696],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonimp",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [18697, 18698, 18699, 18700, 18701],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_metamorphosis",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [18703, 18704],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [18705, 18706, 18707],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonvoidwalker",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18731, 18743, 18744, 18745, 18746],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_magicalsentry",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18754, 18755, 18756],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonsuccubus",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [18708],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_removecurse",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [18748, 18749, 18750, 18751, 18752],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_antishadow",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [18709, 18710],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_impphaseshift",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [18769, 18770, 18771, 18772, 18773],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowworddominate",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [18821, 18822, 18823, 18824, 18825],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_enslavedemon",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [18788],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_psychicscream",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [18767, 18768],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_ammo_firetar",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [23785, 23822, 23823, 23824, 23825],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowpact",
                            parent: {row_index: 3, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19028],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_gathershadows",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [18774, 18775],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_misc_gem_sapphire_01",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Destruction", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17793, 17796, 17801, 17802, 17803],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17778, 17779, 17780, 17781, 17782],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_windsofwoe",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [17788, 17789, 17790, 17791, 17792],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_deathpact",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18119, 18120, 18121, 18122, 18123],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_fire",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18126, 18127],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_firebolt",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [18128, 18129],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_curse",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [18130, 18131, 18132, 18133, 18134],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_flameshock",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [17877],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_scourgebuild",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [18135, 18136],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_lavaspawn",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [17917, 17918],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_corpseexplode",
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [17927, 17929, 17930, 17931, 17932],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_soulburn",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [18096, 18073],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_volcano",
                            parent: {row_index: 3, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [17815, 17833, 17834, 17835, 17836],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [17959],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowwordpain",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [17954, 17955, 17956, 17957, 17958],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [17962],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_fireball",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
            ])],
            // Druid
            [11, new Map([
                [1, ["Balance", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [16814, 16815, 16816, 16817, 16818],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16689],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_natureswrath"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17245, 17247, 17248, 17249],
                            max_points: 4,
                            points_spend: 0,
                            icon: "spell_nature_natureswrath",
                            parent: {row_index: 0, column_index: 1}
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16918, 16919, 16920],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_stranglevines"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16821, 16822, 16823, 16824, 16825],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_starfall"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16902, 16903, 16904, 16905, 16906],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_staff_01"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [16833, 16834, 16835],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16836, 16839, 16840],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_thorns"
                        },
                        {is_filler: true, row_index: 2, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16864],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_crystalball"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [16819, 16820],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_naturetouchgrow"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16909, 16910, 16911, 16912, 16913],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_purge",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16850, 16923, 16924, 16925, 16926],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_arcane_starfire"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [16880],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_naturesblessing"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16845, 16846, 16847],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_sentinal"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [16896, 16897, 16899, 16900, 16901],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 2},
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [24858],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_forceofnature"
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [2, ["Feral Combat", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16934, 16935, 16936, 16937, 16938],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_pet_hyena"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16858, 16859, 16860, 16861, 16862],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_demoralizingroar"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16947, 16948, 16949, 16950, 16951],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16940, 16941],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_bash"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16929, 16930, 16931, 16932, 16933],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_misc_pelt_bear_03"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [17002, 24866],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_spiritwolf"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16979],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_pet_bear"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16942, 16943, 16944],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_04"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16966, 16968],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_vampiricaura"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16972, 16974, 16975],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_pet_cat"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16952, 16954],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_ghoulfrenzy",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [16958, 16961],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_cannibalize",
                            parent: {row_index: 2, column_index: 2}
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [16998, 16999],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_ravage"
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16857],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_faeriefire"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [17003, 17004, 17005, 17006, 24894],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofagility",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 2},
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [17007],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_unyeildingstamina"
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
                [3, ["Restoration", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17050, 17051, 17053, 17054, 17055],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_regeneration"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17056, 17058, 17059, 17060, 17061],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [17069, 17070, 17071, 17072, 17073],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_healingtouch"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [17063, 17065, 17066, 17067, 17068],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_healingwavegreater"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [17079, 17082],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_enrage"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 2, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [17106, 17107, 17108],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [5570],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_insectswarm"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [17118, 17119, 17120, 17121, 17122],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_eyeoftheowl"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [24968, 24969, 24970, 24971, 24972],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_elunesgrace"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [17111, 17112, 17113],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_rejuvenation"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [17116],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_ravenform",
                            parent: {row_index: 1, column_index: 0}
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [17104, 24943, 24944, 24945, 24946],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_protectionformnature",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [17123, 17124],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_tranquility"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [17074, 17075, 17076, 17077, 17078],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_resistnature"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [18562],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_relics_idolofrejuvenation",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ]
                ]]],
            ])]
        ])],
        // TBC
        [2, new Map([
            // Warrior
            [1, new Map([
                [1, ["Arms", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [12282, 12663, 12664],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16462, 16463, 16464, 16465, 16466],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12286, 12658, 12659],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_gouge",
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [12285, 12697],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_charge"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [12300, 12959, 12960, 12961, 12962],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_magearmor",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [12287, 12665, 12666],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_thunderclap"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12290, 12963],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_sword_05"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12296],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [12834, 12849, 12867],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_backstab"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [12163, 12711, 12712, 12713, 12714],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_axe_09"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16493, 16494],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_searingarrow",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [12700, 12781, 12783, 12784, 12785],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_axe_06"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12292],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_deathpact",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [12284, 12701, 12702, 12703, 12704],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_mace_01"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [12281, 12812, 12813, 12814, 12815],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_27"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [29888, 29889],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_sprint"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [12289, 12668, 23695],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_shockwave"
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 3,
                            spell_id: [29723, 29724, 29725],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_improveddisciplines"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [29836, 29859],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_bloodfrenzy"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [12294],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_savageblow",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [29834, 29838],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_harass",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [35446, 35448, 35449, 35450, 35451],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_savageblow",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [29623],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_endlessrage",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Fury", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [12321, 12835, 12836, 12837, 12838],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_purge"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12320, 12852, 12853, 12855, 12856],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_eviscerate"
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [12324, 12876, 12877, 12878, 12879],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_warcry"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [12322, 12999, 13000, 13001, 13002],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_stoneclawtotem"
                        },
                        {is_filler: true, row_index: 1, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12329, 12950, 20496],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_cleave"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12323],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_deathscream"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16487, 16489, 16492],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonimp"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [12318, 12857, 12858, 12860, 12861],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_focusedmind"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [23584, 23585, 23586, 23587, 23588],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_dualwield"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20502, 20503],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_sword_48"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [12317, 13045, 13046, 13047, 13048],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unholyfrenzy",
                        },
                        {is_filler: true, row_index: 3, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [12862, 12330],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_decisivestrike"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12328],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_slicedice",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [20504, 20505],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_weaponmastery"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [20500, 20501],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_ancestralguardian"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [12319, 12971, 12972, 12973, 12974],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_ghoulfrenzy",
                            parent: {row_index: 3, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [29590, 29591, 29592],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_marksmanship",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [23881],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_bloodlust",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [29721, 29776],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_whirlwind",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [29759, 29760, 29761, 29762, 29763],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_racial_avatar",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [29801],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_rampage",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Protection", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [12301, 12818],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [12295, 12676, 12677],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12297, 12750, 12751, 12752, 12753],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage"
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [12298, 12724, 12725, 12726, 12727],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_shield_06",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [12299, 12761, 12762, 12763, 12764],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12975],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_ashestoashes"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12945],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_defend",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [12797, 12799, 12800],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_revenge"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [12303, 12788, 12789],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_innerrage"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [12308, 12810, 12811],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_sunder"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [12313, 12804, 12807],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_disarm"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [12302, 12765],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [12312, 12803],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_shieldwall"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12809],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_thunderbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [12311, 12958],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_shieldbash"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [29598, 29599, 29600],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_shieldmastery"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16538, 16539, 16540, 16541, 16542],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_20"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [29593, 29594, 29595],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_defensivestance",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [23922],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_shield_05",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [29787, 29790, 29792],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_focusedrage",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [29140, 29143, 29144, 29145, 29146],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_helmet_21",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [20243],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_sword_11"
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
            ])],
            // Paladin
            [2, new Map([
                [1, ["Holy", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [20262, 20263, 20264, 20265, 20266],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_golemthunderclap"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20257, 20258, 20259, 20260, 20261],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_sleep"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20205, 20206, 20207, 20209, 20208],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_arcane_blink"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [20224, 20225, 20330, 20331, 20332],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_thunderbolt"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [20237, 20238, 20239],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_holybolt"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [31821],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_auramastery"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20234, 20235],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_layonhands"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [9453, 25836],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_unyieldingfaith"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20210, 20212, 20213, 20214, 20215],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_greaterheal",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [20244, 20245],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_sealofwisdom"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31822, 31823, 31824],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_pureofheart",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20216],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_heal",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [20359, 20360, 20361],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_healingaura"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31825, 31826],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_purifyingpower"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [5923, 5924, 5925, 5926, 25829],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_power"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31833, 31835, 31836],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_lightsgrace",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20473],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_searinglight",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31828, 31829, 31830],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessedlife",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [31837, 31838, 31839, 31840, 31841],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_holyguidance",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31842],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_divineillumination",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Protection", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [20138, 20139, 20140, 20141, 20142],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotionaura"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20127, 20130, 20135, 20136, 20137],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_defend",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [20189, 20192, 20193],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20174, 20175],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_sealofprotection"
                        },
                        {is_filler: true, row_index: 1, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [20143, 20144, 20145, 20146, 20147],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [20217],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_magic_magearmor"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [20468, 20469, 20470],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_sealoffury"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20148, 20149, 20150],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_shield_06",
                            parent: {row_index: 0, column_index: 2}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [20096, 20097, 20098, 20099, 20100],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [31844, 31845],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_stoicism"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20487, 20488, 20489],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_sealofmight"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [20254, 20255, 20256],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_mindsooth"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31846, 31847],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_improvedresistanceauras",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20911],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_lightningshield",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [20177, 20179, 20181, 20180, 20182],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstrength"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31848, 31849],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_divineintervention"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [20196, 20197, 20198, 20199, 20200],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_20"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31850, 31851, 31852, 31853, 31854],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_ardentdefender",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20925],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_blessingofprotection",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [41021, 41026],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_blessingofprotection",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [31858, 31859, 31860, 31861, 31862],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_weaponmastery",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31935],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_avengersshield",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Retribution", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [20042, 20045, 20046, 20047, 20048],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_fistofjustice"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20101, 20102, 20103, 20104, 20105],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [25956, 25957],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_righteousfury"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20335, 20336, 20337],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_holysmite"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [20060, 20061, 20062, 20063, 20064],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [9452, 26016, 26021],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_vindication"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [20117, 20118, 20119, 20120, 20121],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_retributionaura",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20375],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_innerrage"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [26022, 26023, 44414],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_persuitofjustice"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [9799, 25988],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_eyeforaneye"
                        },
                        {is_filler: true, row_index: 3, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [20091, 20092],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_auraoflight"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [31866, 31867, 31868],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_crusade"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [20111, 20112, 20113],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_hammer_04"
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [20218],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_mindvision"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [31869, 31870],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_mindvision",
                            parent: {row_index: 4, column_index: 2}
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [20049, 20056, 20057, 20058, 20059],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_racial_avatar",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [31876, 31877, 31878],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_righteousfury",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [32043, 35396, 35397],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_holysmite"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20066],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_prayerofhealing"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31871, 31872, 31873],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_divinepurpose"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [31879, 31880, 31881, 31882, 31883],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_fanaticism",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [35395],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_crusaderstrike"
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]]
            ])],
            // Hunter
            [3, new Map([
                [1, ["Beast Mastery", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [19552, 19553, 19554, 19555, 19556],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_ravenform"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19583, 19584, 19585, 19586, 19587],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [35029, 35030],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_silenthunter"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19549, 19550, 19551],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_aspectofthemonkey"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19609, 19610, 19612],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_pelt_bear_03"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [24443, 19575],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_beastsoothe"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [19559, 19560],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mount_jungletiger"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19596],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_dash"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [19616, 19617, 19618, 19619, 19620],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_bullrush"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [19572, 19573],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_mendpet"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [19598, 19599, 19600, 19601, 19602],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_04",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [19578, 20895],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_demoralizingroar"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [19577],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_devour",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [19590, 19592],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [34453, 34454],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_animalhandler",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [19621, 19622, 19623, 19624, 19625],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_03",
                            parent: {row_index: 3, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34455, 34459, 34460],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_ferociousinspiration",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19574],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_ferociousbite",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [34462, 34464, 34465],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_catlikereflexes",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [34466, 34467, 34468, 34469, 34470],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_serpentswiftness",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [34692],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_beastwithin",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Marksmanship", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [19407, 19412, 19413, 19414, 19415],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_stun"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19426, 19427, 19429, 19430, 19431],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_searingarrow",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19421, 19422, 19423, 19424, 19425],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_snipershot"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19416, 19417, 19418, 19419, 19420],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [34950, 34954],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_goforthethroat"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19454, 19455, 19456, 19457, 19458],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_impalingbolt"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [19434],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_spear_07"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [34948, 34949],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_rapidkilling"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [19464, 19465, 19466, 19467, 19468],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_quickshot"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [19485, 19487, 19488, 19489, 19490],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_piercedamage",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [35100, 35102, 35103],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_starfire"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [19503],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_golemstormbolt"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [19461, 19462, 24691],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_upgrademoonglaive",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [34475, 34476],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_combatexperience"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {is_filler: true, row_index: 5, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 3,
                            spell_id: [19507, 19508, 19509, 19510, 19511],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_rifle_06"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34482, 34483, 34484],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_zenarchery",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19506],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_trueshot",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [35104, 35110, 35111],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_upgrademoonglaive",
                            parent: {row_index: 4, column_index: 2}
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [34485, 34486, 34487, 34488, 34489],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_mastermarksman",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [34490],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_theblackarrow",
                            parent: {row_index: 7, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Survival", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [24293, 24294, 24295],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_head_dragon_black"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [19151, 19152, 19153],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_prayerofhealing"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19498, 19499, 19500],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_townwatch"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 3,
                            spell_id: [19159, 19160],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [19184, 19387, 19388],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_stranglevines"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19295, 19297, 19298, 19301, 19300],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19228, 19232, 19233],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_trip"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [19239, 19245],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_timestop"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19255, 19256, 19257, 19258, 19259],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_twilight"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [19263],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_whirlwind",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [19376, 19377],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_ensnare"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [19290, 19294, 24283],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_kick"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [19286, 19287],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_feigndeath"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [34494, 34496],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_survivalinstincts",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [19370, 19371, 19373],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [19306],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_challange",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [34491, 34492, 34493],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_resourcefulness"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [19168, 19180, 19181, 24296, 24297],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_invisibilty"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34497, 34498, 34499],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_thrillofthehunt",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19386],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_spear_02",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [34500, 34502, 34503],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_findweakness",
                            parent: {row_index: 5, column_index: 2}
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [34506, 34507, 34508, 34838, 34839],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_mastertactitian",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [23989],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_readiness",
                            parent: {row_index: 7, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
            ])],
            // Rogue
            [4, new Map([
                [1, ["Assassination", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [14162, 14163, 14164],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_eviscerate"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14144, 14148],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_fiegndead"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14138, 14139, 14140, 14141, 14142],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [14156, 14160, 14161],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_disembowel"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [14158, 14159],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_deathscream"
                        },
                        {is_filler: true, row_index: 1, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [13733, 13865, 13866],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_backstab"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [14179],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_decisivestrike"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14168, 14169],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_riposte"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14128, 14132, 14135, 14136, 14137],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_criticalstrike",
                            parent: {row_index: 0, column_index: 2}
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16513, 16514, 16515, 16719, 16720],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_feigndeath"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14113, 14114, 14115, 14116, 14117],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_poisons"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31208, 31209],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_fleetfooted",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [14177],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_ice_lament",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14174, 14175, 14176],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_kidneyshot"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [31244, 31245],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_quickrecovery"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [14186, 14190, 14193, 14194, 14195],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_chilltouch",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [31226, 31227],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_creature_poison_06",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [14983],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_earthbindtotem"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31380, 31382, 31383, 31384, 31385],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_deadenednerves"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [31233, 31239, 31240, 31241, 31242],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_findweakness"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [1329],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_shadowstrikes",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Combat", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [13741, 13793, 13792],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_gouge"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [13732, 13863],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_ritualofsacrifice"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [13712, 13788, 13789, 13790, 13791],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_invisibilty"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [14165, 14166, 14167],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_slicedice"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [13713, 13853, 13854, 13855, 13856],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [13705, 13832, 13843, 13844, 13845],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_marksmanship",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [13742, 13872],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowward"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14251],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_challange",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [13743, 13875],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_sprint"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [13754, 13867],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_kick"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [13706, 13804, 13805, 13806, 13807],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_shortblade_05"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [13715, 13848, 13849, 13851, 13852],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_dualwield",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [13709, 13800, 13801, 13802, 13803],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_mace_01"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [13877],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_punishingblow",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [13960, 13961, 13962, 13963, 13964],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_27"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [13707, 13966, 13967, 13868, 13869],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_gauntlets_04"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31124, 31126],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_bladetwisting"
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [30919, 30920],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstrength",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [18427, 18428, 18429],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_racial_avatar"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31122, 31123],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_revenge"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [13750],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowworddominate"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31130, 31131],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_nervesofsteel"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [35541, 35550, 35551, 35552, 35553],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_shortblade_38"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [32601],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_surpriseattack",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Subtlety", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [13958, 13970, 13971, 13972, 13973],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_charm"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14057, 14072, 14073, 14074, 14075],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_warcry"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [30892, 30893],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_feint"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [14076, 14094],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_sap"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [13975, 14062, 14063, 14064, 14065],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [13976, 13979, 13980],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_fumble"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14278],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_curse"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14079, 14080, 14081],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_ambush"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [13983, 14070, 14071],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [13981, 14066],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14171, 14172, 14173],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_sword_17",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [30894, 30895],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [14185],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_antishadow",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14082, 14083],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_summonsuccubus"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [16511],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain",
                            parent: {row_index: 3, column_index: 2}
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31221, 31222, 31223],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_masterofsubtlety"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [30902, 30903, 30904, 30905, 30906],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31211, 31212, 31213],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_envelopingshadows",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [14183],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_possession",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31228, 31229, 31230],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_cheatdeath",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [31216, 31217, 31218, 31219, 31220],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_sinistercalling",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [36554],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_shadowstep",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
            ])],
            // Priest
            [5, new Map([
                [1, ["Discipline", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14522, 14788, 14789, 14790, 14791],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_magearmor"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14524, 14525, 14526, 14527, 14528],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_wand_01"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [14523, 14784, 14785, 14786, 14787],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_manaregentotem"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [14749, 14767],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_wordfortitude"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [14748, 14768, 14769],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_powerwordshield"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [14531, 14774],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_tranquility"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [33167, 33171, 33172],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_absolution"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14751],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14521, 14776, 14777],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_sleep",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [14747, 14770, 14771],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_innerfire"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [14520, 14780, 14781, 14782, 14783],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hibernation"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [14750, 14772],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [18551, 18552, 18553, 18554, 18555],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14752],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_divinespirit",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [33174, 33182],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_divinespirit",
                            parent: {row_index: 4, column_index: 2}
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [33186, 33190],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_focusedpower"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [18544, 18547, 18548, 18549, 18550],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_slowingtotem"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [45234, 45243, 45244],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_focusedpower",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [10060],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_powerinfusion",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [33201, 33202, 33203, 33204, 33205],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_powerwordshield",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [34908, 34909, 34910, 34911, 34912],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_arcane_mindmastery",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [33206],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_painsupression",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Holy", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [14913, 15012],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_healingfocus"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14908, 15020, 17191],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_renew"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14889, 15008, 15009, 15010, 15011],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_sealofsalvation"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [27900, 27901, 27902, 27903, 27904],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_spellwarding"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18530, 18531, 18533, 18534, 18535],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_sealofwrath",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [15237],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_holynova",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [27811, 27815, 27816],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessedrecovery",
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14892, 15362, 15363],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_layonhands",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [27789, 27790],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_purify",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [14912, 15013, 15014],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_heal02",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14909, 15017],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_searinglightpriest",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [14911, 15018],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_prayerofhealing02",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20711],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_enchant_essenceeternallarge",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14901, 15028, 15029, 15030, 15031],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_spiritualguidence",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [33150, 33154],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_surgeoflight",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [14898, 15349, 15354, 15355, 15356],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34753, 34859, 34860],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_fanaticism",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [724],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_summonlightwell",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [33142, 33145, 33146],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessedresillience",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [33158, 33159, 33160, 33161, 33162],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_greaterheal",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [34861],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_circleofrenewal",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Shadow", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [15270, 15335, 15336, 15337, 15338],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_requiem",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [15268, 15323, 15324, 15325, 15326],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_gathershadows",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [15318, 15272, 15320],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_shadowward",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [15275, 15317],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowwordpain",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [15260, 15327, 15328, 15329, 15330],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_burningspirit",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [15392, 15448],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_psychicscream",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [15273, 15312, 15313, 15314, 15316],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unholyfrenzy",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [15407],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_siphonmana",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [15274, 15311],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [17322, 17323],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_chilltouch",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [15257, 15331, 15332, 15333, 15334],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_blackplague",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [15487],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_impphaseshift",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [15286],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_unsummonbuilding",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [27839, 27840],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_improvedvampiricembrace",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [33213, 33214, 33215],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_focusedmind",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [14910, 33371],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [15259, 15307, 15308, 15309, 15310],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_twilight",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [15473],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowform",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [33221, 33222, 33223, 33224, 33225],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowpower",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [33191, 33192, 33193, 33194, 33195],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_misery",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [34914],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_stoicism",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
            ])],
            // Shaman
            [7, new Map([
                [1, ["Elemental", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16039, 16109, 16110, 16111, 16112],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16035, 16105, 16106, 16107, 16108],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_fireball"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16043, 16130],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stoneclawtotem"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [28996, 28997, 28998],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_spiritarmor"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16038, 16160, 16161],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_immolation"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16164],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16040, 16113, 16114, 16115, 16116],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostward"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16041, 16117, 16118, 16119, 16120],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_callstorm"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16086, 16544],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_sealoffire"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [29062, 29064, 29065],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_eyeofthestorm"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [30160, 29179, 29180],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_elementaldevastation"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [28999, 28900],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stormreach"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [16089],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_volcano"
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [30664, 30665, 30666, 30667, 30668],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_unrelentingstorm"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [30672, 30673, 30674],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_elementalprecision_1",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16578, 16579, 16580, 16581, 16582],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_lightning_lightningbolt01",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [16166],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_wispheal",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [30669, 30670, 30671],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_elementalshields",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [30675, 30678, 30679, 30680, 30681],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_lightningoverload",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30706],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_totemofwrath",
                            parent: {row_index: 7, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Enhancement", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17485, 17486, 17487, 17488, 17489],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16253, 16298, 16299, 16300, 16301],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_shield_06",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16258, 16293],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stoneskintotem",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16255, 16302, 16303, 16304, 16305],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_thunderbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16262, 16287],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_spiritwolf",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [16261, 16290, 16291],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_lightningshield",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16259, 16295],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_earthbindtotem",
                        },
                        {is_filler: true, row_index: 2, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16269],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_axe_10",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [16254, 16271, 16272, 16273, 16274],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16256, 16281, 16282, 16283, 16284],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_ghoulfrenzy",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16252, 16306, 16307, 16308, 16309],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [29192, 29193],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_enchantweapon",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [16268],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_parry",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [16266, 29079, 29080],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_flametounge",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [30812, 30813, 30814],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_mentalquickness",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [29082, 29084, 29086, 29087, 29088],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_swiftstrike",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [30798],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_dualwield",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [30816, 30818, 30819],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_dualwieldspecialization",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 3,
                            spell_id: [17364],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_shaman_stormstrike",
                            parent: {row_index: 4, column_index: 3}
                        },
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [30802, 30808, 30809, 30810, 30811],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_unleashedrage",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30823],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_shamanrage",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Restoration", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16182, 16226, 16227, 16228, 16229],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_magicimmunity",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16179, 16214, 16215, 16216, 16217],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_manarecharge",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16184, 16209],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16176, 16235, 16240],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_undyingstrength",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16173, 16222, 16223, 16224, 16225],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16180, 16196, 16198],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_stun",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16181, 16230, 16232, 16233, 16234],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_healingwavelesser",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16189],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_nullward",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [29187, 29189, 29191],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_healingtouch",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16187, 16205, 16206, 16207, 16208],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_manaregentotem",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16194, 16218, 16219, 16220, 16221],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_tranquility",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [29206, 29205, 29202],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_healingway",
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16188],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_ravenform",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [30864, 30865, 30866],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_focusedmind",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16178, 16210, 16211, 16212, 16213],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [16190],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_summonwaterelemental",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [30881, 30883, 30884, 30885, 30886],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_natureguardian",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [30867, 30868, 30869],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_natureblessing",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [30872, 30873],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_healingwavegreater",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [974],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_skinofearth",
                            parent: {row_index: 7, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
            ])],
            // Mage
            [8, new Map([
                [1, ["Arcane", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [11210, 12592],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_dispelmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [11222, 12839, 12840, 12841, 12842],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [11237, 12463, 12464, 16769, 16770],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_starfall"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [6057, 6085],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_wand_01"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [29441, 29444, 29445, 29446, 29447],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_astralrecalgroup"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [11213, 12574, 12575, 12576, 12577],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [11247, 12606],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [11242, 12467, 12469],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [28574],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_arcane_arcaneresilience"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [11252, 12605],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_detectlesserinvisibility"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11255, 12598],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_iceshock"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [18462, 18463, 18464],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_siphonmana"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31569, 31570],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_arcane_blink"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12043],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor"
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [11232, 12500, 12501, 12502, 12503],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_charm",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31574, 31575],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_arcane_prismaticcloak",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [15058, 15059, 15060],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_teleport",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [31571, 31572, 31573],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_arcanepotency",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31579, 31582, 31583],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_starfall",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [12042],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_lightning",
                            parent: {row_index: 5, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [35578, 35581],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_arcane_arcanetorrent",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [31584, 31585, 31586, 31587, 31588],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_arcane_mindmastery",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31589],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_slow",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Fire", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [11069, 12338, 12339, 12340, 12341],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_flamebolt",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [11103, 12357, 12358, 12359, 12360],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_meteorstorm",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [11119, 11120, 12846, 12847, 12848],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_incinerate",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [11100, 12353],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_flare",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [11078, 11080, 12342],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_fireball",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18459, 18460],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_flameshock",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [11108, 12349, 12350],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_selfdestruct",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [11366],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_fireball02",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [11083, 12351],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_fire",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [11095, 12872, 12873],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_soulburn",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11094, 13043],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_firearmor",
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [29074, 29075, 29076],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_masterofelements",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31638, 31639, 31640],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_playingwithfire",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [11115, 11367, 11368],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispheal",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [11113],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_excorcism_02",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31641, 31642],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_burningspeed",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [11124, 12378, 12398, 12399, 12400],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34293, 34295, 34296],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_burnout",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [11129],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_sealoffire",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31679, 31680],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_moltenblood",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [31656, 31657, 31658, 31659, 31660],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_flamebolt",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31661],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_misc_head_dragon_01",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Frost", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [11189, 28332],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_frostward",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [11070, 12473, 16763, 16765, 16766],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt02",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [29438, 29439, 29440],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_ice_magicdamage",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [11207, 12672, 15047, 15052, 15053],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_iceshard",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [11071, 12496, 12497],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frostarmor",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [11165, 12475],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_freezingbreath",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [11175, 12569, 12571],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_wisp",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [11151, 12952, 12953],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12472],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark",
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [11185, 12487, 12488],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_icestorm",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16757, 16758],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_darkritual",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11160, 12518, 12519],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_stun",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [11170, 12982, 12983, 12984, 12985],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostshock",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31667, 31668, 31669],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frozencore",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [11958],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [11190, 12489, 12490],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_glacier",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31670, 31672],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_icefloes",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [11180, 28592, 28593, 28594, 28595],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_chillingblast",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [11426],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_ice_lament",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31674, 31675, 31676, 31677, 31678],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_arcticwinds",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [31682, 31683, 31684, 31685, 31686],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt02",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31687],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_summonwaterelemental_2",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
            ])],
            // Warlock
            [9, new Map([
                [1, ["Afflication", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [18174, 18175, 18176, 18177, 18178],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unsummonbuilding"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17810, 17811, 17812, 17813, 17814],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_abominationexplosion"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [18179, 18180],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_curseofmannoroth"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [18213, 18372],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_haunting"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18182, 18183],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_burningspirit"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [17804, 17805],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain02"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18827, 18829],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_curseofsargeras"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [17783, 17784, 17785, 17786, 17787],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_fingerofdeath"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [18288],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_contagion"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [18218, 18219],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_callofbone"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [18094, 18095],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_twilight"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [32381, 32382, 32383],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_abominationexplosion"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [32385, 32387, 32392, 32393, 32394],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowembrace"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [18265],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_requiem"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [18223],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [18271, 18272, 18273, 18274, 18275],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadetruesight",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 2},
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [30060, 30061, 30062, 30063, 30064],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_painfulafflictions",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [18220],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_darkritual",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [30054, 30057],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_deathscream",
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [32477, 32483, 32484],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_curseofachimonde",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30108],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_unstableaffliction_3",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Demonology", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [18692, 18693],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_stone_04",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [18694, 18695, 18696],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonimp",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [18697, 18698, 18699, 18700, 18701],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_metamorphosis",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [18703, 18704],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [18705, 18706, 18707],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonvoidwalker",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18731, 18743, 18744],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_magicalsentry",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18754, 18755, 18756],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonsuccubus",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [18708],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_removecurse",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [18748, 18749, 18750],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_antishadow",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [30143, 30144, 30145],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_ragingscream",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [18709, 18710],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_impphaseshift",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [18769, 18770, 18771, 18772, 18773],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowworddominate",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [18821, 18822],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_enslavedemon",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [18788],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_psychicscream",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [18767, 18768],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_ammo_firetar",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [30326, 30327, 30328],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_manafeed",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [23785, 23822, 23823, 23824, 23825],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowpact",
                            parent: {row_index: 3, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [30319, 30320, 30321],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_demonicfortitude",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19028],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_gathershadows",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [35691, 35692, 35693],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_improvedvampiricembrace",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [30242, 30245, 30246, 30247, 30248],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_demonictactics",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30146],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_summonfelguard",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Destruction", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17793, 17796, 17801, 17802, 17803],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17778, 17779, 17780, 17781, 17782],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_windsofwoe",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [17788, 17789, 17790, 17791, 17792],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_deathpact",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18119, 18120, 18121, 18122, 18123],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_fire",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18126, 18127],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_firebolt",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [18128, 18129],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_curse",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [18130, 18131, 18132, 18133, 18134],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_flameshock",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [17877],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_scourgebuild",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [18135, 18136],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_lavaspawn",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [17917, 17918],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_corpseexplode",
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [17927, 17929, 17930],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_soulburn",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [18096, 18073],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_volcano",
                            parent: {row_index: 3, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [17815, 17833, 17834, 17835, 17836],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [17959],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowwordpain",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [30299, 30301, 30302],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_netherprotection",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [17954, 17955, 17956, 17957, 17958],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34935, 34938, 34939],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_playingwithfire",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [17962],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_fireball",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [30293, 30295, 30296],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_soulleech_3",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [30288, 30289, 30290, 30291, 30292],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowandflame",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30283],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowfury",
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
            ])],
            // Druid
            [11, new Map([
                [1, ["Balance", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [16814, 16815, 16816, 16817, 16818],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16689],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_natureswrath"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17245, 17247, 17248, 17249],
                            max_points: 4,
                            points_spend: 0,
                            icon: "spell_nature_natureswrath",
                            parent: {row_index: 0, column_index: 1}
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16918, 16919, 16920],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_stranglevines"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16902, 16903],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_staff_01"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16821, 16822],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_starfall"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16836, 16839, 16840],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_thorns"
                        },
                        {is_filler: true, row_index: 2, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [5570],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_insectswarm"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [16819, 16820],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_naturetouchgrow"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16909, 16910, 16911, 16912, 16913],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_purge",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16850, 16923, 16924],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_starfire"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [33589, 33590, 33591],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_lunarguidance"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [16880],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_naturesblessing"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16845, 16846, 16847],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_sentinal"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [16896, 16897, 16899, 16900, 16901],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [33592, 33596],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_balanceofpower"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [33597, 33599, 33956],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_dreamstate"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [24858],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_forceofnature"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [33600, 33601, 33602],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_faeriefire"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [33603, 33604, 33605, 33606, 33607],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_twilightswrath"
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [33831],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_forceofnature"
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [2, ["Feral Combat", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16934, 16935, 16936, 16937, 16938],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_pet_hyena"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16858, 16859, 16860, 16861, 16862],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_demoralizingroar"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16947, 16948, 16949],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16940, 16941],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_bash"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16929, 16930, 16931],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_pelt_bear_03"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [17002, 24866],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_spiritwolf"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16979],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_pet_bear"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16942, 16943, 16944],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_04"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16966, 16968],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_vampiricaura"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16972, 16974, 16975],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_pet_cat"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16958, 16961],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_cannibalize",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [16998, 16999],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_ravage"
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16857],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_faeriefire"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [33872, 33873],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_healinginstincts"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [17003, 17004, 17005, 17006, 24894],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofagility",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [33853, 33855, 33856],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_enrage"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [33851, 33852, 33957],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_primaltenacity"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [17007],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_unyeildingstamina"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [34297, 34300],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_unyeildingstamina",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [33859, 33866, 33867, 33868, 33869],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_predatoryinstincts"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [33917],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_mangle2",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
                [3, ["Restoration", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17050, 17051, 17053, 17054, 17055],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_regeneration"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17056, 17058, 17059, 17060, 17061],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [17069, 17070, 17071, 17072, 17073],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_healingtouch"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [17063, 17065, 17066, 17067, 17068],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_healingwavegreater"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16833, 16834, 16835],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [17106, 17107, 17108],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [17118, 17119, 17120, 17121, 17122],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_eyeoftheowl"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16864],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_crystalball"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [24968, 24969, 24970, 24971, 24972],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_elunesgrace"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [17111, 17112, 17113],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_rejuvenation"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [17116],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_ravenform",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [17104, 24943, 24944, 24945, 24946],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_protectionformnature",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [17123, 17124],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_tranquility"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [33879, 33880],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_empoweredtouch"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [17074, 17075, 17076, 17077, 17078],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_resistnature"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34151, 34152, 34153],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_giftofthewaterspirit"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [18562],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_relics_idolofrejuvenation",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [33881, 33882, 33883],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_naturalperfection"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [33886, 33887, 33888, 33889, 33890],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_empoweredrejuvination"
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [33891],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_treeoflife",
                            parent: {row_index: 7, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {is_filler: true, row_index: 8, column_index: 3},
                    ]
                ]]],
            ])]
        ])],
        // WotLK
        [3, new Map([
            // Warrior
            [1, new Map([
                [1, ["Arms", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [12282, 12663, 12664],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16462, 16463, 16464, 16465, 16466],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12286, 12658],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_gouge",
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [12285, 12697],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_charge"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [12300, 12959, 12960],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_magic_magearmor",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12295, 12676, 12677],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12290, 12963],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_sword_05"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12296],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16493, 16494],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_searingarrow"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [12834, 12849, 12867],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_backstab",
                            parent: {row_index: 2, column_index: 2}
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [12163, 12711, 12712],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_axe_09"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [56636, 56637, 56638],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_hungerforblood"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [12700, 12781, 12783, 12784, 12785],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_axe_06"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12328],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_slicedice",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [12284, 12701, 12702, 12703, 12704],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_mace_01"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [12281, 12812, 12813, 12814, 12815],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_27"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [20504, 20505],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_weaponmastery"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [12289, 12668, 23695],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_shockwave"
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 3,
                            spell_id: [46854, 46855],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_bloodnova"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [29834, 29838],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_harass",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [12294],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_savageblow",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [46865, 46866],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_offensivestance",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 3,
                            spell_id: [12862, 12330],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_decisivestrike",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [64976],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_bullrush",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [35446, 35448, 35449],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_savageblow",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [46859, 46860],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_unrelentingassault",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [29723, 29725, 29724],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_improveddisciplines"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [29623],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_endlessrage",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [29836, 29859],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_bloodfrenzy"
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [46867, 56611, 56612, 56613, 56614],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_trauma"
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [46924],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_bladestorm"
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Fury", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [61216, 61221, 61222],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_shoulder_22"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [12321, 12835],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_purge"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12320, 12852, 12853, 12855, 12856],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_eviscerate"
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [12324, 12876, 12877, 12878, 12879],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_warcry"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [12322, 12999, 13000, 13001, 13002],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_stoneclawtotem"
                        },
                        {is_filler: true, row_index: 1, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12329, 12950, 20496],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_cleave"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12323],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_deathscream"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16487, 16489, 16492],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonimp"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [12318, 12857, 12858, 12860, 12861],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_focusedmind"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [23584, 23585, 23586, 23587, 23588],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_dualwield"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20502, 20503],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_sword_48"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [12317, 13045, 13046, 13047, 13048],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unholyfrenzy",
                        },
                        {is_filler: true, row_index: 3, column_index: 3}
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [29590, 29591, 29592],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_marksmanship",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12292],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_deathpact",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [29888, 29889],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_sprint"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [20500, 20501],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_ancestralguardian"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [12319, 12971, 12972, 12973, 12974],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_ghoulfrenzy"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [46908, 46909, 56924],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_endlessrage",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [23881],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_bloodlust",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 3,
                            spell_id: [29721, 29776],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_whirlwind",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [46910, 46911],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_furiousresolve",
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {is_filler: true, row_index: 7, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 3,
                            spell_id: [29759, 29760, 29761, 29762, 29763],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_racial_avatar",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [60970],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_heroicleap",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [29801],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_rampage",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [46913, 46914, 46915],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_bloodsurge",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [56927, 56929, 56930, 56931, 56932],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_intensifyrage",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [46917],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_titansgrip",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Protection", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [12301, 12818],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [12298, 12724, 12725, 12726, 12727],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_shield_06",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [12287, 12665, 12666],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_thunderclap"
                        },
                        {is_filler: true, row_index: 0, column_index: 3}
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [50685, 50686, 50687],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_incite"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [12297, 12750, 12751, 12752, 12753],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [12975],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_ashestoashes"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12797, 12799],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_revenge"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [29598, 29599],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_shieldmastery"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [12299, 12761, 12762, 12763, 12764],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [59088, 59089],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_shieldreflection"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [12313, 12804, 12807],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_disarm"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [12308, 12810, 12811],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_sunder"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [12312, 12803],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_shieldwall"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12809],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_thunderbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [12311, 12958],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_shieldbash"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16538, 16539, 16540, 16541, 16542],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_20"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [29593, 29594],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_defensivestance",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [23922],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_shield_05",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [29787, 29790, 29792],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_focusedrage",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [29140, 29143, 29144],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_helmet_21",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [46945, 46949],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_safeguard",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [57499],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_warbringer"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [20243],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_sword_11"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [47294, 47295, 47296],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_criticalblock"
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [46951, 46952, 46953],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_swordandboard",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 2,
                            spell_id: [58872, 58874],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_shield_31"
                        },
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [46968],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_shockwave"
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])],
            // Paladin
            [2, new Map([
                [1, ["Holy", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [20205, 20206, 20207, 20209, 20208],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_arcane_blink"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20224, 20225, 20330, 20331, 20332],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_thunderbolt"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [20237, 20238, 20239],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_holybolt"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20257, 20258, 20259, 20260, 20261],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_sleep"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [9453, 25836],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_unyieldingfaith"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [31821],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_auramastery"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [20210, 20212, 20213, 20214, 20215],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_greaterheal",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20234, 20235],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_layonhands"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [20254, 20255, 20256],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_mindsooth"
                        },
                        {is_filler: true, row_index: 3, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [20244, 20245],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_sealofwisdom"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [53660, 53661],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_paladin_blessedhands"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31822, 31823],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_pureofheart",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20216],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_heal",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [20359, 20360, 20361],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_healingaura"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31825, 31826],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_purifyingpower"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [5923, 5924, 5925, 5926, 25829],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_power"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31833, 31835, 31836],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_lightsgrace",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20473],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_searinglight",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31828, 31829, 31830],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessedlife",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [53551, 53552, 53553],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_paladin_sacredcleansing",
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [31837, 31838, 31839, 31840, 31841],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_holyguidance",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [31842],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_divineillumination",
                        },
                        {is_filler: true, row_index: 8, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [53671, 53673, 54151, 54154, 54155],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_paladin_judgementofthepure",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [53569, 53576],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_paladin_infusionoflight",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 2,
                            spell_id: [53556, 53557],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_paladin_enlightenedjudgements",
                        },
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [53563],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_paladin_beaconoflight",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Protection", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [63646, 63647, 63648, 63649, 63650],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blindingheal",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20262, 20263, 20264, 20265, 20266],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_golemthunderclap"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [31844, 31845, 53519],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_stoicism"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20174, 20175],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_sealofprotection"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [20096, 20097, 20098, 20099, 20100],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [64205],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_powerwordbarrier"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [20468, 20469, 20470],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_sealoffury"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20143, 20144, 20145, 20146, 20147],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [53527, 53530],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_powerwordbarrier",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20487, 20488],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_sealofmight"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [20138, 20139, 20140],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_devotionaura"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20911],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_lightningshield",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [20177, 20179, 20181, 20180, 20182],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstrength"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31848, 31849],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_divineintervention"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [20196, 20197, 20198],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_sword_20"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31785, 33776],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_revivechampion",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20925],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_blessingofprotection",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31850, 31851, 31852],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_ardentdefender",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [20127, 20130, 20135],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_defend",
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [31858, 31859, 31860],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_weaponmastery",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [53590, 53591, 53592],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_paladin_touchedbylight",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31935],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_avengersshield",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [53583, 53585],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_paladin_gaurdedbythelight",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [53709, 53710, 53711],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_paladin_shieldofthetemplar",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 2,
                            spell_id: [53695, 53696],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_paladin_judgementsofthejust",
                        },
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [53595],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_paladin_hammeroftherighteous",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Retribution", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [20060, 20061, 20062, 20063, 20064],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [20101, 20102, 20103, 20104, 20105],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [25956, 25957],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_righteousfury"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [20335, 20336, 20337],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_holysmite"
                        },

                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [20042, 20045],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_fistofjustice"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [9452, 26016],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_vindication"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [20117, 20118, 20119, 20120, 20121],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_retributionaura",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [20375],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_innerrage"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [26022, 26023, 44414],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_persuitofjustice"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [9799, 25988],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_eyeforaneye"
                        },
                        {is_filler: true, row_index: 3, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [32043, 35396, 35397],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_holysmite"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [31866, 31867, 31868],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_crusade"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [20111, 20112, 20113],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_hammer_04"
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [31869],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_mindvision"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [20049, 20056, 20057],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_racial_avatar",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [31871, 31872],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_divinepurpose"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [53486, 53488],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_paladin_artofwar",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [20066],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_prayerofhealing"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31876, 31877, 31878],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_paladin_judgementofthewise",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [31879, 31880, 31881],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_fanaticism",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [53375, 53376],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_paladin_sanctifiedwrath",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [53379, 53484, 53648],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_paladin_swiftretribution"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [35395],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_crusaderstrike"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [53501, 53502, 53503],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_paladin_sheathoflight"
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [53380, 53381, 53382],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_paladin_righteousvengeance"
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [53385],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_paladin_divinestorm"
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]]
            ])],
            // Hunter
            [3, new Map([
                [1, ["Beast Mastery", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [19552, 19553, 19554, 19555, 19556],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_ravenform"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19583, 19584, 19585, 19586, 19587],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [35029, 35030],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_silenthunter"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19549, 19550, 19551],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_aspectofthemonkey"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19609, 19610, 19612],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_pelt_bear_03"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [24443, 19575],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_beastsoothe"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [19559, 19560],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mount_jungletiger"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [53265],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_aspectmastery"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [19616, 19617, 19618, 19619, 19620],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_bullrush"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [19572, 19573],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_mendpet"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [19598, 19599, 19600, 19601, 19602],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_04",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [19578, 20895],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_demoralizingroar"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [19577],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_devour",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [19590, 19592],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [34453, 34454],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_animalhandler",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [19621, 19622, 19623, 19624, 19625],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_03",
                            parent: {row_index: 3, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34455, 34459, 34460],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_ferociousinspiration",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19574],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_ferociousbite",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [34462, 34464, 34465],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_catlikereflexes",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [53252, 53253],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_invigeration",
                            parent: {row_index: 6, column_index: 0}
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [34466, 34467, 34468, 34469, 34470],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_serpentswiftness",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [53262, 53263, 53264],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_longevity",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [34692],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_beastwithin",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [53256, 53259, 53260],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_cobrastrikes",
                            parent: {row_index: 7, column_index: 2}
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [56314, 56315, 56316, 56317, 56318],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_separationanxiety",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [53270],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_beastmastery",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Marksmanship", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [19407, 19412],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_stun"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [53620, 53621, 53622],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_focusedaim"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19426, 19427, 19429, 19430, 19431],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_searingarrow",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [34482, 34483, 34484],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_zenarchery"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19421, 19422, 19423],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_snipershot"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19485, 19487, 19488, 19489, 19490],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_piercedamage",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [34950, 34954],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_goforthethroat"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19454, 19455, 19456],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_impalingbolt"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [19434],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_spear_07",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [34948, 34949],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_rapidkilling"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [19464, 19465, 19466],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_quickshot"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [19416, 19417, 19418, 19419, 19420],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [35100, 35102],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_arcane_starfire"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [23989],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_readiness"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [19461, 19462, 24691],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_upgrademoonglaive",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [34475, 34476],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_combatexperience"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {is_filler: true, row_index: 5, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 3,
                            spell_id: [19507, 19508, 19509],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_weapon_rifle_06"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [53234, 53237, 53238],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_piercingshots",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19506],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_trueshot",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [35104, 35110, 35111],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_upgrademoonglaive",
                            parent: {row_index: 4, column_index: 2}
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [34485, 34486, 34487, 34488, 34489],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_mastermarksman",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [53228, 53232],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_rapidregeneration",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [53215, 53216, 53217],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_wildquiver",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [34490],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_theblackarrow",
                            parent: {row_index: 7, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [53221, 53222, 53224],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_improvedsteadyshot",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [53241, 53243, 53244, 53245, 53246],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_assassinate",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [53209],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_chimerashot2",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Survival", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [52783, 52785, 52786, 52787, 52788],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_improvedtracking"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [19498, 19499, 19500],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_townwatch"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [19159, 19160],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [19290, 19294, 24283],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_kick"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [19184, 19387, 19388],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_stranglevines"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [19376, 63457, 63458],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_ensnare"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [34494, 34496],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_survivalinstincts",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [19255, 19256, 19257, 19258, 19259],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_twilight"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19503],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_golemstormbolt"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [19295, 19297, 19298],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_parry"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [19286, 19287],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_feigndeath"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [56333, 56336, 56337],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_bomb_05"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [56342, 56343, 56344],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_lockandload"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [56339, 56340, 56341],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_huntervswild",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [19370, 19371, 19373],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [19306],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_challange",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [19168, 19180, 19181, 24296, 24297],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_invisibilty"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [34491, 34492, 34493],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_resourcefulness"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34500, 34502, 34503],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_findweakness",
                            parent: {row_index: 5, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [19386],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_spear_02",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [34497, 34498, 34499],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_thrillofthehunt",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [34506, 34507, 34508, 34838, 34839],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_mastertactitian",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [53295, 53296, 53297],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_potentvenom",
                        },
                        {is_filler: true, row_index: 7, column_index: 2},
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [53298, 53299],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_hunter_pointofnoescape"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [3674],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_painspike"
                        },
                        {is_filler: true, row_index: 8, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 3,
                            spell_id: [53302, 53303, 53304],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_longshots"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {is_filler: true, row_index: 9, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 2,
                            spell_id: [53290, 53291, 53292],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_huntingparty",
                            parent: {row_index: 6, column_index: 2}
                        },
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [53301],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_explosiveshot",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])],
            // Rogue
            [4, new Map([
                [1, ["Assassination", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [14162, 14163, 14164],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_eviscerate"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14144, 14148],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_fiegndead"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14138, 14139, 14140, 14141, 14142],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_racial_bloodrage",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [14156, 14160, 14161],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_disembowel"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [51632, 51633],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_bloodsplatter"
                        },
                        {is_filler: true, row_index: 1, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [13733, 13865, 13866],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_backstab"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [14983],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_earthbindtotem"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14168, 14169],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_riposte"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14128, 14132, 14135, 14136, 14137],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_criticalstrike",
                            parent: {row_index: 0, column_index: 2}
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16513, 16514, 16515],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_feigndeath"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14113, 14114, 14115, 14116, 14117],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_poisons"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31208, 31209],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_fleetfooted",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [14177],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_ice_lament",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14174, 14175, 14176],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_kidneyshot"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [31244, 31245],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_quickrecovery"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [14186, 14190, 14193, 14194, 14195],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_chilltouch",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [14158, 14159],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_deathscream"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [51625, 51626],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_deadlybrew"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [58426],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_rapidkilling"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31380, 31382, 31383],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_deadenednerves"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [51634, 51635, 51636],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_focusedattacks",
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [31233, 31239, 31240],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_findweakness"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [31226, 31227, 58410],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_creature_poison_06",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [1329],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_shadowstrikes",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [51627, 51628, 51629],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_turnthetables",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [51664, 51665, 51667, 51668, 51669],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_cuttothechase",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [51662],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_hungerforblood",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Combat", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [13741, 13793, 13792],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_gouge"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [13732, 13863],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_ritualofsacrifice"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [13715, 13848, 13849, 13851, 13852],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_dualwield",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [14165, 14166, 14167],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_slicedice"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [13713, 13853, 13854],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_parry",
                        },
                        {is_filler: true, row_index: 1, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [13705, 13832, 13843, 13844, 13845],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_marksmanship",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [13742, 13872],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowward"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14251],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_challange",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [13706, 13804, 13805, 13806, 13807],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_shortblade_05",
                            parent: {row_index: 0, column_index: 2}
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [13754, 13867],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_kick"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [13743, 13875],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_sprint"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [13712, 13788, 13789],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_invisibilty"
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [18427, 18428, 18429, 61330, 61331],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_racial_avatar"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [13709, 13800, 13801, 13802, 13803],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_mace_01"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [13877],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warrior_punishingblow",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [13960, 13961, 13962, 13963, 13964],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_27"
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [30919, 30920],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstrength",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [31124, 31126],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_bladetwisting"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31122, 31123, 61329],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warrior_revenge"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [13750],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowworddominate"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31130, 31131],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_nervesofsteel"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [5952, 51679],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_throwingspecialization"
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [35541, 35550, 35551, 35552, 35553],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_shortblade_38"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [51672, 51674],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_unfairadvantage",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [32601],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_surpriseattack",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [51682, 58413],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_creature_disease_03",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [51685, 51686, 51687, 51688, 51689],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_preyontheweak",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [51690],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_murderspree",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Subtlety", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [14179, 58422, 58423, 58424, 58425],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warrior_decisivestrike"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [13958, 13970, 13971],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_charm"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14057, 14072],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_warcry"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [30892, 30893],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_feint"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [14076, 14094],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_sap"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [13975, 14062, 14063],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [13981, 14066],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14278],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_curse"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14171, 14172, 14173],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_sword_17",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [13983, 14070, 14071],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [13976, 13979, 13980],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_fumble"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14079, 14080],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_ambush"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [30894, 30895],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [14185],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_antishadow",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14082, 14083],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_summonsuccubus"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [16511],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain",
                            parent: {row_index: 2, column_index: 2}
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31221, 31222, 31223],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_masterofsubtlety"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [30902, 30903, 30904, 30905, 30906],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31211, 31212, 31213],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_envelopingshadows",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [14183],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_possession",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31228, 31229, 31230],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_cheatdeath",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [31216, 31217, 31218, 31219, 31220],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_sinistercalling",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [51692, 51696],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_waylay",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [51698, 51700, 51701],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_honoramongstthieves",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [36554],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_shadowstep",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [58414, 58415],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_rogue_wrongfullyaccused",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [51708, 51709, 51710, 51711, 51712],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_rogue_slaughterfromtheshadows",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [51713],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_rogue_shadowdance",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])],
            // Priest
            [5, new Map([
                [1, ["Discipline", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14522, 14788, 14789, 14790, 14791],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_magic_magearmor"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [47586, 47587, 47588, 52802, 52803],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_sealofvengeance"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [14523, 14784, 14785],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_manaregentotem"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [14747, 14770, 14771],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_innerfire"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [14749, 14767],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_wordfortitude"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [14531, 14774],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_tranquility"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [14521, 14776, 14777],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_sleep",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14751],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [14748, 14768, 14769],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_powerwordshield"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [33167, 33171, 33172],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_absolution"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [14520, 14780, 14781],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hibernation"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [14750, 14772],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [33201, 33202],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_powerwordshield",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [18551, 18552, 18553, 18554, 18555],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [63574],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_pureofheart",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [33186, 33190],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_focusedpower"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [34908, 34909, 34910],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_mindmastery",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [45234, 45243, 45244],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_focusedpower",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [10060],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_powerinfusion",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [63504, 63505, 63506],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_chastise",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [57470, 57472],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_holyprotection",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [47535, 47536, 47537],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_rapture",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [47507, 47508],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_aspiration",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [47509, 47511, 47515],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_devineaegis",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [33206],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_painsupression",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [47516, 47517],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_hopeandgrace",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [52795, 52797, 52798, 52799, 52800],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_borrowedtime",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [47540],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_penance",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Holy", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [14913, 15012],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_healingfocus"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [14908, 15020, 17191],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_renew"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [14889, 15008, 15009, 15010, 15011],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_sealofsalvation"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [27900, 27901, 27902, 27903, 27904],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_spellwarding"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18530, 18531, 18533, 18534, 18535],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_sealofwrath",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [19236],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_restoration",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [27811, 27815, 27816],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessedrecovery",
                        },
                        {is_filler: true, row_index: 2, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [14892, 15362, 15363],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_layonhands",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [27789, 27790],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_purify",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [14912, 15013, 15014],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_heal02",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [14909, 15017],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_searinglightpriest",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [14911, 15018],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_prayerofhealing02",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [20711],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_enchant_essenceeternallarge",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [14901, 15028, 15029, 15030, 15031],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_spiritualguidence",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [33150, 33154],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_surgeoflight",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [14898, 15349, 15354, 15355, 15356],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34753, 34859, 34860],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_fanaticism",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [724],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_summonlightwell",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [33142, 33145, 33146],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_blessedresillience",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [64127, 64129],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_symbolofhope",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [33158, 33159, 33160, 33161, 33162],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_greaterheal",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [63730, 63733, 63737],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_serendipity",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [63534, 63542, 63543],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_paladin_infusionoflight",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [34861],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_circleofrenewal",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [47558, 47559, 47560],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_testoffaith",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [47562, 47564, 47565, 47566, 47567],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_divineprovidence",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [47788],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_guardianspirit",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Shadow", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [15270, 15335, 15336],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_requiem",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [15337, 15338],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_requiem",
                            parent: {row_index: 0, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [15268, 15323, 15324, 15325, 15326],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_gathershadows",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [15318, 15272, 15320],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_shadowward",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [15275, 15317],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowwordpain",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [15260, 15327, 15328, 15329, 15330],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_burningspirit",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [15392, 15448],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_psychicscream",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [15273, 15312, 15313, 15314, 15316],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unholyfrenzy",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [15407],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_siphonmana",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [15274, 15311],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_magic_lesserinvisibilty",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [17322, 17323],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_chilltouch",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [15257, 15331, 15332],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_blackplague",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [15487],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_impphaseshift",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [15286],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_unsummonbuilding",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [27839, 27840],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_improvedvampiricembrace",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [33213, 33214, 33215],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_focusedmind",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [14910, 33371],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [15259, 15307, 15308],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_twilight",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [33221, 33222, 33223, 33224, 33225],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowpower",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [15473],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowform",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 2},
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [33191, 33192, 33193],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_misery",
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [47569, 47570],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowform",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [64044],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_psychichorrors",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [34914],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_stoicism",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [47580, 47581, 47582],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_painandsuffering",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {is_filler: true, row_index: 9, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 2,
                            spell_id: [47573, 47577, 47578, 51166, 51167],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_mindtwisting",
                        },
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [47585],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_dispersion",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])],
            // Death knight
            [6, new Map([
                [1, ["Blood", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [48979, 49483],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_axe_68"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [48997, 49490, 49491],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_deathknight_subversion"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [49182, 49500, 49501, 55225, 55226],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_upgrademoonglaive"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [48978, 49390, 49391, 49392, 49393],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_shoulder_36"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [49004, 49508, 49509],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_rogue_bloodyeye"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [55107, 55108],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_sword_68"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [48982],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_deathknight_runetap"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [48987, 49477, 49478, 49479, 49480],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_deathknight_darkconviction"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [49467, 50033, 50034],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_sword_62"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [48985, 49488, 49489],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_deathknight_runetap",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {is_filler: true, row_index: 3, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [49145, 49495, 49497],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_deathknight_spelldeflection"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [49015, 50154, 55136],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_deathknight_vendetta"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [48977, 49394, 49395],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_deathknight_deathstrike"
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [49006, 49526, 50026],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_misc_warsongfocus"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [49005],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_rapidkilling"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [48988, 49503, 49504],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_backstab",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [53137, 53138],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warrior_intensifyrage"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [49027, 49542, 49543],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_soulleech"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [49016],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_deathknight_bladedarmor"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [50365, 50371],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_deathknight_bloodpresence"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [62905, 62908],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_deathknight_butcher2"
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [49018, 49529, 49530],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_painspike"
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [55233],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [49189, 50149, 50150],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_creature_cursed_02"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [55050],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_weapon_shortblade_40"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [49023, 49533, 49534],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_deathknight_classicon"
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [61154, 61155, 61156, 61157, 61158],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation"
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [49028],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_sword_07"
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Frost", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [49175, 50031, 51456],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_deathknight_icetouch"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [49455, 50147],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_arcane_arcane01"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [49042, 49786, 49787, 49788, 49789],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 1, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [55061, 55062],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_manarecharge"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [49140, 49961, 49962, 49963, 49964],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_darkritual"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [49226, 50137, 50138],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_dualwield"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [50880, 50884, 50885, 50886, 50887],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_deathknight_icytalons",
                            parent: {row_index: 0, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [49039],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_raisedead"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [51468, 51472, 51473],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_weapon_hand_18"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [51123, 51127, 51128, 51129, 51130],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_sword_122"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [49149, 50115],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_frostshock"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [49137, 49657],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_twilight"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 4, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [49186, 51108, 51109],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_chest_mail_04"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [49471, 49790, 49791],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_removedisease"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [49796],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_soulleech_2"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [55610],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_deathknight_icytalons",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [49024, 49538],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_sword_112",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [49188, 56822, 59057],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_freezingbreath",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [50040, 50041, 50043],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_wisp",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [49203],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_staff_15",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [50384, 50385],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_deathknight_frostpresence",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [65661, 66191, 66192],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_dualwieldspecialization",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [54639, 54638, 54637],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_weapon_shortblade_79",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [51271],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_armor_helm_plate_naxxramas_raidwarrior_c_01",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [49200, 50151, 50152],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_elementaldevastation",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [49143],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_deathknight_empowerruneblade2",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [50187, 50190, 50191],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_sword_53",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [49202, 50127, 50128, 50129, 50130],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_tranquility",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [49184],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_arcticwinds",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Unholy", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [51745, 51746],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_deathknight_plaguestrike",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [48962, 49567, 49568],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_burningspirit",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [55129, 55130, 55131, 55132, 55133],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [49036, 49562],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowwordpain",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [48963, 49564, 49565],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_deathanddecay",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [49588, 49589],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_deathknight_strangulate",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [48965, 49571, 49572],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_deathknight_gnaw_ghoul",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [49013, 55236, 55237],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_plaguecloud",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [51459, 51462, 51463, 51464, 51465],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_shortblade_60",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [49158],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_creature_disease_02",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [49146, 51267],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_deathknight_summondeathcharger",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [49219, 49627, 49628],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_criticalstrike",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [55620, 55623],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_criticalstrike",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [49194],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_contagion",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [49220, 49633, 49635, 49636, 49638],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowandflame",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [49223, 49599],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadesofdarkness",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [55666, 55667],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_shadowfiend",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [49224, 49610, 49611],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_antimagicshell",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [49208, 56834, 56835],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_shadetruesight",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 3,
                            spell_id: [52143],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_animatedead",
                            parent: {row_index: 3, column_index: 3}
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [66799, 66814, 66815, 66816, 66817],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_unholyfrenzy",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [51052],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_deathknight_antimagiczone",
                            parent: {row_index: 5, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [50391, 50392],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_deathknight_unholypresence",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 3,
                            spell_id: [63560],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_ghoulfrenzy",
                            parent: {row_index: 5, column_index: 3}
                        },
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [49032, 49631, 49632],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_nullifydisease",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [49222],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_chest_leather_13",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [49217, 49654, 49655],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_callofbone",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [51099, 51160, 51161],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_creature_cursed_03",
                            parent: {row_index: 7, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [55090],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_deathknight_scourgestrike",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [50117, 50118, 50119, 50120, 50121],
                            max_points: 5,
                            points_spend: 0,
                            icon: "inv_weapon_halberd14",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [49206],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_pet_bat",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])],
            // Shaman
            [7, new Map([
                [1, ["Elemental", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16039, 16109, 16110, 16111, 16112],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16035, 16105, 16106, 16107, 16108],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_fireball"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16038, 16160, 16161],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_immolation"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [28996, 28997, 28998],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_spiritarmor"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [30160, 29179, 29180],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_elementaldevastation"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16040, 16113, 16114, 16115, 16116],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostward"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16164],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16089, 60184, 60185, 60187, 60188],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_volcano"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16086, 16544],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_sealoffire"
                        },
                        {is_filler: true, row_index: 3, column_index: 1},
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [29062, 29064, 29065],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_eyeofthestorm"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [28999, 28900],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stormreach"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [16041],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_callstorm",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [30664, 30665, 30666],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_unrelentingstorm"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [30672, 30673, 30674],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_elementalprecision_1",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16578, 16579, 16580, 16581, 16582],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_lightning_lightningbolt01",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [16166],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_wispheal",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [51483, 51485, 51486],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shaman_stormearthfire",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [63370, 63372],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_blueflamering",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [51466, 51470],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shaman_elementaloath",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [30675, 30678, 30679],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_lightningoverload",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [51474, 51478, 51479],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shaman_astralshift",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30706],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_totemofwrath"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [51480, 51481, 51482],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shaman_lavaflow",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [62097, 62098, 62099, 62100, 62101],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_unused2",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [51490],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shaman_thunderstorm",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Enhancement", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [16259, 16295, 52456],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_earthbindtotem",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16043, 16130],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stoneclawtotem",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17485, 17486, 17487, 17488, 17489],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16258, 16293],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stoneskintotem",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16255, 16302, 16303, 16304, 16305],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_thunderbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16262, 16287],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_spiritwolf",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [16261, 16290, 16291],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_lightningshield",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16266, 29079, 29080],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_flametounge",
                        },
                        {is_filler: true, row_index: 2, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [43338],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_elementalabsorption",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [16254, 16271, 16272],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_mirrorimage",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16256, 16281, 16282, 16283, 16284],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_ghoulfrenzy",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16252, 16306, 16307, 16308, 16309],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_devotion",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [29192, 29193],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_windfury",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [16268],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_parry",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [51883, 51884, 51885],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_bloodlust",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [30802, 30808, 30809],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_unleashedrage",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [29082, 29084, 29086],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_swiftstrike",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 3,
                            spell_id: [63373, 63374],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_bluecano",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [30816, 30818, 30819],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_dualwieldspecialization",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [30798],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_dualwield",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [17364],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_shaman_stormstrike"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [51525, 51526, 51527],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shaman_staticshock"
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [60103],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_shaman_lavalash",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [51521, 51522],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shaman_improvedstormstrike"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [30812, 30813, 30814],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_mentalquickness",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30823],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_shamanrage",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [51523, 51524],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_earthelemental_totem",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [51528, 51529, 51530, 51531, 51532],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_earthelemental_totem",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [51533],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shaman_feralspirit",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Restoration", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16182, 16226, 16227, 16228, 16229],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_magicimmunity",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16173, 16222, 16223, 16224, 16225],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16184, 16209],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_reincarnation",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16176, 16235, 16240],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_undyingstrength",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16179, 16214, 16215, 16216, 16217],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_manarecharge",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16180, 16196, 16198],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_shaman_watershield",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16181, 16230, 16232],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_healingwavelesser",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [55198],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [16176, 16235, 16240],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_undyingstrength",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16187, 16205, 16206],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_manaregentotem",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16194, 16218, 16219, 16220, 16221],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_tranquility",
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [29206, 29205, 29202],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_healingway",
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16188],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_ravenform",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [30864, 30865, 30866],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_focusedmind",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [16178, 16210, 16211, 16212, 16213],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [30881, 30883, 30884, 30885, 30886],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_natureguardian",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [16190],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_summonwaterelemental",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [51886],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_shaman_cleansespirit",
                            parent: {row_index: 5, column_index: 2}
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [51554, 51555],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shaman_blessingofeternals",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [30872, 30873],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_healingwavegreater",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [30867, 30868, 30869],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_natureblessing",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [51556, 51557, 51558],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shaman_ancestralawakening",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [974],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_skinofearth"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [51560, 51561],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_skinofearth",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [51562, 51563, 51564, 51565, 51566],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shaman_tidalwaves",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [61295],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_riptide",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])],
            // Mage
            [8, new Map([
                [1, ["Arcane", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [11210, 12592],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_holy_dispelmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [11222, 12839, 12840],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_devotion"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [11237, 12463, 12464, 16769, 16770],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_starfall"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [28574, 54658, 54659],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_arcaneresilience"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [29441, 29444],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_astralrecalgroup"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [11213, 12574, 12575, 12576, 12577],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_manaburn"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [11247, 12606],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [11242, 12467, 12469],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [44397, 44398, 44399],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_mage_studentofthemind"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [54646],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_arcane_studentofmagic"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [11252, 12605],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_detectlesserinvisibility"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11255, 12598],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_iceshock"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [18462, 18463, 18464],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_siphonmana"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [29447, 55339, 55340],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_mage_tormentoftheweak"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31569, 31570],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_arcane_blink"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [12043],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_enchantarmor"
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [11232, 12500, 12501, 12502, 12503],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_charm",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31574, 31575, 54354],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_prismaticcloak",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [15058, 15059, 15060],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_teleport",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [31571, 31572],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_arcane_arcanepotency",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31579, 31582, 31583],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_starfall",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [12042],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_lightning",
                            parent: {row_index: 5, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [44394, 44395, 44396],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_mage_incantersabsorbtion",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [44378, 44379],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mage_potentspirit",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [31584, 31585, 31586, 31587, 31588],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_arcane_mindmastery",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 8, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31589],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_slow",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [44404, 54486, 54488, 54489, 54490],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_mage_missilebarrage",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [44400, 44402, 44403],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_mage_netherwindpresence",
                        },
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 2,
                            spell_id: [35578, 35581],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_arcane_arcanetorrent",
                        },
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [44425],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_mage_arcanebarrage",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Fire", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [11078, 11080],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_fireball",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [18459, 18460, 54734],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_flameshock",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [11069, 12338, 12339, 12340, 12341],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_flamebolt",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [11119, 11120, 12846, 12847, 12848],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_incinerate",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [54747, 54749],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_totemofwrath",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [11108, 12349, 12350],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_mage_worldinflames",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [11100, 12353],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_flare",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [11103, 12357, 12358],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_meteorstorm",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [11366],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_fireball02",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [11083, 12351],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_fire",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [11095, 12872, 12873],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_soulburn",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11094, 13043],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_firearmor",
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [29074, 29075, 29076],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_masterofelements",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [31638, 31639, 31640],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_playingwithfire",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [11115, 11367, 11368],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispheal",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [11113],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_holy_excorcism_02",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [31641, 31642],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_burningspeed",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [11124, 12378, 12398, 12399, 12400],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34293, 34295, 34296],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_burnout",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [11129],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_sealoffire",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [31679, 31680],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_moltenblood",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [64353, 64357],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mage_fierypayback",
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [31656, 31657, 31658],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_flamebolt",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [44445, 44446, 44448],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_mage_hotstreak",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31661],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_misc_head_dragon_01",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [44442, 44443],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mage_firestarter",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [44449, 44469, 44470, 44471, 44472],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_mage_burnout",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [44457],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_mage_livingbomb",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Frost", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [11071, 12496, 12497],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frostarmor",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [11070, 12473, 16763, 16765, 16766],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt02",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [31670, 31672, 55094],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_icefloes",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [11207, 12672, 15047],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_iceshard",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [11189, 28332],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_frostward",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [29438, 29439, 29440],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_ice_magicdamage",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [11175, 12569, 12571],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_wisp",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [11151, 12952, 12953],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [12472],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [11185, 12487, 12488],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_icestorm",
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16757, 16758],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_darkritual",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [11160, 12518, 12519],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_stun",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [11170, 12982, 12983],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frostshock"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [11190, 12489, 12490],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_glacier",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [11958],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_wizardmark",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [31667, 31668, 31669],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frozencore",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [11180, 28592, 28593, 28594, 28595],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_chillingblast",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [55091, 55092],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mage_coldasice",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [31674, 31675, 31676, 31677, 31678],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_frost_arcticwinds",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [11426],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_ice_lament",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [44745, 54787],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mage_shattershield",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [31682, 31683],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt02",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [44543, 44545],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_mage_wintersgrasp",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [44546, 44548, 44549],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_frostbolt02",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [31687],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_frost_summonwaterelemental_2",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [44557, 44560, 44561],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_summonwaterelemental_2",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [44566, 44567, 44568, 44570, 44571],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_mage_chilledtothebone",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [44572],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_mage_deepfreeze",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])],
            // Warlock
            [9, new Map([
                [1, ["Afflication", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [18827, 18829],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_curseofsargeras"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [18174, 18175, 18176],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_unsummonbuilding"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17810, 17811, 17812, 17813, 17814],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_abominationexplosion"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [18179, 18180],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_curseofmannoroth"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [18213, 18372],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_haunting"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18182, 18183],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_burningspirit"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [17804, 17805],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain02"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [53754, 53759],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_possession"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [17783, 17784, 17785],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_fingerofdeath"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [18288],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_contagion"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [18218, 18219],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_callofbone"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [18094, 18095],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_twilight"
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [32381, 32382, 32383],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_abominationexplosion"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [32385, 32387, 32392, 32393, 32394],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowembrace"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [18265],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_requiem"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [18223],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_grimward",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [54037, 54038],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_summonfelhunter",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [18271, 18272, 18273, 18274, 18275],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadetruesight",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 5, column_index: 2},
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [47195, 47196, 47197],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warlock_eradication",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [30060, 30061, 30062, 30063, 30064],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_painfulafflictions",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [18220],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_darkritual",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [30054, 30057],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_deathscream",
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [32477, 32483, 32484],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_curseofachimonde",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [47198, 47199, 47200],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_deathsembrace",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30108],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_unstableaffliction_3",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [58435],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_unstableaffliction_2",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [47201, 47202, 47203, 47204, 47205],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warlock_everlastingaffliction",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [48181],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warlock_haunt",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Demonology", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [18692, 18693],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_stone_04",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [18694, 18695, 18696],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonimp",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [18697, 18698, 18699],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_metamorphosis",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 3,
                            spell_id: [47230, 47231],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_felmending",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [18703, 18704],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_lifedrain",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [18705, 18706, 18707],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonvoidwalker",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [18731, 18743, 18744],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_holy_magicalsentry",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18754, 18755, 18756],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_summonsuccubus",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [19028],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_gathershadows"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [18708],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_removecurse",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [30143, 30144, 30145],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_ragingscream",
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [18769, 18770, 18771, 18772, 18773],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowworddominate",
                            parent: {row_index: 2, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [18709, 18710],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_impphaseshift",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [30326],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_manafeed",
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [18767, 18768],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_ammo_firetar",
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 5, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [23785, 23822, 23823, 23824, 23825],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowpact",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [47245, 47246, 47247],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warlock_moltencore",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [30319, 30320, 30321],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_demonicfortitude",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [47193],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warlock_demonicempowerment",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [35691, 35692, 35693],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_improvedvampiricembrace",
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [30242, 30245, 30246, 30247, 30248],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_demonictactics",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [63156, 63158],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_fireball02",
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [54347, 54348, 54349],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warlock_improveddemonictactics",
                            //parent: {row_index: 7, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30146],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_summonfelguard",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [63117, 63121, 63123],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_demonicempathy",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [47236, 47237, 47238, 47239, 47240],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_demonicpact",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [59672],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_demonform",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Destruction", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17793, 17796, 17801, 17802, 17803],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowbolt",
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17788, 17789, 17790, 17791, 17792],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_deathpact",
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [18119, 18120],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_fire",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [63349, 63350, 63351],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_mage_moltenarmor",
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [17778, 17779, 17780],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_windsofwoe",
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [18126, 18127],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_firebolt",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [17877],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_scourgebuild",
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [17959, 59738, 59739, 59740, 59741],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowwordpain"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [18135, 18136],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_fire_lavaspawn",
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [17917, 17918],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_corpseexplode",
                        },
                        {is_filler: true, row_index: 3, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [17927, 17929, 17930],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_soulburn",
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [34935, 34938, 34939],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_playingwithfire",
                            parent: {row_index: 3, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [17815, 17833, 17834],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [18130],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_flameshock",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [30299, 30301, 30302],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_netherprotection",
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [17954, 17955, 17956, 17957, 17958],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_fire_immolation",
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [17962],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_fire_fireball",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [30293, 30295, 30296],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_shadow_soulleech_3",
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 3,
                            spell_id: [18096, 18073, 63245],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_fire_volcano"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [30288, 30289, 30290, 30291, 30292],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_shadow_shadowandflame",
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [54117, 54118],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_warlock_improvedsoulleech",
                            parent: {row_index: 6, column_index: 2}
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [47258, 47259, 47260],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warlock_backdraft",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [30283],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_shadow_shadowfury",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [47220, 47221, 47223],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_warlock_empoweredimp",
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [47266, 47267, 47268, 47269, 47270],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_warlock_fireandbrimstone",
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [50796],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_warlock_chaosbolt",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])],
            // Druid
            [11, new Map([
                [1, ["Balance", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16814, 16815, 16816, 16817, 16818],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_abolishmagic"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [57810, 57811, 57812, 57813, 57814],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_arcane_arcane03"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16845, 16846, 16847],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_sentinal"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16902, 16903],
                            max_points: 2,
                            points_spend: 0,
                            icon: "inv_staff_01"
                        },
                        {is_filler: true, row_index: 1, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 3,
                            spell_id: [16821, 16822],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_starfall"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [16836, 16839, 16840],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_thorns"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16880, 61345, 61346],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_naturesblessing",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [57865],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_natureguardian",
                            parent: {row_index: 1, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 3,
                            spell_id: [16819, 16820],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_naturetouchgrow"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16909, 16910, 16911, 16912, 16913],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_purge"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16850, 16923, 16924],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_arcane_starfire"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [33589, 33590, 33591],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_lunarguidance"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [5570],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_insectswarm"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [57849, 57850, 57851],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_insectswarm",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {is_filler: true, row_index: 4, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [33597, 33599, 33956],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_dreamstate"
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [16896, 16897, 16899],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_moonglow",
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [33592, 33596],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_balanceofpower"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [24858],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_forceofnature"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [48384, 48395, 48396],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_improvedmoonkinform",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 3,
                            spell_id: [33600, 33601, 33602],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_faeriefire"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [48389, 48392, 48393],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_owlkinfrenzy",
                            //parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [33603, 33604, 33605, 33606, 33607],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_twilightswrath"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [48516, 48521, 48525],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_eclipse"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [50516],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_typhoon",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [33831],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_forceofnature"
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 3,
                            spell_id: [48488, 48514],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_galewinds"
                        },
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [48506, 48510, 48511],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_earthandsky"
                        },
                        {is_filler: true, row_index: 9, column_index: 2},
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [48505],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_starfall"
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [2, ["Feral Combat", [
                    [
                        {is_filler: true, row_index: 0, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [16934, 16935, 16936, 16937, 16938],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_hunter_pet_hyena"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [16858, 16859, 16860, 16861, 16862],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_demoralizingroar"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [16947, 16948, 16949],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_ambush"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [16998, 16999],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_ravage"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16929, 16930, 16931],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_pelt_bear_03"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [17002, 24866],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_spiritwolf"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [61336],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_tigersroar"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [16942, 16943, 16944],
                            max_points: 3,
                            points_spend: 0,
                            icon: "inv_misc_monsterclaw_04"
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 0,
                            spell_id: [16966, 16968],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_shadow_vampiricaura"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [16972, 16974, 16975],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_hunter_pet_cat"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [16958, 16961],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_racial_cannibalize",
                            parent: {row_index: 2, column_index: 2}
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 3,
                            spell_id: [48409, 48410],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_primalprecision",
                            parent: {row_index: 2, column_index: 2}
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [16940, 16941],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_bash"
                        },
                        {is_filler: true, row_index: 4, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 2,
                            spell_id: [16979],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_hunter_pet_bear"
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [33872, 33873],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_healinginstincts"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [57878, 57880, 57881],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_bullrush"
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 1,
                            spell_id: [17003, 17004, 17005, 17006, 24894],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofagility",
                            parent: {row_index: 3, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [33853, 33855, 33856],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_enrage"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 6, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [17007],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_unyeildingstamina"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [34297, 34300],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_unyeildingstamina",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 3,
                            spell_id: [33851, 33852, 33957],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_primaltenacity"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 0,
                            spell_id: [57873, 57876, 57877],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_challangingroar",
                            //parent: {row_index: 6, column_index: 1}
                        },
                        {is_filler: true, row_index: 7, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [33859, 33866, 33867],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_predatoryinstincts"
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 3,
                            spell_id: [48483, 48484, 48485],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_infectedwound"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [48492, 48494, 48495],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_kingofthejungle",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [33917],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_mangle2",
                            parent: {row_index: 6, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [48532, 48589, 48591],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_mangle2",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 9, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 1,
                            spell_id: [48432, 48433, 48434, 51268, 51269],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_primalagression",
                        },
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 2,
                            spell_id: [63503],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_rake",
                            parent: {row_index: 9, column_index: 1}
                        },
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [50334],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_berserk",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
                [3, ["Restoration", [
                    [
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 0,
                            spell_id: [17050, 17051],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_regeneration"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 1,
                            spell_id: [17063, 17065, 17066],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_healingwavegreater"
                        },
                        {
                            is_filler: false,
                            row_index: 0,
                            column_index: 2,
                            spell_id: [17056, 17058, 17059, 17060, 17061],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_blessingofstamina"
                        },
                        {is_filler: true, row_index: 0, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 0,
                            spell_id: [17069, 17070, 17071, 17072, 17073],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_healingtouch"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 1,
                            spell_id: [17118, 17119, 17120],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_eyeoftheowl"
                        },
                        {
                            is_filler: false,
                            row_index: 1,
                            column_index: 2,
                            spell_id: [16833, 16834, 16835],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_wispsplode"
                        },
                        {is_filler: true, row_index: 1, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 0,
                            spell_id: [17106, 17107, 17108],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_frost_windwalkon"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 1,
                            spell_id: [16864],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_crystalball"
                        },
                        {
                            is_filler: false,
                            row_index: 2,
                            column_index: 2,
                            spell_id: [48411, 48412],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_mastershapeshifter",
                            parent: {row_index: 1, column_index: 2}
                        },
                        {is_filler: true, row_index: 2, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 3, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 1,
                            spell_id: [24968, 24969, 24970, 24971, 24972],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_holy_elunesgrace"
                        },
                        {
                            is_filler: false,
                            row_index: 3,
                            column_index: 2,
                            spell_id: [17111, 17112, 17113],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_rejuvenation"
                        },
                        {is_filler: true, row_index: 3, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 0,
                            spell_id: [17116],
                            max_points: 1,
                            points_spend: 0,
                            icon: "spell_nature_ravenform",
                            parent: {row_index: 2, column_index: 0}
                        },
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 1,
                            spell_id: [17104, 24943, 24944, 24945, 24946],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_protectionformnature",
                        },
                        {is_filler: true, row_index: 4, column_index: 2},
                        {
                            is_filler: false,
                            row_index: 4,
                            column_index: 3,
                            spell_id: [17123, 17124],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_tranquility"
                        },
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 0,
                            spell_id: [33879, 33880],
                            max_points: 2,
                            points_spend: 0,
                            icon: "ability_druid_empoweredtouch"
                        },
                        {is_filler: true, row_index: 5, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 5,
                            column_index: 2,
                            spell_id: [17074, 17075, 17076, 17077, 17078],
                            max_points: 5,
                            points_spend: 0,
                            icon: "spell_nature_resistnature"
                        },
                        {is_filler: true, row_index: 5, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 0,
                            spell_id: [34151, 34152, 34153],
                            max_points: 3,
                            points_spend: 0,
                            icon: "spell_nature_giftofthewaterspirit"
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 1,
                            spell_id: [18562],
                            max_points: 1,
                            points_spend: 0,
                            icon: "inv_relics_idolofrejuvenation",
                            parent: {row_index: 4, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 6,
                            column_index: 2,
                            spell_id: [33881, 33882, 33883],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_naturalperfection"
                        },
                        {is_filler: true, row_index: 6, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 7, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 1,
                            spell_id: [33886, 33887, 33888, 33889, 33890],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_empoweredrejuvination"
                        },
                        {
                            is_filler: false,
                            row_index: 7,
                            column_index: 2,
                            spell_id: [48496, 48499, 48500],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_giftoftheearthmother"
                        },
                        {is_filler: true, row_index: 7, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 0,
                            spell_id: [48539, 48544, 48545],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_replenish",
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 1,
                            spell_id: [33891],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_treeoflife",
                            parent: {row_index: 7, column_index: 1}
                        },
                        {
                            is_filler: false,
                            row_index: 8,
                            column_index: 2,
                            spell_id: [48535, 48536, 48537],
                            max_points: 3,
                            points_spend: 0,
                            icon: "ability_druid_improvedtreeform",
                            parent: {row_index: 8, column_index: 1}
                        },
                        {is_filler: true, row_index: 8, column_index: 3},
                    ],
                    [
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 0,
                            spell_id: [63410, 63411],
                            max_points: 2,
                            points_spend: 0,
                            icon: "spell_nature_stoneclawtotem",
                        },
                        {is_filler: true, row_index: 9, column_index: 1},
                        {
                            is_filler: false,
                            row_index: 9,
                            column_index: 2,
                            spell_id: [51179, 51180, 51181, 51182, 51183],
                            max_points: 5,
                            points_spend: 0,
                            icon: "ability_druid_manatree",
                        },
                        {is_filler: true, row_index: 9, column_index: 3},
                    ],
                    [
                        {is_filler: true, row_index: 10, column_index: 0},
                        {
                            is_filler: false,
                            row_index: 10,
                            column_index: 1,
                            spell_id: [48438],
                            max_points: 1,
                            points_spend: 0,
                            icon: "ability_druid_flourish",
                        },
                        {is_filler: true, row_index: 10, column_index: 2},
                        {is_filler: true, row_index: 10, column_index: 3},
                    ]
                ]]],
            ])]
        ])],
    ]);

    private static points_per_expansion: Map<number, number> = new Map([
        [1, 51],
        [2, 61],
        [3, 71]
    ]);

    private static non_existing_combinations: Array<[number, number]> = [
        [1, 6],
        [2, 6],
        [1, 10],
        [2, 10],
        [3, 10],
        [1, 12],
        [2, 12],
        [3, 12],
    ];

    private points_spend_per_tab: [number, number, number] = [0, 0, 0];
    private pre_selection: [Array<number>, Array<number>, Array<number>] = [[0], [0], [0]];

    selected_expansion: number = 1;
    saved_expansion: number = 1;
    selected_hero_class: number = 1;
    saved_hero_class: number = 1;

    tree_tab1: Array<Array<Talent>> = [];
    tree_tab2: Array<Array<Talent>> = [];
    tree_tab3: Array<Array<Talent>> = [];

    constructor(
        private dataService: DataService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.titleService.setTitle("LegacyPlayers - Talent calculator");
        this.metaService.updateTag({
            name: "description",
            content: "WoW Talent calculator for Vanilla (1.12.1), TBC (2.4.3) and WotLK (3.3.5a)."
        });

        this.expansions = this.dataService.expansions;
        this.dataService.hero_classes.subscribe((hero_classes: Array<Localized<HeroClass>>) =>
            hero_classes.forEach(hero_class => this.hero_classes.push({
                value: hero_class.base.id,
                label_key: hero_class.localization
            })));

        this.tree_tab1 = this.getTabTree(1);
        this.tree_tab2 = this.getTabTree(2);
        this.tree_tab3 = this.getTabTree(3);

        activatedRoute.paramMap.subscribe(params => {
            if (!params.has("expansion_id"))
                return;
            const spec_1 = params.get("spec_1");
            const spec_2 = params.get("spec_2");
            const spec_3 = params.get("spec_3");

            this.pre_selection = [[], [], []];
            for (let i = 0; i < spec_1.length; ++i)
                this.pre_selection[0].push(Number(spec_1[i]));

            for (let i = 0; i < spec_2.length; ++i)
                this.pre_selection[1].push(Number(spec_2[i]));

            for (let i = 0; i < spec_3.length; ++i)
                this.pre_selection[2].push(Number(spec_3[i]));

            this.saved_expansion = Number(params.get("expansion_id"));
            this.saved_hero_class = Number(params.get("hero_class_id"));

            this.selected_expansion = this.saved_expansion;
            this.selected_hero_class = this.saved_hero_class;

            this.tree_tab1 = this.getTabTree(1);
            this.tree_tab2 = this.getTabTree(2);
            this.tree_tab3 = this.getTabTree(3);
        });
    }

    get points_spend(): number {
        return this.points_spend_per_tab[0] + this.points_spend_per_tab[1] + this.points_spend_per_tab[2];
    }

    private getTabTree(tab_index: number): Array<Array<Talent>> {
        if (!this.combinationExists)
            return [];

        const tree = TalentViewerComponent.talent_specs.get(this.selected_expansion).get(this.selected_hero_class).get(tab_index)[1];
        // Initialize
        let pre_selection_index = 0;
        for (let i = 0; i < tree.length; ++i) {
            for (let j = 0; j < 4; ++j) {
                if (pre_selection_index >= this.pre_selection[tab_index - 1].length)
                    return tree;
                const talent = tree[i][j];
                if (!talent.is_filler) {
                    talent.points_spend = Math.min(this.pre_selection[tab_index - 1][pre_selection_index], talent.max_points);
                    ++pre_selection_index;
                }
            }
        }
        return tree;
    }

    getTabLabel(tab_index: number): string {
        return TalentViewerComponent.talent_specs.get(this.selected_expansion).get(this.selected_hero_class).get(tab_index)[0];
    }

    get pointsPerExpansion(): number {
        return TalentViewerComponent.points_per_expansion.get(this.selected_expansion);
    }

    expansionChanged(expansion: number): void {
        this.selected_expansion = Number(expansion);
        if (expansion !== this.saved_expansion) {
            this.configurationChanged();
        }
    }

    heroClassChanged(hero_class_id: number): void {
        this.selected_hero_class = Number(hero_class_id);
        if (hero_class_id !== this.saved_hero_class) {
            this.configurationChanged();
        }
    }

    talentTreeChanged(tab_index: number, tree: Array<Array<Talent>>): void {
        let points_spend = 0;
        let new_point_dist = [];
        for (let i = 0; i < tree.length; ++i)
            for (let j = 0; j < 4; ++j)
                if (!tree[i][j].is_filler) {
                    points_spend += tree[i][j].points_spend;
                    new_point_dist.push(tree[i][j].points_spend);
                }
        this.points_spend_per_tab[tab_index - 1] = points_spend;
        this.pre_selection[tab_index - 1] = new_point_dist;
        this.replaceUrl();
    }

    private configurationChanged(): void {
        this.pre_selection = [[0], [0], [0]];
        this.tree_tab1 = this.getTabTree(1);
        this.tree_tab2 = this.getTabTree(2);
        this.tree_tab3 = this.getTabTree(3);
        this.replaceUrl();
    }

    private replaceUrl(): void {
        this.router.navigate(["/tools/talents/" + this.selected_expansion.toString()
        + "/" + this.selected_hero_class.toString()
        + "/" + this.pre_selection[0].map(x => x.toString()).join("")
        + "/" + this.pre_selection[1].map(x => x.toString()).join("")
        + "/" + this.pre_selection[2].map(x => x.toString()).join("")], {replaceUrl: true})
    }

    get combinationExists(): boolean {
        return TalentViewerComponent.non_existing_combinations
            .find(([exp, hero_class]) => exp === this.selected_expansion
                && hero_class === this.selected_hero_class) === undefined;
    }

}
