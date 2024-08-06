import {Component, OnDestroy, OnInit} from "@angular/core";
import {ChartDataSets, ChartOptions, ChartPoint} from 'chart.js';
import {Color} from 'ng2-charts';
import {GraphDataService} from "../../service/graph_data";
import {DataSet, is_event_data_set} from "../../domain_value/data_set";
import {DateService} from "../../../../../../service/date";
import {SettingsService} from "src/app/service/settings";
import {Subscription} from "rxjs";
import {chart_type_to_number, ChartType, number_to_chart_type} from "../../domain_value/chart_type";
import {get_point_style} from "../../stdlib/data_set_helper";
import {InstanceDataService} from "../../../../service/instance_data";
import {KnechtUpdates} from "../../../../domain_value/knecht_updates";
import {auditTime, map} from "rxjs/operators";
import {UnitService} from "../../../../service/unit";
import {CONST_UNKNOWN_LABEL} from "../../../../constant/viewer";
import {DelayedLabel} from "../../../../../../stdlib/delayed_label";
import {DataService} from "../../../../../../service/data";
import "chartjs-plugin-zoom";
import {CommunicationEvent} from "../../../../domain_value/communication_event";
import {SpellService} from "../../../../service/spell";

@Component({
    selector: "RaidGraph",
    templateUrl: "./raid_graph.html",
    styleUrls: ["./raid_graph.scss"]
})
export class RaidGraphComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private subscription_events: Subscription;
    private zoom_boundaries = [undefined, undefined];

    chartDataSets: Array<ChartDataSets> = [];
    chartLabels: any = [];
    chartOptions: ChartOptions = {
        tooltips: {
            callbacks: {
                title: (item: Array<Chart.ChartTooltipItem>, data: Chart.ChartData): string | Array<string> => {
                    return this.dateService.toRPLLTimePrecise(Number(item[0].label));
                },
                label: (item: Chart.ChartTooltipItem, data: Chart.ChartData): string | Array<string> => {
                    // @ts-ignore
                    return !!data.datasets[item.datasetIndex].data[item.index].custom_label ? data.datasets[item.datasetIndex].data[item.index].custom_label.toString() : this.format_number(item.value);
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        elements: {
            line: {
                tension: 0,
                borderWidth: 1,
                fill: false
            },
            point: {
                borderWidth: 1,
                radius: 2,
                hoverRadius: 10
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    autoSkipPadding: 25,
                    callback: (value, index, values) => {
                        return this.dateService.toRPLLTime(value);
                    },
                    min: 0,
                    max: 400,
                    stepSize: 10
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        hover: {
            intersect: false,
            mode: "point"
        },
        animation: {
            duration: 0
        },
        plugins: {
            zoom: {
                zoom: {
                    enabled: true,
                    drag: true,
                    mode: 'x',
                    sensitivity: 1,
                    onZoomComplete: () => {
                        if (!!this.zoom_boundaries[0] && !!this.zoom_boundaries[1]) {
                            if (this.zoom_boundaries[0] <= this.zoom_boundaries[1])
                                this.instanceDataService.communicator.next([CommunicationEvent.GraphBoundaries, [...this.zoom_boundaries]]);
                            else
                                this.instanceDataService.communicator.next([CommunicationEvent.GraphBoundaries, [this.zoom_boundaries[1], this.zoom_boundaries[0]]]);
                            this.zoom_boundaries = [undefined, undefined];
                        }
                    }
                }
            }
        }
    };

    colors: Array<String> = ["#5d8aa8", "#f0f8ff", "#e32636", "#efdecd", "#e52b50", "#ffbf00", "#ff033e", "#9966cc", "#a4c639", "#f2f3f4", "#cd9575", "#915c83", "#faebd7", "#008000", "#8db600", "#fbceb1", "#00ffff", "#7fffd4", "#4b5320", "#e9d66b", "#b2beb5", "#87a96b", "#ff9966", "#a52a2a", "#fdee00", "#6e7f80", "#ff2052", "#007fff", "#f0ffff", "#89cff0", "#a1caf1", "#f4c2c2", "#21abcd", "#fae7b5", "#ffe135", "#848482", "#98777b", "#bcd4e6", "#9f8170", "#f5f5dc", "#ffe4c4", "#3d2b1f", "#fe6f5e", "#000000", "#ffebcd", "#318ce7", "#ace5ee", "#faf0be", "#0000ff", "#a2a2d0", "#6699cc", "#0d98ba", "#8a2be2", "#8a2be2", "#de5d83", "#79443b", "#0095b6", "#e3dac9", "#cc0000", "#006a4e", "#873260", "#0070ff", "#b5a642", "#cb4154", "#1dacd6", "#66ff00", "#bf94e4", "#c32148", "#ff007f", "#08e8de", "#d19fe8", "#f4bbff", "#ff55a3", "#fb607f", "#004225", "#cd7f32", "#a52a2a", "#ffc1cc", "#e7feff", "#f0dc82", "#480607", "#800020", "#deb887", "#cc5500", "#e97451", "#8a3324", "#bd33a4", "#702963", "#007aa5", "#e03c31", "#536872", "#5f9ea0", "#91a3b0", "#006b3c", "#ed872d", "#e30022", "#fff600", "#a67b5b", "#4b3621", "#1e4d2b", "#a3c1ad", "#c19a6b", "#78866b", "#ffff99", "#ffef00", "#ff0800", "#e4717a", "#00bfff", "#592720", "#c41e3a", "#00cc99", "#ff0040", "#eb4c42", "#ff0038", "#ffa6c9", "#b31b1b", "#99badd", "#ed9121", "#ace1af", "#b2ffff", "#4997d0", "#de3163", "#ec3b83", "#007ba7", "#2a52be", "#a0785a", "#fad6a5", "#36454f", "#7fff00", "#de3163", "#ffb7c5", "#cd5c5c", "#d2691e", "#ffa700", "#98817b", "#e34234", "#d2691e", "#e4d00a", "#fbcce7", "#0047ab", "#d2691e", "#6f4e37", "#9bddff", "#002e63", "#8c92ac", "#b87333", "#996666", "#ff3800", "#ff7f50", "#f88379", "#ff4040", "#893f45", "#fbec5d", "#b31b1b", "#9aceeb", "#6495ed", "#fff8dc", "#fff8e7", "#ffbcd9", "#fffdd0", "#dc143c", "#990000", "#be0032", "#00ffff", "#ffff31", "#f0e130", "#00008b", "#654321", "#5d3954", "#a40000", "#08457e", "#986960", "#cd5b45", "#008b8b", "#536878", "#b8860b", "#a9a9a9", "#013220", "#1a2421", "#bdb76b", "#483c32", "#734f96", "#8b008b", "#003366", "#556b2f", "#ff8c00", "#9932cc", "#779ecb", "#03c03c", "#966fd6", "#c23b22", "#e75480", "#003399", "#872657", "#8b0000", "#e9967a", "#560319", "#8fbc8f", "#3c1414", "#483d8b", "#2f4f4f", "#177245", "#918151", "#ffa812", "#483c32", "#cc4e5c", "#00ced1", "#9400d3", "#00693e", "#555555", "#d70a53", "#a9203e", "#ef3038", "#e9692c", "#da3287", "#fad6a5", "#b94e48", "#704241", "#c154c1", "#004b49", "#9955bb", "#cc00cc", "#ffcba4", "#ff1493", "#ff9933", "#00bfff", "#1560bd", "#c19a6b", "#edc9af", "#696969", "#1e90ff", "#d71868", "#85bb65", "#967117", "#00009c", "#e1a95f", "#c2b280", "#614051", "#f0ead6", "#1034a6", "#7df9ff", "#ff003f", "#00ffff", "#00ff00", "#6f00ff", "#f4bbff", "#ccff00", "#bf00ff", "#3f00ff", "#8f00ff", "#ffff00", "#50c878", "#96c8a2", "#c19a6b", "#801818", "#ff00ff", "#b53389", "#f400a1", "#e5aa70", "#4d5d53", "#71bc78", "#4f7942", "#ff2800", "#6c541e", "#ce2029", "#b22222", "#e25822", "#fc8eac", "#f7e98e", "#eedc82", "#fffaf0", "#ffbf00", "#ff1493", "#ccff00", "#ff004f", "#228b22", "#a67b5b", "#0072bb", "#86608e", "#f64a8a", "#ff00ff", "#ff77ff", "#e48400", "#cc6666", "#dcdcdc", "#e49b0f", "#f8f8ff", "#b06500", "#6082b6", "#e6e8fa", "#ffd700", "#996515", "#fcc200", "#ffdf00", "#daa520", "#a8e4a0", "#808080", "#465945", "#00ff00", "#1164b4", "#adff2f", "#a99a86", "#00ff7f", "#663854", "#446ccf", "#5218fa", "#e9d66b", "#3fff00", "#c90016", "#da9100", "#808000", "#df73ff", "#f400a1", "#f0fff0", "#49796b", "#ff1dce", "#ff69b4", "#355e3b", "#fcf75e", "#b2ec5d", "#138808", "#cd5c5c", "#e3a857", "#4b0082", "#002fa7", "#ff4f00", "#5a4fcf", "#f4f0ec", "#009000", "#fffff0", "#00a86b", "#f8de7e", "#d73b3e", "#a50b5e", "#fada5e", "#bdda57", "#29ab87", "#e8000d", "#4cbb17", "#c3b091", "#087830", "#d6cadd", "#26619c", "#fefe22", "#a9ba9d", "#cf1020", "#e6e6fa", "#ccccff", "#fff0f5", "#c4c3d0", "#9457eb", "#ee82ee", "#e6e6fa", "#fbaed2", "#967bb6", "#fba0e3", "#7cfc00", "#fff700", "#fff44f", "#fffacd", "#bfff00", "#f56991", "#e68fac", "#fdd5b1", "#add8e6", "#b5651d", "#e66771", "#f08080", "#93ccea", "#e0ffff", "#f984ef", "#fafad2", "#d3d3d3", "#90ee90", "#f0e68c", "#b19cd9", "#ffb6c1", "#ffa07a", "#ff9999", "#20b2aa", "#87cefa", "#778899", "#b38b6d", "#ffffed", "#c8a2c8", "#bfff00", "#32cd32", "#195905", "#faf0e6", "#c19a6b", "#534b4f", "#e62020", "#18453b", "#ffbd88", "#ff00ff", "#aaf0d1", "#f8f4ff", "#c04000", "#fbec5d", "#6050dc", "#0bda51", "#979aaa", "#ff8243", "#74c365", "#800000", "#e0b0ff", "#915f6d", "#ef98aa", "#73c2fb", "#e5b73b", "#0067a5", "#66ddaa", "#0000cd", "#e2062c", "#af4035", "#f3e5ab", "#035096", "#1c352d", "#dda0dd", "#ba55d3", "#9370db", "#bb3385", "#3cb371", "#7b68ee", "#c9dc87", "#00fa9a", "#674c47", "#0054b4", "#48d1cc", "#c71585", "#fdbcb4", "#191970", "#004953", "#ffc40c", "#3eb489", "#f5fffa", "#98ff98", "#ffe4e1", "#faebd7", "#967117", "#73a9c2", "#ae0c00", "#addfad", "#30ba8f", "#997a8d", "#c54b8c", "#f2f3f4", "#ffdb58", "#21421e", "#f6adc6", "#2a8000", "#fada5e", "#ffdead", "#000080", "#ffa343", "#fe59c2", "#39ff14", "#a4dded", "#059033", "#0077be", "#cc7722", "#008000", "#cfb53b", "#fdf5e6", "#796878", "#673147", "#c08081", "#808000", "#6b8e23", "#bab86c", "#9ab973", "#0f0f0f", "#b784a7", "#ffa500", "#f8d568", "#ff9f00", "#ff4500", "#da70d6", "#654321", "#414a4c", "#ff6e4a", "#002147", "#1ca9c9", "#006600", "#273be2", "#682860", "#bcd4e6", "#afeeee", "#987654", "#af4035", "#9bc4e2", "#ddadaf", "#da8a67", "#abcdef", "#e6be8a", "#eee8aa", "#98fb98", "#dcd0ff", "#f984e5", "#fadadd", "#dda0dd", "#db7093", "#96ded1", "#c9c0bb", "#ecebbd", "#bc987e", "#db7093", "#78184a", "#ffefd5", "#50c878", "#aec6cf", "#836953", "#cfcfc4", "#77dd77", "#f49ac2", "#ffb347", "#ffd1dc", "#b39eb5", "#ff6961", "#cb99c9", "#fdfd96", "#800080", "#536878", "#ffe5b4", "#ffdab9", "#fadfad", "#d1e231", "#eae0c8", "#88d8c0", "#e6e200", "#ccccff", "#1c39bb", "#32127a", "#d99058", "#f77fbe", "#701c1c", "#cc3333", "#fe28a2", "#df00ff", "#000f89", "#123524", "#fddde6", "#01796f", "#ffc0cb", "#fc74fd", "#f78fa7", "#e7accf", "#93c572", "#e5e4e2", "#dda0dd", "#ff5a36", "#b0e0e6", "#ff8f00", "#003153", "#df00ff", "#cc8899", "#ff7518", "#800080", "#69359c", "#9d81ba", "#9678b6", "#fe4eda", "#50404d", "#5d8aa8", "#ff355e", "#e30b5d", "#915f6d", "#e25098", "#b3446c", "#d68a59", "#ff33cc", "#e3256b", "#ff0000", "#ff5349", "#a52a2a", "#c71585", "#004040", "#d70040", "#0892d0", "#b666d2", "#b03060", "#414833", "#1fcecb", "#ff007f", "#f9429e", "#674846", "#b76e79", "#e32636", "#ff66cc", "#aa98a9", "#905d5d", "#ab4e52", "#65000b", "#d40000", "#bc8f8f", "#0038a8", "#4169e1", "#ca2c92", "#7851a9", "#e0115f", "#ff0028", "#bb6528", "#e18e96", "#a81c07", "#80461b", "#b7410e", "#00563f", "#8b4513", "#ff6700", "#f4c430", "#23297a", "#ff8c69", "#ff91a4", "#c2b280", "#967117", "#ecd540", "#f4a460", "#967117", "#507d2a", "#0f52ba", "#cba135", "#ff2400", "#ffd800", "#76ff7a", "#006994", "#2e8b57", "#321414", "#fff5ee", "#ffba00", "#704214", "#8a795d", "#45cea2", "#009e60", "#fc0fc0", "#882d17", "#c0c0c0", "#cb410b", "#007474", "#87ceeb", "#cf71af", "#6a5acd", "#708090", "#003399", "#933d41", "#100c08", "#fffafa", "#0fc0fc", "#a7fc00", "#00ff7f", "#4682b4", "#fada5e", "#990000", "#008080", "#e4d96f", "#ffcc33", "#fad6a5", "#fd5e53", "#d2b48c", "#f94d00", "#f28500", "#ffcc00", "#483c32", "#8b8589", "#cd5700", "#d0f0c0", "#f4c2c2", "#008080", "#367588", "#006d5b", "#e2725b", "#d8bfd8", "#de6fa1", "#fc89ac", "#0abab5", "#e08d3c", "#dbd7d2", "#eee600", "#ff6347", "#746cc0", "#ffc87c", "#fd0e35", "#808080", "#00755e", "#0073cf", "#417dc1", "#deaa88", "#b57281", "#30d5c8", "#00ffef", "#a0d6b4", "#66424d", "#8a496b", "#66023c", "#0033aa", "#d9004c", "#536895", "#ffb300", "#3cd070", "#014421", "#7b1113", "#990000", "#ffcc00", "#8878c3", "#ff6fff", "#120a8f", "#4166f5", "#635147", "#5b92e5", "#b78727", "#ffff66", "#ae2029", "#e1ad21", "#d3003f", "#f3e5ab", "#c5b358", "#c80815", "#43b3ae", "#e34234", "#a020f0", "#ee82ee", "#324ab2", "#f75394", "#40826d", "#922724", "#9f1d35", "#da1d81", "#ffa089", "#9f00ff", "#004242", "#00ffff", "#645452", "#f5deb3", "#ffffff", "#f5f5f5", "#ff43a4", "#fc6c85", "#a2add0", "#722f37", "#c9a0dc", "#738678", "#0f4d92", "#ffff00", "#ffae42", "#9acd32", "#0014a8", "#2c1608"];
    chartColors: Array<Color> = [
        {
            backgroundColor: '#ab0000',
            borderColor: '#ab0000',
        },
        {
            backgroundColor: '#b47400',
            borderColor: '#b47400',
        },
        {
            backgroundColor: '#afb400',
            borderColor: '#afb400',
        },
        {
            backgroundColor: '#35b400',
            borderColor: '#35b400',
        },
        {
            backgroundColor: '#009fb4',
            borderColor: '#009fb4',
        },
        {
            backgroundColor: '#009fb4',
            borderColor: '#009fb4',
        },
        {
            backgroundColor: '#005fb4',
            borderColor: '#005fb4',
        },
        {
            backgroundColor: '#8400b4',
            borderColor: '#8400b4',
        },
        {
            backgroundColor: '#cbd868',
            borderColor: '#cbd868',
        },
        {
            backgroundColor: '#d8c168',
            borderColor: '#d8c168',
        },
        {
            backgroundColor: '#7668d8',
            borderColor: '#7668d8',
        },
        {
            backgroundColor: '#c7735d',
            borderColor: '#c7735d',
        }
    ];

    dataSets = [
        {id: DataSet.DamageDone, label: "Damage done"},
        {id: DataSet.DamageTaken, label: "Damage taken"},
        {id: DataSet.TotalHealingDone, label: "Total healing done"},
        {id: DataSet.TotalHealingTaken, label: "Total healing taken"},
        {id: DataSet.EffectiveHealingDone, label: "Effective healing done"},
        {id: DataSet.EffectiveHealingTaken, label: "Effective healing taken"},
        {id: DataSet.OverhealingDone, label: "Overhealing done"},
        {id: DataSet.OverhealingTaken, label: "Overhealing taken"},
        {id: DataSet.AbsorbDone, label: "Absorb done"},
        {id: DataSet.AbsorbTaken, label: "Absorb taken"},
        {id: DataSet.HealAndAbsorbDone, label: "Efficient heal and absorb done"},
        {id: DataSet.HealAndAbsorbTaken, label: "Efficient heal and absorb taken"},
        {id: DataSet.ThreatDone, label: "Threat done"},
        {id: DataSet.ThreatTaken, label: "Threat taken"},
    ];
    dataSetsSelected = [];
    selectedDataSets: Set<DataSet> = new Set();

    events = [
        {id: DataSet.Deaths, label: "Deaths"},
        {id: DataSet.Kills, label: "Kills"},
        {id: DataSet.DispelsDone, label: "Dispels done"},
        {id: DataSet.DispelsReceived, label: "Dispels received"},
        {id: DataSet.InterruptDone, label: "Interrupt done"},
        {id: DataSet.InterruptReceived, label: "Interrupt received"},
        {id: DataSet.SpellStealDone, label: "Spell steal done"},
        {id: DataSet.SpellStealReceived, label: "Spell steal received"},
    ];
    eventsSelected = [];
    selectedEvents: Set<DataSet> = new Set();

    chartTypes = [
        {value: 0, label_key: "Line Chart"},
        {value: 1, label_key: "Bar Chart"},
        {value: 2, label_key: "Scatter Chart"},
    ];
    selected_chart_type: number = 0;

    sourceAbilities = [];
    selectedSourceAbilities: Array<any> = [];

    targetAbilities = [];
    selectedTargetAbilities: Array<any> = [];

    sourceSpellCastAbilities = [];
    selectedSourceSpellCastAbilities: Array<any> = [];

    graph_min: number = 0;
    graph_max: number = 1;

    expansion_id: number = 1;

    constructor(
        public graphDataService: GraphDataService,
        private dateService: DateService,
        private settingsService: SettingsService,
        private instanceDataService: InstanceDataService,
        private unitService: UnitService,
        private spellService: SpellService,
        private dataService: DataService
    ) {
        this.instanceDataService.meta.subscribe(meta => {
            if (!!meta)
                this.expansion_id = meta.expansion_id;
        });

        for (const color in this.colors) {
            this.chartColors.push({backgroundColor: color, borderColor: color});
        }

        for (const sample_data_set of [DataSet.Deaths, DataSet.Kills, DataSet.DispelsDone, DataSet.InterruptDone, DataSet.SpellStealDone]) {
            this.chartDataSets.push({
                data: [],
                label: sample_data_set,
                type: is_event_data_set(sample_data_set) ? "scatter" : number_to_chart_type(this.selected_chart_type),
                pointStyle: get_point_style(sample_data_set)
            });
        }

        this.subscription = this.graphDataService.data_points.subscribe(([x_axis, data_sets]) => {
            this.chartLabels = x_axis;
            this.chartDataSets = [];
            let color_count = 0;
            let ability_color_map = new Map();
            const max_value = data_sets.filter(([data_set, points]) => !is_event_data_set(data_set))
                .map(([set, [x, y]]) => y)
                .reduce((acc, y) => Math.max(acc, ...y), 0) * 0.75;

            for (const [data_set, [real_x_axis, real_y_axis, evt_units, ab_dmg_arr]] of data_sets) {
                if (is_event_data_set(data_set)) {
                    let fitted_data = this.fit_data_to_x_axis(x_axis, real_x_axis, Array(real_x_axis.length).fill(max_value));
                    let chart_points = Array(x_axis.length);
                    let orig_data_set_index = 0;
                    for (let i = 0; i < fitted_data.length; ++i) {
                        chart_points[i] = {
                            x: x_axis[i],
                            y: fitted_data[i] > 0 ? fitted_data[i] : null,
                            custom_label: fitted_data[i] !== max_value ? "" : (!!evt_units[orig_data_set_index] ? new DelayedLabel(this.unitService.get_unit_name(evt_units[orig_data_set_index], real_x_axis[orig_data_set_index])) : CONST_UNKNOWN_LABEL),
                            spell_id: ab_dmg_arr[orig_data_set_index]
                        } as ChartPoint;
                        if (fitted_data[i] === max_value) {
                            ++orig_data_set_index;
                        }
                    }

                    this.chartDataSets.push({
                        data: chart_points,
                        label: data_set,
                        type: is_event_data_set(data_set) ? "scatter" : number_to_chart_type(this.selected_chart_type),
                        pointStyle: ({dataIndex, dataset}) => {
                            const icon = !!(dataset.data[dataIndex] as any).spell_id ? this.spellService.spells.get((dataset.data[dataIndex] as any).spell_id).icon : undefined;
                            return get_point_style(data_set, icon);
                        }
                    });
                } else {
                    if (this.selected_chart_type === 1) {
                        const result = this.fit_bar_chart_data_to_x_axis(x_axis, real_x_axis, ab_dmg_arr)
                            .sort((left, right) => right[1].reduce((acc, am) => acc + am, 0) -
                                left[1].reduce((acc, am) => acc + am, 0));
                        for (const [ability_id, dmg_arr] of result.slice(0, 5)) {
                            let ability_color = ability_color_map.has(ability_id) ? ability_color_map.get(ability_id) : this.colors[color_count++];
                            ability_color_map.set(ability_id, ability_color);
                            this.chartDataSets.push({
                                data: dmg_arr,
                                // @ts-ignore
                                label: new DelayedLabel(this.dataService.get_localized_basic_spell(this.expansion_id, ability_id).pipe(map(spell => spell.localization)), data_set),
                                backgroundColor: ability_color as string,
                                type: ChartType.Bar,
                                stack: 'Stack ' + data_set
                            });
                        }
                    } else {
                        this.chartDataSets.push({
                            data: this.fit_data_to_x_axis(x_axis, real_x_axis, real_y_axis),
                            label: data_set,
                            type: is_event_data_set(data_set) ? "scatter" : number_to_chart_type(this.selected_chart_type),
                            pointStyle: get_point_style(data_set)
                        });
                    }
                }
            }

            this.graph_min = Math.min(...x_axis);
            this.graph_max = Math.max(...x_axis);

            setTimeout(() => {
                const canvas = window.document.getElementById("graph_cont");
                if (!!canvas && !canvas.onmousemove) {
                    let chart;
                    for (let i = (canvas as any).__ngContext__.length - 1; i >= 0; --i) {
                        if (!!(canvas as any).__ngContext__[i].chart) {
                            chart = (canvas as any).__ngContext__[i].chart;
                            break;
                        }
                    }

                    if (!!chart) {
                        canvas.addEventListener("mousemove", () => {
                            const offset_left = chart.scales["x-axis-0"].left;
                            const offset_right = chart.scales["x-axis-0"].right;
                            if (!!chart.$zoom._dragZoomStart)
                                this.zoom_boundaries[0] = Math.min(offset_right, Math.max(0, chart.$zoom._dragZoomStart.layerX - offset_left)) / offset_right;
                            if (!!chart.$zoom._dragZoomEnd)
                                this.zoom_boundaries[1] = Math.min(offset_right, Math.max(0, chart.$zoom._dragZoomEnd.layerX - offset_left)) / offset_right;
                        });
                    }
                }
            }, 1000);
        });
        this.subscription.add(this.graphDataService.source_abilities.subscribe(abilities => this.sourceAbilities = abilities));
        this.subscription.add(this.graphDataService.target_abilities.subscribe(abilities => this.targetAbilities = abilities));
        this.subscription.add(this.graphDataService.source_spell_cast_abilities.subscribe(abilities => this.sourceSpellCastAbilities = abilities));

        // The delay is here "ensures" that source and target abilities had been loaded
        this.subscription.add(this.graphDataService.overwrite_selection.pipe(auditTime(1000)).subscribe(filter => {
            this.selectedDataSets = new Set(filter.data_sets);
            const selected_data_sets = [];
            for (const data_set of this.selectedDataSets) {
                this.graphDataService.add_data_set(data_set);
                selected_data_sets.push(this.dataSets.find(set => set.id === data_set));
            }
            this.dataSetsSelected = selected_data_sets;

            this.selectedEvents = new Set(filter.events);
            const selected_events = [];
            for (const data_set of this.selectedEvents) {
                this.graphDataService.add_data_set(data_set);
                selected_events.push(this.events.find(set => set.id === data_set));
            }
            this.eventsSelected = selected_events;

            this.selectedSourceAbilitiesChanged(this.sourceAbilities.filter(ability => filter.source_auras.includes(ability.id)));
            this.selectedTargetAbilitiesChanged(this.targetAbilities.filter(ability => filter.target_auras.includes(ability.id)));
            this.selectedSourceSpellCastAbilitiesChanged(this.sourceSpellCastAbilities.filter(ability => filter.source_spell_casts.includes(ability.id)));

            this.select_chart_type(chart_type_to_number(filter.mode));
            this.save_selected();
        }));
    }

    ngOnInit(): void {
        // tslint:disable-next-line:variable-name
        this.subscription.add(this.instanceDataService.knecht_updates.subscribe(([knecht_updates, _ev_types]) => {
            if (knecht_updates.includes(KnechtUpdates.FilterChanged)) {
                this.chartDataSets = [];
            }

            if (knecht_updates.includes(KnechtUpdates.FilterInitialized)) {
                this.selectedDataSets = new Set(this.settingsService.get_or_set("viewer_raid_graph_datasets", []));
                const selected_data_sets = [];
                for (const data_set of this.selectedDataSets) {
                    this.graphDataService.add_data_set(data_set);
                    selected_data_sets.push(this.dataSets.find(set => set.id === data_set));
                }
                this.dataSetsSelected = selected_data_sets;

                const selected_events = [];
                this.selectedEvents = new Set(this.settingsService.get_or_set("viewer_raid_graph_events", []));
                for (const data_set of this.selectedEvents) {
                    this.graphDataService.add_data_set(data_set);
                    selected_events.push(this.events.find(set => set.id === data_set));
                }
                this.eventsSelected = selected_events;
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.subscription_events?.unsubscribe();
    }

    chartClicked({event, active}: { event: MouseEvent, active: Array<{}> }): void {
        // console.log(event, active);
    }

    chartHovered({event, active}: { event: MouseEvent, active: Array<{}> }): void {
        // console.log(event, active);
    }

    data_set_selected(data_set: any): void {
        this.selectedDataSets.add(data_set.id);
        this.graphDataService.add_data_set(data_set.id);
        this.save_selected();
    }

    data_set_deselected(data_set: any): void {
        this.selectedDataSets.delete(data_set.id);
        this.graphDataService.remove_data_set(data_set.id);
        this.save_selected();
    }

    event_selected(event: any): void {
        this.selectedEvents.add(event.id);
        this.graphDataService.add_data_set(event.id);
        this.save_selected();
    }

    event_deselected(event: any): void {
        this.selectedEvents.delete(event.id);
        this.graphDataService.remove_data_set(event.id);
        this.save_selected();
    }

    select_chart_type(chart_type: number): void {
        this.selected_chart_type = Number(chart_type);
        this.graphDataService.set_graph_mode(chart_type);
        this.graphDataService.update();
    }

    get tooltip(): any {
        const result = [];
        for (let i = 0; i < this.chartDataSets.length; ++i)
            if (!is_event_data_set(this.chartDataSets[i].label as DataSet))
                result.push([this.chartDataSets[i].label, this.chartColors[i].backgroundColor]);
        return {type: 10, payload: result};
    }

    selectedTargetAbilitiesChanged(abilities: Array<any>): void {
        this.selectedTargetAbilities = abilities;
        this.graphDataService.setSelectedTargetAbilities(abilities.map(item => item.id));
    }

    selectedSourceAbilitiesChanged(abilities: Array<any>): void {
        this.selectedSourceAbilities = abilities;
        this.graphDataService.setSelectedSourceAbilities(abilities.map(item => item.id));
    }

    selectedSourceSpellCastAbilitiesChanged(abilities: Array<any>): void {
        this.selectedSourceSpellCastAbilities = abilities;
        this.graphDataService.setSelectedSourceSpellCastAbilities(abilities.map(item => item.id));
    }

    private save_selected(): void {
        this.settingsService.set("viewer_raid_graph_datasets", [...this.selectedDataSets.values()]);
        this.settingsService.set("viewer_raid_graph_events", [...this.selectedEvents.values()]);
    }

    private fit_data_to_x_axis(x_axis, data_x, data_y): Array<number> {
        const result_y = Array(x_axis.length).fill(0);
        let data_count = 0;
        for (let i = 0; i < x_axis.length - 1; ++i) {
            if (x_axis[i + 1] > data_x[data_count]) {
                result_y[i] = data_y[data_count++];
            }
        }
        return result_y;
    }

    private fit_bar_chart_data_to_x_axis(x_axis, data_x, ab_dmg_arr): Array<[number, Array<number>]> {
        const result_y = new Map<number, Array<number>>();
        let data_count = 0;
        for (let i = 0; i < x_axis.length; ++i) {
            if (data_count < data_x.length && (i + 1 === x_axis.length || x_axis[i + 1] > data_x[data_count])) {
                for (const [ability_id, ability_amount] of ab_dmg_arr[data_count]) {
                    if (result_y.has(ability_id)) {
                        const ab_am_arr = result_y.get(ability_id);
                        ab_am_arr[i] = ability_amount;
                    } else {
                        let ab_am_arr = Array(x_axis.length).fill(0);
                        ab_am_arr[i] = ability_amount;
                        result_y.set(ability_id, ab_am_arr);
                    }
                }
                ++data_count;
            }
        }
        return [...result_y.entries()];
    }

    format_number(number_str: number | string): string {
        return number_str.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}
