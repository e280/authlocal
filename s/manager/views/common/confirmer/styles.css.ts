
import {css} from "@benev/slate"
export default css`

:host {
	width: 100%;
}

p {
	color: var(--angry);
}

code, [theme-code] {
	color: var(--angry);
	font-size: 1.2em;
}

.box {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5em;
	width: 100%;
}

input {
	flex: 1 1 auto;
	font-size: 1.5em;
	padding: 0.5em 1em;
}

button:not([disabled]) {
	box-shadow: 0 0 4em color-mix(in lch, transparent, currentColor 50%);
	background: color-mix(in lch, transparent, currentColor 25%);

	&:not(:hover, :focus) {
		animation: angryglow 1s ease infinite;
	}

	&:is(:hover, :focus) {
		color: white;
		background: var(--angry);
	}
}

@keyframes angryglow {
	0% { color: var(--angry); }
	50% { color: var(--angryglow); }
	100% { color: var(--angry); }
}

`

