
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

:is(button, a.button):not([x-plain]) {
	color: #a3b1ff;
	font-weight: bold;
	text-shadow: .04em .08em .1em #0008;
	cursor: pointer;

	&[disabled] {
		cursor: default;
		color: #666;
		opacity: 0.5;
		text-decoration: line-through;
	}

	&:not([disabled]) {
		cursor: pointer;

		&.happy { color: #26db26; }
		&.angry { color: #d00000; }
		&.special { color: #994de6; }

		&:hover { filter: brightness(120%); text-decoration: underline; }
		&:active { filter: brightness(90%); }
	}
}

input[type="text"] {
	padding: 0.3em 0.5em;
	border-radius: 0.2em;
	border-style: solid;
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

