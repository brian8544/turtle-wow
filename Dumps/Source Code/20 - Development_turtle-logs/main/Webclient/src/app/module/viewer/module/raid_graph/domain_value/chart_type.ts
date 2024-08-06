export enum ChartType {
    Line = "line",
    Bar = "bar",
    Scatter = "scatter"
}

function number_to_chart_type(input: number) {
    switch (input) {
        case 0:
            return ChartType.Line;
        case 1:
            return ChartType.Bar;
        case 2:
            return ChartType.Scatter;
    }
    return ChartType.Line;
}

function chart_type_to_number(input: ChartType) {
    switch (input) {
        case ChartType.Line:
            return 0;
        case ChartType.Bar:
            return 1;
        case ChartType.Scatter:
            return 2;
    }
    return 0;
}

export {number_to_chart_type, chart_type_to_number};
