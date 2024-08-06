import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class RaidMeterExportService {

    meter_selections: Map<string, number> = new Map();
    meter_selections$: Subject<[string, number]> = new Subject();

    public setMeterSelection(id: string, selection: number): void {
        this.meter_selections.set(id, selection);
    }

}
