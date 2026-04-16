
import {css} from "lit"
export default css`

:host {
	display: block;
	max-width: 100%;
}

.panel {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
	padding: calc(var(--pad) * 1.1);

	color: color-mix(in oklch, white, var(--color) 35%);
	background: color-mix(in oklch, #111a, var(--color) 5%);
	border: 0.1em solid color-mix(in oklch, transparent, var(--color) 20%);
	border-top: none;
}

header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: var(--pad);
}

.tabs {
	display: flex;
	flex-wrap: wrap;
	gap: 0.25em;
}

.tabs button {
	padding: 0.2em 0.5em;
	border-radius: 999px;
	color: color-mix(in oklch, currentColor, white 12%);
}

.tabs button[data-active] {
	color: color-mix(in oklch, white, var(--color) 30%);
	background: color-mix(in oklch, transparent, var(--color) 25%);
	box-shadow: 0 0 1.25em color-mix(in oklch, transparent, var(--color) 20%);
}

.close {
	flex: 0 0 auto;
	padding: 0.1em 0.35em;
	font-size: 1.15em;
	line-height: 1;
}

`
