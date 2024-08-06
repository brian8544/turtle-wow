import {Injectable, OnDestroy} from "@angular/core";
import {APIService} from "./api";
import {BehaviorSubject, Observable, of, Subject, Subscription} from "rxjs";
import {Localized} from "../domain_value/localized";
import {InstanceMap} from "../domain_value/instance_map";
import {auditTime, map} from "rxjs/operators";
import {AvailableServer} from "../domain_value/available_server";
import {NPC} from "../domain_value/data/npc";
import {SettingsService} from "./settings";
import {Race} from "../domain_value/race";
import {HeroClass} from "../domain_value/hero_class";
import {Difficulty} from "../domain_value/difficulty";
import {BasicItem} from "../domain_value/data/basic_item";
import {BasicSpell} from "../domain_value/data/basic_spell";
import {Encounter} from "../domain_value/data/encounter";
import {CONST_AUTO_ATTACK_LABEL, CONST_UNKNOWN_LABEL} from "../module/viewer/constant/viewer";
import {SelectOption} from "../template/input/select_input/domain_value/select_option";

@Injectable({
    providedIn: "root",
})
export class DataService implements OnDestroy {
    private static readonly URL_DATA_SERVER: string = '/data/server';
    private static readonly URL_DATA_RACE_LOCALIZED: string = '/data/race/localized';
    private static readonly URL_DATA_HERO_CLASS_LOCALIZED: string = '/data/hero_class/localized';
    private static readonly URL_DATA_DIFFICULTY_LOCALIZED: string = '/data/difficulty/localized';
    private static readonly URL_DATA_MAP_LOCALIZED: string = '/data/map/localized';
    private static readonly URL_DATA_NPC_LOCALIZED: string = '/data/npc/localized/:expansion_id/:npc_id';
    private static readonly URL_DATA_NPCS_LOCALIZED: string = '/data/npcs/localized';
    private static readonly URL_DATA_BASIC_ITEM_LOCALIZED: string = '/data/item/localized/basic_item/:expansion_id/:item_id';
    private static readonly URL_DATA_BASIC_SPELL_LOCALIZED: string = '/data/spell/localized/basic_spell/:expansion_id/:spell_id';
    private static readonly URL_DATA_BASIC_SPELLS_LOCALIZED: string = '/data/spells/localized/basic_spell';
    private static readonly URL_DATA_ENCOUNTER_LOCALIZED: string = '/data/encounter/localized';

    private subscriptions: Subscription = new Subscription();

    private maps$: BehaviorSubject<Array<Localized<InstanceMap>>>;
    private servers$: BehaviorSubject<Array<AvailableServer>>;
    private races$: BehaviorSubject<Array<Localized<Race>>>;
    private hero_classes$: BehaviorSubject<Array<Localized<HeroClass>>>;
    private difficulties$: BehaviorSubject<Array<Localized<Difficulty>>>;

    private cache_basic_spell: Map<number, Map<number, Localized<BasicSpell>>> = new Map();
    private cache_basic_item: Map<number, Map<number, BehaviorSubject<Localized<BasicItem>>>> = new Map();
    private cache_npc: Map<number, Map<number, Localized<NPC>>> = new Map();

    private cache_encounters: Array<Localized<Encounter>>;
    private pending_encounter$: Subject<Array<Localized<Encounter>>>;

    private pending_npcs: Array<[number, Subject<Localized<NPC>>]> = [];
    private lazy_npcs$: Subject<number> = new Subject();

    private pending_basic_spells: Array<[number, Subject<Localized<BasicSpell>>]> = [];
    private lazy_basic_spells$: Subject<number> = new Subject();

    public readonly spec_mapping: Map<number, [number, number, string]> = new Map([
        [1, [1, 0, "Warrior - Unknown"]],
        [2, [1, 1, "Arms"]],
        [3, [1, 2, "Fury"]],
        [4, [1, 3, "Protection"]],
        [5, [2, 0, "Paladin - Unknown"]],
        [6, [2, 1, "Holy"]],
        [7, [2, 2, "Protection"]],
        [8, [2, 3, "Retribution"]],
        [9, [3, 0, "Hunter - Unknown"]],
        [10, [3, 1, "Beast Mastery"]],
        [11, [3, 2, "Marksmanship"]],
        [12, [3, 3, "Survival"]],
        [13, [4, 0, "Rogue - Unknown"]],
        [14, [4, 1, "Assassination"]],
        [15, [4, 2, "Combat"]],
        [16, [4, 3, "Subtlety"]],
        [17, [5, 0, "Priest - Unknown"]],
        [18, [5, 1, "Discipline"]],
        [19, [5, 2, "Holy"]],
        [20, [5, 3, "Shadow"]],
        [21, [6, 0, "Death knight - Unknown"]],
        [22, [6, 1, "Blood"]],
        [23, [6, 2, "Frost"]],
        [24, [6, 3, "Unholy"]],
        [25, [7, 0, "Shaman - Unknown"]],
        [26, [7, 1, "Elemental"]],
        [27, [7, 2, "Enhancement"]],
        [28, [7, 3, "Restoration"]],
        [29, [8, 0, "Mage - Unknown"]],
        [30, [8, 1, "Arcane"]],
        [31, [8, 2, "Fire"]],
        [32, [8, 3, "Frost"]],
        [33, [9, 0, "Warlock - Unknown"]],
        [34, [9, 1, "Affliction"]],
        [35, [9, 2, "Demonology"]],
        [36, [9, 3, "Destruction"]],
        [37, [11, 0, "Druid - Unknown"]],
        [38, [11, 1, "Balance"]],
        [39, [11, 2, "Feral Combat"]],
        [40, [11, 3, "Restoration"]],
    ]);

    constructor(
        private apiService: APIService,
        private settingsService: SettingsService
    ) {
        for (let i = 1; i < 10; ++i) {
            this.cache_basic_spell.set(i, new Map());
            this.cache_basic_item.set(i, new Map());
            this.cache_npc.set(i, new Map());
        }

        this.subscriptions.add(this.lazy_npcs$.pipe(auditTime(100)).subscribe(expansion_id => {
            const pending_npcs = new Map(this.pending_npcs);
            this.pending_npcs = [];
            this.apiService.post(DataService.URL_DATA_NPCS_LOCALIZED, {
                    expansion_id,
                    npc_ids: [...pending_npcs.keys()]
                },
                npcs => {
                    for (const npc of npcs) {
                        this.cache_npc.get(expansion_id).set(npc.base.id, npc);
                        pending_npcs.get(npc.base.id).next(npc);
                        pending_npcs.delete(npc.base.id);
                    }
                    for (const [id, subject] of pending_npcs.entries())
                        subject.next(this.get_unknown_npc(expansion_id, id));
                }, reason => {
                });
        }));

        this.subscriptions.add(this.lazy_basic_spells$.pipe(auditTime(100)).subscribe(expansion_id => {
            const pending_basic_spells = new Map(this.pending_basic_spells);
            this.pending_basic_spells = [];
            this.apiService.post(DataService.URL_DATA_BASIC_SPELLS_LOCALIZED, {
                    expansion_id,
                    spell_ids: [...pending_basic_spells.keys()]
                },
                spells => {
                    for (const spell of spells) {
                        this.cache_basic_spell.get(expansion_id).set(spell.base.id, spell);
                        pending_basic_spells.get(spell.base.id).next(spell);
                        pending_basic_spells.delete(spell.base.id);
                    }
                    for (const [, subject] of pending_basic_spells.entries())
                        subject.next(this.unknown_basic_spell(-1));
                }, reason => {
                });
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
    }

    get expansions(): Array<SelectOption> {
        return [
            {label_key: "Vanilla (1.12.1)", value: 1},
            {label_key: "TBC (2.4.3)", value: 2},
            {label_key: "WotLK (3.3.5)", value: 3},
        ];
    }

    get specs(): Array<SelectOption> {
        return [...this.spec_mapping.entries()].map(([spec_id, meta]) => {
            return {value: spec_id, label_key: meta[2]};
        });
    }

    get ranking_seasons(): Array<SelectOption> {
        const first_season_year = 2020;
        const first_season_month = 1;
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const months_since_start = (year - first_season_year) * 12 - first_season_month + month;
        const num_ranking_seasons = ((months_since_start + 1) / 3);

        const result = [];
        for (let i = 0; i < num_ranking_seasons; ++i)
            result.push({
                label_key: "Season Q" + ((i % 4) + 1).toString() + " " + (first_season_year + Math.floor(i / 4)).toString(),
                value: (i + 1)
            });
        return result;
    }

    get servers(): Observable<Array<AvailableServer>> {
        this.servers$ = this.settingsService.init_or_load_behavior_subject("data_service_servers", 1, this.servers$, [],
            (callback) => this.apiService.get(DataService.URL_DATA_SERVER, callback));
        return this.servers$.asObservable().pipe(map(result => result.sort((left, right) => left.id - right.id)));
    }

    get races(): Observable<Array<Localized<Race>>> {
        this.races$ = this.settingsService.init_or_load_behavior_subject("data_service_races", 7, this.races$, [],
            (callback) => this.apiService.get(DataService.URL_DATA_RACE_LOCALIZED, callback));
        return this.races$.asObservable().pipe(map(result => result.sort((left, right) => left.base.id - right.base.id)));
    }

    get hero_classes(): Observable<Array<Localized<HeroClass>>> {
        this.hero_classes$ = this.settingsService.init_or_load_behavior_subject("data_service_hero_classes", 7, this.hero_classes$, [],
            (callback) => this.apiService.get(DataService.URL_DATA_HERO_CLASS_LOCALIZED, callback));
        return this.hero_classes$.asObservable().pipe(map(result => result.sort((left, right) => left.base.id - right.base.id)));
    }

    get difficulties(): Observable<Array<Localized<Difficulty>>> {
        this.difficulties$ = this.settingsService.init_or_load_behavior_subject("data_service_difficulties", 7, this.difficulties$, [],
            (callback) => this.apiService.get(DataService.URL_DATA_DIFFICULTY_LOCALIZED, callback));
        return this.difficulties$.asObservable().pipe(map(result => result.sort((left, right) => left.base.id - right.base.id)));
    }

    get maps(): Observable<Array<Localized<InstanceMap>>> {
        this.maps$ = this.settingsService.init_or_load_behavior_subject("data_service_maps", 7, this.maps$, [],
            (callback) => this.apiService.get(DataService.URL_DATA_MAP_LOCALIZED, callback));
        return this.maps$.asObservable().pipe(map(result => result.sort((left, right) => left.base.id - right.base.id)));
    }

    get encounters(): Observable<Array<Localized<Encounter>>> {
        if (!!this.pending_encounter$)
            return this.pending_encounter$.asObservable();
        if (!!this.cache_encounters) {
            return of(this.cache_encounters);
        }

        const subject: Subject<Array<Localized<Encounter>>> = new Subject();
        this.pending_encounter$ = subject;
        this.apiService.get(DataService.URL_DATA_ENCOUNTER_LOCALIZED, result => {
            this.cache_encounters = result.sort((left, right) => left.base.id - right.base.id);
            subject.next(this.cache_encounters);
            this.pending_encounter$ = undefined;
        });
        return subject.asObservable();
    }

    get_npc(expansion_id: number, npc_id: number): Observable<Localized<NPC>> {
        const pending = this.pending_npcs.find(item => item[0] === npc_id);
        if (pending !== undefined)
            return pending[1];
        if (this.cache_npc.get(expansion_id).has(npc_id))
            return of(this.cache_npc.get(expansion_id).get(npc_id));
        this.cache_npc.get(expansion_id).set(npc_id, this.get_unknown_npc(expansion_id, npc_id));

        const subject = new Subject<Localized<NPC>>();
        this.pending_npcs.push([npc_id, subject]);
        this.lazy_npcs$.next(expansion_id);

        /*
        this.apiService.get(DataService.URL_DATA_NPC_LOCALIZED
                .replace(":expansion_id", expansion_id.toString())
                .replace(":npc_id", npc_id.toString()),
            npc => {
                this.cache_npc.get(expansion_id).set(npc_id, npc);
                subject.next(npc);
            }, reason => {
                if (reason.status === 404)
                    this.cache_npc.get(expansion_id).set(npc_id, this.get_unknown_npc(expansion_id, npc_id));
                subject.next(this.get_unknown_npc(expansion_id, npc_id));
            });
         */
        return subject;
    }

    get_localized_basic_item(expansion_id: number, item_id: number): Observable<Localized<BasicItem>> {
        if (this.cache_basic_item.get(expansion_id).has(item_id))
            return this.cache_basic_item.get(expansion_id).get(item_id);
        const subject = new BehaviorSubject<Localized<BasicItem>>(this.get_unknown_basic_item(item_id));
        this.cache_basic_item.get(expansion_id).set(item_id, subject);

        this.apiService.get(DataService.URL_DATA_BASIC_ITEM_LOCALIZED
                .replace(":expansion_id", expansion_id.toString())
                .replace(":item_id", item_id.toString()),
            item => {
                subject.next(item);
            });

        return subject;
    }

    get_localized_basic_spell(expansion_id: number, spell_id: number): Observable<Localized<BasicSpell>> {
        const pending = this.pending_basic_spells.find(item => item[0] === spell_id);
        if (pending !== undefined)
            return pending[1];
        if (this.cache_basic_spell.get(expansion_id).has(spell_id))
            return of(this.cache_basic_spell.get(expansion_id).get(spell_id));
        this.cache_basic_spell.get(expansion_id).set(spell_id, this.unknown_basic_spell(spell_id));

        const subject = new Subject<Localized<BasicSpell>>();
        if (spell_id > 0) {
            this.pending_basic_spells.push([spell_id, subject]);
            this.lazy_basic_spells$.next(expansion_id);
        } else {
            return of(this.unknown_basic_spell(spell_id));
        }

        /*
        this.apiService.get(DataService.URL_DATA_BASIC_SPELL_LOCALIZED
                .replace(":expansion_id", expansion_id.toString())
                .replace(":spell_id", spell_id.toString()),
            spell => {
                this.cache_basic_spell.get(expansion_id).set(spell_id, spell);
                subject.next(spell);
            }, reason => {
                if (reason.status === 404)
                    this.cache_basic_spell.get(expansion_id).set(spell_id, this.unknown_basic_spell);
                subject.next(this.unknown_basic_spell);
            });
         */

        return subject;
    }

    get_maps_by_type(map_type: number): Observable<Array<Localized<InstanceMap>>> {
        return this.maps
            .pipe(map(maps => maps.filter(inner_map => inner_map.base.map_type === map_type)));
    }

    get_map_name_by_id(map_id: number): Observable<string> {
        return this.maps
            .pipe(
                map(maps => maps.find(inner_map => inner_map.base.id === map_id)),
                map(inner_map => !!inner_map ? inner_map.localization : '')
            );
    }

    get_server_by_id(server_id: number): Observable<AvailableServer> {
        return this.servers
            .pipe(map(servers => servers.find(server => server.id === server_id)));
    }

    get_encounter(encounter_id: number): Observable<Localized<Encounter> | undefined> {
        return this.encounters
            .pipe(map(encounters => encounters.find(encounter => encounter.base.id === encounter_id)));
    }

    unknown_basic_spell(spell_id: number): Localized<BasicSpell> {
        return {
            localization: spell_id === 0 ? CONST_AUTO_ATTACK_LABEL : CONST_UNKNOWN_LABEL,
            base: {
                school: 1,
                icon: "inv_misc_questionmark",
                id: 0
            }
        };
    }

    get_unknown_basic_item(item_id: number): Localized<BasicItem> {
        return {
            localization: CONST_UNKNOWN_LABEL,
            base: {
                icon: "inv_misc_questionmark",
                id: item_id,
                quality: 0
            }
        };
    }

    get_unknown_npc(expansion_id: number, npc_id: number): Localized<NPC> {
        return {
            localization: CONST_UNKNOWN_LABEL,
            base: {
                id: npc_id,
                expansion_id,
                localization_id: 0,
                is_boss: false,
                friend: 0,
                family: 0
            }
        };
    }
}
