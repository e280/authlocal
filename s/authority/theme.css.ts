
import {css} from "@benev/slate"
export default css`@layer theme, view; @layer theme {

:root {
	color-scheme: dark;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;

	scrollbar-width: thin;
	scrollbar-color: #333 transparent;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 1em; }
::-webkit-scrollbar-thumb:hover { background: #444; }

ul, ol {
	padding: 0;
	list-style: none;
}

a {
	color: var(--link);
	text-decoration: none;

	&:visited {
		color: color-mix(in srgb, purple, var(--link) 70%);
	}

	&:hover {
		color: color-mix(in srgb, white, var(--link) 90%);
		text-decoration: underline;
	}

	&:active {
		color: color-mix(in srgb, white, var(--link) 50%);
	}
}

h2 {
	font-size: 1.2em;
	text-shadow:
		0 0 2em color-mix(in lch, transparent, currentColor 50%),
		0 0 .5em color-mix(in lch, transparent, currentColor 50%);
}

p {
	color: color-mix(in srgb, transparent, currentColor 60%);
}

button {
	color: inherit;
	background: none;
	border: none;
	font: inherit;
	user-select: none;
}

[theme-button] {
	color: inherit;
	background: none;
	border: none;
	font: inherit;
	user-select: none;

	&:not([theme-button^="plain"]) {
		cursor: pointer;
		padding: 1em 0.5em;

		color: color-mix(in srgb, var(--alpha), white 50%);
		background: #8881;

		font-weight: bold;
		border-radius: 0.3em;
		border: 0.15em solid color-mix(in srgb, transparent, currentColor 50%);
		border-top-color: color-mix(in srgb, transparent, currentColor 80%);

		text-shadow: 0 0 1em color-mix(in srgb, transparent, currentColor 80%);
		box-shadow:
			0 0 3em color-mix(in srgb, transparent, currentColor 20%),
			inset 0 0 1em color-mix(in srgb, transparent, currentColor 15%);

		&[disabled] {
			cursor: default;
			opacity: 0.3;
		}

		&:not([disabled]) {
			cursor: pointer;

			&[theme-button="happy"] { color: var(--happy); }
			&[theme-button="angry"] { color: var(--angry); }
			&[theme-button="login"] { color: var(--login); }
			&[theme-button="back"] { color: var(--back); }
			&[theme-button="seed"] { color: var(--seed); }

			&:hover {
				filter: brightness(120%); text-decoration: underline;
				box-shadow:
					0 0 1em color-mix(in srgb, transparent, currentColor 20%),
					0 0 3em color-mix(in srgb, transparent, currentColor 20%),
					inset 0 0 1em color-mix(in srgb, transparent, currentColor 15%);
			}

			&:active { filter: brightness(90%); }
		}
	}

	&[theme-button="plain-subtle"] {
		color: #a3b1ff;
		font-weight: bold;
		text-shadow: .04em .08em .1em #0008;

		&[disabled] {
			cursor: default;
			color: #666;
			opacity: 0.5;
			text-decoration: line-through;
		}

		&:not([disabled]) {
			cursor: pointer;
			&:hover { filter: brightness(120%); text-decoration: underline; }
			&:active { filter: brightness(90%); }
		}
	}

	&[theme-flashing] {
		transition: background 100ms linear;
		&[theme-flashing="good"] { background: var(--happy); }
		&[theme-flashing="bad"] { background: var(--angry); }
	}
}

[theme-plate] {
	display: flex;
	flex-direction: column;
	text-align: center;
	gap: 1em;

	padding: 1em;
	border-radius: 1em;
	border: 0.2em solid color-mix(in srgb, var(--alpha), white 25%);
	backdrop-filter: blur(0.2em);
	box-shadow:
		0 0 16em color-mix(in srgb, transparent, var(--alpha) 33%),
		0 0 2em color-mix(in srgb, transparent, var(--alpha) 33%),
		inset 0 0 1em color-mix(in srgb, transparent, var(--alpha) 50%);
}

[theme-zone] {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1em;

	&:not([theme-zone="naked"]) {
		padding: 1em;
		background: color-mix(in lch, transparent, currentColor 20%);
		border-radius: 0.5em;
		border: 0.2rem solid currentColor;
		box-shadow: 0 0 5em color-mix(in lch, transparent, currentColor 50%);
	}

	&[theme-zone="danger"] { color: var(--angry); }
	&[theme-zone="seed"] { color: var(--seed); }
}

[theme-group] {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 0.5em;

	&[theme-group=tight] {
		gap: 0.2em;
	}
}

[theme-buttons] {
	display: flex;
	gap: 0.5em;
	justify-content: center;
	flex-wrap: wrap;
}

[theme-juicy] {
	border-radius: 0.5em;
	box-shadow: .3em .5em 1em #0005;
	border-top: 0.15em solid #fff5;
}

:is([theme-inputty], [theme-input-border]) {
	border: 0.1em solid transparent;
}

[theme-inputty] {
	display: block;
	font-size: 1em;
	padding: 0.3em 0.5em;
	font-family: monospace;
	background: #111a;
	border-radius: 0.3em;
}

[theme-insetty] {
	text-shadow: .1em .1em .1em #000a;
	box-shadow: inset 0 -.1em 1em #0008;
	border-bottom-color: #fff4;
	border-top-color: #fff1;
	&[theme-angry] { border: 1px solid red; }
}

[theme-seed] {
	font-size: 1.2em;
	padding: 1em;

	height: 9em;
	width: 100%;

	color: var(--seed);
	background: color-mix(in srgb, black, var(--seed) 15%);
	border-radius: 1rem;
	border: 0.2em solid var(--seed);

	color: color-mix(in srgb, var(--seed), white 50%);
	text-shadow: 0 0 1em var(--seed);
	font-weight: bold;
}

[theme-code] {
	padding: 0.1em 0.5em;
	color: var(--code);
	text-shadow: .1em .1em .2em #0008;
	box-shadow: 0 0 2em color-mix(in lch, transparent, currentColor 33%);
	border-radius: 0.3em;
	border: 0.1em solid color-mix(in lch, transparent, currentColor 50%);
	font-weight: bold;

	&[theme-code=login] {
		display: inline-flex;
		flex-wrap: wrap;
		justify-content: center;
		color: var(--login);
		> span {
			word-break: break-all;
		}
	}
}

[theme-spin] {
	display: block;
	animation: spin 2s linear infinite;
}

@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

}`

