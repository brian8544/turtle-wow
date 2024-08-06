import {Injectable} from "@angular/core";
import {APIService} from "../../../../../../../service/api";

@Injectable({
    providedIn: "root",
})
export class GuildRosterService {
    private static readonly URL_ARMORY_GUILD_ROSTER: string = "/armory/guild_roster/{guild_id}";

    constructor(
        private apiService: APIService
    ) {
    }

    get_guild_roster(guild_id: number, on_success: any, on_failure: any): void {
        this.apiService.get(GuildRosterService.URL_ARMORY_GUILD_ROSTER.replace("{guild_id}", guild_id.toString()),
            result => on_success.call(on_success, result), on_failure);
    }
}
