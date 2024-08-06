import {Component, Input} from "@angular/core";
import {TalentSpecializationDto} from "../../../../domain_value/talent_specialization_dto";

@Component({
    selector: "Talents",
    templateUrl: "./talents.html",
    styleUrls: ["./talents.scss"]
})
export class TalentsComponent {

    @Input() talents: TalentSpecializationDto;
    @Input() hero_class_id: number;
    @Input() expansion_id: number;

    getTalentBreakdown(): string {
        return this.talents.description
            .split('|')
            .map(spec => [...spec]
                .map(talent => Number(talent))
                .reduce((acc, item) => acc += item))
            .join('/');
    }

    /*
     * Temporary way to provide a talent calculator
     */

    getClassTranslation(heroClassId: number): number {
        if (heroClassId > 8) // Druid
            return 9;
        return heroClassId;
    }

    convertClassId(translatedHeroClassId: number): number {
        switch (translatedHeroClassId) {
            case 6:
                return 9;
            case 11:
                return 0;
            case 3:
                return 1;
            case 8:
                return 2;
            case 2:
                return 3;
            case 5:
                return 4;
            case 4:
                return 5;
            case 7:
                return 6;
            case 9:
                return 7;
            case 1:
                return 8;
            case 26:
                return 19;
            case 31:
                return 10;
            case 23:
                return 11;
            case 28:
                return 12;
            case 22:
                return 13;
            case 25:
                return 14;
            case 24:
                return 15;
            case 27:
                return 16;
            case 29:
                return 17;
            case 21:
                return 18;
        }
        return 0;
    }

    get talentLink(): string {
        return this.talents.description.replace("|", "/").replace("|", "/")
    }
}
