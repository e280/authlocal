
import {css} from "lit"
export default css`

nav {
	display: flex;
	flex-wrap: wrap;
	gap: 0;

	> button {
		--textcolor: color-mix(in lch, transparent, var(--text) 50%);
		--linecolor: color-mix(in lch, transparent, var(--text) 50%);

		padding: 1em;
		padding-bottom: 0.25em;
		font-weight: bold;
		text-transform: uppercase;

		color: var(--textcolor);
		border-bottom: 0.2em solid var(--linecolor);
		transition: all 200ms linear;

		&[x-active] {
			--textcolor: var(--text);
			--linecolor: var(--text);
		}

		&:not([x-active]) {
			cursor: pointer;
			&:is(:hover, :focus) {
				--textcolor: var(--text);
			}
			&:is(:active) {
				--textcolor: var(--alpha);
				--linecolor: var(--alpha);
			}
		}
	}
}

`

