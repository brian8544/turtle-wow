import {PointStyle} from "chart.js";
import {DataSet} from "../domain_value/data_set";

export function get_point_style(data_set: DataSet, icon: string = undefined): PointStyle | HTMLImageElement {
    switch (data_set) {
        case DataSet.Deaths: {
            const death_icon = new Image();
            death_icon.src = "/assets/viewer/death_icon.png";
            return death_icon;
        }
        case DataSet.Kills: {
            const kill_icon = new Image();
            kill_icon.src = "/assets/viewer/attack_icon.png";
            kill_icon.width = 20;
            kill_icon.height = 20;
            return kill_icon;
        }
        case DataSet.DispelsDone:
        case DataSet.DispelsReceived: {
            const dispel_icon = new Image();
            dispel_icon.src = "/assets/viewer/dispel_icon.png";
            dispel_icon.width = 20;
            dispel_icon.height = 20;
            return dispel_icon;
        }
        case DataSet.InterruptDone:
        case DataSet.InterruptReceived: {
            const interrupt_icon = new Image();
            interrupt_icon.src = "/assets/viewer/interrupt_icon.jpg";
            interrupt_icon.width = 20;
            interrupt_icon.height = 20;
            return interrupt_icon;
        }
        case DataSet.SpellStealDone:
        case DataSet.SpellStealReceived: {
            const spell_Steal_icon = new Image();
            spell_Steal_icon.src = "/assets/viewer/spell_steal_icon.jpg";
            spell_Steal_icon.width = 20;
            spell_Steal_icon.height = 20;
            return spell_Steal_icon;
        }
        case DataSet.SpellCasts: {
            if (!icon)
                return "circle";
            const spell_Steal_icon = new Image();
            spell_Steal_icon.src = icon;
            spell_Steal_icon.width = 20;
            spell_Steal_icon.height = 20;
            return spell_Steal_icon;
        }
    }
    return "circle";
}
