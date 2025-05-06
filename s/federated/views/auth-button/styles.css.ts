
import {css} from "@benev/slate"
export default css`

:host {
	display: contents;
}

slot {
	display: contents;
}

:host([theme]) {
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	> button {
		all: unset;
		font: inherit;
		color: inherit;
	}
}

:host([theme="basic"]) {
	--login: var(--authlocal-login, lime);
	--logout: var(--authlocal-logout, #555);
	--button-text: var(--authlocal-button-text, white);

	> button {
		cursor: pointer;
		padding: 0.6em;

		color: var(--button-text);
		background: var(--logout);
		font-weight: bold;
		box-shadow: .1em .2em .3em #0002;
		text-shadow: .04em .08em .06em #0008;

		border: none;
		border-radius: 0.3em;

		&.login { background: var(--login); }
		&.logout { background: var(--logout); }

		&:is(:hover, :focus) { filter: brightness(120%); }
		&:active { filter: brightness(80%); }
	}
}

:host([theme="e280"]) {
	--login: var(--authlocal-login, lime);
	--logout: var(--authlocal-logout, #555);
	--button-text: var(--authlocal-button-text, white);

	> button {
	}
}

`

