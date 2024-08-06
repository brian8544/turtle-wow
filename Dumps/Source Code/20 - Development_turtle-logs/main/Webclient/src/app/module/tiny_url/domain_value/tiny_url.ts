export interface TinyUrl<T> {
    type_id: number;
    navigation_id: number;
    url_suffix: string;
    payload: T;
}
