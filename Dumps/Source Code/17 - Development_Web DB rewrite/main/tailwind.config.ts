import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		colors: {
			inherit: 'inherit',
			current: 'currentColor',
			white: '#FFF',
			yellow: '#F1C22D',
			pink: '#FF7757',
			orange: '#FB8A4C',
			brown: '#764502',
			red: '#EE3333',
			darkBrown: '#291105',
			darkGray: '#0F0D0C',
			darkerGray: '#181412',
			darkPurple: '#271F30',
			purple: '#403561',
			gray: '#5E5B55',
			lightGray: '#9E9783',
			blueGray: '#929391',
			warmGreen: '#C5CB63',
			green: '#8DD958',
			darkGreen: '#358D3E'
		},
		extend: {
			fontFamily: {
				fontin: ['var(--fontin-font)'],
				din: ['var(--din-font)']
			}
		}
	},
	plugins: [
		plugin(({ addVariant, addComponents }) => {
			addVariant('hocus', ['&:hover', '&:focus']);
			addVariant('hocus-within', ['&:hover', '&:focus-within']);
			addComponents({
				'.tw-surface': {},
				'.tw-color': {}
			});
		})
	]
} satisfies Config;
