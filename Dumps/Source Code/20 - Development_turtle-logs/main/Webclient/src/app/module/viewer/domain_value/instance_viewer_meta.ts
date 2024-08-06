import {InstanceViewerGuild} from "./instance_viewer_guild";

export interface InstanceViewerMeta {
    instance_meta_id: number;
    guild: InstanceViewerGuild | null;
    server_id: number;
    expansion_id: number;
    map_id: number;
    map_difficulty: number | null;
    start_ts: number;
    end_ts: number | null;
    expired: number | null;
    upload_id: number;
}
