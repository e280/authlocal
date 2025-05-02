
import {css} from "@benev/slate"
export default css`

nav {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5em;

	> button[x-active] {
		background: color-mix(in lch, transparent, currentColor 25%);
		text-decoration: underline;
	}
}

`

