import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
	content: ['./src/renderer/index.html', './src/renderer/**/*.{js,ts,jsx,tsx}'],
	theme: {
		spacing: {
			0: '0',
			1: '4px',
			2: '8px',
			3: '16px',
			4: '32px',
			5: '64px',
			6: '128px',
			7: '256px',
			8: '512px'
		},
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px'
		},
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
				fontin: ['fontin'],
				din: ['din']
			},
			animation: {
				progress: 'progress 2s linear infinite'
			},
			keyframes: {
				progress: {
					'0%': { backgroundPosition: '1rem 0' },
					'100%': { backgroundPosition: '0 0' }
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		plugin(({ addVariant, addComponents }) => {
			addVariant('hocus', ['&:hover', '&:focus']);
			addVariant('hocus-within', ['&:hover', '&:focus-within']);
			addVariant('hover-row', ['&:hover>div:first-child']);
			addComponents({
				'.tw-surface': {},
				'.tw-color': {},
				'.h1': {},
				'.text-size-inherit': { fontSize: 'inherit', lineHeight: 'inherit' }
			});
		})
	]
} satisfies Config;
