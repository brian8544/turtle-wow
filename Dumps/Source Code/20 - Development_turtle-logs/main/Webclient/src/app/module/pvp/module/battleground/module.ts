import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {BattlegroundComponent} from "./component/battleground/battleground";
import {CommonModule} from "@angular/common";
import {BattlegroundRouting} from "./routing";
import {TableModule} from "../../../../template/table/module";
import {InstanceMapModule} from "../../../../template/row_components/instance_map/module";

@NgModule({
    declarations: [BattlegroundComponent],
    imports: [
        CommonModule,
        TranslateModule,
        BattlegroundRouting,
        TableModule,
        InstanceMapModule
    ],
    exports: [BattlegroundComponent]
})
export class BattlegroundModule {
}
