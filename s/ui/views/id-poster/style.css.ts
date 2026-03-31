
import {css} from "lit"
export default css`

[part="poster"] {
	display: flex;
	flex-direction: column;
	align-items: stretch;

	max-width: 14em;
	padding: var(--pad);
	gap: var(--pad);
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
		gap: var(--pad);

		.name {
			font-size: 1.2em;
			font-weight: bold;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.nomen {
			opacity: 0.7;
			font-size: 0.8em;
			font-family: monospace;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		[view="shiny-copy"] {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			--inactive-opacity: 0.9;
		}
	}
}

`

