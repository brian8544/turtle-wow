import {HeaderColumn} from "../module/table_header/domain_value/header_column";

export function table_init_filter(header: Array<HeaderColumn>): any {
    const result = { page: 0 };
    header.forEach(item => result[item.filter_name] = table_create_empty_filter());
    return result;
}

export function table_create_empty_filter(): any {
    return { filter: null, sorting: null };
}
