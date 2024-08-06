angular.module('shellcoin', [])
    .controller('ShellcoinCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.data = [];
            $scope.data7d = [];
            $scope.amount = 0;

            http.post({
                m: 'shellcoin',
                w: 'get7d',
                p: {}
            }).then(function (data) {
                $scope.data7d = data.data.result;
                $scope.amount = $scope.data7d[$scope.data7d.length-1].count;

                var labels = [];
                var data7d = [];

                angular.forEach($scope.data7d, function(va, ke) {
                    labels.push(va['date_nice']);
                    data7d.push(va['price']);
                })

                var dataSets = [
                    {
                        label: 'Last week',
                        cubicInterpolationMode: 'monotone',
                        data : data7d,
                        borderColor: "#8dc63f",
                        pointBackgroundColor: "#8dc63f",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5
                    },
                ];

                new Chart(document.getElementById('shellcoin-graph7d').getContext('2d'), {
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


            });

            http.post({
                m: 'shellcoin',
                w: 'get',
                p: {}
            }).then(function (data) {
                $scope.data = data.data.result;
                $scope.amount = $scope.data[$scope.data.length-1].count;

                var labels = [];
                var dataA = [];

                angular.forEach(data.data.result, function(va, ke) {
                    labels.push(va['date_nice']);
                    dataA.push(va['price']);
                })

                var dataSets = [
                    {
                        label: 'Total',
                        cubicInterpolationMode: 'monotone',
                        data : dataA,
                        borderColor: "#8dc63f",
                        pointBackgroundColor: "#8dc63f",
                        borderWidth: 1,
                        pointRadius: 1,
                        pointHoverRadius: 5
                    },
                ];

                new Chart(document.getElementById('shellcoin-graph').getContext('2d'), {
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


            });

        }])
;
