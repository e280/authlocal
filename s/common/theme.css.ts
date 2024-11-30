
import {css} from "@benev/slate"
export default css`

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

button {
	color: inherit;
	background: none;
	border: none;
	font: inherit;
	user-select: none;
}

:is(button, a.button) {
	&:not([x-alt]) {
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

			&.happy { background: #00ac00; }
			&.angry { background: #800; color: #faa; }
			&.login { background: var(--login-color); }

			&:hover { filter: brightness(120%); text-decoration: underline; }
			&:active { filter: brightness(90%); }
		}
	}

	&[x-alt=subtle] {
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
}

.plate {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2em;

	> .stretch {
		align-self: stretch;
	}
}

.instruction {
	color: var(--instruction-color);
}

.domain {
	color: var(--domain-color);
}

.buttonbar {
	display: flex;
	gap: 1em;
	justify-content: center;
	flex-wrap: wrap;
}

input[type="text"] {
	padding: 0.3em 0.5em;
	font-family: monospace;
	border-radius: 0.2em;
	border: 1px solid #fff2;
	background: #222;
	&[data-angry] { border: 1px solid red; }
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

