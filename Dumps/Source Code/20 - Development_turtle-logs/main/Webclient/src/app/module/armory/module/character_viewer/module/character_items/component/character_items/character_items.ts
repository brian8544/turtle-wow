import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {CharacterViewerDto} from "../../../../domain_value/character_viewer_dto";
import {SelectOption} from "../../../../../../../../template/input/select_input/domain_value/select_option";
import {DateService} from "../../../../../../../../service/date";

@Component({
    selector: "CharacterItems",
    templateUrl: "./character_items.html",
    styleUrls: ["./character_items.scss"]
})
export class CharacterItemsComponent implements OnChanges {

    @Input() character: CharacterViewerDto;
    @Output() historyChanged: EventEmitter<number> = new EventEmitter<number>();

    selectedHistoryId: number;
    selectedHistoryEntries: Array<SelectOption>;

    constructor(
        private dateService: DateService
    ) {
    }

    ngOnChanges(): void {
        let history = this.character.history;
        history.sort((left, right) => {
            const leftNum = Number(left.label_key);
            const rightNum = Number(right.label_key);
            if (leftNum === rightNum) return 0;
            if (leftNum < rightNum) return 1;
            return -1;
        });
        history = history.map(history_moment => {
            const newHistoryMoment = history_moment;
            newHistoryMoment.label_key = this.dateService.toRPLLLongDate(Number(history_moment.label_key) * 1000);
            return newHistoryMoment;
        });
        this.selectedHistoryEntries = history;
        this.selectedHistoryId = this.character.history_id;
    }

    emitHistory(history_id: number): void {
        if (history_id === this.character.history_id)
            return;
        this.historyChanged.emit(history_id);
    }

}
