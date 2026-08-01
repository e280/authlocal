
import {css} from "lit"
export default css`

[part="card"] {
	--fg: var(--color);
	--bg: #222;

	display: flex;
	align-items: center;
	flex-direction: row;

	gap: var(--pad);
	padding: var(--pad);
	border-radius: var(--round);

	color: var(--fg);
	border: var(--lines) solid color-mix(in oklch, var(--bg), var(--fg) 50%);

	background: color-mix(in oklch, transparent, var(--bg) 20%);
	backdrop-filter: blur(0.4em);

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

