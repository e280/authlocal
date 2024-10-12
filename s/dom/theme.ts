
import {css} from "@benev/slate"
export const theme = css`

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

button.naked {
	color: inherit;
	background: none;
	border: none;
	outline: 0;
	font-family: inherit;
}

button.flashy {
	&:not([disabled]) {
		&:hover { filter: brightness(120%); }
		&:active { filter: brightness(90%); }
	}
}

button.based {
	cursor: pointer;

	border: none;
	border-radius: .3em;
	box-shadow: .1em .2em .2em #0004;

	background: #8888;
	color: #fffc;
	font: inherit;
	text-shadow: .1em .2em .1em #0004;

	xxx-font-variant: small-caps;
	font-weight: bold;

	display: block;
	max-width: 100%;
	padding: 0.5em 1em;

	&.fx {
		&:hover { filter: brightness(110%); }
		&:active { filter: brightness(95%); }
	}

	&.play {
		padding: 1em 2em;
		background: #43ca43ab;
		background: linear-gradient(#8dff8dab, #138813ab);
		font-weight: bold;
		text-transform: uppercase;
	}
}

.spin {
	display: block;
	animation: spin 2s linear infinite;
}

@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

`

