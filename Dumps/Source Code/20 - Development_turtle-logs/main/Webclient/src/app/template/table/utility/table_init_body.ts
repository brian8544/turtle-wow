import {HeaderColumn} from "../module/table_header/domain_value/header_column";
import {BodyColumn} from "../module/table_body/domain_value/body_column";

export function init_body_columns_from_result(result: any, header: Array<HeaderColumn>): Array<Array<BodyColumn>> {
    return result.map(row => {
        const body_columns: Array<BodyColumn> = [];
        header.forEach(entry => {
            let content;
            if (entry.type === 3) {
                content = row[entry.filter_name].value.toString();
            } else if (entry.type === 2) {
                const now = new Date(row[entry.filter_name] * 1000);
                content = (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() / 1000;
            } else {
                content = row[entry.filter_name] ? row[entry.filter_name].toString() : '';
            }

            body_columns.push({
                type: entry.type,
                content,
                args: null
            });
        });
        return body_columns;
    });
}
