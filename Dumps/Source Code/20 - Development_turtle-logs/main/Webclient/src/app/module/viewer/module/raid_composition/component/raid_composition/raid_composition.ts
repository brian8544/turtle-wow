import {Component, OnDestroy} from "@angular/core";
import {InstanceDataService} from "../../../../service/instance_data";
import {InstanceViewerParticipants} from "../../../../domain_value/instance_viewer_participants";
import {Role} from "../../../../domain_value/role";
import {Observable, Subscription} from "rxjs";
import {concatMap, map} from "rxjs/operators";
import {DataService} from "../../../../../../service/data";
import {InstanceViewerMeta} from "../../../../domain_value/instance_viewer_meta";

@Component({
    selector: "RaidComposition",
    templateUrl: "./raid_composition.html",
    styleUrls: ["./raid_composition.scss"]
})
export class RaidCompositionComponent implements OnDestroy {

    current_meta: InstanceViewerMeta;

    private subscription: Subscription;
    private subscription_server: Subscription;

    show_tanks: boolean = false;
    show_healers: boolean = false;
    show_dps: boolean = false;

    tanks: Array<Array<InstanceViewerParticipants>> = [];
    healer: Array<Array<InstanceViewerParticipants>> = [];
    dps: Array<Array<InstanceViewerParticipants>> = [];

    server_name: Observable<string>;

    constructor(
        private instanceDataService: InstanceDataService,
        private dataService: DataService
    ) {
        this.subscription = this.instanceDataService.participants.subscribe(participants => {
            this.tanks = this.create_participant_array(participants, Role.Tank);
            this.healer = this.create_participant_array(participants, Role.Healer);
            this.dps = this.create_participant_array(participants, Role.Dps);
        });
        this.server_name = this.instanceDataService.meta.pipe(
            concatMap(meta => !meta ? undefined : this.dataService.get_server_by_id(meta.server_id)),
            map(server => server?.name)
        );

        this.subscription.add(this.instanceDataService.meta.subscribe(meta => this.current_meta = meta));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.subscription_server?.unsubscribe();
    }

    get current_ts(): number {
        if (!this.current_meta)
            return 0;
        return this.current_meta.end_ts ?? this.current_meta.start_ts;
    }

    private create_participant_array(participants: Array<InstanceViewerParticipants>, role: Role): Array<Array<InstanceViewerParticipants>> {
        const result = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        for (const participant of participants.filter(i_participant => i_participant.role === role))
            result[participant.hero_class_id].push(participant);
        return result.filter(classes => classes.length > 0);
    }

}
