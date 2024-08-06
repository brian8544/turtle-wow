import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Localized} from "../../../domain_value/localized";
import {BasicSpell} from "../../../domain_value/data/basic_spell";
import {map, share} from "rxjs/operators";
import {DataService} from "../../../service/data";
import {
    CONST_AUTO_ATTACK_ID,
    CONST_AUTO_ATTACK_ID_MH,
    CONST_AUTO_ATTACK_ID_OH,
    CONST_AUTO_ATTACK_LABEL,
    CONST_AUTO_ATTACK_LABEL_MH,
    CONST_AUTO_ATTACK_LABEL_OH,
    CONST_UNKNOWN_LABEL
} from "../constant/viewer";
import {School} from "../domain_value/school";
import {first_matching_primary_school} from "../../../stdlib/spell";

export interface SpellBasicInformation {
    id: number;
    name: string;
    icon: string;
    color_class: string;
    schools: Array<School>;
    basic_info: BasicSpell;
}

function default_spell_basic_information(): SpellBasicInformation {
    return {
        id: -1,
        name: CONST_UNKNOWN_LABEL,
        icon: "inv_misc_questionmark",
        color_class: "spell_school_bg_0",
        schools: [School.Physical],
        basic_info: undefined
    };
}

@Injectable({
    providedIn: "root",
})
export class SpellService {

    private server_id$: number;
    private expansion_id$: number;
    private spells$: Map<number, SpellBasicInformation> = new Map();

    constructor(
        private dataService: DataService
    ) {
        this.spells$.set(-1, default_spell_basic_information());
        this.spells$.set(CONST_AUTO_ATTACK_ID, {
            id: CONST_AUTO_ATTACK_ID,
            name: CONST_AUTO_ATTACK_LABEL,
            icon: "/assets/wow_icon/inv_sword_04.jpg",
            color_class: "spell_school_bg_0",
            schools: [School.Physical],
            basic_info: undefined
        });
        this.spells$.set(CONST_AUTO_ATTACK_ID_OH, {
            id: CONST_AUTO_ATTACK_ID_OH,
            name: CONST_AUTO_ATTACK_LABEL_OH,
            icon: "/assets/wow_icon/inv_sword_04.jpg",
            color_class: "spell_school_bg_0",
            schools: [School.Physical],
            basic_info: undefined
        });
        this.spells$.set(CONST_AUTO_ATTACK_ID_MH, {
            id: CONST_AUTO_ATTACK_ID_MH,
            name: CONST_AUTO_ATTACK_LABEL_MH,
            icon: "/assets/wow_icon/inv_sword_04.jpg",
            color_class: "spell_school_bg_0",
            schools: [School.Physical],
            basic_info: undefined
        });
    }

    static parse_school_mask(school_mask: number): Array<School> {
        const result = [];
        let school = 1;
        while (school <= 0x40) {
            if ((school & school_mask) > 0) {
                switch (school) {
                    case 1:
                        result.push(School.Physical);
                        break;
                    case 2:
                        result.push(School.Holy);
                        break;
                    case 4:
                        result.push(School.Fire);
                        break;
                    case 8:
                        result.push(School.Nature);
                        break;
                    case 16:
                        result.push(School.Frost);
                        break;
                    case 32:
                        result.push(School.Shadow);
                        break;
                    case 64:
                        result.push(School.Arcane);
                        break;
                }
            }
            school *= 2;
        }

        return result;
    }

    set_server_id(server_id: number): void {
        this.server_id$ = server_id;
    }

    set_expansion_id(expansion_id: number): void {
        this.expansion_id$ = expansion_id;
    }

    get spells(): Map<number, SpellBasicInformation> {
        return this.spells$;
    }

    get_spell_basic_information(spell_id: number): Observable<SpellBasicInformation> {
        if (this.spells$.has(spell_id))
            return of(this.spells$.get(spell_id));
        const spell_basic_info = default_spell_basic_information();
        spell_basic_info.id = spell_id;
        const res = this.get_localized_basic_spell(spell_id)
            .pipe(share(), map(spell => {
                spell_basic_info.name = spell.localization;
                spell_basic_info.icon = "/assets/wow_icon/" + spell?.base.icon + ".jpg";
                spell_basic_info.schools = SpellService.parse_school_mask(spell.base.school);
                spell_basic_info.color_class = "spell_school_bg_" + first_matching_primary_school(spell?.base.school);
                spell_basic_info.basic_info = spell.base;
                return spell_basic_info;
            }));
        res.subscribe(spell => {
            this.spells$.set(spell.id, spell);
        });
        return res;
    }

    get_localized_basic_spell(spell_id: number): Observable<Localized<BasicSpell>> {
        if (!this.server_id$)
            return of(this.dataService.unknown_basic_spell(-1));
        return this.dataService.get_localized_basic_spell(this.expansion_id$, spell_id);
    }

    get_spell_name(spell_id: number): Observable<string> {
        return this.get_spell_basic_information(spell_id)
            .pipe(map(spell => spell.name));
    }
}
