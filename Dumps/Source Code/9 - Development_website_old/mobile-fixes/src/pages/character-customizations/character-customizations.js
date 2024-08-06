angular.module('character-customizations', [])
    .controller('CharacterCustomizationsCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.customizations = [
                {title: 'a', subtitle: 'b', file: 'unknown (1).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (10).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (11).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (12).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (13).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (14).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (15).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (16).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (17).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (2).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (3).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (4).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (5).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (6).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (7).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (8).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown (9).png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown.png', description: 'Description is empty, to be added.'},
                {title: 'a', subtitle: 'b', file: 'unknown_1.png', description: 'Description is empty, to be added.'},
            ]

        }])
;
