
import {css} from "@benev/slate"
export default css`

:host {
	display: contents;
}

section {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
}

.box {
	position: relative;
	width: max-content;
	overflow: hidden;

	textarea {
		display: block;
		width: 40ch;
		max-width: 90vw;
		height: 10em;

		&[disabled] {
			pointer-events: none;
			user-select: none;
		}
	}

	.blanket {
		pointer-events: none;
		user-select: none;

		position: absolute;
		inset: 0;
		background: color-mix(in srgb, #fff1, var(--seed) 10%);
		backdrop-filter: blur(0.3em);
		border-radius: 0.3em;

		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;

		font-size: 2em;
		font-family: monospace;
		font-weight: bold;
		text-transform: uppercase;
		color: var(--seed);
		text-shadow: .1em .1em .2em #0008;

		transition: all 300ms linear;

		&[x-hide] {
			background: transparent;
			backdrop-filter: blur(0);
			color: transparent;
			text-shadow: 0;
		}
	}
}

.reveal {
	color: var(--seed);
	min-width: 12ch;
}

footer {
	display: flex;
	gap: 0.5em;
	justify-content: center;
	flex-wrap: wrap;

	button.reveal {
	}
}

`

