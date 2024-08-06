import {BodyColumn} from "./body_column";

export interface BodyRow {
    color: string | null;
    columns: Array<BodyColumn>;
}
