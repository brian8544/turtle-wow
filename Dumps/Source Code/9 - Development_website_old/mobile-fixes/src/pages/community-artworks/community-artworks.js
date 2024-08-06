angular.module('community-artworks', [])
    .controller('CommunityArtworksCtrl', ['$scope', '$location', 'http', '$sce',
        function ($scope, $location, http, $sce) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.artworks = [
			    {author: 'Artwork by Handi (Adelaidde)', file: '4.png'},			
                {author: 'Gurubashi Camper, by Kato', file: '12.png'},
                {author: '"You called?", by Chiruk', file: '17.jpg'},
                {author: 'Crescent Grove, by Illdrawer', file: '8.jpg'},
                {author: 'Adventure begins, by Chevvah', file: '10.jpg'},
                {author: 'Storm over Redridge, by Pathos', file: '14.png'},
                {author: 'Artwork by Chevvah', file: '15.jpg'},
                {author: 'Artwork by Hone', file: '6.png'},
                {author: 'Sykira the Dark Ranger, by Deekin Bearcat', file: '18.jpg'},
                {author: 'Artwork by Afa', file: '1.png'},
                {author: 'Artwork by Blackscar', file: '9.jpg'},
                {author: 'Artwork by MIXEEB', file: '3.png'},
                {author: 'Artwork by Josephine Wagner', file: '30.png'},
                {author: 'Artwork by Josephine Wagner', file: '31.jpeg'},
                {author: 'A Skirmish at Dawn, by Valamar', file: '11.png'},
				{author: 'Mysterious Stranger by Dryst', file: '20.png'},
                {author: 'Honeclaw & Hatebeak, by Zin\'tulak', file: '21.png'},
                {author: 'Echo Ridge Mine, by by PureOfHearts', file: '33.jpg'},
                {author: 'The Wayward Apprentice, by by PureOfHearts', file: '34.jpg'},
                {author: 'A Priest and His Loa, by Leaf', file: '22.jpg'},
                {author: 'Princess Inxe, by Kaguranaomi', file: '13.png'},
                {author: 'Sand Troll, by Jambiya', file: '16.jpg'},
                {author: 'Struggles of Zebrian Farm, artwork by GGena', file: '26.png'},
				{author: 'Artwork by Iffeliphe', file: '5.png'},
                {author: 'Artwork by Breno', file: '7.png'},
				{author: 'The Thoughtless Companion, by LazyRat', file: '25.png'},
                {author: 'Turtle WoW Rulez, by Escalotes', file: '19.png'},
				{author: 'Artwork by Uwuowo', file: '2.png'},
            ]

        }])
;
