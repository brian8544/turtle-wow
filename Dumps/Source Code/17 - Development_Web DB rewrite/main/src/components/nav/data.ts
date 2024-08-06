export type Category = {
	name: string;
	url: string;
	categories?: Category[];
};

const NavData: Category[] = [
	{
		categoryName: 'Weapons',
		url: '/items/weapons',
		categories: [
			{
				categoryName: 'One-Handed',
				url: '/items/one-handed',
				categories: [
					{ name: 'Dagger', url: '/items/dagger' },
					{ name: 'Fist Weapons', url: '/items/fist' },
					{ name: 'One-Handed Axes', url: '/items/axe' },
					{ name: 'One-Handed Maces', url: '/items/mace' },
					{ name: 'One-Handed Swords', url: '/items/sword' }
				]
			},
			{
				categoryName: 'Two-Handed',
				url: '/items/two-handed',
				categories: [
					{ name: 'Two-Handed Axes', url: '/items/two-handed-axes' },
					{ name: 'Two-Handed Maces', url: '/items/two-handed-maces' },
					{ name: 'Two-Handed Swords', url: '/items/two-handed-swords' },
					{ name: 'Polearms', url: '/items/polearms' },
					{ name: 'Staves', url: '/items/staves' }
				]
			},
			{
				categoryName: 'Ranged',
				url: '/items/ranged',
				categories: [
					{ name: 'Bows', url: '/items/bows' },
					{ name: 'Crossbows', url: '/items/crossbows' },
					{ name: 'Guns', url: '/items/guns' },
					{ name: 'Throwing', url: '/items/throwing' },
					{ name: 'Wands', url: '/items/wands' }
				]
			}
		]
	},
	{
		categoryName: 'Armor',
		url: '/items/armor',
		categories: [
			{
				categoryName: 'Plate',
				url: '/items/armor/plate',
				categories: [
					{ name: 'Chest', url: '/items/armor/plate/chest' },
					{ name: 'Feet', url: '/items/armor/plate/feet' },
					{ name: 'Hands', url: '/items/armor/plate/hands' },
					{ name: 'Head', url: '/items/armor/plate/head' },
					{ name: 'Legs', url: '/items/armor/plate/legs' },
					{ name: 'Shoulder', url: '/items/armor/plate/shoulder' },
					{ name: 'Waist', url: '/items/armor/plate/waist' },
					{ name: 'Wrist', url: '/items/armor/plate/wrist' }
				]
			},
			{
				categoryName: 'Mail',
				url: '/items/armor/mail',
				categories: [
					{ name: 'Chest', url: '/items/armor/mail/chest' },
					{ name: 'Feet', url: '/items/armor/mail/feet' },
					{ name: 'Hands', url: '/items/armor/mail/hands' },
					{ name: 'Head', url: '/items/armor/mail/head' },
					{ name: 'Legs', url: '/items/armor/mail/legs' },
					{ name: 'Shoulder', url: '/items/armor/mail/shoulder' },
					{ name: 'Waist', url: '/items/armor/mail/waist' },
					{ name: 'Wrist', url: '/items/armor/mail/wrist' }
				]
			},
			{
				categoryName: 'Leather',
				url: '/items/armor/leather',
				categories: [
					{ name: 'Chest', url: '/items/armor/leather/chest' },
					{ name: 'Feet', url: '/items/armor/leather/feet' },
					{ name: 'Hands', url: '/items/armor/leather/hands' },
					{ name: 'Head', url: '/items/armor/leather/head' },
					{ name: 'Legs', url: '/items/armor/leather/legs' },
					{ name: 'Shoulder', url: '/items/armor/leather/shoulder' },
					{ name: 'Waist', url: '/items/armor/leather/waist' },
					{ name: 'Wrist', url: '/items/armor/leather/wrist' }
				]
			},
			{
				categoryName: 'Cloth',
				url: '/items/armor/cloth',
				categories: [
					{ name: 'Chest', url: '/items/armor/cloth/chest' },
					{ name: 'Feet', url: '/items/armor/cloth/feet' },
					{ name: 'Hands', url: '/items/armor/cloth/hands' },
					{ name: 'Head', url: '/items/armor/cloth/head' },
					{ name: 'Legs', url: '/items/armor/cloth/legs' },
					{ name: 'Shoulder', url: '/items/armor/cloth/shoulder' },
					{ name: 'Waist', url: '/items/armor/cloth/waist' },
					{ name: 'Wrist', url: '/items/armor/cloth/wrist' }
				]
			},
			{ categoryName: 'Rings', url: '/items/armor/rings', categories: [] },
			{ categoryName: 'Amulets', url: '/items/armor/amulets', categories: [] },
			{ categoryName: 'Trinkets', url: '/items/armor/trinkets', categories: [] }
		]
	},
	{
		categoryName: 'Other',
		url: '/items/other',
		categories: [
			{ name: 'Cloaks', url: '/items/other/cloaks' },
			{ name: 'Offhands', url: '/items/other/offhands' },
			{ name: 'Shields', url: '/items/other/shields' }
		]
	},
	{
		categoryName: 'Cosmetics',
		url: '/items/cosmetics',
		categories: [
			{ name: 'Pets', url: '/items/cosmetics/pets' },
			{ name: 'Mounts', url: '/items/cosmetics/mounts' }
		]
	},
	{
		categoryName: 'Quests',
		url: '/quests',
		categories: []
	},
	{
		categoryName: 'Spells',
		url: '/spells',
		categories: []
	},
	{
		categoryName: 'NPCs',
		url: '/npcs',
		categories: []
	}
];

export default NavData;
