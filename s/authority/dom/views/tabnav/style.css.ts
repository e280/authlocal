import {css} from "lit"
export default css`

nav {
	display: flex;
	justify-content: center;
	gap: var(--pad);
	flex-wrap: wrap;
}

button[data-active] {
	color: var(--text);
	background: color-mix(in oklch, transparent, currentColor 20%);
	box-shadow: 0 0 1.5em color-mix(in oklch, transparent, currentColor 20%);
}

`
