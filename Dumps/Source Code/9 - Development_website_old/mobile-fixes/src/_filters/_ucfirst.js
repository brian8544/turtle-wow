angular.module('ucfirst', [])
    .filter('ucfirst', [function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    }]);