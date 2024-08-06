<div class="container-fluid pb-5">
    <div class="container pt-5 pb-5">

        <ul class="nav custom-nav-tabs" id="myTab" role="tablist">
            @forelse(config('customs.realms') as $key => $realm)
                @if ($realm['id'])
                    <li class="nav-item" role="presentation">
                        <button class="nav-link custom-nav-link {{ $loop->first ? 'active': '' }}" id="shellcoin-tab-{{ $key }}" data-bs-toggle="tab"
                                data-bs-target="#shellcoin_{{ $key }}" type="button" role="tab" aria-controls="shellcoin_{{ $key }}"
                                aria-selected="true">{{ $realm['name'] }}
                        </button>
                    </li>
                @endif
            @empty
            @endforelse
        </ul>
        <div class="tab-content" id="myTabContent">
            @forelse(config('customs.realms') as $key => $realm)
                @if ($realm['id'])
                    <div class="tab-pane fade show {{ $loop->first ? 'active': '' }}" id="shellcoin_{{ $key }}" role="tabpanel"
                         aria-labelledby="shellcoin-tab-{{ $key }}">


                        <div class="row p-5">

                            <div class="col-lg-12">

                                <h2 class="orange-text mb-2">{{ __('shellcoin_page')['shellcoin_title'] }}</h2>
                                <p class="mt-3 mb-5 text-white">

                                    {{ __('shellcoin_page')['welcome_to_shellcoin'] }}<Br>

                                    <BR>
                                    <i>{{ __('shellcoin_page')['marlos_catos'] }}</i>
                                    <BR><BR>
                                    {{ __('shellcoin_page')['total_amount'] }}
                                </p>

                                <div class="table-responsive">
                                    <canvas id="shellcoin-graph7d-{{ $key }}" class="table" style="height: 500px; width: 100%;"></canvas>
                                </div>

                                <div class="table-responsive">
                                    <canvas id="shellcoin-graph-{{ $key }}" class="table" style="height: 500px; width: 100%;"></canvas>
                                </div>


                            </div>


                        </div>
                    </div>
                @endif
            @empty
            @endforelse
            <div class="row p-5">

                <div class="col-lg-12">
                    @livewire("video-embed", ['id' => 'c0edfd95', 'height' => '500px'])
                </div>
            </div>
        </div>

    </div>

    <script type="module">
        function renderChart(key, data) {
            var labels = data.labels;
            var dataA = data.dataA;

            var dataSets = [
                {
                    label: '{{__('shellcoin_page')['total']}}',
                    cubicInterpolationMode: 'monotone',
                    data : dataA,
                    borderColor: "#8dc63f",
                    pointBackgroundColor: "#8dc63f",
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius: 5
                },
            ];

            var ctx = document.getElementById('shellcoin-graph-' + key).getContext('2d');

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
                            },
                            ticks: {
                                callback: function(val, index) {
                                    return index % 2 === 0 ? this.getLabelForValue(val) : '';
                                },
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid : {
                                color :'rgba(158,151,131,0.13)'
                            },
                            ticks: {
                                callback: function(val) {
                                    var g = Math.floor(val / 100 / 100);
                                    var s = Math.floor((val / 100) % 100);
                                    var c = Math.floor(val % 100);
                                    return g + 'g ' + s + 's ' + c + 'c'
                                },
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
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    var val = context.parsed.y;
                                    var g = Math.floor(val / 100 / 100);
                                    var s = Math.floor((val / 100) % 100);
                                    var c = Math.floor(val % 100);
                                    return g + 'g ' + s + 's ' + c + 'c'
                                }
                            }
                        },
                    },
                }
            });

            return newChart;
        }

        function renderChart7d(key, data) {
            var labels = data.labels;
            var data7d = data.data7d;

            var dataSets = [
                {
                    label: '{{__('shellcoin_page')['last_week']}}',
                    cubicInterpolationMode: 'monotone',
                    data : data7d,
                    borderColor: "#8dc63f",
                    pointBackgroundColor: "#8dc63f",
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius: 5
                },
            ];

            var ctx = document.getElementById('shellcoin-graph7d-' + key).getContext('2d');

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
                            },
                            ticks: {
                                callback: function(val, index) {
                                    return index % 2 === 0 ? this.getLabelForValue(val) : '';
                                },
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid : {
                                color :'rgba(158,151,131,0.13)'
                            },
                            ticks: {
                                callback: function(val) {
                                    var g = Math.floor(val / 100 / 100);
                                    var s = Math.floor((val / 100) % 100);
                                    var c = Math.floor(val % 100);
                                    return g + 'g ' + s + 's ' + c + 'c'
                                },
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
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    var val = context.parsed.y;
                                    var g = Math.floor(val / 100 / 100);
                                    var s = Math.floor((val / 100) % 100);
                                    var c = Math.floor(val % 100);
                                    return g + 'g ' + s + 's ' + c + 'c'
                                }
                            }
                        },
                    },
                }
            });

            return newChart;
        }

        function fetchPopulationData() {
            var data1 = @json($shellCoinData);
            var data2 = @json($shellCoinData7d);
            Object.keys(data1).forEach(function(key) {
                renderChart(key, data1[key]);
            });
            Object.keys(data2).forEach(function(key) {
                renderChart7d(key, data2[key]);
            });
        }

        fetchPopulationData();
    </script>

</div>
