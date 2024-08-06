angular.module('directives', [
    'turtle-video'
])
    .directive('enterSubmit', [function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.enterSubmit);
                    });

                    event.preventDefault();
                }
            });
        };
    }])
    .directive('tooltip', [function () {
        return {
            link: function (scope, element) {
                element.tooltip();
            }
        };
    }]);
