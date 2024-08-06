import {SelectOption} from "../../../../input/select_input/domain_value/select_option";

export interface HeaderColumn {
    index: number;
    filter_name: string;
    labelKey: string;
    // 0 => Text
    // 1 => Number
    // 2 => Date
    // 3 => Select
    type: number;
    type_range: Array<SelectOption> | null;
    col_type: number;
}
