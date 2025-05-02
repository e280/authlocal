
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

code {
	padding: 0.1em 0.5em;
	color: yellow;
	text-shadow: .1em .1em .2em #0008;
	background: #0004;
	box-shadow: inset 0 -.1em 1em #0008;
	border-radius: 0.3em;
	border-bottom: 1px solid #fff4;
}

button {
	color: inherit;
	background: none;
	border: none;
	font: inherit;
	user-select: none;
}

:is(button, a.button) {
	&:not([theme-alt]) {
		cursor: pointer;
		padding: 1em;
		color: #fff;
		background: #6664;
		font-weight: bold;
		text-shadow: .04em .08em .1em #0008;
		border-radius: 0.3em;
		box-shadow: .1em .2em .3em #0003;
		border-top: 0.15em solid #fff4;

		&[disabled] {
			cursor: default;
			opacity: 0.3;
		}

		&:not([disabled]) {
			cursor: pointer;

			&[theme-happy] { background: #00ac00; }
			&[theme-angry] { background: #800; color: #faa; }
			&[theme-login] { background: var(--login-color); }

			&:hover { filter: brightness(120%); text-decoration: underline; }
			&:active { filter: brightness(90%); }
		}
	}

	&[theme-alt="subtle"] {
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

	&[theme-flasher] {
		transition: background 100ms linear;
		&[theme-flasher="good"] { background: green; }
		&[theme-flasher="bad"] { background: red; }
	}
}

[theme-nav] {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5em;
	width: 100%;
	> div[theme-counterbalance] { margin-right: 5em; }
}

[theme-header] {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5em;

	p { opacity: 0.5; }
}

[theme-plate] {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2em;

	backdrop-filter: blur(0.2em);

	padding: 2em;
	border-radius: 1em;
	border: 0.2em solid color-mix(in srgb, var(--alpha), white 25%);
	box-shadow:
		0 0 16em color-mix(in srgb, transparent, var(--alpha) 33%),
		0 0 2em color-mix(in srgb, transparent, var(--alpha) 33%)
	;

	h2 {
		color: color-mix(in srgb, var(--alpha), white 50%);
		text-shadow:
			0 0 2em var(--alpha),
			0 0 .5em var(--alpha)
		;
	}
}

[theme-buttons] {
	display: flex;
	gap: 1em;
	justify-content: center;
	flex-wrap: wrap;
}

[theme-juicy] {
	border-radius: 0.5em;
	box-shadow: .3em .5em 1em #0005;
	border-top: 0.15em solid #fff5;
}

:is([theme-insetty], input[type="text"], textarea) {
	display: block;
	padding: 0.3em 0.5em;
	font-family: monospace;
	background: #111a;
	border-radius: 0.3em;
	text-shadow: .1em .1em .1em #000a;
	box-shadow: inset 0 -.1em 1em #0008;
	border: 1px solid transparent;
	border-bottom-color: #fff4;
	border-top-color: #fff1;
	&[data-angry] { border: 1px solid red; }
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

