type AddonsList = {
	name: string;
	owner: string;
	branch?: string;
	git: string;
	dependencies?: string[];
}[];

export const addons: AddonsList = [
	{ git: 'https://github.com/Lexiebean/AtlasLoot.git' },
	{ git: 'https://github.com/shagu/pfUI.git' },
	{ git: 'https://github.com/shagu/pfQuest.git' },
	{ git: 'https://github.com/shagu/pfQuest-turtle.git' },
	{ git: 'https://github.com/shagu/ShaguTweaks.git' },
	{ git: 'https://github.com/shagu/ShaguPlates.git' },
	{
		git: 'https://github.com/tempranova/turtlerp.git',
		name: 'TurtleRP',
		branch: 'main'
	},
	{ git: 'https://github.com/Fiurs-Hearth/WIIIUI.git' },
	{ git: 'https://github.com/Fiurs-Hearth/ExtraResourceBars.git' },
	{ git: 'https://github.com/shagu/ShaguDPS.git' },
	{ git: 'https://github.com/CosminPOP/TWThreat.git' }
]
	.map(a => ({
		...a,
		name: a.name ?? a.git.split('/').pop()!.replace('.git', ''),
		owner: a.git.split('/').at(-2)!
	}))
	.sort((a, b) => a.name.localeCompare(b.name));
