
import {css} from "lit"
export default css`

[part="card"] {
	display: flex;
	align-items: center;
	flex-direction: row;

	width: max-content;
	max-width: 16em;
	gap: var(--pad);
	padding: var(--pad);
	border-radius: var(--round);

	color: var(--color);
	border: 0.2em solid var(--color);

	background: color-mix(in oklch, transparent, var(--color) 12%);
	backdrop-filter: blur(0.4em);
	box-shadow: 0 0 1.5em color-mix(in oklch, transparent, var(--color) 40%);

	[part="icon"] {
		transform: scale(150%);
	}

	[part="alias"] {
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

`

