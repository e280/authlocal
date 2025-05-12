
import {css} from "@benev/slate"
export default css`

:host {
	display: contents;
}

.secretbox {
	width: 100%;
	position: relative;
	overflow: hidden;

	textarea {
		display: block;

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

		color: var(--seed);
		border-radius: 1rem;
		background: color-mix(in srgb, #ffffff08, var(--seed) 10%);
		-webkit-backdrop-filter: blur(0.3em);
		backdrop-filter: blur(0.3em);

		font-size: 2em;
		font-family: monospace;
		font-weight: bold;

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
		min-width: 9ch;
	}

	[theme-button] {
		border: none;
		background: none;
		box-shadow: none;
	}
}

`

