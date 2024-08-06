export interface AdditionalButton {
    id: number;
    label: string;
    list_selection_callback: (button: AdditionalButton, selected_list: Array<any>, current_list: Array<any>, checked: boolean) => Array<any>;
}
