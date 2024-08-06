angular.module('population-graph', [])
    .controller('PopulationGraphCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            function renderChart(key, data) {
                var labels = data.labels;
                var dataA = data.dataA;
                var dataH = data.dataH;
                var dataQ = data.dataQ;
                var dataT = data.dataT;
                var dataC = data.dataC;

                var dataSets = [
                    {
                        label: 'Alliance Players',
                        cubicInterpolationMode: 'monotone',
                        data : dataA,
                        borderColor: "#0c6cef",
                        pointBackgroundColor: "#0c6cef",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5
                    },
                    {
                        label: 'Horde Players',
                        cubicInterpolationMode: 'monotone',
                        data : dataH,
                        borderColor: "#e71b1b",
                        pointBackgroundColor: "#e71b1b",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5
                    },
                    {
                        label: 'Queued Players',
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
                        label: 'Total Players',
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

            function updateChart(key, data) {
                var chart = renderChart(key, data);
                return chart;
            }

            var charts = {};

            function initCharts() {
                http.post({
                    m: 'stats',
                    w: 'get_population_graph',
                    p: {}
                }).then(function (response) {
                    var data = response.data.result;
                    angular.forEach(data, function (value, key) {
                        charts[key] = renderChart(key, value);
                    });
                });
            }

            initCharts();

            $scope.refreshChart = function (tab) {
                if (charts[tab]) {
                    charts[tab].resize();
                }
            }

        }])
;