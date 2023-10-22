/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			// Having no radius, except full radius for circles
			// shadcn/ui currently has bugs for this not covering DEFAULT
			// https://github.com/shadcn-ui/ui/blob/main/tailwind.config.cjs#L51
			// This override is not an excuse to have border-radius classes in our own code
		},
		// Replace all colors
		colors: {
			// These constants are taken from the Tailwind default config:
			// https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
			inherit: "inherit",
			current: "currentColor",
			transparent: "transparent",
			black: "#000",
			white: "#fff",
			// Using dark theme Radix colors imported to globals.css and enabled by "dark" in the layout
			// https://www.radix-ui.com/colors
			// Refer to this important Radix documentation on how to use these color scale:
			// https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
			jade: {
				1: "var(--jade-1)",
				2: "var(--jade-2)",
				3: "var(--jade-3)",
				4: "var(--jade-4)",
				5: "var(--jade-5)",
				6: "var(--jade-6)",
				7: "var(--jade-7)",
				8: "var(--jade-8)",
				9: "var(--jade-9)",
				10: "var(--jade-10)",
				11: "var(--jade-11)",
				12: "var(--jade-12)",
			},

			red: {
				1: "var(--red-1)",
				2: "var(--red-2)",
				3: "var(--red-3)",
				4: "var(--red-4)",
				5: "var(--red-5)",
				6: "var(--red-6)",
				7: "var(--red-7)",
				8: "var(--red-8)",
				9: "var(--red-9)",
				10: "var(--red-10)",
				11: "var(--red-11)",
				12: "var(--red-12)",
			},
			// provide colors to shadcn/ui
			/* Default border color */
			border: "var(--jade-6)", // Radix suggests 6 for "Subtle borders on components which are not interactive.
			// "[...] For example sidebars, headers, cards, alerts, and separators."
			/* Border color for inputs such as <Input />, <Select />, <Textarea /> */
			input: "var(--jade-7)", // Radix suggests 6 for "Borders on interactive components."
			/* Used for focus ring */
			ring: "var(--jade-7)", // Radix suggests 7 for "UI element border and focus rings"
			/* Default background color of <body />...etc */
			background: "var(--jade-1)", // Radix suggests 1 for "App background"
			foreground: "var(--jade-11)", // Radix suggests 11 for "Low-contrast text"
			/* Primary colors for <Button /> */
			primary: {
				DEFAULT: "var(--jade-12)", // has a the best contrast still having a jade clue
				foreground: "black", // shadcn/ui uses black or white depending on the contrast
			},
			/* Secondary colors for <Button /> */
			secondary: {
				DEFAULT: "var(--jade-9)", // has a low contrast but uses the theme color
				foreground: "white", // shadcn/ui uses black or white depending on the contrast
			},
			/* Used for destructive actions such as <Button variant="destructive"> */
			destructive: {
				DEFAULT: "var(--red-9)", // The most vibrant red
				foreground: "white", // shadcn/ui uses black or white depending on the contrast
			},
			/* Muted backgrounds such as <TabsList />, <Skeleton /> and <Switch /> */
			muted: {
				DEFAULT: "var(--jade-3)", // Not sure
				foreground: "var(--jade-9)", // Not sure
			},
			/* Used for accents such as hover effects on <DropdownMenuItem>, <SelectItem>...etc */
			/* Note: These are also used for ghost buttons */
			accent: {
				DEFAULT: "var(--jade-4)", // Radix suggests 4 for "Hovered UI element background"
				foreground: "var(--jade-11)", // Using the default foreground
			},
			/* Background color for popovers such as <DropdownMenu />, <HoverCard />, <Popover /> */
			popover: {
				DEFAULT: "var(--jade-2)", // Radix suggests 2 for "Subtle background"
				foreground: "var(--jade-12)", // Radix suggests 12 for "High-contrast text"
			},
			/* Background color for <Card /> */
			card: {
				DEFAULT: "var(--jade-3)", // Radix suggests 3 for "UI element background"
				foreground: "var(--jade-11)", // Using the default foreground
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
