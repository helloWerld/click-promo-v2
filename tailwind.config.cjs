/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			spacing: {
				128: '32rem',
				160: '36rem',
				192: '48rem',
			},
			screens: {
				'3xl': '2000px',
			},
			fontSize: {
				xxs: '0.2rem',
			},
			colors: {
				insta: 'linear-gradient(45deg, blue, red)',
			},
			boxShadow: {
				innerlg: 'inset 5px 5px 15px rgba(0, 0, 0, 0.1)',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
