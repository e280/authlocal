
import {css} from "@benev/slate"
export default css`

:host {
	display: contents;
}

.secretbox {
	color: var(--seed);
	position: relative;
	background: color-mix(in srgb, black, var(--seed) 30%);
	overflow: hidden;
	border-radius: 1em;
	border: 0.2em solid var(--seed);

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
		z-index: 1;

		display: flex;
		justify-content: center;
		align-items: center;

		backdrop-filter: blur(0.3em);

		font-size: 2em;
		font-family: monospace;
		font-weight: bold;
		background: color-mix(in srgb, #ffffff08, var(--seed) 10%);

		transition: all 500ms linear;

		&[x-hide] {
			backdrop-filter: blur(0);
			background: transparent;
			color: transparent;
			text-shadow: none;
		}
	}
}

footer {
	display: flex;
	gap: 0.5em;
	justify-content: center;
	flex-wrap: wrap;

	.reveal {
		color: var(--seed);
		min-width: 12ch;
	}
}

`

