import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
// import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";


/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		container: {
			center: true,
			screens: {
				"2xl": "1440px",
			},
		}
	},
	plugins: [
		typography,
		animate,
		plugin(({ matchUtilities }) => {
			matchUtilities({
				perspective: (value) => ({
					perspective: value,
				}),
			});
		}),
	],
};