import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {UploadService} from "../../service/upload";
import {Severity} from "../../../../../../domain_value/severity";
import {NotificationService} from "../../../../../../service/notification";
import {DateService} from "../../../../../../service/date";
import {DataService} from "../../../../../../service/data";
import {Subscription} from "rxjs";
import {SettingsService} from "../../../../../../service/settings";

@Component({
    selector: "Upload",
    templateUrl: "./upload.html",
    styleUrls: ["./upload.scss"]
})
export class UploadComponent implements OnDestroy, OnInit {

    private subscription: Subscription;

    @ViewChild("upload_file", {static: true}) upload_file: ElementRef;
    disableSubmit = false;

    server = [];
    selected_server_id: number;
    selected_start_date: string;
    selected_end_date: string;

    current_progress: number = 0;

    constructor(
        private uploadService: UploadService,
        private notification_service: NotificationService,
        private date_service: DateService,
        private data_service: DataService,
        private settingsService: SettingsService
    ) {
        const start = new Date();
        start.setUTCHours(-24, 1, 0, 0);
        const end = new Date();
        end.setUTCHours(23 + 24, 59, 0, 0);

        this.selected_start_date = this.date_service.toRPLLLongDate(start);
        this.selected_end_date = this.date_service.toRPLLLongDate(end);

        this.subscription = this.data_service.servers.subscribe(available_servers => {
            this.server = available_servers
                .filter(server => !server.is_retail && ! server.archived)
                .sort((left, right) => left.expansion_id - right.expansion_id)
                .map(server => {
                    return {value: server.id, label_key: server.name + " (" + server.patch + ")"};
                });
            this.server.push({value: -1, label_key: "Retail Classic"});

            if (this.selected_server_id === undefined) {
                this.selected_server_id = this.server[0].value;
            }
        });

        setInterval(() => this.poll_progress(), 1000);
    }

    ngOnInit(): void {
        if (this.settingsService.check("upload_last_server")) {
            this.selected_server_id = Number(this.settingsService.get("upload_last_server"));
        }
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    upload(): void {
        if (!this.disableSubmit) {
            this.disableSubmit = true;
            this.notification_service.propagate(Severity.Info, "Uploading...");
            const formData = new FormData();
            formData.append('server_id', this.selected_server_id.toString());
            // formData.append('start_time', this.selected_start_date);
            // formData.append('end_time', this.selected_end_date);
            formData.append('payload', this.upload_file.nativeElement.files[0]);
            this.uploadService.upload_file(formData, () => {
                this.notification_service.propagate(Severity.Success, "Your log has been uploaded!");
                this.disableSubmit = false;
                this.current_progress = 0;
            }, () => {
                this.notification_service.propagate(Severity.Error, "Your log failed to upload!");
                this.disableSubmit = false;
                this.current_progress = 0;
            });
        }
    }

    selectedServerIdChanges(server_id: number): void {
        this.selected_server_id = server_id;
        this.settingsService.set("upload_last_server", server_id);
    }

    private poll_progress(): void {
        if (!this.disableSubmit)
            return;
        this.uploadService.get_progress(progress => this.current_progress = progress);
    }
}
