angular.module('http.service', [])
    .factory('http', ['$http', function ($http) {

        return {
            get: function (params) {
                return $http({
                    url: 'api/',
                    method: "GET",
                    params: params
                });
            },
            post: function (params) {
                return $http({
                    method: 'POST',
                    url: 'api/index.php?url=' + params.m + '/' + params.w,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        angular.forEach(obj, function (va, ke) {
                            if (typeof va === 'object') va = angular.toJson(va);
                            str.push(encodeURIComponent(ke) + "=" + encodeURIComponent(va));
                        });
                        return str.join("&");
                    },
                    data: params
                })
            }
        }
    }]);
