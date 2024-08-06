import {Injectable} from "@angular/core";
import {get_creature_entry, get_unit_id, get_unit_owner, is_creature, is_player, Unit} from "../domain_value/unit";
import {combineLatest, Observable, of} from "rxjs";
import {CharacterService} from "../../armory/service/character";
import {map, share} from "rxjs/operators";
import {DataService} from "../../../service/data";
import {NPC} from "../../../domain_value/data/npc";
import {Localized} from "../../../domain_value/localized";
import {CONST_UNKNOWN_LABEL} from "../constant/viewer";
import {BasicCharacter} from "../../armory/domain_value/basic_character";

export interface UnitBasicInformation {
    id: number;
    is_player: boolean;
    name: string;
    color_class: string;
    icon: string;
    hero_class_id: number;
    is_unit_boss: boolean;
    basic_info: BasicCharacter | NPC | undefined;
}

function default_unknown_basic_information() {
    return {
        id: 0,
        is_player: false,
        name: CONST_UNKNOWN_LABEL,
        color_class: "hero_class_bg_0",
        icon: "/assets/wow_hero_classes/c1-0.png",
        hero_class_id: 0,
        is_unit_boss: false,
        basic_info: undefined
    };
}

@Injectable({
    providedIn: "root",
})
export class UnitService {

    private server_id$: number;
    private expansion_id$: number;
    private units$: Map<number, UnitBasicInformation> = new Map();

    constructor(
        private characterService: CharacterService,
        private dataService: DataService
    ) {
        this.units$.set(0, default_unknown_basic_information());
    }

    set_server_id(server_id: number): void {
        this.server_id$ = server_id;
    }

    set_expansion_id(expansion_id: number): void {
        this.expansion_id$ = expansion_id;
    }

    get units(): Map<number, UnitBasicInformation> {
        return this.units$;
    }

    get_unit_basic_information(unit: Unit, timestamp: number): Observable<UnitBasicInformation> {
        if (!!unit) {
            const unit_id = get_unit_id(unit, false);
            if (this.units$.has(unit_id))
                return of(this.units$.get(unit_id));
            const unit_basic_information = default_unknown_basic_information();
            unit_basic_information.id = unit_id;
            unit_basic_information.is_player = is_player(unit, false);
            if (unit_basic_information.is_player) {
                const res = this.characterService.get_basic_character_by_id(unit_basic_information.id, timestamp)
                    .pipe(share(), map(character => {
                        unit_basic_information.hero_class_id = character.hero_class_id;
                        unit_basic_information.color_class = "hero_class_bg_" + character.hero_class_id;
                        unit_basic_information.name = character.name;
                        unit_basic_information.basic_info = character;
                        unit_basic_information.icon = "/assets/wow_hero_classes/c" + character.hero_class_id.toString() + "-" + character.spec_id + ".png"
                        return unit_basic_information;
                    }));
                res.subscribe(unit => {
                    this.units$.set(unit.id, unit);
                });
                return res;
            } else {
                const npc = this.get_npc(get_creature_entry(unit));
                if (!!unit[3]) {
                    const owner = this.get_unit_basic_information(get_unit_owner(unit), timestamp);
                    const res = combineLatest([npc, owner]).pipe(share(), map(([i_npc, owner]) => {
                        unit_basic_information.name = i_npc.localization + " (" + owner.name + ")";
                        unit_basic_information.is_unit_boss = i_npc.base.is_boss;
                        unit_basic_information.basic_info = i_npc;
                        return unit_basic_information;
                    }));
                    res.subscribe(unit => {
                        this.units$.set(unit.id, unit);
                    });
                    return res;
                } else {
                    const res = npc.pipe(share(), map(npc => {
                        unit_basic_information.name = npc.localization;
                        unit_basic_information.is_unit_boss = npc.base.is_boss;
                        unit_basic_information.basic_info = npc;
                        return unit_basic_information;
                    }));
                    res.subscribe(unit => {
                        this.units$.set(unit.id, unit);
                    });
                    return res;
                }
            }
        }
        return of(default_unknown_basic_information());
    }

    get_unit_hero_class_id(unit: Unit, timestamp: number): Observable<number> {
        return this.get_unit_basic_information(unit, timestamp)
            .pipe(map(unit_info => unit_info.hero_class_id));
    }

    get_unit_bg_color(unit: Unit, timestamp: number): Observable<string> {
        return this.get_unit_basic_information(unit, timestamp)
            .pipe(map(unit_info => unit_info.color_class));
    }

    get_unit_icon(unit: Unit, timestamp: number): Observable<string> {
        return this.get_unit_basic_information(unit, timestamp)
            .pipe(map(unit_info => unit_info.icon));
    }

    get_unit_name(unit: Unit, timestamp: number): Observable<string> {
        return this.get_unit_basic_information(unit, timestamp)
            .pipe(map(unit_info => unit_info.name));
    }

    is_unit_boss(unit: Unit): Observable<boolean> {
        if (!!unit && is_creature(unit, false)) {
            return this.get_npc(get_creature_entry(unit))
                .pipe(map(npc => !!npc?.base.is_boss));
        }
        return of(false);
    }

    get_npc_name(npc_id: number): Observable<string | undefined> {
        return this.get_npc(npc_id)
            .pipe(map(npc => !npc ? CONST_UNKNOWN_LABEL : npc.localization));
    }

    get_npc(npc_id: number): Observable<Localized<NPC> | undefined> {
        if (npc_id === 65535) {
            return of({
                localization: "Pet",
                base: {
                    expansion_id: 0,
                    id: npc_id,
                    localization_id: 0,
                    is_boss: false,
                    friend: 0,
                    family: 0
                }
            });
        }

        if (!this.server_id$)
            return of(undefined);
        return this.dataService.get_npc(this.expansion_id$, npc_id);
    }

}
