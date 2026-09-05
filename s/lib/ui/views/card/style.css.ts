
import {css} from "lit"
export default css`

[part="card"] {
	--fg: var(--color);

	display: flex;
	align-items: center;
	flex-direction: row;

	gap: var(--pad);
	padding: var(--pad);
	border-radius: var(--round);

	color: var(--fg);
	border: var(--lines) solid color-mix(in oklch, transparent, var(--fg) 25%);

	background: color-mix(in oklch, transparent, var(--fg) 10%);
	backdrop-filter: blur(0.4em);

	[part="icon"] {
		font-size: 2em;
		width: 1.5em;
		height: 1.5em;
		display: grid;
		place-items: center;
		margin: -0.3em;
		margin-left: 0;
	}

	[part="alias"] {
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

`

