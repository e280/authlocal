
import {css} from "@benev/slate"
export default css`

:host {
	display: flex;
	flex-direction: column;
}

.card {
	display: flex;
	flex-wrap: wrap;
	padding: 1em;
	gap: 1em;
	background: #20563c33;

	border-radius: 0.5em;
	border: 0.15em solid color-mix(in srgb, transparent, var(--alpha) 20%);
	border-top: 0.15em solid color-mix(in srgb, transparent, var(--alpha) 60%);
	box-shadow: 0 0 2em color-mix(in srgb, transparent, var(--alpha) 10%);

	& svg {
		flex: 0 0 auto;
		width: 4em;
		height: 4em;
		stroke-width: 2;
		filter:
			drop-shadow(0 0 1em color-mix(in srgb, transparent, currentColor 90%))
		;
	}

	> .alpha {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1 1 auto;
		margin-right: 1em;

		> .label {
			font-size: 1.3em;
			width: 100%;

			font-weight: bold;
			font-family: monospace;

			color: color-mix(in srgb, var(--alpha), white 50%);
			text-shadow:
				0 0 2em color-mix(in srgb, transparent, var(--alpha) 50%),
				0 0 0.5em color-mix(in srgb, transparent, var(--alpha) 50%)
			;
		}

		> input {
			padding: 0.3em 0.5em;
			width: calc(32ch + 1.4em);
			background: #0002;
		}
	}

	> slot {
		display: contents;
	}
}

.id {
	align-self: start;
	margin: 0 1em;

	font-family: monospace;
	color: color-mix(in srgb, transparent, var(--alpha) 50%);
}

`

