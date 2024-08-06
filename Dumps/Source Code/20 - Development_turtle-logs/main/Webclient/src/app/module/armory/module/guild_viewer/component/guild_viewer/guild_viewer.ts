import {Component} from "@angular/core";
import {GuildViewerDto} from "../../domain_value/guild_viewer_dto";
import {ActivatedRoute, Router} from "@angular/router";
import {GuildViewerService} from "../../service/guild_viewer";
import {SpeedKillService} from "../../../../../pve/module/speed_kill/service/speed_kill";
import {SpeedRunService} from "../../../../../pve/module/speed_run/service/speed_run";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: "GuildViewer",
    templateUrl: "./guild_viewer.html",
    styleUrls: ["./guild_viewer.scss"],
    providers: [
        SpeedKillService,
        SpeedRunService
    ]
})
export class GuildViewerComponent {

    guild: GuildViewerDto;
    server_name: string = '';

    constructor(
        private routerService: Router,
        private activatedRouteService: ActivatedRoute,
        private guildViewerService: GuildViewerService,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.activatedRouteService.paramMap.subscribe(params => {
            this.server_name = params.get('server_name');
            this.guildViewerService.get_guild_view(this.server_name, params.get('guild_name'), result => {
                this.guild = result;
                this.metaService.updateTag({name: 'description', content: "Recent raids, speed kills, speed runs and guild roster overview of the guild " + this.guild.guild_name + " on " + this.server_name + "."});
                this.titleService.setTitle(this.guild.guild_name + " - " + this.server_name);
            }, () => {
                this.routerService.navigate(['/404']);
            });
        });
    }
}
