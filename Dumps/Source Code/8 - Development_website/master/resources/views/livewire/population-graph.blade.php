<div class="container-fluid pb-5">
    <div class="container pt-5 pb-5">

        <ul class="nav custom-nav-tabs" id="myTab" role="tablist">
            @forelse(config('customs.realms') as $key => $realm)
                @if (isset($realm['name']) && $realm['name'] != '' && config('customs.shellcoin.enabled'))
                    <li class="nav-item" role="presentation">
                        <button class="nav-link custom-nav-link {{ $loop->first ? 'active': '' }}" id="population-tab-{{ $key }}" data-bs-toggle="tab"
                                data-bs-target="#population_{{ $key }}" type="button" role="tab" aria-controls="population_{{ $key }}"
                                aria-selected="true">{{ $realm['name'] }}
                        </button>
                    </li>
                @endif
            @empty
            @endforelse
        </ul>

        <div class="tab-content" id="myTabContent">
            @forelse(config('customs.realms') as $key => $realm)
                @if (isset($realm['name']) && $realm['name'] != '' && config('customs.shellcoin.enabled'))
                    <div class="tab-pane fade show {{ $loop->first ? 'active': '' }}" id="population_{{ $key }}" role="tabpanel"
                         aria-labelledby="population-tab-{{ $key }}">

                        <div class="row p-5">

                            <div class="col-lg-12">

                                <h2 class="orange-text mb-2">{{__('population_graph_page')['population_graph']}}</h2>
                                <p class="mt-3 mb-5 text-white">
                                    {{__('population_graph_page')['the_following_graphs']}}
                                </p>

                                <div class="table-responsive">
                                    <canvas id="population-graph-{{ $key }}" class="table" style="height: 500px;"></canvas>
                                </div>

                            </div>


                        </div>
                    </div>
                @endif
            @empty
            @endforelse
        </div>

    </div>

    <script type="module">
        function renderChart(key, data) {
            var labels = data.labels;
            var dataA = data.dataA;
            var dataH = data.dataH;
            var dataQ = data.dataQ;
            var dataT = data.dataT;
            var dataC = data.dataC;

            var dataSets = [
                {
                    label: '{{__('population_graph_page')['alliance_players']}}',
                    cubicInterpolationMode: 'monotone',
                    data : dataA,
                    borderColor: "#0c6cef",
                    pointBackgroundColor: "#0c6cef",
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius: 5
                },
                {
                    label: '{{__('population_graph_page')['horde_players']}}',
                    cubicInterpolationMode: 'monotone',
                    data : dataH,
                    borderColor: "#e71b1b",
                    pointBackgroundColor: "#e71b1b",
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius: 5
                },
                {
                    label: '{{__('population_graph_page')['queued_players']}}',
                    cubicInterpolationMode: 'monotone',
                    data : dataQ,
                    borderColor: "#FFFF00",
                    pointBackgroundColor: "#FFFF00",
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius: 5,
                    backgroundColor: 'rgba(94,91,85,0.13)',
                    fill: true,
                },
                {
                    label: '{{__('population_graph_page')['total_players']}}',
                    cubicInterpolationMode: 'monotone',
                    data : dataT,
                    borderColor: "#8cbe4b",
                    pointBackgroundColor: "#8cbe4b",
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius: 5,
                    backgroundColor: 'rgba(94,91,85,0.13)',
                    fill: true,
                }
            ];

            var ctx = document.getElementById('population-graph-' + key).getContext('2d');

            var newChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: dataSets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid : {
                                color :'rgba(158,151,131,0.13)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                boxWidth: 10,
                                boxHeight: 10,
                            }
                        },
                        annotation: {
                            annotations: [
                                {
                                    type: 'line',
                                    mode: 'horizontal',
                                    scaleID: 'y',
                                    value: 10000,
                                    borderColor: 'red',
                                    borderWidth: 1,
                                    borderDash: [5, 5],
                                    label: {
                                        content: 'Limit to 10000',
                                        enabled: true,
                                        position: 'right',
                                    }
                                }
                            ]
                        }
                    }
                }
            });

            return newChart;
        }

        function fetchPopulationData() {
            var data = @json($populationGraph);
            Object.keys(data).forEach(function(key) {
                renderChart(key, data[key]);
            });
        }

        fetchPopulationData();
    </script>

</div>
