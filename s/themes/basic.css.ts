
import {css} from "@benev/slate"
export default css`@layer theme {

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:host {
	--auth-button-bg: #567;
	--auth-button-fg: white;

	--auth-login-bg: green;
	--auth-login-fg: white;

	[theme-button] {
		all: unset;
		font: inherit;
		color: inherit;

		padding: 1em 0.5em;
		border-radius: 0.5em;
		border: 0.1em solid transparent;

		font-weight: bold;
		color: var(--auth-button-fg);
		background: var(--auth-button-bg);
		text-shadow: 0.1em 0.1em 0.1em #0008;
		box-shadow: 0.1em 0.1em 0.3em #0004;

		&[theme-button=login] {
			background: var(--auth-login-bg);
			color: var(--auth-login-fg);
		}

		&:not([disabled]) {
			cursor: pointer;
			&:is(:hover, :focus) {
				filter: brightness(120%);
				border-color: color-mix(in lch, transparent, currentColor 50%);
			}
		}

		&[disabled] {
			opacity: 0.3;
		}
	}
}

}`

