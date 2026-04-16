import {css} from "lit"
export default css`

:host {
	display: block;
}

.section {
	display: flex;
	flex-direction: column;
	gap: var(--pad);
}

[view="text-input"] {
	max-width: none;
}

[view="text-input"]::part(input) {
	border-radius: calc(var(--round) * 0.8);
	background: color-mix(in oklch, var(--input-bg), var(--color) 8%);
}

.actions {
	display: flex;
	justify-content: end;
	flex-wrap: wrap;
	gap: 0.35em;
}

`
