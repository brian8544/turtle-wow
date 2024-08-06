import {Injectable, OnDestroy} from "@angular/core";
import {APIService} from "../../../service/api";
import {Observable, of, Subject, Subscription} from "rxjs";
import {Character} from "../domain_value/character";
import {BasicCharacter} from "../domain_value/basic_character";
import {auditTime} from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class CharacterService implements OnDestroy {

    private static readonly URL_CHARACTER: string = "/armory/character/:character_id";
    private static readonly URL_BASIC_CHARACTER: string = "/armory/character/basic/:character_id";
    private static readonly URL_BASIC_CHARACTERS: string = "/armory/characters/basic";

    private subscriptions: Subscription = new Subscription();

    private cache_basic_character: Map<number, BasicCharacter> = new Map();

    private pending_basic_character: Array<[number, Subject<BasicCharacter>, number]> = [];
    private lazy_basic_characters$: Subject<void> = new Subject();

    constructor(
        private apiService: APIService
    ) {
        this.subscriptions.add(this.lazy_basic_characters$.pipe(auditTime(100)).subscribe(() => {
            const pending_basic_character = new Map();
            let any_ts = 0;
            for (const [char_id, subject, timestamp] of this.pending_basic_character) {
                any_ts = timestamp;
                pending_basic_character.set(char_id, subject);
            }
            this.pending_basic_character = [];
            this.apiService.post(CharacterService.URL_BASIC_CHARACTERS, [[...pending_basic_character.keys()], any_ts],
                characters => {
                    for (const character of characters) {
                        if (!character.spec_id)
                            character.spec_id = 0;

                        this.cache_basic_character.set(character.id, character);
                        pending_basic_character.get(character.id).next(character);
                        pending_basic_character.delete(character.id);
                    }
                    for (const [char_id, subject] of pending_basic_character.entries())
                        subject.next(this.get_default_basic_character(char_id));
                }, reason => {
                });
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe();
    }

    get_character_by_id(character_id: number): Observable<Character> {
        const subject = new Subject<Character>();

        this.apiService.get(CharacterService.URL_CHARACTER
                .replace(":character_id", character_id.toString()),
            character => subject.next(character), () => subject.next(this.get_default_character(character_id)));

        return subject;
    }

    get_basic_character_by_id(character_id: number, timestamp: number): Observable<BasicCharacter> {
        const pending = this.pending_basic_character.find(item => item[0] === character_id);
        if (pending !== undefined)
            return pending[1];
        if (this.cache_basic_character.has(character_id))
            return of(this.cache_basic_character.get(character_id));
        this.cache_basic_character.set(character_id, this.get_default_basic_character(character_id));

        const subject = new Subject<BasicCharacter>();
        this.pending_basic_character.push([character_id, subject, timestamp]);
        this.lazy_basic_characters$.next();

        /*
        this.apiService.get(CharacterService.URL_BASIC_CHARACTER
                .replace(":character_id", character_id.toString()),
            character => {
                if (!character.hero_class_id) {
                    const def_char = this.get_default_basic_character(character_id);
                    character.hero_class_id = def_char.hero_class_id;
                    character.spec_id = def_char.spec_id;
                    character.name = def_char.name;
                    character.race_id = def_char.race_id;
                }
                if (!character.spec_id)
                    character.spec_id = 0;

                this.cache_basic_character.set(character_id, character);
                subject.next(character);
            }, reason => {
                if (reason.status === 404)
                    this.cache_basic_character.set(character_id, this.get_default_basic_character(character_id));
                subject.next(this.get_default_basic_character(character_id));
            });
         */

        return subject;
    }

    get_default_character(id: number): Character {
        return {history_moments: undefined, id, last_update: undefined, server_id: 0, server_uid: 0};
    }

    get_default_basic_character(id: number): BasicCharacter {
        return {hero_class_id: 1, id, name: "Unknown", race_id: 1, server_id: 0, spec_id: 0};
    }

}
