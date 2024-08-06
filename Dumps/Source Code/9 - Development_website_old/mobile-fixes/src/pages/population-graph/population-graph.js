angular.module('population-graph', [])
    .controller('PopulationGraphCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            http.post({
                m: 'stats',
                w: 'get_population_graph',
                p: {}
            }).then(function (data) {

                let labels = [];
                let dataA = [];
                let dataH = [];
                let dataT = [];

                angular.forEach(data.data.result, function(va, ke) {
                    labels.push(va['date_nice']);
                    dataA.push(va['m_a']);
                    dataH.push(va['m_h']);
                    dataT.push(va['m_a'] + va['m_h']);
                })

                let dataSets = [
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
                    },
                ];

                new Chart(document.getElementById('population-graph').getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: dataSets
                    },
                    options: {
                        responsive: false,
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
                            }
                        }
                    }
                });



            });


        }])
;
