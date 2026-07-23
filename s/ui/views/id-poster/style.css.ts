
import {css} from "lit"
export default css`

[part="poster"] {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	font-family: monospace;

	padding: calc(var(--space) * 2);
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
		font-size: 3em;
		align-self: center;
	}

	.alias {
		font-size: 1.2em;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

`

