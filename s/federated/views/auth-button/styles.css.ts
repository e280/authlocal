
import {css} from "@benev/slate"
export default css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:host {
	color: white;
	text-shadow: .04em .08em .06em #0008;
	--login-bg: var(--authlocal, #80f);
	--logout-bg: var(--authlocal-logout, #555);
}

button {
	flex-shrink: 0;
	cursor: pointer;
	padding: 0.6em;
	border: none;
	border-radius: 0.3em;
	background: var(--logout-bg);
	font: inherit;
	color: inherit;
	font-weight: bold;
	text-shadow: .04em .08em .06em #0008;
	box-shadow: .1em .2em .3em #0002;

	&.login {
		background: var(--login-bg);
	}

	&:is(:hover, :focus) { filter: brightness(120%); }
	&:active { filter: brightness(80%); }
}

`

