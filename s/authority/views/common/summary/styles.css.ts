
import {css} from "@benev/slate"
export default css`

:host {
	display: contents;
}

ul {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	gap: 0.5em;

	li {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.5em;

		padding: 0.2em 0.5em;
		border: 1px solid color-mix(in lch, transparent, currentColor 25%);
		border-radius: 1em;

		.id {
			opacity: 0.5;
			font-size: 0.7em;
			font-family: monospace;
		}

		&[x-overwrite] {
			border-color: var(--overwrite);
		}
	}
}

.overwrite {
	color: var(--overwrite);
}

`

