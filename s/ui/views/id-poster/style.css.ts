
import {css} from "lit"
export default css`

[part="poster"] {
	display: flex;
	flex-direction: column;
	align-items: stretch;

	max-width: 14em;
	padding: var(--padding);
	gap: var(--padding);
	border-radius: var(--round);

	color: var(--color);
	border: 0.2em solid var(--color);
	background: color-mix(in oklch, transparent, var(--color) 12%);
	backdrop-filter: blur(0.4em);
	box-shadow: 0 0 5em color-mix(in oklch, transparent, var(--color) 25%);
	filter:
		drop-shadow(0 0 0.5em var(--color));
		drop-shadow(0 0 2em var(--color));

	.icon {
		width: 50%;
		align-self: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: calc(var(--padding) / 2);

		.name {
			font-size: 1.2em;
			font-weight: bold;
		}

		.moniker {
			opacity: 0.6;
			font-size: 0.6em;
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

