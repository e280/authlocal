
import {css} from "lit"
export default css`

[part="poster"] {
	display: flex;
	flex-direction: column;
	align-items: stretch;

	max-width: 18em;
	padding: var(--padding);
	gap: var(--padding);
	border-radius: var(--round);

	color: var(--color);
	border: 0.2em solid var(--color);
	background: color-mix(in oklch, #0004, var(--color) 10%);
	box-shadow: 0 0 5em color-mix(in oklch, transparent, var(--color) 25%);
	filter:
		drop-shadow(0 0 0.5em var(--color));
		drop-shadow(0 0 2em var(--color));

	.icon {
		width: 10em;
		align-self: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1em;

		.name {
			font-size: 1.4em;
			font-weight: bold;
		}

		.moniker {
			opacity: 0.5;
			font-size: 0.8em;
			font-family: monospace;
			display: block;
			width: 100%;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}

`

